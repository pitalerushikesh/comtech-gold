#!/bin/bash

./docker/backend/run.sh

echo "==> $(date +%H:%M:%S) ==> Collecting statics... "
rm -rf /static/*
cp -r staticfiles/ /static/

echo "==> $(date +%H:%M:%S) ==> Running uWSGI server... "
uwsgi --ini uwsgi.ini