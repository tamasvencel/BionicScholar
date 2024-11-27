import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavLinkAtomProps {
  to: string;
  label: string;
  className?: string;
}

export const NavLinkAtom: React.FC<NavLinkAtomProps> = ({ to, label, className }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (to.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(to);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const target = document.querySelector(to);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(to);
    }
  };

  return (
    <a href={to} className={`px-4 py-2 text-gray-900 hover:text-secondary-600 ${className}`} onClick={handleClick}>
      {label}
    </a>
  );
};
