from django.db import models
from django.utils.timezone import now
from django.core.exceptions import ValidationError

class User(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Admin'),
    ]
    username = models.CharField(max_length=20)
    email = models.EmailField()
    password = models.CharField(max_length=20)
    role = models.CharField(max_length=5, choices=ROLE_CHOICES, default='user')
    
    def __str__(self):
        return self.username

class Task(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    ]
    title = models.CharField(max_length=50)
    description = models.TextField()
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    assigned_to = models.ForeignKey('User', on_delete=models.CASCADE)
    due_date_time = models.DateTimeField()
    start_date_time = models.DateTimeField()
    
    def clean(self):
        super().clean()
        if self.due_date_time <= self.start_date_time:
            raise ValidationError('Due date must be after the start date.')

    def save(self, *args, **kwargs):
        self.clean()  # Call the clean method to validate before saving
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.title
