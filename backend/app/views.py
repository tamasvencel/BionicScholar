from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Doc
from .serializers import ResearchPaperSerializer

from .research_paper_analyzer import AnalyzeResearchPaper

# upload document endpoint
class UploadDocView(APIView):

    def post(self, request):
        """
        Endpoint for uploading and processing .pdf files
        """

        # validate the updated document
        serializer = ResearchPaperSerializer(data=request.data)

        if serializer.is_valid():
            file = serializer.validated_data['file']

            file_name = str(file)[:str(file).rfind(".")]

            researchPaper = Doc(file=file)
            researchPaper.save()

            # temporary (before websocket implementation)
            research_paper_analyzer = AnalyzeResearchPaper(
                filename=file_name
            )
            research_paper_analyzer.generate_pdf()
                
            return Response(
                {
                "message": f"Research paper '{file_name}' successfully uploaded.",
                "file_name": researchPaper.file.name
                }, status=status.HTTP_200_OK)
        
        # if invalid return the errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    