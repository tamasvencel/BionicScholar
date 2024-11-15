import os
from django.conf import settings
import shutil
import fitz

from langchain_huggingface import HuggingFaceEndpoint
from langchain_community.document_loaders import PyPDFLoader

class AnalyzeResearchPaper:
    __api_key = os.getenv("HUGGINGFACE_API_KEY")
    __model_name ="meta-llama/Llama-3.2-11B-Vision-Instruct"

    # initialize LLM connection
    __llm = HuggingFaceEndpoint(
        repo_id=__model_name,
        temperature=0.01,
        model_kwargs={"max_length": 4096},
        huggingfacehub_api_token=__api_key
    )

    def __init__(self, filename):
        self.research_paper_file_path = f"research_papers/{filename}.pdf"

    def generate_pdf(self):
        """
        Main method to generate the analyzed pdf.
        """

        pdf_image_paths = self.__load_pdf(file_path=self.research_paper_file_path)
        print(pdf_image_paths)

    def __load_pdf(self, file_path):
        """
        Load PDF
        """

        input_file_path = f"{settings.MEDIA_ROOT}/{file_path}"
        
        # convert pdf pages to images
        output_dir = f"{settings.MEDIA_ROOT}/temp_images/"

        # remove output_dir folder and its content if it already exists
        if os.path.exists(output_dir):
            shutil.rmtree(output_dir)

        os.makedirs(output_dir, exist_ok=True)

        doc = fitz.open(input_file_path)

        image_paths = []
        for page in range(doc.page_count):
            pdf_page = doc.load_page(page)
            # convert it to pixel map
            pix = pdf_page.get_pixmap()
            image_filename = os.path.join(output_dir, f"page_{page + 1}.png")
            pix.save(image_filename)

            image_paths.append(image_filename)

        doc.close()
        return image_paths

    # def __extract_info(self):
    #     messages = [
    #         (
    #             "system",
    #             sysMessage
    #         )
    #     ]

    #     self.__llm.invoke(messages)

    #     result = self.__llm.invoke(humMessage)

    #     return result