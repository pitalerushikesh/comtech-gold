import os
import json
from django.conf import settings
from django.core.management.base import BaseCommand
from django_ethereum_events.models import MonitoredEvent


class Command(BaseCommand):
    def handle(self, *args, **options):
        print('Clearing monitored events list')

        MonitoredEvent.objects.all().delete()

        print('Adding monitored events')

        MonitoredEvent.objects.register_event(
            event_name='Transfer',
            # put your contract address here
            contract_address=settings.CGO_TOKEN_ADDRESS,
            # put your contract abi here
            contract_abi=settings.ERC20_CONTRACT_ABI,
            event_receiver='eth.event_receivers.TransferEventReceiver'
        )
