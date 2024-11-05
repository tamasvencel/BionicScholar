import { Link } from 'react-router-dom';
import { SocialIcons } from '../../components';

export const Footer = () => {
  return (
    <footer className='bg-neutral-900 min-h-56 p-10'>
      <div className='container max-w-5xl'>
        <div className='flex flex-col md:items-center md:flex-row gap-5  mx-auhref md:gap-4 justify-between'>
          <div className='flex flex-col gap-4'>
            <Link to='/' className='text-white text-2xl font-bold hover:text-primary-500'>
              BionicScholar
            </Link>
            <SocialIcons />
          </div>
          <div className='text-neutral-100 text-normal flex flex-col gap-2 font-light '>
            <a href='#home' className='hover:text-neutral-50'>
              Home
            </a>
            <a href='#about' className='hover:text-neutral-50'>
              About
            </a>
            <a href='services' className='hover:text-neutral-50'>
              Services
            </a>
            <Link to='/upload' className='hover:text-neutral-50'>
              Upload Research Paper
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
