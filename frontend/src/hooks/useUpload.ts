import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import axios from 'axios';
import { ROUTES } from '../utils';

export const useUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [generating, setGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [stepMessage, setStepMessage] = useState<string | null>(null);

  const [webSocketEndpoint, setWebSocketEndpoint] = useState<string | null>(null);

  const { lastJsonMessage, getWebSocket, sendJsonMessage } = useWebSocket(webSocketEndpoint, {
    onOpen: () => {
      setGenerating(true);
    },
    onClose: () => {
      setGenerating(false);
      setSelectedFile(null);
    },
    onError: (error) => {
      console.error('WebSocket error:', error);
      setGenerating(false);
    },
    onMessage: (message) => {
      const data = JSON.parse(message.data);

      if (data.type === 'progress') {
        setStepMessage(`Step ${data.progress + 1}/3: ${data.message.message}`);
      }

      if (data.type === 'completed') {
        setStepMessage(data.message);
        setPdfUrl(ROUTES.PDF_URL(data.pdf_url)); //
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

  const handleGenerate = async (isToggled: boolean) => {
    try {
      if (!selectedFile) return;

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(ROUTES.UPLOAD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const fileName = selectedFile.name;

      if (response.status >= 200 && response.status < 300) {
        setWebSocketEndpoint(ROUTES.WEBSOCKET(fileName));
        sendJsonMessage({ type: 'pdf_analyzer', bionic_reading: isToggled });
      }
    } catch (error) {
      console.error('Error during the operation:', error);
    } finally {
      getWebSocket()?.close();
    }
  };

  const downloadPdf = () => {
    setStepMessage(null);
    setSelectedFile(null);
    setPdfUrl(null);
  };

  return {
    selectedFile,
    downloadPdf,
    errorMessage,
    pdfUrl,
    handleFileSelected,
    handleGenerate,
    stepMessage,
    generating,
  };
};
