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
      heading: "At low cost ranked University!",
      flags: [
        { src: france, name: 'France' },
        { src: germany, name: 'Germany' },
        { src: Uzbekistan, name: 'poland' },
        { src: Ireland, name: 'RUSSIA' },
        { src: UAE, name: 'Lithuania' },
        { src: Canada, name: 'Italy' }
      ]
    },
    {
      image: 'https://www.moksh16.com/assets/images/Desktop_01.webp',
      heading: "Honest Counselling | University | Selection | Admission",
      flags: [
        { src: Norway, name: 'Norway' },
        { src: serbia, name: 'Serbia' },
        { src: serbia, name: 'Russia' },
        { src: serbia, name: 'Serbia' },
        { src: serbia, name: 'Serbia' },
        { src: serbia, name: 'Russia' }
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
    <div className='relative w-full bg-blue-100 h-[480px] overflow-hidden'>
      {/* Carousel Section */}
      <div className="relative w-full h-full overflow-hidden bg-gray-200">
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
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className={`w-full h-full object-cover ${currentIndex === index ? 'zoom-animation' : ''
                  }`}
              />



              {/* Heading + Flags Wrapper */}
              <div className="absolute top-12 left-[500px] text-white w-[400px]">
                <h2 className="text-2xl font-bold text-black mb-2">{slide.heading}</h2>
                <div className="flex gap-2 flex-wrap">
                  {slide.flags.map((flag, idx) => (
                  <div className="group flex flex-col items-center m-2 cursor-pointer">
                 <a href="" >
                   <img
                    src={flag.src}
                    alt={flag.name}
                    title={flag.name}
               className="w-20 h-15 object-cover rounded-sm border transition-transform duration-300 group-hover:scale-110" 
                  />
                  <p className="text-lg text-center  text-black font-medium group-hover:text-red-500 transition-colors duration-300">
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
        <div className="absolute bottom-[65px] left-1/2 transform -translate-x-1/2 flex gap-2">
          {carousel.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              style={{ width: "10px", height: "10px", cursor: "pointer" }}
              className={`rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-white' : 'bg-gray-400'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div className='absolute right-[50px] top-[45%] transform -translate-y-1/2 w-1/4 flex flex-col justify-center p-8 bg-white rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold mb-3 text-blue-main text-center'>Join Our Program</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main'
            />
          </div>
          <div className='mb-3'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNo}
              onChange={(e) => setPhone(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main'
            />
          </div>
          <button
            type="submit"
            className='w-full bg-blue-main text-white font-bold py-2 px-4 rounded-md hover:bg-blue-dark transition duration-300'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Carousel;
