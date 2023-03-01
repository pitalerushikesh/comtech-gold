from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, ListAPIView
from django.http import JsonResponse
from .models import BlockChainTransaction, TransactionAction
from .serializers import BlockChainTransactionSerializer, TransactionActionSerializer


class CreateTransactionActionApiView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = TransactionAction.objects.all()

    def post(self, request):
        data = request.data
        payment_token = TransactionActionSerializer(data=data)

        if payment_token.is_valid():
            payment_token.save()
            return JsonResponse(payment_token.data, status=200)

        return JsonResponse(payment_token.errors, status=400)


class RetrieveUpdateTransactionActionApiView(RetrieveUpdateAPIView):
    queryset = TransactionAction.objects.all()
    serializer_class = TransactionActionSerializer
    lookup_field = 'id'


class CreateBlockChainTransactionApiView(CreateAPIView):
    queryset = BlockChainTransaction.objects.all()
    serializer_class = BlockChainTransactionSerializer
    permission_classes = [AllowAny]


class GetAllBlockChainTransactionsApiView(ListAPIView):
    queryset = BlockChainTransaction.objects.all()
    serializer_class = BlockChainTransactionSerializer
    permission_classes = [AllowAny]
    filter_fields = ('status', 'method', 'executor', 'contract')
