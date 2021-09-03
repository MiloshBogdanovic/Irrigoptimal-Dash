from django.contrib import admin
from .models import CustomUser, DataLogger, WeatherStation
# Register your models here.


admin.site.register(CustomUser)

admin.site.register(DataLogger)

admin.site.register(WeatherStation)