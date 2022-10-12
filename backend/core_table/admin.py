from django.contrib import admin
from .models import BurnHistory, GoldBar, Mint, Burn, BarHolder

# Register your models here.

class GoldBarAdmin(admin.ModelAdmin):
    list_display = ('bar_number', 'warrant_number', 'escrow_date', 'is_deleted')
    list_filter = ('is_deleted', 'escrow_date')
    search_fields = ('bar_number', 'warrant_number')
    readonly_fields = ('escrow_date',)

class MintAdmin(admin.ModelAdmin):
    list_display = ('bar_details', 'mint_date', 'burnt')
    list_filter = ('burnt', 'mint_date')
    search_fields = ('bar_details', 'mint_date')
    readonly_fields = ('mint_date',)

class BurnAdmin(admin.ModelAdmin):
    list_display = ('bar_details', 'burnt_date')
    list_filter = ('burnt_date',)
    search_fields = ('bar_details', 'burnt_date')
    readonly_fields = ('burnt_date',)

class BarHolderAdmin(admin.ModelAdmin):
    list_display = ('bar_details', 'holder_xinfin_address', 'token_balance', 'holder_date')
    list_filter = ('holder_date',)
    search_fields = ('bar_details', 'holder_xinfin_address')
    readonly_fields = ('holder_date',)

class BurnHistoryAdmin(admin.ModelAdmin):
    list_display = ('burnt_bar', 'adjusted_bar', 'adjusted_user', 'adjusted_amount', 'tx_hash')
    list_filter = ('burnt_bar', 'adjusted_bar', 'adjusted_user', 'tx_hash')
    search_fields = ('burnt_bar', 'adjusted_bar', 'adjusted_user', 'tx_hash')
    readonly_fields = ('burnt_bar', 'adjusted_bar', 'adjusted_user', 'adjusted_amount', 'tx_hash')

admin.site.register(GoldBar, GoldBarAdmin)
admin.site.register(Mint, MintAdmin)
admin.site.register(Burn, BurnAdmin)
admin.site.register(BarHolder, BarHolderAdmin)
admin.site.register(BurnHistory, BurnHistoryAdmin)