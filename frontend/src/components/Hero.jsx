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
import WhyChoseUs from './Public/WhyChoseUs';
import WebinarSection from './Public/WebinarSection';
import MediaSection from './Public/MediaSection';
const Hero = () => {
  return (
    <div>
       <Carousel />
        <CourseFinder />
        <WhyChoseUs />
        <CountriesSection />
        <ServiceSection />
        <CounsellorSection />
        <TestmonialSection />
        <AboutUsSection />
        <CourseSection />
        <ContactSection />
        <WebinarSection />
        <MediaSection />
    </div>
  );
};

export default Hero;
