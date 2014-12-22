# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='area',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 21, 23, 28, 10, 568380), auto_now_add=True),
            preserve_default=False,
        ),
    ]
