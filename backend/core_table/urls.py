from django.urls import path

from .views import AllBarHolder, AllGoldBar, BarHolderByAddress, GetBurnHistory, GetMintHistory

urlpatterns = [
    path('gold-bars/', AllGoldBar.as_view()),
    path('bar-holder/', AllBarHolder.as_view()),
    path('burn-history/', GetBurnHistory.as_view()),
    path('bar-holder/<str:address>/', BarHolderByAddress.as_view()),
    path('mint-history/', GetMintHistory.as_view()),
]
