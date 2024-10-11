from django.urls import path
from .views import TEST

urlpatterns = [
    path("test/", TEST.as_view(), name="SimpleName")
]