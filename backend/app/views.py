from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Doc

# test LLM endpoint
class UploadDocView(APIView):

    def post(self, request):
        """
        Endpoint for uploading and processing .pdf files
        """

        file = request.FILES['file']

        file_name = str(file)[:str(file).rfind(".")]

        researchPaper = Doc(file=file)
        researchPaper.save()
             
        return Response(
            {
            "message": f"Research paper '{file_name}' successfully uploaded.",
            "file_name": researchPaper.file.name
            }, status=status.HTTP_200_OK)