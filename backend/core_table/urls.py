from django.urls import path

from .views import AllBarHolder, BarHolderByAddress, GetBurnHistory

urlpatterns =[
    path('bar-holder/', AllBarHolder.as_view()),
    path('burn-history/', GetBurnHistory.as_view()),
    path('bar-holder/<str:address>/', BarHolderByAddress.as_view()),
]