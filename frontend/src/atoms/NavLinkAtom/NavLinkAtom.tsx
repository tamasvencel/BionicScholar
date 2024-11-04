import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavLinkAtomProps {
  to: string;
  label: string;
  className?: string;
}

export const NavLinkAtom: React.FC<NavLinkAtomProps> = ({ to, label, className }) => {
  return (
    <NavLink className={`px-4 py-2 text-gray-900 hover:text-secondary-600 ${className}`} to={to}>
      {label}
    </NavLink>
  );
};
