import { NavigationMenu } from '../components';
import { AboutSection, Footer, HeroSection } from '../sections';
import { ServicesSection } from '../sections/ServicesSection/ServicesSection';

export const LandingPage = () => {
  return (
    <>
      <NavigationMenu />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <Footer />
    </>
  );
};
