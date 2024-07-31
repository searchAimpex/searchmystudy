import { Container, Card, Button } from 'react-bootstrap';
import Carousel from './Carousel';
import SearchBar from './Public/SearchBar';
import CountriesSection from './Public/CountriesSection';
import ServiceSection from './Public/ServiceSection';
import CounsellorSection from './Public/CounsellorSection';
import TestmonialSection from './Public/TestmonialSection';
import AboutUsSection from './Public/AboutUsSection';
import CourseSection from './Public/CourseSection';
import ContactSection from './Public/ContactSection';
import CourseFinder from './Public/CourseFinder';

const Hero = () => {
  return (
    <div>
       <Carousel />
        <CourseFinder />

        <CountriesSection />
        <ServiceSection />
        <CounsellorSection />
        <TestmonialSection />
        <AboutUsSection />
        <CourseSection />
        <ContactSection />
    </div>
  );
};

export default Hero;
