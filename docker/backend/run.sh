#!/bin/bash

echo "==> $(date +%H:%M:%S) ==> Migrating Django models... "
python manage.py migrate --noinput

echo "==> $(date +%H:%M:%S) ==> Initializing insert data to database script .. "

python manage.py runscript loaddata

echo "==> $(date +%H:%M:%S) ==> Initializing Django admin account.. "

python manage.py initadmin

echo "==> $(date +%H:%M:%S) ==> Initializing Monitored contract events.. "

python manage.py initevents