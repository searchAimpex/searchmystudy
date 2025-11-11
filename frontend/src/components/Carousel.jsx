import React, { useState, useEffect } from 'react';
import serbia from '../assets/Serbia.png';
import france from '../assets/france.png';
import Italy from '../assets/Italy.png';
import { motion } from 'framer-motion';

import Lithuania from '../assets/Lithuania.webp';
import RUSSIA from '../assets/Russia.png';
import poland from '../assets/poland.png';
import Latvia from '../assets/Latvia.png';
import Norway from '../assets/Norway.jpg';
import germany from '../assets/germany.png';
import carousel1 from '../assets/1.webp'
import carousel2 from '../assets/2.webp'

import carousel3 from '../assets/3.webp'
import carousel4 from '../assets/4.webp'
import carousel5 from '../assets/5.webp'

import Uzbekistan from '../assets/Uzbekistan.png';

import Ireland from '../assets/Ireland.png';
import UAE from '../assets/UAE.png';
import Canada from '../assets/Canada.png';
// import serbia from '../assets/serbia.png';
// import serbia from '../assets/serbia.png';
// import serbia from '../assets/serbia.png';
// import serbia from '../assets/serbia.png';

const Carousel = ({ interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhone] = useState('');

  const carousel = [
    {
      image: carousel1,
      heading: "Study Medicine Abroad",
      paragraph: "Top medical universities across the globe",
      flags: [
        { src: serbia, name: 'Serbia' },
        { src: Latvia, name: 'Latvia' },
        { src: poland, name: 'Poland' },
        { src: RUSSIA, name: 'Russia' },
        { src: Lithuania, name: 'Lithuania' },
        { src: Italy, name: 'Italy' }
      ]
    },
    {
      image: carousel2,
      heading: "At Low-Cost Ranked Universities!",
      paragraph: "Affordable, globally ranked universities abroad",
      flags: [
        { src: france, name: 'France' },
        { src: germany, name: 'Germany' },
        { src: Uzbekistan, name: 'Uzbekistan' },
        { src: Ireland, name: 'Ireland' },
        { src: UAE, name: 'UAE' },
        { src: Canada, name: 'Canada' }
      ]
    },
    {
      image: carousel3,
      heading: "Honest Counselling | University | Selection | Admission",
      paragraph: "Complete guidance from experts you trust",
      flags: [
        { src: Norway, name: 'Norway' },
        { src: serbia, name: 'Serbia' },
        { src: RUSSIA, name: 'Russia' },
        { src: poland, name: 'Poland' },
        { src: Italy, name: 'Italy' },
        { src: france, name: 'France' }
      ]
    },
    {
      image: carousel4,
      heading: "Pursue Your Dreams with Trusted Universities",
      paragraph: "Start strong with trusted global universities",
      flags: [
        { src: france, name: 'France' },
        { src: germany, name: 'Germany' },
        { src: Uzbekistan, name: 'Uzbekistan' },
        { src: Ireland, name: 'Ireland' },
        { src: UAE, name: 'UAE' },
        { src: Canada, name: 'Canada' }
      ]
    },
    {
      image: carousel5,
      heading: "Global Education, Affordable Tuition",
      paragraph: "Low-cost quality education for everyone",
      flags: [
        { src: france, name: 'France' },
        { src: germany, name: 'Germany' },
        { src: Uzbekistan, name: 'Uzbekistan' },
        { src: Ireland, name: 'Ireland' },
        { src: UAE, name: 'UAE' },
        { src: Canada, name: 'Canada' }
      ]
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carousel.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [interval, carousel.length]);

  const goToSlide = (index) => setCurrentIndex(index);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const leadData = { name, email, phoneNo };
      console.log("Lead submitted:", leadData);
      setName('');
      setEmail('');
      setPhone('');
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <div className='relative w-full   overflow-hidden'>
      {/* Carousel Section */}
      <div className="relative w-full h-full overflow-hidden [@media(max-width:320px)]:h-[250px]">
        <div
          className="flex transition-transform duration-5000 ease-in-out"
          style={{
            width: `${carousel.length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / carousel.length)}%)`,
          }}
        >
          {carousel.map((slide, index) => (
            <motion.div
            // ref={refBanner}
            // initial={{ opacity: 0 }}
            // animate={inViewBanner ? { opacity: 1 } : {}}
            // transition={{ duration: 1 }}
            >
              <div className="w-full  overflow-hidden">
                <img
                  src={slide.image}
                  alt="Country Banner"
                  className="w-full h-full object-cover object-center"
                />
              </div>


            </motion.div>
          ))}
        </div>
        {/* Dots */}
        <div className="absolute bottom-10 sm:bottom-12 md:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
          {carousel.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full cursor-pointer transition-colors duration-300 ${currentIndex === index ? 'bg-white' : 'bg-gray-400'
                }`}
            />
          ))}
        </div>

      </div>
    </div>

  );
};

export default Carousel;
