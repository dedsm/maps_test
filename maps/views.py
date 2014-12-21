from .models import Area
from .serializers import AreaSerializer
from rest_framework import viewsets
from django.contrib.gis.geos import Point
from rest_framework.response import Response


class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

    def list(self, request):
        latitude = request.GET.get('lat', None)
        longitude = request.GET.get('long', None)

        if latitude and longitude:
            p = Point([float(longitude), float(latitude)])
            queryset = self.queryset.filter(poly__contains=p)
        else:
            queryset = self.queryset.none()

        serializer = AreaSerializer(queryset, many=True)

        return Response(serializer.data)
