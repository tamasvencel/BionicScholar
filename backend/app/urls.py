from django.urls import path
from .views import testLLM

urlpatterns = [
    path("test-llm/", testLLM.as_view(), name="test_llm")
]