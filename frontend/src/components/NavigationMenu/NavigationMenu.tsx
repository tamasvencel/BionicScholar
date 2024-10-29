import { NavLink } from 'react-router-dom';

export const NavigationMenu = () => {
  return (
    <header className='flex justify-center'>
      <nav className='flex flex-col gap-7 justify-center items-center'>
        <h1 className='font-bold text-2xl justify-self-center'>BionicScolar</h1>
        <ul className='flex gap-5 '>
          <li className='p-4'>
            <NavLink className='font-normal text-lg text-neutrals-700 hover:text-ne' to='/'>
              Home
            </NavLink>
          </li>
          <li className='p-4'>
            <NavLink className='font-normal text-lg text-neutrals-700' to='#'>
              About
            </NavLink>
          </li>
          <li className='p-4'>
            <NavLink className='font-normal text-lg text-neutrals-700' to='#'>
              Services
            </NavLink>
          </li>
          <li className='p-4 border-2 border-neutral-900'>
            <NavLink className='font-medium text-lg text-neutrals-900 ' to='/upload'>
              Upload Research Paper
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
