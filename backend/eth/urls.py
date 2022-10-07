from django.urls import path
from .views import CreateBlockChainTransactionApiView, CreateTransactionActionApiView, GetAllBlockChainTransactionsApiView, RetrieveUpdateTransactionActionApiView

urlpatterns = [
    path("transaction-action/<id>/", RetrieveUpdateTransactionActionApiView.as_view(),
         name="create-transaction-action"),
    path('blockchain-transaction/', CreateBlockChainTransactionApiView.as_view(),
         name="create-blockchain-transaction"),
    path('get-blockchain-transactions/', GetAllBlockChainTransactionsApiView.as_view(),
         name="get-all-blockchain-transactions"),
]
