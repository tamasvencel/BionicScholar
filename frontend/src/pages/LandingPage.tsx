import { NavigationMenu } from '../components';
import { AboutSection, HeroSection } from '../sections';
import { ServicesSection } from '../sections/ServicesSection/ServicesSection';

export const LandingPage = () => {
  return (
    <>
      <NavigationMenu />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
    </>
  );
};
