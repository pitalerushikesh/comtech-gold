import itertools
import json
import logging

from django.conf import settings
from django.core.cache import cache
from django.utils.module_loading import import_string

from .decoder import Decoder
from .exceptions import UnknownBlock
from .models import CACHE_UPDATE_KEY, Daemon, FailedEventLog
from .utils import HexJsonEncoder, refresh_cache_update_value
from .web3_service import Web3Service

logger = logging.getLogger(__name__)


class EventListener:
    """Event Listener class."""

    def __init__(self, *args, **kwargs):
        super(EventListener, self).__init__()
        self.daemon = Daemon.get_solo()
        self.decoder = Decoder(block_number=self.daemon.block_number + 1)
        self.web3 = Web3Service(*args, **kwargs).web3

    def has_new_blocks(self, current):
        last = self.daemon.block_number

        if last < current:
            return True
        else:
            return False

    def get_pending_blocks_range(self, current):
        """
        Retrieve the range of blocks that have not been processed.

        Returns:
            (from, to) tuple

        """
        step = getattr(settings, "ETHEREUM_LOGS_BATCH_SIZE", 10000)
        start = self.daemon.block_number + 1
        return (start, min(current, start + step))

    def update_block_number(self, block_number):
        """Updates the internal block_number counter."""
        self.daemon.block_number = block_number
        self.daemon.save()

    def get_logs(self, from_block, to_block):
        """
        Retrieves the relevant log entries from the given block range.

        Args:
            from_block (int): The first block number.
            to_block (int): The last block number.

        Returns:
            The list of relevant log entries.

        """

        logs = []

        for address in self.decoder.watched_addresses:
            callObj = {'fromBlock': from_block,
                       'toBlock': to_block,
                       'address': address,
                       'topics': [list(self.decoder.topics_by_address[address].keys())]}

            callRes = self.web3.eth.get_logs(callObj)

            logs.extend(callRes)

        logger.info('Found {0} logs'.format(len(logs)))

        return logs

    def save_events(self, decoded_logs):
        """
        Fires the appropriate event receivers for every given log.

        Args:
            decoded_logs (:obj:`list` of :obj:`dict`): The decoded logs.

        """
        for topic, decoded_log in decoded_logs:
            event_receiver = self.decoder.topics_by_address[decoded_log.address][topic].event_receiver

            try:
                event_receiver_cls = import_string(event_receiver)
                event_receiver_cls().save(decoded_event=decoded_log)
            except Exception:
                # Save the event information that caused the exception
                failed_event = FailedEventLog.objects.create(
                    event=decoded_log.event,
                    transaction_hash=decoded_log.transactionHash.hex(),
                    transaction_index=decoded_log.transactionIndex,
                    block_hash=decoded_log.blockHash.hex(),
                    block_number=decoded_log.blockNumber,
                    log_index=decoded_log.logIndex,
                    address=decoded_log.address,
                    args=json.dumps(decoded_log.args, cls=HexJsonEncoder),
                    monitored_event=self.decoder.topics_by_address[decoded_log.address][topic]
                )

                logger.error('Exception while calling {0}. FailedEventLog entry with id {1} created.'.format(
                    event_receiver, failed_event.pk), exc_info=True)

    def execute(self):
        """Program loop, does all the underlying work."""

        currentBlockNumber = self.web3.eth.blockNumber

        if not self.has_new_blocks(currentBlockNumber):
            logger.info('No new blocks detected, skipping')
            return

        (from_block, to_block) = self.get_pending_blocks_range(currentBlockNumber)
        logger.info('Processing blocks from {0} to {1}'.format(
            from_block, to_block))

        logs = self.get_logs(from_block, to_block)
        decoded_logs = self.decoder.decode_logs(logs)
        self.save_events(decoded_logs)
        self.update_block_number(to_block)
