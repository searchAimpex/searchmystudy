import React from 'react';
import CourseCards from './CourseCards';
import { motion } from 'framer-motion';

function CourseSection() {
  return (
    <div className='my-20 w-[100%]'>
      <div className='flex flex-col justify-center items-center w-[95%] m-auto'>

        {/* Title Animation */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">Popular</span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold-main">Courses</span>
        </motion.div>

        {/* Description Animation */}
        <motion.div
          className="my-3"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <p className="text-lg text-left sm:text-base md:text-lg lg:text-xl font-semibold text-gray-500">
            Explore our top-rated courses and join thousands of learners mastering new skills today.
          </p>
        </motion.div>

        {/* Course Cards Animation */}
        <motion.div
          className='my-10 w-full'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <CourseCards />
        </motion.div>

      </div>
    </div>
  );
}

export default CourseSection;
