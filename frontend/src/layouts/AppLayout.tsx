import { PropsWithChildren } from 'react';
import { NavigationMenu } from '../components';
import { Footer } from '../sections';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavigationMenu />
      {children}
      <Footer />
    </>
  );
};
