from django.shortcuts import render

from .serializers import BarHolderSerializer, BurnHistorySerializer, GoldBarSerializer, MintHistorySerializer
from .models import BarHolder, BurnHistory, GoldBar, Mint
from rest_framework.generics import ListAPIView
from utils import xdcToEth, toChecksumAddress

# Create your views here.


class AllGoldBar(ListAPIView):
    queryset = GoldBar.objects.filter(is_deleted=False)
    serializer_class = GoldBarSerializer


class AllBarHolder(ListAPIView):
    queryset = BarHolder.objects.filter(
        bar_details__is_deleted=False, token_balance__gt=0)
    serializer_class = BarHolderSerializer


class BarHolderByAddress(ListAPIView):
    serializer_class = BarHolderSerializer

    def get_queryset(self):
        address = toChecksumAddress(xdcToEth(self.kwargs['address']))
        return BarHolder.objects.filter(holder_xinfin_address=address, bar_details__is_deleted=False, token_balance__gt=0)


class GetBurnHistory(ListAPIView):
    queryset = BurnHistory.objects.all()
    serializer_class = BurnHistorySerializer


class GetMintHistory(ListAPIView):
    queryset = Mint.objects.all()
    serializer_class = MintHistorySerializer
