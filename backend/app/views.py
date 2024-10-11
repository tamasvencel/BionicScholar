from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class TEST(APIView):
    def get(self, request):
        data = {
            "message": "Hello, this is a simple GET response!",
            "status": "success"
        }
        return Response(data, status=status.HTTP_200_OK)