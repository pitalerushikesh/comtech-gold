from django.db import models
import uuid

from solo.models import SingletonModel

# Create your models here.

class GoldBar(models.Model):
    bar_number = models.CharField(primary_key=True, max_length=10)
    warrant_number = models.CharField(max_length=10)
    is_deleted = models.BooleanField(default=False)
    escrow_date = models.DateField(auto_now_add=True, auto_created=True)

    def __str__(self):
        return self.bar_number + '|' + str(self.escrow_date)
    
    class Meta:
        verbose_name = 'Gold Bar'
        verbose_name_plural = 'Gold Bars'

class Mint(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bar_details = models.ForeignKey(GoldBar, on_delete=models.PROTECT)
    burnt = models.BooleanField(default=False)
    mint_date = models.DateField(auto_now=True, auto_created=True)

    def __str__(self):
        return self.bar_details.bar_number + '|' + str(self.mint_date)

    class Meta:
        verbose_name = 'Mint'
        verbose_name_plural = 'Mints'

class Burn(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bar_details = models.ForeignKey(GoldBar, on_delete=models.PROTECT)
    burnt_date = models.DateField(auto_now=True, auto_created=True)

    def __str__(self):
        return self.bar_details.bar_number + '|' + str(self.burnt_date)

    class Meta:
        verbose_name = 'Burnt'
        verbose_name_plural = 'Burnts'

class BurnHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    burnt_bar = models.ForeignKey(GoldBar, on_delete=models.PROTECT, related_name='burnt_bar')
    adjusted_bar = models.ForeignKey(GoldBar, on_delete=models.PROTECT, related_name='adjusted_bar')
    adjusted_user = models.CharField(max_length=42)
    adjusted_amount = models.FloatField()
    tx_hash = models.CharField(max_length=66)

    burnt_date = models.DateField(auto_now=True, auto_created=True)

    # def __str__(self):
    #     return self.bar_details.bar_number + '|' + str(self.burnt_date)

    class Meta:
        verbose_name = 'Burnt History'
        verbose_name_plural = 'Burnts History'

class BarHolder(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bar_details = models.ForeignKey(GoldBar, on_delete=models.PROTECT)
    holder_xinfin_address = models.CharField(max_length=42)
    token_balance = models.FloatField()
    holder_date = models.DateField(auto_now=True, auto_created=True)

    def __str__(self):
        return self.bar_details.bar_number + '|' + self.holder_xinfin_address

    class Meta:
        verbose_name = 'Bar Holder'
        verbose_name_plural = 'Bar Holders'

class EditBarStatus(SingletonModel):
    status = models.BooleanField(default=False)

    def __str__(self):
        return str(self.status)

    class Meta:
        verbose_name = 'Edit Bar Status'
        verbose_name_plural = 'Edit Bar Status'
