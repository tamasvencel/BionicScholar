import { NavLinkAtom } from '../../atoms';
import { NAV_LINKS } from '../../utils';

export const NavigationMenu = () => {
  return (
    <header className='absolute top-3 left-1/2 -translate-x-1/2 flex justify-center'>
      <nav className='flex flex-col gap-7 justify-center items-center'>
        <h1 className='font-bold text-2xl justify-self-center'>BionicScolar</h1>
        <ul className='flex gap-5 items-center justify-center'>
          {NAV_LINKS.map((navLink, index) => {
            return (
              <li key={index}>
                <NavLinkAtom to={navLink.to} label={navLink.name} />
              </li>
            );
          })}
          <li>
            <NavLinkAtom to='/upload' label='Upload Research Paper' className='border border-neutral-900' />
          </li>
        </ul>
      </nav>
    </header>
  );
};
