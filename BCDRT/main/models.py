from django.db import models
import datetime
# Create your models here.


class RiskType(models.Model):
    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=15)

    def __str__(self):
        return self.title

    def getDict(self):
        return {'id': self.id, 'title': self.title, 'slug': self.slug}


class Field(models.Model):
    risk_type = models.ForeignKey(RiskType, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    slug = models.CharField(max_length=15)
    field_type = models.CharField(max_length=30, choices=(
        ('Text', 'Text'),
        ('Number', 'Number'),
        ('Date', 'Date'),
    ))

    def __str__(self):
        return self.title

    def getDict(self):
        return {'title': self.title,'slug': self.slug, 'field_type': self.field_type}


class TextField(models.Model):
    field = models.OneToOneField(Field, on_delete=models.CASCADE)
    value = models.CharField(max_length=200)

    def __str__(self):
        return self.value


class NumberField(models.Model):
    field = models.OneToOneField(Field, on_delete=models.CASCADE)
    value = models.IntegerField()

    def __str__(self):
        return self.value


class DateField(models.Model):
    field = models.OneToOneField(Field, on_delete=models.CASCADE)
    value = models.DateField(default=datetime.date.today)

    def __str__(self):
        return self.value
