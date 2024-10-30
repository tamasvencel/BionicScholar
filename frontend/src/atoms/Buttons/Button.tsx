import { Link } from 'react-router-dom';

interface ButtonProps {
  to: string;
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ to, label }) => {
  return (
    <Link to={to} className='bg-secondary text-white py-4 px-8'>
      {label}
    </Link>
  );
};
