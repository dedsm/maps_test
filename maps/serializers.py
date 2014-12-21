from .models import Area
from rest_framework import serializers
import json


class AreaSerializer(serializers.ModelSerializer):

    def to_representation(self, obj):
        representation = super(AreaSerializer, self).to_representation(obj)

        representation['poly'] = json.loads(obj.poly.json)

        return representation

    def to_internal_value(self, data):
        data = super(AreaSerializer, self).to_internal_value(data)
        data['poly'] = json.dumps(data['poly'])
        return data

    class Meta:
        model = Area
