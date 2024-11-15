import { useState } from 'react';
// import axios from 'axios';

export const useUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Upload');
  const [errorMessage, setErrorMessage] = useState('');

  const validateFiles = (files: File[]) => {
    const invalidFiles = files.filter((file) => file.type !== 'application/pdf');
    if (invalidFiles.length > 0) {
      setErrorMessage('Only PDF files are allowed.');
      return false;
    }
    setErrorMessage('');
    setSelectedFiles(files);
    return true;
  };

  const handleFilesSelected = (files: File[]) => {
    validateFiles(files);
  };

  const handleUpload = async (isToggled: boolean) => {
    setIsUploading(true);

    try {
      if (buttonLabel === 'Upload') {
        if (selectedFiles.length === 0) return;

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append('files', file));

        console.log('Uploading files:', formData.getAll('files'));

        // Uncomment when backend is ready:
        // await axios.post('https://your-backend-endpoint/upload', formData, {
        //   headers: { 'Content-Type': 'multipart/form-data' },
        // });

        setButtonLabel('Generate');
      } else if (buttonLabel === 'Generate') {
        console.log('Sending toggle state:', { isBionicReadingEnabled: isToggled });

        // Uncomment when backend is ready:
        // await axios.post('https://your-backend-endpoint/generate', { isBionicReadingEnabled: isToggled });

        alert('Generate request simulated successfully.');
      }
    } catch (error) {
      console.error('Error during the operation:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return { selectedFiles, isUploading, buttonLabel, errorMessage, handleFilesSelected, handleUpload };
};
