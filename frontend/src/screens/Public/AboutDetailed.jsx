import React from 'react';
import { motion } from 'framer-motion';
import AboutUs from '../../assets/AboutUsHero.png';
import Vision from '../../assets/Vision.png';
import Mission from '../../assets/Mission.png';
import About from '../../assets/About1.png';
import Excellence from '../../assets/excellence.png';
import Intregity from '../../assets/integrity.png';
import Innovation from '../../assets/innovation.png';
import ScrollToTop from '../../components/Public/ScrollToTop';

export default function AboutDetailed() {
  return (
    <div>
      <ScrollToTop />
      <div className="flex flex-col">
        {/* About Us Hero Section */}
        <div className="bg-[#C4C4C4]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={AboutUs} className="w-full object-cover" alt="About Us" />
          </motion.div>
        </div>

        {/* Who We Are Section */}
        <motion.div
          className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-blue-main">Who We Are</h2>
          <p className="text-base md:text-lg text-gray-400 mt-4">
            We are a team of highly experienced medical and other education consultants, career counsellors, and industry experts committed to helping students achieve their goals in the medical field. Whether you are looking to pursue MBBS, MD, or other specialized programs, we guide you through the intricate processes of admission, course selection, and overseas transition. With a strong network of partner institutions, we are connected to leading medical colleges in India, as well as reputable universities in countries such as Russia, Ukraine, Philippines, USA, UK, USA, Canada, Australia, Europe and more.
          </p>
          <p className="text-base md:text-lg text-gray-400 mt-4">
            With years of experience, we have built strong partnerships with top universities and colleges, ensuring that our students receive accurate, up-to-date information and personalized advice.
          </p>
        </motion.div>

        {/* Mission and Vision */}
        <div className="flex flex-col lg:flex-row gap-8 mt-10 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
          {[{ title: 'Mission', img: Mission, desc: 'Our mission is to empower students by providing comprehensive, tailored guidance...' }, { title: 'Vision', img: Vision, desc: 'To be the leading education consultancy in medical studies...' }].map((item, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col p-6 space-y-4 shadow-lg bg-white rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <img src={item.img} className="w-[80px] md:w-[100px]" alt={item.title} />
              <div className="flex flex-row space-x-2 md:space-x-3">
                <span className="font-bold text-blue-main text-2xl md:text-4xl">Our</span>
                <span className="font-bold text-gold-main text-2xl md:text-4xl">{item.title}</span>
              </div>
              <p className="text-base md:text-lg text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* What We Do Section */}
        <motion.div
          className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-blue-main">What We Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              'Personalized Counselling',
              'Medical College Selection',
              'Admission Process Guidance',
              'Scholarship and Financial Assistance',
              'Study Abroad Guidance',
              'Exam Preparation',
              'Test Preparation',
              'Visa & Travel Assistance',
              'Pre-Departure & Post-Arrival Support'
            ].map((title, index) => (
              <motion.div
                key={index}
                className="flex flex-col p-6 shadow-lg rounded-lg bg-white"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-blue-main">{title}</h3>
                <p className="text-gray-400 mt-2 text-sm md:text-base">
                  Description for {title} goes here. You can replace this with the full actual content.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          className="bg-blue-100 flex flex-col space-y-10 w-full justify-center items-center px-4 sm:px-8 md:px-16 py-10 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-row space-x-2 md:space-x-4">
            <span className="font-bold text-2xl md:text-4xl text-blue-main">Our</span>
            <span className="font-bold text-2xl md:text-4xl text-gold-main">Values</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ title: 'Excellence', img: Excellence }, { title: 'Integrity', img: Intregity }, { title: 'Innovation', img: Innovation }].map((value, idx) => (
              <motion.div
                key={idx}
                className="bg-white flex flex-col p-4 items-start rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={value.img} alt={value.title} />
                <h4 className="font-bold text-blue-main text-lg md:text-xl mt-2">{value.title}</h4>
                <p className="text-gray-400 text-sm md:text-base">We value {value.title.toLowerCase()} in all our practices.</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}