import React from 'react';
import { Facebook, Github, Instagram, Linkedin } from '../../assets';
import { Link } from 'react-router-dom';

const iconStyle = 'w-5 h-5 hover:transform hover:scale-110 transition-transform';

export const SocialIcons: React.FC = () => {
  return (
    <div className='flex gap-2 items-center'>
      <Link to=''>
        <Facebook className={iconStyle} />
      </Link>
      <Link to=''>
        <Instagram className={iconStyle} />
      </Link>
      <Link to=''>
        <Linkedin className={iconStyle} />
      </Link>
      <Link to=''>
        <Github className={iconStyle} />
      </Link>
    </div>
  );
};
