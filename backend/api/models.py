from django.db import models
from django.contrib.auth.models import User

class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=50, choices=[('login', 'Login'), ('greeting', 'Greeting')])
    date = models.DateField(auto_now_add=True)
    count = models.IntegerField(default=1)

    class Meta:
        indexes = [models.Index(fields=['user', 'date'])]

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

    def __str__(self):  # Fixed typo from _str_ to __str__
        return self.name

class Requests(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    request_name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50)
    condition = models.CharField(max_length=20, choices=[
        ('New', 'New'),
        ('Like New', 'Like New'),
        ('Good', 'Good'),
        ('Fair', 'Fair'),
    ])
    max_price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=100)
    urgency = models.CharField(max_length=20, choices=[
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.request_name} by {self.user.username}"