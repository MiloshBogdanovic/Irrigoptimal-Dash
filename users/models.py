from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
# Create your models here.


class DataLogger(models.Model):
    name = models.CharField(max_length=100,)
    serial = models.CharField(max_length=100, unique=True)


    def __str__(self):
        return self.name


class WeatherStation(models.Model):
    name = models.CharField(max_length=100)
    serial = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    date_joined = models.DateTimeField(timezone.now)
    data_logger = models.ManyToManyField(DataLogger)
    weather_statiot = models.ManyToManyField(WeatherStation)

    class Meta:
        db_table = 'auth_user'
    
    