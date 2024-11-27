import React from 'react';
import { PropagateLoader } from 'react-spinners';
interface DragAndDropProps {
  selectedFile: File | null;
  onFileSelected: (file: File) => void;
  stepMessage: string;
  generating: boolean;
}

export const DragAndDrop: React.FC<DragAndDropProps> = ({ onFileSelected, generating, selectedFile, stepMessage }) => {
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!stepMessage) {
      const file = e.dataTransfer.files[0];
      onFileSelected(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!stepMessage) {
      const file = e.target.files?.[0];
      onFileSelected(file as File);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    if (!generating) e.preventDefault();
  };

  return (
    <label
      htmlFor='dropzone-file'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`flex flex-col p-2 items-center cursor-pointer justify-center w-full max-w-md h-64 border-2 ${
        generating || stepMessage
          ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
          : 'border-neutral-900 bg-gray-50 hover:bg-gray-100'
      } border-dashed rounded-lg`}
    >
      <div className='flex flex-col gap-4 items-center text-center justify-center pt-5 pb-6'>
        {!generating ? (
          stepMessage ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-10 h-10 text-gray-400'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z'
              />
            </svg>
          )
        ) : (
          <span className='p-4'>
            <PropagateLoader loading={true} color='#9ca3af' />
          </span>
        )}
        {stepMessage ? (
          <p className='mb-2 text-sm text-gray-500'>{stepMessage}</p>
        ) : selectedFile ? (
          <p className='mb-2 text-sm text-gray-500'>
            <span className='font-semibold'>Selected file:</span> {selectedFile?.name}
          </p>
        ) : (
          <p className='mb-2 text-sm text-gray-500'>
            <span className='font-semibold'>Click to upload</span> or drag and drop
          </p>
        )}
      </div>
      <input
        id='dropzone-file'
        type='file'
        className='hidden'
        onChange={handleFileChange}
        disabled={stepMessage ? true : false}
      />
    </label>
  );
};
