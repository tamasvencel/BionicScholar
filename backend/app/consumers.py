from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json
from app.research_paper_analyzer import AnalyzeResearchPaper

class socketConsumer(WebsocketConsumer):
    def connect(self):
        """
        Called on socket handshake, part of the connection process.
        """
        self.group_name = self.scope['url_route']['kwargs']['room_name']
        self.bionic_reading = False  # Default to False if not provided later

        # Join group
        async_to_sync(self.channel_layer.group_add)(
            self.group_name, self.channel_name
        )

        # Accept the WebSocket connection
        self.accept()

    def disconnect(self, close_code):
        """
        Called when the WebSocket connection closes.
        """
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name, self.channel_name
        )

    def receive(self, text_data):
        """
        Handle incoming messages from the WebSocket.
        """
        data = json.loads(text_data)
        if "bionic_reading" in data:
            self.bionic_reading = data["bionic_reading"]

        # Trigger PDF analysis when appropriate
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                "type": "pdf_analyzer",
                "bionic_reading": self.bionic_reading
            }
        )

    def pdf_analyzer(self, event):
        """
        Function to generate the custom PDF and send progress updates.
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
        Send progress updates to the WebSocket.
        """
        self.send(text_data=json.dumps({
            "type": "progress",
            "message": message,
            "progress": progress
        }))

    def send_completed_message(self, message, pdf_url, progress):
        """
        Send completion updates to the WebSocket.
        """
        self.send(text_data=json.dumps({
            "type": "completed",
            "message": message,
            "pdf_url": pdf_url,
            "progress": progress
        }))