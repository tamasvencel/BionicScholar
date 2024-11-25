import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import axios from 'axios';

export const useUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [generating, setGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [webSocketEndpoint, setWebSocketEndpoint] = useState<string | null>(null);

  const [stepMessage, setStepMessage] = useState();

  const { lastJsonMessage, getWebSocket, sendJsonMessage } = useWebSocket(webSocketEndpoint, {
    onOpen: () => {
      console.log('WebSocket connection opened');
      setGenerating(true);
    },
    onClose: () => {
      console.log('WebSocket connection closed');
      setGenerating(false);
    },
    onError: (error) => {
      console.error('WebSocket error:', error);
      setGenerating(false);
    },
    onMessage: (message) => {
      const data = JSON.parse(message.data);
      console.log('WebSocket message received:', data);

      if (data.type === 'progress') {
        setStepMessage(data.message.message);
      }

      if (data.type === 'completed') {
        setStepMessage(data.message); // Update step message to show completion
        setPdfUrl(`http://127.0.0.1:8000${data.pdf_url}`); //
      }
    },
    share: true,
  });

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.type === 'completed') {
        setWebSocketEndpoint(null);
        setGenerating(false);
      }
    }
  }, [lastJsonMessage]);

  const validateFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      setErrorMessage('Only PDF files are allowed.');
      return false;
    }
    setErrorMessage('');
    setSelectedFile(file);
    return true;
  };

  const handleFileSelected = (file: File) => {
    validateFile(file);
  };

  const handleUpload = async (isToggled: boolean) => {
    setIsUploading(true);

    try {
      console.log('Sending toggle state:', { isBionicReadingEnabled: isToggled });

      if (!selectedFile) return;

      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log('Uploading file:', selectedFile.name);

      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Optional; axios sets this automatically
      });

      const fileName = selectedFile.name;
      console.log(fileName);

      if (response.status >= 200 && response.status < 300) {
        setWebSocketEndpoint(`ws://localhost:8000/ws/research_papers/${fileName}/`);
        sendJsonMessage({ type: 'pdf_analyzer', bionic_reading: isToggled });
      }
    } catch (error) {
      console.error('Error during the operation:', error);
    } finally {
      setIsUploading(false);
      getWebSocket()?.close();
    }
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const anchor = document.createElement('a');
      anchor.href = pdfUrl;
      anchor.download = pdfUrl.split('/').pop() || 'download.pdf';
      anchor.click();
    }
  };

  return {
    selectedFile,
    isUploading,

    downloadPdf,
    errorMessage,
    pdfUrl,
    handleFileSelected,
    handleUpload,
    stepMessage,
    generating,
  };
};
