from django.db import models
from django.contrib.auth.models import User

class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=50, choices=[('login', 'Login'), ('greeting', 'Greeting')])
    date = models.DateField(auto_now_add=True)
    count = models.IntegerField(default=1)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'date']),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.activity_type} on {self.date}"