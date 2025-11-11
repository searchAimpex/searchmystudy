import React, { useEffect, useState } from 'react';
import { useAllVideoMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import AboutUs from '../../assets/AboutUsHero.png';

export default function Videos() {
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative">
        <motion.img
          src={AboutUs}
          className="w-full h-[300px] object-cover"
          alt="About Us"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className='flex items-center justify-center'>
        <h2 className="absolute bottom-10 left-10 text-blue-main text-4xl font-bold">
          Our Videos
        </h2>
      </div>

      {/* Video Grid */}
      <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {video && video.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedVideo(item.videoURL)}
            className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:shadow-2xl"
          >
            <div className="relative h-64">
              <img
                src={`https://img.youtube.com/vi/${item.videoURL.split('v=')[1]}/0.jpg`} // Thumbnail URL
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-white opacity-90"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Display video name */}
            <div className="p-4">
              <h3 className="text-blue-main text-lg font-semibold text-center">
                {item.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 text-gray-600 text-4xl cursor-pointer z-10"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
