export const DragAndDrop = () => (
  <label
    htmlFor='dropzone-file'
    className='flex flex-col items-center justify-center w-full max-w-xl h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
  >
    <div className='flex flex-col gap-4 items-center justify-center pt-5 pb-6'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke-width='1.5'
        stroke='currentColor'
        className='size-10'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z'
        />
      </svg>

      <p className='mb-2 text-sm text-gray-500'>
        <span className='font-semibold'>Click to upload</span> or drag and drop
      </p>
    </div>
    <input id='dropzone-file' type='file' className='hidden' />
  </label>
);
