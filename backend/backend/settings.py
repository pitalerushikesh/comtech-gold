"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import environ
import json
from celery.schedules import crontab
import os

env = environ.Env()

def readFileJSON(path):
    with open(os.path.join(os.path.dirname(__file__),
                           path), 'r') as f:
        return json.load(f)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

STATIC_ROOT = str(BASE_DIR / "staticfiles")
MEDIA_ROOT = str(BASE_DIR / "media")

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-=b(eux5^wk89$#t6f6f_@u7u$syize-yc)sffzyw0rh+a++is)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS', default=['*'])

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    "core_table",
    'rest_framework',
    'rest_framework.authtoken',
    'django_rest_passwordreset',
    'drf_yasg',
    'django_extensions',
    'django_filters',
    'django_celery_beat',
    'django_ethereum_events',
    'eth',
    'solo',

]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

USE_POSTGRES = env.bool('USE_POSTGRES', default=False)

if USE_POSTGRES:
    DATABASES = {
        'default': env.db('DATABASE_URL'),
    }
    DATABASES['default']['ATOMIC_REQUESTS'] = False
    DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql'
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db' / 'db.sqlite3',
        }
    }

REDIS_URL = env('REDIS_CACHE_URL',
                default="redis://127.0.0.1:6379/1")


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication'
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
}


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

CORS_ORIGIN_ALLOW_ALL = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATIC_URL = env('STATIC_URL', default='/static/')
MEDIA_URL = env('MEDIA_URL', default='/media/')

CELERY_BEAT_SCHEDULE = {
    'poll_blockchain': {
        'task': 'django_ethereum_events.tasks.event_listener',
        'schedule': 5.0,
        'options': {'queue': 'eth_events_poll'}
    },

}

CELERY_TIMEZONE = "UTC"

ADMIN_USERNAME = env('ADMIN_USERNAME', default='admin')
ADMIN_EMAIL = env('ADMIN_EMAIL', default="admin@admin.com")
ADMIN_PASSWORD = env('ADMIN_PASSWORD', default="admin123")
CELERY_BROKER_URL = env('CELERY_BROKER_URL',
                        default="redis://127.0.0.1:6379/0")


CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'

ETHEREUM_NODE_URI = env('ETHEREUM_NODE_URI',
                        default='https://rpc-apothem.xinfin.yodaplus.net')

CONTRACTS = {
    '50': readFileJSON('../../dapps-lib/contracts/mainnet.json'),
    '51': readFileJSON('../../dapps-lib/contracts/apothem.json')
}

NETWORK_ID = env('NETWORK_ID', default='51')


ERC20_CONTRACT_ABI = CONTRACTS[NETWORK_ID]['contracts']['Goldtoken']['abi']
CGO_TOKEN_ADDRESS = CONTRACTS[NETWORK_ID]['contracts']['Goldtoken']['address']



CGO_CONTROLLER_CONTRACT_ABI = CONTRACTS[NETWORK_ID]['contracts']['CGOController']['abi']
CGO_CONTROLLER_CONTRACT_ADDRESS = CONTRACTS[NETWORK_ID]['contracts']['CGOController']['address']


# CGO_CONTROLLER_CONTRACT = "0x348D90737268f35B162F4645771245aB2E609Fad"