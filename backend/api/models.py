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

class SustainableItem(models.Model):
    CATEGORY_CHOICES = [
        ('clothing', 'Sustainable Clothing'),
        ('home', 'Eco-Friendly Home Goods'),
        ('electronics', 'Recycled Electronics'),
        ('packaging', 'Sustainable Packaging'),
        ('furniture', 'Upcycled Furniture'),
        ('accessories', 'Green Accessories'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    quantity = models.PositiveIntegerField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    def _str_(self):
        return self.name