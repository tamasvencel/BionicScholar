from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .research_paper_analyzer import analyzeResearchPaper

# test LLM endpoint
class testLLM(APIView):
    def post(self, request):

        sys_message = request.data.get("sysMessage")
        hum_message = request.data.get("humMessage")

        if not sys_message or not hum_message:
            return Response({
                "error": "Both 'sysMessage' and 'humMessage' are required."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        analyzer = analyzeResearchPaper()

        try:
            result = analyzer.askLLM(sys_message, hum_message)
        except Exception as e:
            return Response({
                "error": f"Error while communicating with LLM: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
             
        return Response(
            {
            "response": result, 
            }, status=status.HTTP_200_OK)