from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], blank=True)  # Adding gender field

    email = models.EmailField(max_length=255, unique=True)  # Utiliser EmailField pour une meilleure validation
    password = models.CharField(max_length=255)  # Ce champ n'est pas nécessaire, mais laissé ici pour la référence
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # Numéro de téléphone
    age = models.PositiveIntegerField(null=True, blank=True)  # Ajout de l'âge
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
