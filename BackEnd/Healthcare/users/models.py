from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = [
        ('doctor', 'Doctor'),
        ('patient', 'Patient'),
          # Si vous avez un rôle administrateur
    ]
    
    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female')], blank=True)
    email = models.EmailField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='patient')  # Rôle par défaut
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Doctor(User):
    specialization = models.CharField(max_length=255)  # Spécialisation du médecin
    license_number = models.CharField(max_length=50, unique=True)  # Numéro de licence du médecin

    def __str__(self):
        return f"{self.name} - {self.specialization}"

class Patient(User):
    medical_history = models.TextField(blank=True, null=True)  # Historique médical du patient
    date_of_birth = models.DateField(null=True, blank=True)  # Date de naissance du patient

    def __str__(self):
        return self.name
