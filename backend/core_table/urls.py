from django.urls import path

from .views import AllBarHolder, AllGoldBar, BarHolderByAddress, GetBurnHistory, GetEditBarStatus

urlpatterns =[
    path('gold-bars/', AllGoldBar.as_view()),
    path('bar-holder/', AllBarHolder.as_view()),
    path('burn-history/', GetBurnHistory.as_view()),
    path('bar-holder/<str:address>/', BarHolderByAddress.as_view()),
    path('edit-bar-status/', GetEditBarStatus.as_view()),
]