import { ToggleButton } from '../atoms/ToggleButton/ToggleButton';
import { DragAndDrop } from '../components';
import { AppLayout } from '../layouts';
import { useState } from 'react';
import { useUpload } from '../hooks/useUpload';

export const UploadPage = () => {
  const { selectedFiles, isUploading, buttonLabel, errorMessage, handleFilesSelected, handleUpload } = useUpload();
  const [isToggled, setIsToggled] = useState(false);

  // Drag-and-Drop should be disabled after a successful upload
  const isDragAndDropDisabled = buttonLabel === 'Generate';

  return (
    <AppLayout>
      <section className='p-4 md:p-0 min-h-screen h-full flex justify-center bg-primary-100'>
        <div className='container flex flex-col items-center gap-10'>
          <div className='mt-20 max-w-xl text-center flex flex-col gap-4'>
            <h1 className='font-normal text-4xl leading-10'>Transform Your Research Reading with BionicScholar</h1>
            <h3 className='font-light text-xl text-center'>
              Upload your document to receive concise summaries and enhanced readability through Bionic Reading
              techniques, making comprehension easier and faster.
            </h3>
          </div>
          <div className='flex flex-col items-center gap-4 w-full md:max-w-md'>
            <div className='max-w-md w-full flex flex-col gap-2'>
              <ToggleButton isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} className='justify-end' />
              {errorMessage && <div className='text-red-500 text-sm mt-2'>{errorMessage}</div>}
              <DragAndDrop
                onFilesSelected={handleFilesSelected}
                disabled={isDragAndDropDisabled}
                selectedFiles={selectedFiles}
              />
            </div>
            <button
              onClick={() => handleUpload(isToggled)}
              disabled={isUploading || (buttonLabel === 'Upload' && selectedFiles.length === 0)}
              className={`w-auto px-6 py-2 rounded-lg text-white ${
                isUploading || (buttonLabel === 'Upload' && selectedFiles.length === 0)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-neutral-600 hover:bg-neutral-700'
              }`}
            >
              {isUploading ? 'Processing...' : buttonLabel}
            </button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
