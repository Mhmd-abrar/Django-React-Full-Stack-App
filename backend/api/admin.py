from django.contrib import admin
from .models import UserActivity, Requests

admin.site.register(UserActivity)
admin.site.register(Requests)