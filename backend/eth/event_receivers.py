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


class TransferEventReceiver(AbstractEventReceiver):
    def save(self, decoded_event):
        print(f'Received TransferEventReceiver event: {decoded_event!r}')
