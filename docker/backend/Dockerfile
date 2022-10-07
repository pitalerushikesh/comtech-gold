FROM python:3.9.7

ENV PYTHONUNBUFFERED=1

WORKDIR /app/
COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend ./
COPY ./dapps-lib /dapps-lib
COPY ./docker/backend ./docker/backend
COPY ./docker/celery ./docker/celery

RUN python manage.py collectstatic --no-input