import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { Star } from "lucide-react";
import styled from 'styled-components';

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

  ];

  return (
    <div className="relative max-w-5xl overflow-hidden">
      {/* Left Arrow */}
      {/* <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-md"
        onClick={scrollLeft}
      >
        &#8249;
      </button> */}

      <div >
        {/* <h2 className="text-center text-white text-xl font-semibold mb-6">
          College Vidya has a team of 500+ experts...
        </h2> */}

        <div className="flex items-center justify-center gap-4">
          {/* Left Arrow */}
          {/* <button
          // onClick={handlePrev}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-200"
        >
          <ChevronLeft />
        </button> */}

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {extendedTestimonials.slice(0, 5).map((exp, i) => (
              <div
                key={i}
                className="relative bg-white w-[320px] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Image */}
                <div className=" overflow-hidden">
                  <img
                    src={exp.imageURL}
                    alt={exp.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Rating */}
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-semibold shadow">
                  <Star size={14} className="text-yellow-500" /> {exp.rating}
                </div>

                {/* Counselling */}
                <div className="absolute top-3 right-3 bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold shadow">
                  {exp.counselling} Counselling
                </div>

                {/* Info */}
                <div className="p-4 text-center space-y-2">
                  <div className="flex items-center justify-center gap-[10px]">
                  <h3 className="text-lg font-bold text-gray-800">{exp.name}</h3>
                  <p className="text-sm text-gray-600">{exp.experience}</p>
                  </div>
                  <p className="text-sm text-blue-600 mb-2 font-medium">
                    {exp.role}{" "}
                  </p>
                    <span className="text-gray-500 font-normal">({exp.degree})</span>

                  {/* Button */}
                  <Link to="counseller">
                    <StyledWrapper className="w-[100%] mx-auto">
                      <button

                        //  onClick={handleModalOpen}
                        className="button w-full">
                        REGISTER
                      </button>
                    </StyledWrapper>
                  </Link>
                </div>
              </div>
            ))}
          </div>


          {/* Right Arrow */}
          {/* <button
          // onClick={handleNext}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-200"
        >
          <ChevronRight />
        </button> */}
        </div>

        {/* View All */}

      </div>

      {/* Right Arrow */}
      {/* <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800 text-white p-2 rounded-full shadow-md"
        onClick={scrollRight}
      >
        &#8250;
      </button> */}
    </div>
  );
};

const StyledWrapper = styled.div`
.button {
 --color: #264790 ;
 padding: 0.5em 1.3em;
 background-color: transparent;
 border-radius: .3em;
 position: relative;
 overflow: hidden;
 cursor: pointer;
 transition: .5s;
 font-weight: 500;
 font-size: 14px;
 border: 2px solid;
 font-family: inherit;
//  text-transform: uppercase;
 color: var(--color);
//  font-weight: 700;     
 z-index: 1;
}

.button::before, .button::after {
 content: '';
 display: block;
 width: 50px;
 height: 50px;
 transform: translate(-50%, -50%);
 position: absolute;
 border-radius: 50%;
 z-index: -1;
 background-color: var(--color);
 transition: 1s ease;
}

.button::before {
 top: -1em;
 left: -1em;
}

.button::after {
 left: calc(100% + 1em);
 top: calc(100% + 1em);
}

.button:hover::before, .button:hover::after {
 height: 410px;
 width: 410px;
}

.button:hover {

 color: rgb(255, 255, 255);
}

.button:active {
 filter: brightness(.8);
}`;
export default Gallery;
