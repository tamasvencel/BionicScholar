import { Link } from 'react-router-dom';

interface ButtonProps {
  to: string;
  label: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ to, label, className }) => {
  return (
    <Link to={to} className={className}>
      {label}
    </Link>
  );
};
