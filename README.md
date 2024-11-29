# BionicScholar

Welcome to the **BionicScholar** repository! BionicScholar is a platform designed to simplify and enhance the research reading experience by **summarizing research papers** and applying **Bionic Reading** techniques for easier comprehension.

## Table of Contents

- [Overview](#overview)

- [Features](#features)

- [Tech Stack](#tech-stack)

- [Installation](#installation)

- [Frontend Installation](#frontend-installation)

- [Backend Installation](#backend-installation)

## Overview

The **BionicScholar** platform consists of both the frontend (user interface) and the backend (API services). The frontend allows users to upload research papers (PDFs), view concise summaries, and read using **Bionic Reading**, while the backend provides the summarization service and text processing via a **Large Language Model (LLM)**.

Bionic Reading is a technique that enhances reading speed and retention by bolding key letters within words, improving focus and comprehension

## Features

- **Paper Summarization**: Upload a research paper (PDF) and the platform generates a concise summary of its content.

- **Bionic Reading View**: Users can switch to Bionic Reading mode, which highlights essential portions of the text to enhance readability and focus.

- **LLM-Powered Summarization**: The backend uses a Large Language Model (LLM) to summarize research papers accurately.

- **Responsive UI**: The frontend is fully responsive, optimized for both desktop and mobile devices.

- **RESTful API**: The backend exposes a RESTful API for tasks such as summarization and PDF parsing.

## Tech Stack

### Frontend

- **React.js**: Core library for building the user interface.

- **Tailwind CSS**: Utility-first CSS framework for styling.

- **TypeScript**: Provides static type checking and improved code maintainability.

- **Axios**: Used for making HTTP requests to the backend services.

### Backend

- **Django**: High-level Python web framework for building the backend.

- **Django REST Framework (DRF)**: For building RESTful APIs.

- **Large Language Model (LLM)**: A model integrated into the backend for summarizing research papers.

## Installation

### Prerequisites

1.  **Node.js** (v14 or above) for the frontend.

2.  **npm** or **yarn** as the package manager for the frontend.

3.  **Python** (v3.8 or above) for the backend.

### Frontend Installation

Clone the repository and navigate to the frontend directory:

    git clone https://github.com/tamasvencel/BionicScholar.git

    cd BionicScholar

**Using Docker:**

1.  Build frontend-dev docker image

        docker-compose build frontend-dev

2.  Run frontend-dev docker container

        docker-compose up frontend-dev

Now you can access the frontend via: http://localhost:80/

**Without using docker:**

1. Go into the frontend directory:

   `cd frontend`

2. Install dependencies:

   `yarn install`

3. Start the development server:

   `yarn dev`

Now you can access the frontend via: http://localhost:80/

### Backend Installation

1. Go into the backend directory:

   `cd backend`

2. Create `.env` file for storing environment variables

   `SECRET_KEY = 'your_django_secret_key'`
   `HUGGINGFACE_API_KEY = your_hugging_face_api_key`

3. Go back into root directory:

   `cd ..`

**Using Docker:**

1.  Build backend-dev docker image

        docker-compose build backend-dev

2.  Run backend-dev docker container

        docker-compose up backend-dev

Now your backend is running on http://localhost:8000

**Without using docker:**

1. Navigate to the backend directory:

   `cd backend`

2. Create a virtual environment and activate it:

   `python -m venv venv`
   `venv\Scripts\activate`

3. Install required dependencies:

   `pip install -r requirements.txt`

4. Run migrations:

   `python manage.py migrate`

5. (This is only needed if you don't use Windows operating system)

   **Tesseract OCR**:

   Tesseract is required for Optical Character Recognition (OCR) to process text scanned PDFs. It should be installed in the `backend/app/` folder.

   To install Tesseract, download the executable from the official repository here:

   [Tesseract GitHub Repository](https://github.com/tesseract-ocr/tesseract)

   Set it up to the`backend/app/` folder.

6. Start server:

   `python manage.py runserver`

Now your backend running on http://localhost:8000
