import json
from rest_framework import serializers
from .models import BlockChainTransaction, TransactionAction


class TransactionActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionAction
        fields = "__all__"


class BlockChainTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockChainTransaction
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['params'] = json.loads(representation['params'])
        return representation
