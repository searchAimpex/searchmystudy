import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Calendar, BookOpen, Award, Mail, LinkedinIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useAllCounsellorMutation } from '../../slices/adminApiSlice';
import { getCounsellor } from '../../slices/counsellorSlice';

const VerticalCardsSlider = () => {
  const dispatch = useDispatch();
  const [AllCounsellor] = useAllCounsellorMutation();
  const { counsellors } = useSelector((state) => state.counsellor);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AllCounsellor().unwrap();
        dispatch(getCounsellor(result));
      } catch (error) {
        console.error("Failed to fetch counsellor:", error);
      } finally {
        setLoading(false);  // Data fetch completed, regardless of success or failure
      }
    };
    fetchData();
  }, [AllCounsellor, dispatch]);

  useEffect(() => {
    if (!isHovered && counsellors.length > 0) {
      const interval = setInterval(handleNext, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered, counsellors]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % counsellors.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + counsellors.length) % counsellors.length);
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  // Handle loading state
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Safeguard to handle empty counsellor data
  if (!counsellors || counsellors.length === 0) {
    return <div className="text-center">No Review data available.</div>;
  }

  return (
    <div 
    className="relative w-[100%] mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8"
    onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
        <motion.div 
          className="h-full bg-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / counsellors.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="relative h-[450px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full h-full"
          >
            <div className="w-[90%] h-[100%] p-6 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center justify-start h-full space-y-2">
                {/* Profile Image Section */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-indigo-100 shadow-xl">
                    <img
                      src={counsellors[currentIndex]?.imageURL}
                      alt={counsellors[currentIndex]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Name and Rating */}
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  {counsellors[currentIndex]?.name}
                </h3>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  {counsellors[currentIndex]?.course}
                </h3>
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < (counsellors[currentIndex]?.rating || 4) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                
          
                
                {/* Content Sections */}
                <div className="w-full flex-grow overflow-y-auto">
                  {/* Content based on activeTab */}
                  {activeTab === 'about' && <p>{counsellors[currentIndex]?.experience || 'No bio available'}</p>}
                  {/* Add similar blocks for 'experience' and 'contact' */}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center z-10 justify-between px-4">
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default VerticalCardsSlider;
