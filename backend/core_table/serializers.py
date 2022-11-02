from rest_framework import serializers

from .models import BarHolder, BurnHistory, GoldBar

class GoldBarSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoldBar
        fields = '__all__'

class BarHolderSerializer(serializers.ModelSerializer):
    bar_number = serializers.CharField(source='bar_details.bar_number')
    warrant_number = serializers.CharField(source='bar_details.warrant_number')
    token_balance_formatted = serializers.SerializerMethodField()

    def get_token_balance_formatted(self, obj):
        return obj.token_balance/1e18
    class Meta:
        model = BarHolder
        fields = '__all__'
        depth = 2

class BurnHistorySerializer(serializers.ModelSerializer):
    burnt_bar_number = serializers.CharField(source='burnt_bar.bar_number')
    adjusted_bar_number = serializers.CharField(source='adjusted_bar.bar_number')
    adjusted_amount_formatted = serializers.SerializerMethodField()

    def get_adjusted_amount_formatted(self, obj):
        return obj.adjusted_amount/1e18
    class Meta:
        model = BurnHistory
        fields = '__all__'
        depth = 2