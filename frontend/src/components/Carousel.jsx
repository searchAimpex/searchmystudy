import React, { useState, useEffect } from 'react';
import { useGetAllBannerMutation } from '../slices/adminApiSlice';

const Carousel = ({ interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [GetAllBanner, { isLoading, isError }] = useGetAllBannerMutation();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await GetAllBanner().unwrap();
        const bannerImages = response.map((banner) => banner.imageURL);
        setImages(bannerImages);
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };

    fetchBanners();

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (images.length ? (prevIndex + 1) % images.length : 0));
    }, interval);

    return () => clearInterval(slideInterval);
  }, [GetAllBanner, interval, images.length]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading banners</div>;

  return (
    <div className='relative w-full bg-blue-100 h-[480px] overflow-hidden'>
      {/* Carousel Section */}
      <div className='absolute inset-0'>
        {images.length > 0 ? (
          <div
            className="absolute inset-0 transition-transform ease-in-out duration-1000"
            style={{ transform: `translateX(-${currentIndex * 100}%)`, display: 'flex', width: `${images.length * 100}%` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-[480px] object-cover"
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">No banners available</div>
        )}
      </div>
      
      {/* Form Section */}
      <div className='absolute right-[50px] top-[50%] transform -translate-y-1/2 w-1/4 flex flex-col justify-center p-8 bg-white rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold mb-4 text-blue-main text-center'>Join Our Program</h2>
        <form>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
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
