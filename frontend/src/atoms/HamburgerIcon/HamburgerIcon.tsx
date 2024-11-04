interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='inline-flex flex-col items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
    >
      <span className='sr-only'>Open main menu</span>
      <span className={`block w-6 h-0.5 bg-gray-500 rounded-sm ${isOpen ? 'transform rotate-45 translate-y-0.5 transition-all ease-in-out' : ''}`}></span>
      <span className={`block w-6 h-0.5 bg-gray-500 rounded-sm mt-1 ${isOpen ? 'opacity-0 hidden' : ''}`}></span>
      <span className={`block w-6 h-0.5 bg-gray-500 rounded-sm mt-1 ${isOpen ? 'transform -rotate-45 -translate-y-1 transition-all ease-in-out' : ''}`}></span>
    </button>
  );
};
