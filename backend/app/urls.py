from django.urls import path
from .views import UploadDocView

urlpatterns = [
    path("upload/", UploadDocView.as_view(), name="UploadResearchPaper")
]