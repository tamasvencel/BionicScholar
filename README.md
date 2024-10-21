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

1.  Clone the repository and navigate to the frontend directory:

    git clone https://github.com/tamasvencel/BionicScholar.git
    cd BionicScholar
    cd frontend

2.  Install dependencies:
    yarn install

3.  Create an `.env.local` file with any necessary environment variables for the frontend (e.g., API endpoint URLs).
4.  Start the development server:

        yarn dev

5.  Visit `http://localhost:3000` in your browser to view the app.

### Backend Installation

1.  Navigate to the backend directory:

        cd BionicScholar
        cd backend

2.  Create a virtual environment and activate it:
    python -m venv venv
    venv\Scripts\activate

3. Install required dependencies:
    pip install -r requirements.txt

4. Run migrations:
    python manage.py migrate

5. Start server:
    python manage.py runserver
