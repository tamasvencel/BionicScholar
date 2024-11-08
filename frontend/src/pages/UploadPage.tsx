import { ToggleButton } from '../atoms/ToggleButton/ToggleButton';
import { DragAndDrop } from '../components';
import { AppLayout } from '../layouts';

export const UploadPage = () => {
  return (
    <AppLayout>
      <section className='p-4 md:p-0 h-screen flex justify-center bg-primary-100'>
        <div className='container flex flex-col items-center gap-10'>
          <div className='mt-20 max-w-xl text-center flex flex-col gap-4'>
            <h1 className='font-normal text-4xl leading-10'>Transform Your Research Reading with BionicScholar</h1>
            <h3 className='font-light text-xl text-center'>
              Upload your document to receive concise summaries and enhanced readability through Bionic Reading
              techniques, making comprehension easier and faster.
            </h3>
          </div>
          <div className='flex flex-col gap-2 w-full max-w-xl'>
            <ToggleButton label='Bionic Reading' className='justify-end' />
            <DragAndDrop />
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
