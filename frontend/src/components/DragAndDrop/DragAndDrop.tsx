import React from 'react';

interface DragAndDropProps {
  selectedFiles: File[];
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

export const DragAndDrop: React.FC<DragAndDropProps> = ({ onFilesSelected, disabled, selectedFiles }) => {
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!disabled) {
      const files = Array.from(e.dataTransfer.files);
      onFilesSelected(files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      const files = e.target.files ? Array.from(e.target.files) : [];
      onFilesSelected(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    if (!disabled) e.preventDefault();
  };

  return (
    <label
      htmlFor='dropzone-file'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`flex flex-col items-center cursor-pointer justify-center w-full max-w-md h-64 border-2 ${
        disabled ? 'border-gray-200 bg-gray-100 cursor-not-allowed' : 'border-neutral-900 bg-gray-50 hover:bg-gray-100'
      } border-dashed rounded-lg`}
    >
      <div className='flex flex-col gap-4 items-center justify-center pt-5 pb-6'>
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
        {!disabled && (
          <>
            <p className='mb-2 text-sm text-gray-500'>
              <span className='font-semibold'>Click to upload</span> or drag and drop
            </p>
            {selectedFiles.length > 0 && (
              <p className='text-xs text-gray-500'>{selectedFiles.map((file) => file.name).join(', ')}</p>
            )}
          </>
        )}
      </div>
      <input
        id='dropzone-file'
        type='file'
        className='hidden'
        multiple
        onChange={handleFileChange}
        disabled={disabled}
      />
    </label>
  );
};
