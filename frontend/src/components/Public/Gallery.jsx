import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const Gallery = ({ testimonial, isLoading }) => {
  const cardsPerView = 3; // Number of cards to show at a time
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const autoScrollInterval = 3000; // 3 seconds for auto-scroll

  // Handle card click to navigate to CounsellorAll
  const handleCardClick = () => {
    navigate("/counseller");
  };

  // Handle sliding the carousel manually
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth / cardsPerView, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth / cardsPerView, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        scrollRight();
      }
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // Duplicate the cards to create the infinite loop effect
  const extendedTestimonials = [
    ...testimonial.slice(-cardsPerView),
    ...testimonial,
    ...testimonial.slice(0, cardsPerView),
  ];

  return (
    <div className="relative max-w-5xl overflow-hidden">
      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-md"
        onClick={scrollLeft}
      >
        &#8249;
      </button>

      {/* Carousel Container */}
      <div
        className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        ref={carouselRef}
      >
        {extendedTestimonials.map((item, index) => (
            <div
            key={index}
            onClick={handleCardClick}
            className="flex-none snap-start cursor-pointer transition-transform transform hover:scale-105 shadow-md rounded-lg bg-white overflow-hidden hover:shadow-xl duration-300 w-[250px] sm:w-[300px]"
          >
            <img
              src={item.imageURL}
              alt={item.name}
              className="w-full h-[220px] object-contained rounded-t-lg"
            />
            <div className="p-3 flex flex-col justify-between h-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                {item.description}
              </p>
              <div className="flex items-center mt-auto">
                <span className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 ${
                        i < item.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.25L14.142 8.356l6.194.898-4.47 4.377 1.056 6.158L12 16.88l-5.922 3.736 1.056-6.158-4.47-4.377 6.194-.898L12 2.25z" />
                    </svg>
                  ))}
                </span>
              </div>
            </div>
          </div>
    
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800 text-white p-2 rounded-full shadow-md"
        onClick={scrollRight}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Gallery;
