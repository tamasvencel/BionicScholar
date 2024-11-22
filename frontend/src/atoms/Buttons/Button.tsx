import React from 'react';

interface LinkButtonProps {
  to: string;
  label: string;
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ to, label, className }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (to.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(to);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a href={to} className={className} onClick={handleClick}>
      {label}
    </a>
  );
};
