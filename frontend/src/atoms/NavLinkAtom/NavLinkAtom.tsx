import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils';

interface NavLinkAtomProps {
  to: string;
  label: string;
  className?: string;
}

export const NavLinkAtom: React.FC<NavLinkAtomProps> = ({ to, label, className }) => {
  return (
    <NavLink
      className={cn('p-4 hover:bg-neutral-100 font-normal text-lg text-neutrals-700 hover:text-ne', className)}
      to={to}
    >
      {label}
    </NavLink>
  );
};
