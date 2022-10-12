from django.shortcuts import render

from .serializers import BarHolderSerializer, BurnHistorySerializer
from .models import BarHolder, BurnHistory
from rest_framework.generics import ListAPIView

# Create your views here.

class AllBarHolder(ListAPIView):
    queryset = BarHolder.objects.filter(bar_details__is_deleted=False, token_balance__gt=0)
    serializer_class = BarHolderSerializer


class BarHolderByAddress(ListAPIView):
    serializer_class = BarHolderSerializer

    def get_queryset(self):
        address = self.kwargs['address']
        return BarHolder.objects.filter(holder_xinfin_address=address, bar_details__is_deleted=False, token_balance__gt=0)

class GetBurnHistory(ListAPIView):
    queryset = BurnHistory.objects.all()
    serializer_class = BurnHistorySerializer