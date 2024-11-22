import axios from 'axios';
import { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import axios from 'axios';

export const useUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Upload');
  const [errorMessage, setErrorMessage] = useState('');

  const [webSocketEndpoint, setWebSocketEndpoint] = useState<string | null>(null);

  const [progressTotalSize, setProgressTotalSize] = useState(0);
  const [stepMessage, setStepMessage] = useState('Step 1/2: processing permit');

  const { sendJsonMessage, lastMessage } = useWebSocket(webSocketEndpoint, {
    onOpen: () => console.log('WebSocket connection opened'),
    onClose: () => console.log('WebSocket connection closed'),
    onError: (error) => console.error('WebSocket error:', error),
    onMessage: (message) => {
      const data = JSON.parse(message.data);
      console.log('WebSocket message received:', data);

      if (data.type === 'progress') {
        setProgressTotalSize(data.totalSize);
      } else if (data.type === 'step') {
        setStepMessage(data.message);
      }
    },
    share: true,
  });

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

        // await axios.post(
        //   'https://your-backend-endpoint/upload',
        //   { formData, isBionicReadingEnabled: isToggled },
        //   {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //   }
        // );

        setButtonLabel('Generate');
      } else if (buttonLabel === 'Generate') {
        console.log('Sending toggle state:', { isBionicReadingEnabled: isToggled });

        // await axios.post('https://your-backend-endpoint/generate', { isBionicReadingEnabled: isToggled });
        // setWebSocketEndpoint('wss://your-backend-endpoint/ws');

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
