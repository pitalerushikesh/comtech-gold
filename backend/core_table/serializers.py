from rest_framework import serializers

from .models import BarHolder, BurnHistory, GoldBar, Mint
from utils import ethToXdc, toChecksumAddress


class GoldBarSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoldBar
        fields = '__all__'


class BarHolderSerializer(serializers.ModelSerializer):
    bar_number = serializers.CharField(source='bar_details.bar_number')
    warrant_number = serializers.CharField(source='bar_details.warrant_number')
    token_balance_formatted = serializers.SerializerMethodField()
    xdc_holder_address = serializers.SerializerMethodField()

    def get_token_balance_formatted(self, obj):
        return str(int(obj.token_balance)/int(10**18))

    def get_xdc_holder_address(self, obj):
        return ethToXdc(toChecksumAddress(obj.holder_xinfin_address))

    class Meta:
        model = BarHolder
        fields = '__all__'
        depth = 2


class BurnHistorySerializer(serializers.ModelSerializer):
    burnt_bar_number = serializers.CharField(source='burnt_bar.bar_number')
    adjusted_bar_number = serializers.CharField(
        source='adjusted_bar.bar_number')
    adjusted_amount_formatted = serializers.SerializerMethodField()
    xdc_holder_address = serializers.SerializerMethodField()

    def get_adjusted_amount_formatted(self, obj):
        return int(obj.adjusted_amount)/10**18

    def get_xdc_holder_address(self, obj):
        return ethToXdc(toChecksumAddress(obj.adjusted_user))

    class Meta:
        model = BurnHistory
        fields = '__all__'
        depth = 2


class MintHistorySerializer(serializers.ModelSerializer):
    bar_number = serializers.CharField(source='bar_details.bar_number')
    warrant_number = serializers.CharField(source='bar_details.warrant_number')

    class Meta:
        model = Mint
        fields = '__all__'
        depth = 2
