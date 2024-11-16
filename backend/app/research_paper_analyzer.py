import os
from django.conf import settings
import shutil
import fitz
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image
import pytesseract

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

    def analyzePDF(self):
        """
        Main method to generate the analyzed pdf.
        """

        # Load and process PDF
        pdf_text_or_image_paths, pdf_isReadable = self.__load_pdf(file_path=self.research_paper_file_path)
        
        pdf_text = self.__extract_text_from_images(image_paths=pdf_text_or_image_paths) if not pdf_isReadable else pdf_text_or_image_paths
        
        print(pdf_text)

    def __load_pdf(self, file_path):
        """
        Load PDF
        """

        input_file_path = f"{settings.MEDIA_ROOT}/{file_path}"
        
        # Check if the PDF is readable or scanned
        loader = PyPDFLoader(input_file_path)
        pdf = loader.load_and_split()
        
        if pdf:
            isReadable = True
            
            pdf_text = "\n".join([page.page_content for page in pdf])
            
            return pdf_text, isReadable
        
        # If the pdf is not readable, convert its pages to images
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
        return image_paths, False
    
    def __extract_text_from_images(self, image_paths):
        """
        Distribute the text extraction to several workers for parallel processing.
        """
        extracted_texts = [""] * len(image_paths)
        
        # Use ThreadPoolExecutor for concurrent extraction
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(self.__extract_text_from_a_single_image, data, idx) for idx, data in enumerate(image_paths)]
            
            for future in as_completed(futures):
                text_from_image, image_idx = future.result()
                
                extracted_texts[image_idx] = text_from_image
                
        return "".join([extracted_text for extracted_text in extracted_texts])
    
    def __extract_text_from_a_single_image(self, image_path, image_idx):
        """
        Extract text from a single image using PaddleOCR.
        """

        image = Image.open(image_path)
        
        text_from_image = pytesseract.image_to_string(image)
        
        return text_from_image, image_idx

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