from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserActivity

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]  # Removed password field since it's not needed for profile
        # Removed create method since it's handled by CreateUserView

class UserActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivity
        fields = ['date', 'count']