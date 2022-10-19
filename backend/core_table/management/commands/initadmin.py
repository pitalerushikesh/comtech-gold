#  initialize superuser
from django.contrib.auth import get_user_model
from django.conf import settings
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Create superuser'

    def handle(self, *args, **options):
        User = get_user_model()

        ADMIN_PASSWORD = settings.ADMIN_PASSWORD
        ADMIN_USERNAME = settings.ADMIN_USERNAME

        if not User.objects.filter(username=ADMIN_USERNAME).exists():
            User.objects.create_superuser('admin', 'shadab@yodaplus.com', ADMIN_PASSWORD)



