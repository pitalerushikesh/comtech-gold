#!/bin/bash

./docker/backend/run.sh

echo "==> $(date +%H:%M:%S) ==> Running dev server... "
python manage.py runserver 0.0.0.0:8000