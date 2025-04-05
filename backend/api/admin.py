from django.contrib import admin
from .models import UserActivity, Requests, Listing

admin.site.register(UserActivity)
admin.site.register(Requests)
admin.site.register(Listing)