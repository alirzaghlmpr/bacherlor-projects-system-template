# Generated by Django 5.0.1 on 2024-01-12 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_karbar_managers_alter_karbar_groups_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='karbar',
            name='password',
            field=models.CharField(max_length=128, verbose_name='password'),
        ),
    ]