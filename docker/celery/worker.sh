#!/bin/bash

set -euo pipefail

sleep 10  # Wait for migrations
echo "==> $(date +%H:%M:%S) ==> Running Celery worker <=="
exec celery -A backend.celery_app worker -l INFO -Q eth_events_poll -c 1
    