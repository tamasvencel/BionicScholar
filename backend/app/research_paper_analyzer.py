import os
from django.conf import settings
import shutil
import fitz
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image
import pytesseract
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import re

from langchain_huggingface import HuggingFaceEndpoint
from langchain_community.document_loaders import PyPDFLoader

class AnalyzeResearchPaper:
    __api_key = os.getenv("HUGGINGFACE_API_KEY")
    __model_name ="meta-llama/Llama-3.2-11B-Vision-Instruct"

    # initialize LLM connection
    __llm = HuggingFaceEndpoint(
        repo_id=__model_name,
        temperature=0.001,
        model_kwargs={"max_length": 4096},
        huggingfacehub_api_token=__api_key
    )

    def __init__(self, filename, bionic_reading=False):
        self.research_paper_file_path = f"research_papers/{filename}.pdf"
        self.bionic_reading = bionic_reading

    def analyzePDF(self):
        """
        Main method to generate the analyzed pdf.
        """

        # Load and process PDF
        pdf_text_or_image_paths, pdf_isReadable = self.__load_pdf(file_path=self.research_paper_file_path)
        
        # Extract text from PDF
        pdf_text = self.__extract_text_from_images(image_paths=pdf_text_or_image_paths) if not pdf_isReadable else pdf_text_or_image_paths
        
        # Extract information from PDF
        analyzed_pdf_text = self.__extract_info(document=pdf_text)

        print(analyzed_pdf_text)

        # Define the output path for the new PDF
        output_pdf_name = os.path.basename(self.research_paper_file_path) # Get the original file name with extension
        output_pdf_name = output_pdf_name[:output_pdf_name.rfind(".")] + "_analyzed.pdf" # Remove extension and add "_analyzed"
        output_pdf_dir = f"{settings.MEDIA_ROOT}/output_pdf"
        output_pdf_path = f"{output_pdf_dir}/{output_pdf_name}"

        
        if not os.path.exists(output_pdf_dir):
            os.makedirs(output_pdf_dir)
        
        self.__generate_pdf_with_bionic_reading(analyzed_pdf_text, output_pdf_path)

        print(f"Analyzed PDF saved at {output_pdf_path}")

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

    def __extract_info(self, document):
        """
        Extract specific information, summarize and optionally apply bionic reading on research paper
        """
        # Extract information based on specific key points
        sys_message = [
            (
                "system",
                f"""
                You are a professional researcher specializing in academic papers. Your role is to extract essential information from research documents and produce a comprehensive summary that distills the core findings, objectives, methods, contributions, and implications while maintaining clarity, precision, and conciseness.

                The key points to capture:
                
                <Research Objective>: Identify and articulate the main research question or hypothesis. What is the central aim or point of the research? 
                <Research Methods and Measurements>: Extract detailed descriptions of the methodologies used, including any experiments, measurements employed in the study.
                <Key Findings and Results>: Highlight the most important findings and results of the research, emphasizing new insights or discoveries. 
                <Conclusions and Implications>: Summarize the conclusions drawn by the researchers and the broader implications of their findings in the context of the field. 
                <Limitations>: Identify any limitations or constraints discussed by the authors, such as sample size, methodological restrictions, or other factors that affect the generalizability of the results. 
                <References to Future Work>: Capture any mention of future research directions or open questions posed by the authors.

                Please provide the response as follows:
                - Only put bullet points (•) to the key point titles <Research Objective>, <Research Methods and Measurements>, <Key Findings and Results>, <Conclusions and Implications>, <Limitations>, <References to Future Work>. All provided key points should be present: <Research Objective>, <Research Methods and Measurements>, <Key Findings and Results>, <Conclusions and Implications>, <Limitations>, <References to Future Work>.
                - Separate each key point with two new line characters.
                - Do not end abruptly, ensure that the response is fully completed without truncating any thoughts or sentences.
                - Each key point section should contain no longer than 10 sentences.
                
                The research paper: {document}
                """
            )
        ]

        key_points = self.__llm.invoke(sys_message)
        
        final_key_points= self.__truncate_text_after_last_period(key_points)
        
        # Summarize the research paper
        hum_message = [
            (
                "human",
                f"""
                Forget everything I have asked you before.
                Create comprehensive summary of the research paper provided below while maintaining clarity, precision, and conciseness.
                
                Please provide the response as follows:
                - Don not use any bullet points, just make the titles bold and format the summary into paragraphs.
                - Your summary should be long with long paragraphs, the summary should be more then 10 pdf pages long (which is more than 30000 characters long)
                - Don not repeat words too much, try to make your summary clear and precise.
                - Do not end the summary abruptly, ensure that the response is fully completed without truncating the end of the summary.
                
                The research paper: {document}
                """
            )
        ]
        
        summary = self.__llm.invoke(hum_message)
        
        final_summary = self.__truncate_text_after_last_period(summary)
        
        result = "\n\n".join([final_key_points, final_summary])
        
        return result
        
    # Fix abruptly ended text
    def __truncate_text_after_last_period(self, text):
        last_period_index = text.rfind(".")
        
        # If a period exists, truncate the text at that point, otherwise return the text as it is.
        if last_period_index != -1:
            return text[:last_period_index + 1]
        return text

    def __generate_pdf_with_bionic_reading(self, input_text, output_pdf_path):
        """
        Generate a PDF with optional bionic reading (bolding first half of words).
        """

        # Create a PDF canvas
        canv = canvas.Canvas(output_pdf_path, pagesize=letter)
        width, height = letter

        # Set the starting position for the text on the page
        x = 72
        y = height - 72

        # Set the font for the PDF
        canv.setFont("Helvetica", 12)

        lines = input_text.splitlines()

        for line in lines:
            words_and_symbols = re.findall(r"\S+|\s", line)

            for word in words_and_symbols:
                if self.bionic_reading and word.strip(): # Only apply to non-whitespace words
                    # Apply bionic reading: bold the first half of the word
                    first_half, second_half = self.__bold_half_of_word(word)

                    # Draw the first half in bold
                    canv.setFont("Helvetica-Bold", 12)
                    canv.drawString(x, y, first_half)

                    # Move the cursor forward by the width of the first half of the word
                    x += canv.stringWidth(first_half, "Helvetica-Bold", 12)

                    # Draw the second half in normal font
                    canv.setFont("Helvetica", 12)
                    canv.drawString(x, y, second_half)

                    # Move the cursor forward by the width of the second half
                    x += canv.stringWidth(second_half, "Helvetica", 12)
                else:
                    # Regular text (no bionic reading applied)
                    canv.setFont("Helvetica", 12)
                    canv.drawString(x, y, word)
                    x += canv.stringWidth(word, "Helvetica", 12)

                # If the word goes beyond the page width, move to the next line
                if x > width - 72:
                    x = 72
                    y -= 14  # Move down by one line
            
            # After processing the line, reset x and move to the next line
            x = 72
            y -= 14  # Move down by one line after finishing a line of text

            # If y position goes off the page, create a new page
            if y < 72:
                canv.showPage()
                canv.setFont("Helvetica", 12)
                x = 72
                y = height - 72

        canv.save()

    def __bold_half_of_word(self, word):
        """
        Bold the first half of the word and return the two parts.
        """
        mid = len(word) // 2
        first_half = word[:mid]
        second_half = word[mid:]
        return first_half, second_half