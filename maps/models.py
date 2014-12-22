from django.contrib.gis.db import models


class Area(models.Model):
    name = models.CharField(max_length=100)
    poly = models.PolygonField()
    created_at = models.DateTimeField(auto_now_add=True)
    objects = models.GeoManager()
