import React, { useState, useEffect } from 'react';
import serbia from '../assets/Serbia.png';
import france from '../assets/france.png';
import Italy from '../assets/Italy.png';
import Lithuania from '../assets/Lithuania.webp';
import RUSSIA from '../assets/Russia.png';
import poland from '../assets/poland.png';
import Latvia from '../assets/Latvia.png';
import Norway from '../assets/Norway.jpg';
import germany from '../assets/germany.png';
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
      image: 'https://www.moksh16.com/assets/images/Desktop_01.webp',
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
      image: 'https://www.moksh16.com/assets/images/Desktop_02.webp',
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
      image: 'https://www.moksh16.com/assets/images/Desktop_01.webp',
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
      image: 'https://www.moksh16.com/assets/images/Desktop_03.webp',
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
      image: 'https://www.moksh16.com/assets/images/Desktop_03.webp',
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
    <div className='relative w-ful   md:h-[600px]  overflow-hidden'>
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
            <div
              key={index}
              className="w-full flex-shrink-0 h-[480px] relative"
              style={{ width: `${100 / carousel.length}%` }}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className={`
                          // default height
    object-cover
    ${currentIndex === index ? 'zoom-animation' : ''}
    object-center
    [@media(max-width:989px)]:object-left
    [@media(max-width:320px)]:h-[250px]   // shorter height for small screens
  `}
              />

              {/* Content Box */}
              <div className="res absolute top-[50px] right-[50px] text-white w-[470px] shadow-xl rounded-[15px] p-6 bg-white rounded">
                <h2 className="text-2xl font-bold text-gold-main mb-2">{slide.heading}</h2>
                <h4 className="text-xl font-semibold text-blue-main ">{slide.paragraph}</h4 >

                Flags
                <div className="flex gap-2 flex-wrap">
                  {slide.flags.map((flag, idx) => (
                    <div key={idx} className="group flex  my-4 flex-col items-center  mx-4 cursor-pointer">
                      <a href="">
                        <img
                          src={flag.src}
                          alt={flag.name}
                          title={flag.name}
                          className="w-[80px] h-[55px] shadow-xl object-cover rounded-sm border-[5px] border-gold-main transition-transform duration-300 group-hover:scale-110"
                        />
                        <p className="text-lg text-center text-black font-medium group-hover:text-red-500 transition-colors duration-300">
                          {flag.name}
                        </p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="absolute bottom-10 sm:bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
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
