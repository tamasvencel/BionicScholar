from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/research_papers/(?P<room_name>[\w-]+).pdf/$", consumers.socketConsumer.as_asgi()),
]