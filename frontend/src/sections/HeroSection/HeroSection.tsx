import { LinkButton } from '../../atoms/Buttons/LinkButton';
import hero from '../../assets/images/hero.png';

export const HeroSection = () => {
  return (
    <section id='home'>
      <div className='flex bg-primary-100 flex-col gap-5  items-center px-4 '>
        <div className='max-w-lg pt-14 flex flex-col justify-center items-center'>
          <h1 className='font-normal text-4xl leading-10'>BionicScolar</h1>
          <p className='font-light text-xl text-center mt-2'>
            A results-driven business dedicated to helping clients achieve their goals
          </p>
          <LinkButton
            to='#services'
            label='View services'
            className='px-4 py-2 mt-4 text-white bg-secondary-600 hover:bg-secondary-700 focus:ring-4 focus:outline-none focus:ring-secondary-300'
          />
        </div>
        <img
          className='h-auto relative -bottom-20 min-w-xs md:max-w-lg shrink rounded-lg'
          src={hero}
          alt='image description'
        />
      </div>
    </section>
  );
};
