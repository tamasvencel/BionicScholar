import React from 'react';
interface NavLinkAtomProps {
  to: string;
  label: string;
  className?: string;
}

export const NavLinkAtom: React.FC<NavLinkAtomProps> = ({ to, label, className }) => {
  return (
    <a className={`px-4 py-2 text-gray-900 hover:text-secondary-600 ${className}`} href={to}>
      {label}
    </a>
  );
};
