import { cn } from '../../utils';

interface ToggleButtonProps {
  isToggled: boolean;
  onToggle: () => void;
  className?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ isToggled, onToggle, className }) => {
  return (
    <label className={cn('inline-flex items-center cursor-pointer mt-4', className)}>
      <input type='checkbox' className='sr-only peer' checked={isToggled} onChange={onToggle} />
      <div
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
          isToggled ? 'bg-neutral-600' : 'bg-gray-300'
        } peer-focus:ring-4 peer-focus:ring-neutral-400`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 transform ${
            isToggled ? 'translate-x-full' : ''
          }`}
        />
      </div>
      <span className='ml-3 text-sm font-medium text-gray-900'>Bionic Reading</span>
    </label>
  );
};
