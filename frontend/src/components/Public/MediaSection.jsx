import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchMediaMutation } from "../../slices/adminApiSlice";
import { FetchMedias } from "../../slices/mediaSlice";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function MediaSection() {
  const dispatch = useDispatch();
  const { media } = useSelector((state) => state.media);
  const [FetchMedia] = useFetchMediaMutation();
  const sliderRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchMedia().unwrap();
        dispatch(FetchMedias(result));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch media:", error);
        setError("Failed to load media. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, [FetchMedia, dispatch]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  // 🔄 Auto-scroller effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && sliderRef.current) {
        sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });

        // reset when reaching end
        if (
          sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
          sliderRef.current.scrollWidth
        ) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000); // every 3s

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center mt-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {/* Section Title */}
      <motion.div
        className="flex flex-row items-center space-x-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-blue-main">Media</h2>
        <h2 className="text-3xl md:text-5xl font-bold text-gold-main">
          Coverage
        </h2>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-lg text-center px-3 py-2 font-semibold text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Featured in top publications and media outlets
      </motion.p>

      {loading ? (
        <p className="mt-6 text-lg text-blue-main font-semibold">
          Loading Media Coverage...
        </p>
      ) : error ? (
        <p className="mt-6 text-lg text-red-500 font-semibold">{error}</p>
      ) : (
        <div className="relative mb-12 w-full flex justify-center px-4 sm:px-6">
          <div className="relative w-full max-w-7xl">
            {/* Scroll Buttons */}
            <motion.button
              className="absolute left-2 z-10 top-1/2 -translate-y-1/2 text-3xl text-blue-main rounded-full bg-white shadow-md p-2"
              onClick={scrollLeft}
              whileHover={{ scale: 1.2 }}
            >
              ‹
            </motion.button>

            <motion.button
              className="absolute right-2 z-10 top-1/2 -translate-y-1/2 text-3xl text-blue-main rounded-full bg-white shadow-md p-2"
              onClick={scrollRight}
              whileHover={{ scale: 1.2 }}
            >
              ›
            </motion.button>

            {/* Slider */}
            <div
              ref={sliderRef}
              className="flex space-x-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory py-6"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {media.map((item, idx) => (
                <motion.div
                  key={item._id}
                  onClick={() => handleCardClick(item.articalURL)}
                  className="flex-none snap-start w-[85%] sm:w-[320px] p-4 border rounded-xl bg-white shadow-lg cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.img
                    src={item.imageURL}
                    alt="media"
                    className="w-full h-48 object-cover rounded-lg"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3 className="text-lg font-bold text-blue-main mt-3">
                    {item.title}
                  </h3>
                  <div
                    className="text-sm text-gray-600 mt-2"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

const StyledWrapper = styled.div`
  .button {
    display: block;
    position: relative;
    width: 26px;
    height: 36px;
    margin: 0;
    overflow: hidden;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    border: 0;
  }
`;
