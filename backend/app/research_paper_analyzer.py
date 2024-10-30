import os

from langchain_huggingface import HuggingFaceEndpoint

class analyzeResearchPaper:
    __api_key = os.getenv("HUGGINGFACE_API_KEY")
    __model_name ="meta-llama/Llama-3.2-11B-Vision-Instruct"

    # initialize LLM connection
    __llm = HuggingFaceEndpoint(
        repo_id=__model_name,
        temperature=0.01,
        model_kwargs={"max_length": 4096},
        huggingfacehub_api_token=__api_key
    )

    def askLLM(self, sysMessage, humMessage):
        messages = [
            (
                "system",
                sysMessage
            )
        ]

        self.__llm.invoke(messages)

        result = self.__llm.invoke(humMessage)

        return result