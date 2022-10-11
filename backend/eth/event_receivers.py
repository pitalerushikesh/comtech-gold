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
from core_table.models import GoldBar, Mint, Burn, BarHolder

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
            print(f'Mint To: {transfer_to}, Amount: {amount}')
            return 'Minting Transfer'

        from_bar_holding = BarHolder.objects.filter(holder_xinfin_address=transfer_from)
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
       