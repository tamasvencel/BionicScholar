import os
from .settings import *
from .settings import BASE_DIR

ALLOWED_HOSTS = [os.environ.get("WEBSITE_HOSTNAME")]
CSRF_TRUSTED_ORIGINS = ["https://" + os.environ.get("WEBSITE_HOSTNAME")]
DEBUG = False
CORS_ALLOW_ALL_ORIGINS = False

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware"
]

CORS_ALLOWED_ORIGINS = [
    "https://bionicscholar-frontend-arfrffe7f3c6b8fz.germanywestcentral-01.azurewebsites.net",
    f"https://{os.environ.get("WEBSITE_HOSTNAME")}"
]

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

CORS_ALLOW_CREDENTIALS = True

SERVE_MEDIA = True