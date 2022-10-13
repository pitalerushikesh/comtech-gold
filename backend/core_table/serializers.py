from rest_framework import serializers

from .models import BarHolder, BurnHistory, GoldBar

class GoldBarSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoldBar
        fields = '__all__'

class BarHolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarHolder
        fields = '__all__'
        depth = 2

class BurnHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BurnHistory
        fields = '__all__'
        depth = 2