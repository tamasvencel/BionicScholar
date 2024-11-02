import { NavLink } from 'react-router-dom';
import { NavLinkAtom } from '../../atoms';
import { useState } from 'react';
import { HamburgerIcon } from '../../atoms/HamburgerIcon/HamburgerIcon';
import { NAV_LINKS } from '../../utils';

export const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='relative md:flex md:justify-center bg-primary-100'>
      <nav className='flex items-center justify-between p-4 container'>
        <NavLink to='/' className='space-x-3 text-2xl font-semibold'>
          BionicScholar
        </NavLink>

        <div className='hidden md:flex md:justify-center md:items-center md:gap-2'>
          {NAV_LINKS.map((link, index) => (
            <NavLinkAtom to={link.to} label={link.name} key={index} />
          ))}
        </div>
        <NavLink
          to='/upload'
          className='hidden md:inline-block px-4 py-2 text-nowrap text-white bg-secondary-600 hover:bg-secondary-700 focus:ring-4 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm'
        >
          Upload Research Paper
        </NavLink>

        <HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </nav>

      {isOpen && (
        <div className='bg-primary-200 md:hidden py-4 flex flex-col w-full justify-center items-center gap-2'>
          {NAV_LINKS.map((link, index) => (
            <NavLinkAtom to={link.to} label={link.name} key={index} />
          ))}
          <NavLink
            to='/upload'
            className='px-4 py-2 text-nowrap text-white bg-secondary-600 hover:bg-secondary-700 focus:ring-4 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm'
          >
            Upload Research Paper
          </NavLink>
        </div>
      )}
    </header>
  );
};
