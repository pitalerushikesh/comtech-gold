import csv
from core_table.models import GoldBar
from datetime import date

def loadBar():
    if GoldBar.objects.all().count() == 0:
        fhand = open('scripts/bar.csv')
        reader = csv.reader(fhand)
        GoldBar.objects.all().delete()

        for row in reader:

            gold_bar = GoldBar()
            gold_bar.bar_number = row[0]
            gold_bar.warrant_number = row[1]
            gold_bar.is_deleted = True
            gold_bar.escrow_date = date.today()
            gold_bar.save()
        print("TOTAL BARS ADDED: ", GoldBar.objects.all().count())
    else:
        print("Gold Bar already exists")

def run():
    loadBar()