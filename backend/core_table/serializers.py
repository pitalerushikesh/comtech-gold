from rest_framework import serializers

from .models import BarHolder, BurnHistory

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