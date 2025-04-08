import React, { useState, useEffect } from 'react';
import serbia from '../assets/serbia.png';
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
        { src: serbia, name: 'Serbia' },
        { src: serbia, name: 'Russia' },
        { src: serbia, name: 'Serbia' },
        { src: serbia, name: 'Serbia' },
        { src: serbia, name: 'Russia' }
      ]
    },
    {
      image: 'https://www.moksh16.com/assets/images/Desktop_02.webp',
      heading: "At low cost ranked University!",
      flags: [
        { src: serbia, name: 'Serbia' },
        { src: serbia, name: 'Serbia' },
        { src: serbia, name: 'Russia' },
        { src: serbia, name: 'Serbia' },
        { src: serbia, name: 'Serbia' },
        { src: serbia, name: 'Russia' }
      ]
    },
    {
      image: 'https://www.moksh16.com/assets/images/Desktop_01.webp',
      heading: "Honest Counselling | University | Selection | Admission",
      flags: [
        { src: serbia, name: 'Serbia' },
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
                className="w-full h-full object-cover"
              />


              {/* Heading + Flags Wrapper */}
              <div className="absolute top-8 left-80 bg-white bg-opacity-80 p-4 rounded-lg text-white shadow-lg w-[400px]">
                <h2 className="text-2xl font-bold text-black mb-2">{slide.heading}</h2>
                <div className="flex gap-2 flex-wrap">
                  {slide.flags.map((flag, idx) => (
                    <img
                      key={idx}
                      src={flag.src}
                      alt={flag.name}
                      title={flag.name}
                      className="w-16  rounded-sm border"
                    />
                  ))}
                </div>
              </div>


            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
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
      <div className='absolute right-[50px] top-[50%] transform -translate-y-1/2 w-1/4 flex flex-col justify-center p-8 bg-white rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold mb-4 text-blue-main text-center'>Join Our Program</h2>
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
          <div className='mb-4'>
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
