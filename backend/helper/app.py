from core_table.models import BarHolder
from utils import xdcToEth, toChecksumAddress
from django.db.models import Sum
from django.db.models.functions import Cast
from django.db.models import IntegerField


def calculate(addr):
    address = toChecksumAddress(xdcToEth(addr))
    balance = BarHolder.objects.filter(holder_xinfin_address=address, bar_details__is_deleted=False, token_balance__gt=0)
    cal_bal = int(0)
    print(cal_bal)
    for obj in balance:
        cal_bal += int(obj.token_balance)
        print(cal_bal)
    return cal_bal / 10 ** 18