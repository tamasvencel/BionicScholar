import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/fileUpload.scss';

function FileUpload() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('upload');
  const [title, setTitle] = useState('Upload your file');
  const [instruction, setInstruction] = useState('Select or drag and drop a file here');
  const [reportFile, setReportFile] = useState('');
  const [excelReportName, setExcelReportName] = useState('');
  const [progressTotalSize, setProgressTotalSize] = useState(0);
  const [stepMessage, setStepMessage] = useState('Step 1/2: processing permit');

  const connectAndDisconnectSocket = (filename: string) => {
    const URL = `ws://localhost:8000/ws/${filename}/`;
    let docType = 'permit';

    const socket = new WebSocket(URL);

    // Connect to the socket
    // socket.onopen = () => {
    //     console.log('Socket connected');
    // };

    // Listen for 'message' event from the server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // updating states based on data type and progress
      if (data.progress === 0) {
        if (docType === 'law') {
          setStepMessage('Step 2/2: processing law');
        }
        setProgressTotalSize(data.message.no_pollutants);
        setProgress(data.progress);
        setInstruction(data.message.message);

        // next time when the progress is 0 it means it processes the law
        docType = 'law';
      } else if (data.type === 'progress') {
        setProgress(data.progress);
        setInstruction(data.message);
      } else if (data.type === 'completed') {
        // convert file to blob
        // Decode base64 string to excel
        const byteCharacters = atob(data.content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Setup the states accordingly (generated version)
        setReportFile(blob);
        setExcelReportName(data.filename);
        setStatus('generated');
        setTitle('Your report is ready!');
        setInstruction('Download report');

        let lastDotOccurence = data.filename.lastIndexOf('.');
        let excelName = data.filename.substring(0, lastDotOccurence);

        // display long names in shortened form
        if (excelName.length > 20) {
          setMessage(excelName.slice(0, 20) + '... .' + data.filename.split('.').slice(-1)[0]);
        } else {
          setMessage(data.filename);
        }

        socket.close();
      }
    };

    socket.onerror = () => {
      setStatus('error');
      setTitle('Error');
      setMessage('An error occurred. Please try again.');
    };

    socket.onclose = (event) => {
      if (!event.wasClean) {
        setStatus('error');
        setTitle('Error');
        setMessage('An error occurred. Please try again.');
      }
      // console.log('Socket disconnected');
    };
  };

  useEffect(() => {
    // set progress when file is generated
    if (status === 'generated') {
      setProgress(progressTotalSize);
    }
  }, [progressTotalSize, status]);

  // upload functionality
  function onFileChange(e) {
    // set file state
    const selectedFile = e.target.files[0];

    // we need to refresh page if we drag and drop from the file upload
    if (!selectedFile) {
      refreshPage();
      return;
    }

    setFile(selectedFile);

    setProgress(0);

    let lastDotOccurence = selectedFile.name.lastIndexOf('.');
    let selectedFileName = selectedFile.name.substring(0, lastDotOccurence);

    // display long names in shortened form
    if (selectedFileName.length > 20) {
      setMessage(selectedFileName.slice(0, 20) + '... .' + selectedFile.name.split('.').slice(-1)[0]);
    } else {
      setMessage(selectedFile.name);
    }

    // start upload progress
    changeProgress(selectedFile);
  }

  function changeProgress(selectedFile) {
    const totalSize = selectedFile.size;
    let loaded = 0;

    // start showing progress on progress bar as the file uploads
    const interval = setInterval(() => {
      loaded += totalSize / 100;
      const percent = Math.round((loaded / totalSize) * 100);
      setProgress(percent);

      // clear the interval and call the fileUploadCompleted function when the file is uploaded
      if (loaded >= totalSize) {
        clearInterval(interval);
        fileUploadCompleted();
      }
    });
  }

  function fileUploadCompleted() {
    // This for file upoad
    setStatus('uploaded');
    setTitle('Upload successful!');
  }

  function handleImageClick() {
    // handle the image click based on the status, upload status means uploading the file,
    // generated means the file is downloadable by clicking on the icon
    if (status === 'upload') {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else if (status === 'generated') {
      handleDownload();
    }
  }

  function handleDownload() {
    // create the appropriate link for downloading the file
    const url = URL.createObjectURL(reportFile);
    const link = document.createElement('a');
    link.href = url;

    // start downloading
    link.setAttribute('download', excelReportName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleDragOver(e) {
    // This is the drag and drop, block all the actions
    // (reupload, upload the placeholder image by mistake)

    if (status !== 'upload') return;

    // prevent browser from opening the file
    e.preventDefault();
    // prevents parent elements from handling the event
    e.stopPropagation();
    // set the drop effect to "copy", visual feedback for the user
    e.dataTransfer.dropEffect = 'copy';
  }

  function handleDrop(e) {
    if (status !== 'upload') return;

    // This is the drag and drop, block all the actions
    // (reupload, upload the placeholder image by mistake)

    // prevent browser from opening the file
    e.preventDefault();
    // prevents parent elements from handling the event
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];

    // create a new DataTransfer and set the dropped file to the input element by referencing
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(droppedFile);
    fileInputRef.current.files = dataTransfer.files;

    // set the necessary states and start uploading and start showing the progress on the progress bar

    let lastDotOccurence = droppedFile.name.lastIndexOf('.');
    let droppedFileName = droppedFile.name.substring(0, lastDotOccurence);

    // display long names in shortened form
    if (droppedFileName.length > 20) {
      setMessage(droppedFileName.slice(0, 20) + '... .' + droppedFile.name.split('.').slice(-1)[0]);
    } else {
      setMessage(droppedFile.name);
    }

    setFile(droppedFile);
    setProgress(0);
    changeProgress(droppedFile);
  }

  function refreshPage() {
    window.location.reload();
  }

  async function onFileUpload(e) {
    // prevent default page reload
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    // create new FormData and append the file to it
    const formData = new FormData();
    formData.append('file', file);

    setStatus('generating');
    setTitle('Your report is being generated!');

    setProgress(0);
    setInstruction('Identifying pollutants');

    // send the upload request using axios
    try {
      // upload the file
      const response = await axios.post('http://localhost:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // connect to websocket and start generating the report
      connectAndDisconnectSocket(response.data.upload_name);
    } catch (error) {
      setStatus('error');

      console.error('Error during file upload:', error);

      // display the proper error message based on the response coming from the server
      if (error.response?.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function () {
          try {
            const responseData = JSON.parse(reader.result);
            setMessage(responseData.file[0] || 'An error occurred while uploading the file.');
          } catch (e) {
            setMessage('An error occurred while processing the server response.');
          }
        };

        // read the error response, onload function starts
        reader.readAsText(error.response.data);
      } else {
        setMessage(error.response?.data?.detail || 'An error occurred while uploading the file.');
      }
    }
  }

  return (
    <div className='upload-box'>
      {/* main title */}
      <div className='upload-text' style={status === 'error' ? { display: 'none' } : {}}>
        {title}
      </div>

      {/* progress text */}
      <div className='progress-text' style={status !== 'generating' ? { display: 'none' } : {}}>
        This might take a few minutes
      </div>

      {/* icon (upload, uploaded, generating, error, download)*/}
      <div
        className={
          status === 'generating' ? 'upload-icon generating' : status === 'error' ? 'error-image' : 'upload-icon'
        }
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <img
          src={`img/${
            status === 'uploaded'
              ? 'upload-successful-icon.png'
              : status === 'generating'
              ? 'generating-icon.png'
              : status === 'generated'
              ? 'download-icon.png'
              : status === 'error'
              ? 'error-icon.png'
              : 'upload-icon.png'
          }`}
          onClick={handleImageClick}
          style={status !== 'upload' && status !== 'error' && status !== 'generated' ? { cursor: 'default' } : {}}
          alt='Upload Icon'
        />
      </div>

      {/* instruction message*/}
      <div
        className='upload-instruction'
        style={status === 'uploaded' || status === 'error' ? { opacity: 0 } : { opacity: 1 }}
      >
        {instruction}
      </div>
      <div className='upload-instruction' style={status === 'generating' ? {} : { display: 'none' }}>
        {stepMessage}
      </div>

      {/* progress bar*/}
      <progress
        id='progressBar'
        value={progress}
        max={`${progressTotalSize}`}
        style={status === 'error' ? { display: 'none' } : {}}
      ></progress>

      {/* message showing file names after upload */}
      {message && <p className='message'>{message}</p>}

      {/* input form for file submission */}
      <div className='upload-input'>
        <form onSubmit={onFileUpload}>
          <input
            name='file'
            type='file'
            ref={fileInputRef}
            accept='.pdf, .docx, .doc'
            onChange={onFileChange}
            required
          />
          <button type='submit' style={status === 'uploaded' ? {} : { display: 'none' }}>
            Generate report
          </button>
        </form>

        {/* back button, refreshes the page */}
        <button
          type='submit'
          style={status === 'uploaded' || status === 'generated' || status === 'error' ? {} : { display: 'none' }}
          onClick={refreshPage}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default FileUpload;
