import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from app.research_paper_analyzer import AnalyzeResearchPaper

class socketConsumer(WebsocketConsumer):
    def connect(self):
        """
        Called on socket handshake, part of the connection process.
        """

        self.group_name = self.scope['url_route']['kwargs']['room_name']

        # Join group
        async_to_sync(self.channel_layer.group_add)(
            self.group_name, self.channel_name
        )

        # Accept websocket connection
        self.accept()

        # Send a message to the group to start the research paper analyzation
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                "type": "pdf_analyzer",
                "bionic_reading": False
            }
        )

    def disconnect(self, close_code):
        """
        Called when the websocket connection closes.
        """
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name, self.channel_name
        )

    def pdf_analyzer(self, event):
        """
        Function to generate the custom pdf and send progress updates.
        """

        bionic_reading = event.get("bionic_reading", False)

        AnalyzeResearchPaper(
            self.group_name, 
            self.send_progress_message, 
            self.send_completed_message,
            bionic_reading=bionic_reading
            ).analyzePDF()

    def send_progress_message(self, message, progress):
        """
        Function to send a progress and message.
        """
        self.send(text_data=json.dumps({
            "type": "progress",
            'message': message,
            "progress": progress
        }))

    def send_completed_message(self, message, pdf_url, progress):
        """
        Function to filename and its content.
        """
        self.send(text_data=json.dumps({
            "type": "completed",
            "message": message,
            "pdf_url": pdf_url,
            "progress": progress
        }))