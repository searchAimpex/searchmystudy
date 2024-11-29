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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AllCounsellor().unwrap();
        dispatch(getCounsellor(result));
      } catch (error) {
        console.error("Failed to fetch counsellor:", error);
      }
    };
    fetchData();
  }, [AllCounsellor, dispatch]);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % counsellors.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + counsellors.length) % counsellors.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const progressWidth = ((currentIndex + 1) / counsellors.length) * 100;

  return (
    <div 
      className="relative w-[500px] mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
        <motion.div 
          className="h-full bg-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: `${progressWidth}%` }}
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
            <div className="w-full h-full p-6 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center justify-start h-full space-y-6">
                {/* Profile Image Section */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-indigo-100 shadow-xl">
                    <img
                      src={counsellors[currentIndex]?.imageURL}
                      alt={counsellors[currentIndex]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div
                    className="absolute -bottom-2 -right-2 bg-indigo-500 rounded-full p-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </motion.div>
                </motion.div>

                {/* Name and Rating */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center space-y-2"
                >
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                    {counsellors[currentIndex]?.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < (counsellors[currentIndex]?.rating || 4) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex space-x-4 w-full justify-center">
                  {['about', 'experience', 'contact'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 capitalize ${
                        activeTab === tab 
                          ? 'font-bold text-white'
                          : 'bg-white text-indigo-400 hover:text-indigo-600'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Content Sections */}
                <div className="w-full flex-grow overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {activeTab === 'about' && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-5 h-5 text-indigo-600" />
                            <span className="text-gray-600">{counsellors[currentIndex]?.course}</span>
                          </div>
                          <p className="text-gray-500 text-sm">{counsellors[currentIndex]?.bio || 'Expert counselor specializing in career guidance and academic planning.'}</p>
                        </div>
                      )}
                      
                      {activeTab === 'experience' && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-indigo-600" />
                            <span className="text-gray-600">{counsellors[currentIndex]?.experience}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="w-5 h-5 text-indigo-600" />
                            <span className="text-gray-600">{counsellors[currentIndex]?.specialization || 'Career Guidance'}</span>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'contact' && (
                        <div className="space-y-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center space-x-2"
                          >
                            <Mail className="w-5 h-5" />
                            <span>Contact Now</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2"
                          >
                            <LinkedinIcon className="w-5 h-5" />
                            <span>View Profile</span>
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-indigo-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-indigo-600" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-indigo-50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-indigo-600" />
        </motion.button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {counsellors.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? 'bg-indigo-600 w-4' : 'bg-gray-300'
            }`}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalCardsSlider;