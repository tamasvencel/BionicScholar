import { Button } from '../../atoms/Buttons/Button';

export const HeroSection = () => {
  return (
    <section className='h-screen bg-primary'>
      <div className='flex justify-center items-center '>
        <div className='max-w-[680px] flex flex-col justify-center items-center gap-5 pt-40'>
          <h1 className='font-normal text-6xl leading-10'>BionicScolar</h1>
          <p className='font-light text-3xl text-center'>
            A results-driven business dedicated to helping clients achieve their goals
          </p>
          <Button to='#services' label='View services' />
        </div>
      </div>
    </section>
  );
};
