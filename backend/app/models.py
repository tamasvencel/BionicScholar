from django.db import models

# model for storing research papers
class Doc(models.Model):
    file = models.FileField(upload_to="research_papers/")