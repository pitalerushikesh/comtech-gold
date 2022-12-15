from django.shortcuts import render

from .serializers import BarHolderSerializer, BurnHistorySerializer, GoldBarSerializer, EditBarStatusSerializer, MintHistorySerializer, BurnIntiatedSerializer
from .models import BarHolder, BurnHistory, GoldBar, EditBarStatus, Mint, Burn
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

class GetEditBarStatus(ListAPIView):
    queryset = EditBarStatus.objects.all()
    serializer_class = EditBarStatusSerializer

class GetMintHistory(ListAPIView):
    queryset = Mint.objects.filter(status='MINT_COMPLETED')
    serializer_class = MintHistorySerializer

class GetInitiatedMintHistory(ListAPIView):
    queryset = Mint.objects.filter(status='MINT_INITIATED')
    serializer_class = MintHistorySerializer

class GetInitiatedBurn(ListAPIView):
    queryset = Burn.objects.filter(status='BURN_INITIATED')
    serializer_class = BurnIntiatedSerializer
