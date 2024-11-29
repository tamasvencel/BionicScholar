import React from 'react';

interface CardProps {
  src: string;
  title: string;
  subtitle: string;
}

export const Card: React.FC<CardProps> = ({ src, title, subtitle }) => {
  return (
    <div className='w-72 sm:w-80 h-96 bg-white border border-gray-200 rounded-lg shadow hover:scale-105 hover:shadow-lg transition-all ease-in-out hover:cursor-pointer'>
      <div className='h-48'>
        <img className='rounded-t-lg w-full h-full object-cover' src={src} alt={title} />
      </div>
      <div className='p-5'>
        <p className='mb-2 text-xl sm:text-2xl md:text-2xl font-medium tracking-tight text-neutral-900'>{title}</p>
        <p className='mb-3 font-normal text-secondary-600'>{subtitle}</p>
      </div>
    </div>
  );
};
