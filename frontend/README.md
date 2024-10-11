# BionicScholar Frontend

Welcome to the **BionicScholar Frontend** repository! BionicScholar is a platform designed to simplify and enhance the research reading experience by **summarizing research papers** and applying **Bionic Reading** techniques for easier comprehension.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)

## Overview

The **BionicScholar** frontend is the user-facing part of the application. It allows users to upload research papers (PDFs), view concise summaries of the papers, and read the papers using **Bionic Reading**, which highlights key parts of the text to improve reading speed and retention.

Bionic Reading is a method that guides the eyes through text by bolding the first few letters of each word, improving focus and comprehension.

## Features

- **Paper Summarization**: Upload a research paper (PDF), and the platform generates a concise summary of the content.
- **Bionic Reading View**: Users can switch to a Bionic Reading mode, which applies the Bionic Reading technique to enhance readability and focus.
- **Responsive UI**: Fully responsive design, optimized for both desktop and mobile devices.

## Tech Stack

- **React.js**: Core library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **TypeScript**: For static type checking and improved code maintainability.
- **Axios**: For handling HTTP requests to the backend services (summarization and Bionic Reading).

## Installation

### Prerequisites

- Node.js (v14 or above)
- npm or yarn package manager

### Steps to Install

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/tamasvencel/BionicScholar.git
   cd BionicScholar
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. Create an `.env.local` file with any necessary environment variables (e.g., API keys for the summarization service).

4. Start the development server:
   \`\`\`bash
   npm run dev

   # or

   yarn dev
   \`\`\`

5. Visit `http://localhost:3000` in your browser to view the app.

## Usage

1. **Upload a Research Paper**: Users can upload a PDF document of a research paper they want summarized.
2. **View Summaries**: The platform generates a summary of the paper, displaying the key points.
3. **Bionic Reading Mode**: Users can switch to Bionic Reading mode, which highlights essential portions of the text to improve reading speed and comprehension.
