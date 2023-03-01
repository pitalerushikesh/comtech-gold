from django.db import models
import uuid


class TransactionAction(models.Model):

    class Meta:
        verbose_name_plural = ("Transaction Actions")
    id = models.CharField(primary_key=True, max_length=100,
                          blank=False, null=False)
    transaction_hash = models.CharField(
        max_length=66, blank=True, null=False, default="")
    status = models.BooleanField(default=False)
    message = models.TextField(blank=True, null=False, default="")

    def __str__(self):
        return f"{self.id}"


class BlockChainTransaction(models.Model):

    class Meta:
        verbose_name_plural = ("BlockChain Transactions")
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    transaction_hash = models.CharField(
        max_length=66, blank=True, null=False, default="")
    status = models.BooleanField(default=False)
    method = models.CharField(
        max_length=200, blank=True, null=False, default="")
    params = models.TextField(
        blank=True, null=False, default="")
    message = models.TextField(blank=True, null=False, default="")
    executor = models.CharField(
        max_length=42, blank=True, null=False, default="")
    contract = models.CharField(
        max_length=42, blank=True, null=False, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.method} | {self.transaction_hash}"


class EventsLog(models.Model):
    class Meta:
        verbose_name_plural = ("Events Log")
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    transaction_hash = models.CharField(
        max_length=66, blank=True, null=False, default="")
    event_name = models.CharField(
        max_length=200, blank=True, null=False, default="")
    event_data = models.TextField(
        blank=True, null=False, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
