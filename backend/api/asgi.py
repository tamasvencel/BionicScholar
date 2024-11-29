"""
ASGI config for api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

from app.routing import websocket_urlpatterns

settings_module = "api.deployment" if "WEBSITE_HOSTNAME" in os.environ else "api.settings"
os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

django_asgi_app = get_asgi_application() 

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
    }
)
