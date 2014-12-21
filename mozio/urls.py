from django.conf.urls import patterns, include, url
from django.contrib import admin
from maps.views import AreaViewSet
from rest_framework import routers

API_PREFIX = r'api/v1/'

router = routers.DefaultRouter()
router.register(API_PREFIX + r'areas', AreaViewSet)

urlpatterns = patterns(
    '',
    url(r'', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
)
