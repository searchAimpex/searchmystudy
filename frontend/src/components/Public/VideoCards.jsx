import React, { useEffect, useState } from 'react';
import { useAllVideoMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getVideo } from '../../slices/videoSlice';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';

export default function VideoCards() {
  const [AllVideo] = useAllVideoMutation();
  const dispatch = useDispatch();
  const { video } = useSelector((state) => state.video);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AllVideo().unwrap();
        dispatch(getVideo(result));
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };
    fetchData();
  }, [AllVideo, dispatch]);

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative overflow-hidden p-6 sm:px-12 lg:px-32 xl:px-[100px]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold text-blue-main">Featured Videos</h2>
        <button 
          className="bg-gold-main text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={() => navigate('/videos')}
        >
          View All
        </button>
      </div>

      {/* React Slick Carousel */}
      <Slider className='m-2' {...settings}>
        {video.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedVideo(item.videoURL)}
            className="relative w-[350px] h-[400px] p-4 m-4 bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative h-[350px] rounded-lg overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${item.videoURL.split('v=')[1]}/0.jpg`}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Play Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-white opacity-90"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Video Name */}
            <h3 className="mt-1 text-blue-main text-lg font-semibold text-center">
              {item.name}
            </h3>
          </div>
        ))}
      </Slider>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden">
            <button 
              onClick={() => setSelectedVideo(null)} 
              className="absolute top-2 right-2 text-black text-4xl cursor-pointer z-10"
            >
              &times;
            </button>
            <iframe
              className="w-full h-[70vh] rounded-lg"
              src={`https://www.youtube.com/embed/${selectedVideo.split('v=')[1]}`}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
