import imp
import json
import math
import os
from datetime import datetime, timedelta

import requests
from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils.timezone import localdate
from django_ethereum_events.chainevents import AbstractEventReceiver
from django_ethereum_events.models import MonitoredEvent

from eth.models import BlockChainTransaction, EventsLog, TransactionAction
from core_table.models import BurnHistory, GoldBar, Mint, Burn, BarHolder

def update_blockchain_transaction(decoded_event):
    EventsLog.objects.create(
        transaction_hash=decoded_event.transactionHash.hex(),
        event_name=decoded_event.event,
        event_data=str(decoded_event.args.__dict__),
    ).save()

    BlockChainTransaction.objects.filter(
        transaction_hash=decoded_event.transactionHash.hex()).update(
        status=True)


def get_blockchain_executor(decoded_event):
    return BlockChainTransaction.objects.filter(
        transaction_hash=decoded_event.transactionHash.hex()).first().executor


class BarAddedEventReceiver(AbstractEventReceiver):
    def save(self, decoded_event):
        print(f'Received Mint event: {decoded_event!r}')
        update_blockchain_transaction(decoded_event)
        args = decoded_event['args']
        bar_number = args.get('Bar_Number')
        warrant_number = args.get('Warrant_Number')
        tx_hash = decoded_event['transactionHash'].hex()

        gold_bar = GoldBar.objects.create(
            bar_number=bar_number, warrant_number=warrant_number)
        Mint.objects.create(
            bar_details=gold_bar
        )

        print(f'Warrant Number: {warrant_number}, Bar Number: {bar_number}, tx_hash: {tx_hash}')
        return 'Manual Bar Minted Successfully'

class MintEventReceiver(AbstractEventReceiver):
    def save(self, decoded_event):
        print(f'Received Mint event: {decoded_event!r}')
        update_blockchain_transaction(decoded_event)
        args = decoded_event['args']
        mint_to = args.get('to')
        amount = args.get('amount')
        bar_number = args.get('Bar_Number')
        warrant_number = args.get('Warrant_Number')
        tx_hash = decoded_event['transactionHash'].hex()

        gold_bar = GoldBar.objects.create(
            bar_number=bar_number, warrant_number=warrant_number)
        Mint.objects.create(
            bar_details=gold_bar
        )
        BarHolder.objects.create(
            bar_details=gold_bar, holder_xinfin_address=mint_to, token_balance=amount/1e18
            )

        print(f'Mint To: {mint_to}, Amount: {amount}, Warrant Number: {warrant_number}, Bar Number: {bar_number}, tx_hash: {tx_hash}')
        return 'New Bar Minted Successfully'

def CreateUpdateBarHolder(bar_detail, holder_xinfin_address, token_balance):
    bar_holder = BarHolder.objects.filter(bar_details=bar_detail, holder_xinfin_address=holder_xinfin_address)
    if bar_holder.exists():
        # bar_holder.update(token_balance=token_balance)
        update_bar_holder = bar_holder.first()
        update_bar_holder.token_balance += token_balance
        update_bar_holder.save()
    else:
        BarHolder.objects.create(
            bar_details=bar_detail, holder_xinfin_address=holder_xinfin_address, token_balance=token_balance
            )

class TransferEventReceiver(AbstractEventReceiver):
    def save(self, decoded_event):
        print(f'Received TransferEventReceiver event: {decoded_event!r}')
        update_blockchain_transaction(decoded_event)

        args = decoded_event['args']
        transfer_from = args.get('from')
        transfer_to = args.get('to')
        amount = args.get('value') / 1e18
        updated_amount = amount

        if transfer_from == '0x0000000000000000000000000000000000000000':
            mint_amount = amount
            
            bars = GoldBar.objects.filter(is_deleted=True)
            if bars.exists():
                for bar in bars:
                    if mint_amount > 0:
                        Mint.objects.create(
                            bar_details=bar
                        )
                        BarHolder.objects.create(
                            bar_details=bar, holder_xinfin_address=transfer_to, token_balance=1000
                            )
                        bar.is_deleted = False
                        bar.save()
                        mint_amount -= 1000

            print(f'Mint To: {transfer_to}, Amount: {amount}')
            return 'Minting Transfer'
        
        if transfer_to == '0x0000000000000000000000000000000000000000':
            print(f'Burn From: {transfer_from}, Amount: {amount}')
            return 'Burn Transfer'

        from_bar_holding = BarHolder.objects.filter(holder_xinfin_address=transfer_from, token_balance__gt=0, bar_details__is_deleted=False)
        for obj in from_bar_holding:
            _bar_details = obj.bar_details
            if updated_amount == 0:
                break
            if obj.token_balance >= updated_amount:
                obj.token_balance -= updated_amount
                obj.save()
                CreateUpdateBarHolder(_bar_details, transfer_to, updated_amount)
                updated_amount = 0
                break
            if obj.token_balance < updated_amount and obj.token_balance > 0:
                updated_amount -= obj.token_balance
                CreateUpdateBarHolder(_bar_details, transfer_to, obj.token_balance)
                obj.token_balance = 0
                obj.save()



