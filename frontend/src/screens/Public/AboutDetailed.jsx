import React from 'react';
import { motion } from 'framer-motion'; // For scroll-triggered animations
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
          className="flex flex-col mx-[200px] mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-blue-main">Who We Are</h2>
          <p className="text-lg text-gray-400 mt-4">
          We are a team of highly experienced medical and other education consultants, career counsellors, and industry experts committed to helping students achieve their goals in the medical field. Whether you are looking to pursue MBBS, MD, or other specialized programs, we guide you through the intricate processes of admission, course selection, and overseas transition.
            With a strong network of partner institutions, we are connected to leading medical colleges in India, as well as reputable universities in countries such as Russia, Ukraine, Philippines, USA, UK, USA, Canada, Australia, Europe and more.
            With years of experience, 

          </p>
          <p className="text-lg text-gray-400 mt-4">
          we have built strong partnerships with top universities and colleges, ensuring that our students receive accurate, up-to-date information and personalized advice.
          </p>
        </motion.div>

        {/* Mission and Vision */}
        <div className="flex flex-row space-x-12 mt-10 mx-[200px]">
          <motion.div 
            className="flex flex-col p-10 space-y-4 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={Mission} className="w-[100px]" alt="Mission" />
            <div className="flex flex-row space-x-3">
              <span className="font-bold text-blue-main text-4xl">Our</span>
              <span className="font-bold text-gold-main text-4xl">Mission</span>
            </div>
            <p className="text-lg text-gray-400">
            Our mission is to empower students by providing comprehensive, tailored guidance to help them make informed decisions about their future. We strive to make the process of studying abroad simple, stress-free, and transparent by offering a one-stop solution for everything from course selection and application processing to visa assistance and pre-departure orientation.

            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col p-10 space-y-4 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={Vision} className="w-[100px]" alt="Vision" />
            <div className="flex flex-row space-x-3">
              <span className="font-bold text-blue-main text-4xl">Our</span>
              <span className="font-bold text-gold-main text-4xl">Vision</span>
            </div>
            <p className="text-lg text-gray-400">
            To be the leading education consultancy in medical studies, recognized for our dedication to student success, and helping future healthcare professionals achieve their ambitions with confidence and clarity.
            </p>
          </motion.div>
        </div>

        {/* What We Do Section */}
        <motion.div 
          className="flex flex-col mx-[200px] mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-blue-main">What We Do</h2>
          <div className="grid grid-cols-2 gap-8 mt-8">
            {[
              {
                title: 'Personalized Counselling',
                description: "Every student’s aspiration and capability are unique. Our experienced counsellors work closely with you to understand your preferences, academic background, and financial considerations to recommend the best-fit institutions and programs, both in India and abroad"
              },
              {
                title: 'Medical College Selection',
                description: "With our in-depth knowledge of the medical education system, we help you choose the most suitable medical colleges, ensuring that you meet the eligibility criteria and have access to the best curriculum, infrastructure, and opportunities"
              },
              {
                title: 'Admission Process Guidance',
                description: "We guide you through the entire admission process, from filling out application forms to preparing for entrance exams like NEET (India), or other qualifying exams required by overseas institutions, and handling all the paperwork and formalities"
              },
              {
                title: 'Scholarship and Financial Assistance',
                description: "We understand the financial challenges of pursuing medical education. Our team helps identify scholarships, grants, and financial aid options that can significantly ease the financial burden on students and their families"
              },
              {
                title: 'Study Abroad Guidance',
                description: "For students aspiring to pursue medical studies overseas, we offer end-to-end assistance, including application support, visa processing, accommodation arrangements, and pre-departure guidance to ensure a smooth transition into a foreign country."
              },
              {
                title: 'Exam Preparation',
                description: "From NEET coaching to preparing for medical entrance exams required by various countries, we offer expert guidance and resources to help students excel in their exams and increase their chances of securing admission"
              },
              {
                title: 'Test Preparation',
                description: "Whether it’s IELTS, TOEFL, GMAT, or SAT, our specialized test preparation services ensure you are fully prepared to meet the language and academic requirements of your chosen destination"
              },
              {
                title: 'Visa & Travel Assistance',
                description: "For students planning to study abroad, we assist with visa applications, travel arrangements, and other documentation to ensure a seamless and hassle-free transition to your chosen destination"
              },
              {
                title: 'Pre-Departure & Post-Arrival Support',
                description: "Our support doesn’t end with securing admission. We prepare students for life in a new country with pre-departure orientation, post-arrival assistance, and ongoing mentorship to help them settle in comfortably"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col p-6 shadow-lg rounded-lg bg-white"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-blue-main">{item.title}</h3>
                <p className="text-gray-400 mt-2">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div 
          className="bg-blue-100 flex flex-col space-y-10 w-full justify-center items-center p-10 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-row space-x-4">
            <span className="font-bold text-4xl text-blue-main">Our</span>
            <span className="font-bold text-4xl text-gold-main">Values</span>
          </div>
          <div className="grid grid-cols-3 gap-10">
            <motion.div 
              className="bg-white flex flex-col p-4 justify-start items-start rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={Excellence} alt="Excellence" />
              <h4 className="font-bold text-blue-main text-xl mt-2">Excellence</h4>
              <p className="text-gray-400">We strive to deliver the highest quality services.</p>
            </motion.div>
            <motion.div 
              className="bg-white flex flex-col p-4 justify-start items-start rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={Intregity} alt="Integrity" />
              <h4 className="font-bold text-blue-main text-xl mt-2">Integrity</h4>
              <p className="text-gray-400">We believe in honest and transparent advice.</p>
            </motion.div>
            <motion.div 
              className="bg-white flex flex-col p-4 justify-start items-start rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={Innovation} alt="Innovation" />
              <h4 className="font-bold text-blue-main text-xl mt-2">Innovation</h4>
              <p className="text-gray-400">We seek new ways to improve student experiences.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
