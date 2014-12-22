from .models import Area
from .serializers import AreaSerializer
from rest_framework import viewsets
from django.contrib.gis.geos import Point
from rest_framework.response import Response


class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

    def list(self, request):
        # TODO: fail gracefully
        latitude = request.GET.get('lat', None)
        longitude = request.GET.get('long', None)
        last = request.GET.get('last', None)

        if latitude and longitude:
            # Search for Areas that contain this coordinates
            p = Point([float(longitude), float(latitude)])
            queryset = self.queryset.filter(poly__contains=p)
        elif last:
            # Send the last n Areas created
            queryset = self.queryset.order_by('-created_at')[:int(last)]
        else:
            # If no params were sent, we return empty
            queryset = self.queryset.none()

        serializer = AreaSerializer(queryset, many=True)

        return Response(serializer.data)
