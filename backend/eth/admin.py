from django.contrib import admin
from .models import TransactionAction, BlockChainTransaction, EventsLog


class BlockChainTransactionAdmin(admin.ModelAdmin):
    list_display = ('method', 'transaction_hash', 'status',
                    'created_at',  'executor', 'contract')
    list_filter = ('status', 'method',
                   'executor', 'contract')
    search_fields = ('transaction_hash', 'status', 'method',
                     'params', 'message', 'executor', 'contract')


class EventsLogAdmin(admin.ModelAdmin):
    list_display = (
        "transaction_hash",
        "event_name",
        "event_data",
        "created_at",
    )
    search_fields= (
        "transaction_hash",
        "event_name",
        "event_data"
    )


admin.site.register(TransactionAction)
admin.site.register(BlockChainTransaction, BlockChainTransactionAdmin)
admin.site.register(EventsLog, EventsLogAdmin)
