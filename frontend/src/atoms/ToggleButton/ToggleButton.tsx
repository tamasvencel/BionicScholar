interface ToggleButtonProps {
  isChecked?: boolean;
  label: string;
  className?: string;
  handleToggle?: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ isChecked, className, label, handleToggle }) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input type='checkbox' value='' className='sr-only peer inline-block' />
      <div className="relative w-11 h-6 bg-secondary-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-neutral-800"></div>
      <span className='ms-3 text-sm font-medium text-neutral-900 '>{label}</span>
    </label>
  );
};
