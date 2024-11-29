import React, { useEffect, useState } from 'react';
import { useAllVideoMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getVideo } from '../../slices/videoSlice';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function VideoCards() {
  const [AllVideo] = useAllVideoMutation();
  const dispatch = useDispatch();
  const { video } = useSelector((state) => state.video);
  const [selectedVideo, setSelectedVideo] = useState(null);

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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
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
    <div className="relative overflow-hidden p-6 sm:px-12 lg:px-32 xl:px-[200px] bg-gray-100">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-main  ">
        Featured Videos
      </h2>

      {/* React Slick Carousel */}
      <Slider className='m-2' {...settings}>
        {video.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedVideo(item.videoURL)} // Open modal on click
            className="relative w-full h-64 p-4 m-4 bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div>
                <img
                src={`https://img.youtube.com/vi/${item.videoURL.split('v=')[1]}/0.jpg`} // YouTube thumbnail
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="flex items-center justify-center   p-4 rounded-b-lg">
              <h3 className="text-lg font-semibold text-black">{item.name} sffs</h3>
            </div>
          </div>
        ))}
      </Slider>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 transition-opacity duration-300 opacity-0 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden">
            <button 
              onClick={() => setSelectedVideo(null)} 
              className="absolute top-2 right-2 text-white text-4xl cursor-pointer z-10">&times;</button>
            <iframe
              className="w-full h-[70vh] rounded-lg"
              src={`https://www.youtube.com/embed/${selectedVideo.split('v=')[1]}`} // Embed YouTube video
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
