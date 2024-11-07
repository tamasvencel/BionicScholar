from rest_framework import serializers
import magic

class ResearchPaperSerializer(serializers.Serializer):
    # field to handle file uploads
    file = serializers.FileField()

    def validate_file(self, doc):
        # define allowed file extension and mime type
        allowed_ext = ('.pdf')
        allowed_mime = "application/pdf"
        file_name = str(doc)

        if not file_name.lower().endswith(allowed_ext):
            raise serializers.ValidationError("Wrong file extension! Only upload pdf files.")
        
         # Check MIME type based on file content using python-magic-bin
        mime = magic.Magic(mime=True)
        mime_type = mime.from_buffer(doc.read(1024)) # Read a small part of the file to detect MIME type
                
        # Ensure the file is reset for further reading later
        doc.seek(0)

        if mime_type != allowed_mime:
            raise serializers.ValidationError("Invalid file type! The uploaded file is not a valid PDF.")
        
        return doc