from django.db import models
from django.contrib.auth.models import AbstractUser

class karbar(AbstractUser):
    is_professor = models.BooleanField(default=False)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='karbar_groups',  # Use a unique related_name
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='karbar_permissions',  # Use a unique related_name
    )

    # Add your custom fields here
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.username