class BurnEventReceiver(AbstractEventReceiver):
    def save(self, decoded_event):
        print(f'Received Burn event: {decoded_event!r}')
        update_blockchain_transaction(decoded_event)
        args = decoded_event['args']

        burn_from = args.get('burn_from')
        amount = args.get('amount')
        bar_number = args.get('Bar_Number')
        warrant_number = args.get('Warrant_Number')
        tx_hash = decoded_event['transactionHash'].hex()

        gold_bar = GoldBar.objects.get(bar_number=bar_number, warrant_number=warrant_number)

        bar_holders = BarHolder.objects.filter(bar_details=gold_bar, token_balance__gt=0)

        user_holdings = BarHolder.objects.filter(holder_xinfin_address=burn_from, token_balance__gt=0, bar_details__is_deleted=False)

        for obj in bar_holders:
            updated_bar_balance = obj.token_balance
            bar_user = obj.holder_xinfin_address

            for user_obj in user_holdings:
                user_bar_details = user_obj.bar_details

                if updated_bar_balance == 0:
                    break

                # if user in bar is same as burn_from user dont conpensate
                if bar_user == burn_from:
                    # CreateUpdateBarHolder(gold_bar, bar_user, 0)
                    obj.token_balance = 0
                    obj.save()

                    print(f'Bar User: {bar_user}, Amount: {updated_bar_balance}')
                    burn_history = BurnHistory.objects.create(
                        burnt_bar=gold_bar, 
                        adjusted_bar=gold_bar, 
                        adjusted_user=bar_user, adjusted_amount=updated_bar_balance,
                        tx_hash=tx_hash
                        )
                    print(f'Burn_history: {burn_history}, adjusted_amount: {updated_bar_balance}')
                    updated_bar_balance = 0
                    break
                if user_bar_details == gold_bar:
                    continue

                if user_obj.token_balance >= updated_bar_balance:
                    user_obj.token_balance -= updated_bar_balance
                    user_obj.save()
                    create_upadte_balance = updated_bar_balance

                    # Check for holdings in same bar - handled above
                    # if bar_user == burn_from:
                    #     create_upadte_balance = 0

                    CreateUpdateBarHolder(user_bar_details, bar_user, create_upadte_balance)
                    BurnHistory.objects.create(
                        burnt_bar=gold_bar, 
                        adjusted_bar=user_bar_details, 
                        adjusted_user=bar_user, adjusted_amount=updated_bar_balance,
                        tx_hash=tx_hash
                        )
                    updated_bar_balance = 0
                    break

                if user_obj.token_balance < updated_bar_balance and user_obj.token_balance > 0:
                    updated_bar_balance -= user_obj.token_balance
                    _create_upadte_balance = user_obj.token_balance

                    # Check for holdings in same bar - handled above
                    # if bar_user == burn_from:
                    #     _create_upadte_balance = 0

                    CreateUpdateBarHolder(user_bar_details, bar_user, _create_upadte_balance)
                    BurnHistory.objects.create(
                        burnt_bar=gold_bar,
                        adjusted_bar=user_bar_details,
                        adjusted_user=bar_user, 
                        adjusted_amount=user_obj.token_balance,
                        tx_hash=tx_hash
                        )
                    user_obj.token_balance = 0
                    user_obj.save()
            obj.token_balance = 0
            obj.save()

        Burn.objects.create(bar_details=gold_bar)
        mint_obj = Mint.objects.get(bar_details=gold_bar)
        mint_obj.burnt = True
        mint_obj.save()

        gold_bar.is_deleted = True
        gold_bar.save()

        print(f'Burn From: {burn_from}, Amount: {amount}, Warrant Number: {warrant_number}, Bar Number: {bar_number}, tx_hash: {tx_hash}')


# POC ERC20 MInt Event based
# class MintERC20EventReceiver(AbstractEventReceiver):
#     def save(self, decoded_event):
#         print(f'Received MintERC20 event: {decoded_event!r}')
#         update_blockchain_transaction(decoded_event)
#         args = decoded_event['args']

#         mint_to = args.get('to')
#         amount = args.get('value') / 1e18
#         bar_number = args.get('Bar_Number')
#         warrant_number = args.get('Warrant_Number')
#         tx_hash = decoded_event['transactionHash'].hex()

#         gold_bar = GoldBar.objects.get(bar_number=bar_number, warrant_number=warrant_number)
#         CreateUpdateBarHolder(gold_bar, mint_to, amount)

#         Mint.objects.create(bar_details=gold_bar, tx_hash=tx_hash)

#         print(f'Mint To: {mint_to}, Amount: {amount}, Warrant Number: {warrant_number}, Bar Number: {bar_number}, tx_hash: {tx_hash}')