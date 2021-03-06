# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-06-23 23:08
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Local',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre_local', models.CharField(max_length=100)),
                ('direccion', models.CharField(max_length=100)),
                ('numero_telefono', models.IntegerField(max_length=12)),
                ('estado', models.BooleanField(default=True)),
                ('email', models.EmailField(max_length=254)),
            ],
            options={
                'verbose_name': 'Local',
                'verbose_name_plural': 'Locals',
            },
        ),
    ]
