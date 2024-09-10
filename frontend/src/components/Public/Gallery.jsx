import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTestimonialFetchAllMutation } from "../../slices/adminApiSlice";
import Loader from "../Loader";
import { FetchAllTestimonial } from "../../slices/testimonialSlice";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./Gallery.css"; // Import CSS for animations
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Gallery = ({testimonial,isLoading}) => {




  if (isLoading) {
    return <Loader />;
  }

  // Settings for react-slick carousel
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 1500,
    cssEase: "linear"
  };
  // Handle card click to navigate to CounsellorAll
  const handleCardClick = () => {
    navigate("/counseller"); // Replace with your actual route to CounsellorAll
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {testimonial.map((item, index) => (
          <div key={index} className="testimonial-card" onClick={handleCardClick}>
            <div className="card-content">
              <img src={item.imageURL} alt={item.name} className="card-image" />
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description">{item.description}</p>
              <Rating value={item.rating} readOnly className="card-rating" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Gallery;
