import React, { useEffect, useRef } from 'react';
import { Container, Typography, Card, CardContent, CardHeader, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import nursingImage from '../../assets/BannerService.png';
import courseImage from '../../assets/LoginHero.png';
import educationImage from '../../assets/LoginHero.png';
import detailsImage from '../../assets/LoginHero.png';
import eligibilityImage from '../../assets/LoginHero.png';
import bannerImage from '../../assets/BannerService.png'; // Add banner image path
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};


const slideIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const faqList = [
  {
    question: "What are the career opportunities after B.Sc Nursing?",
    answer: "Graduates can pursue careers in hospitals, clinics, community health, research, and education. They can also specialize in areas like pediatrics, geriatrics, or emergency care."
  },
  {
    question: "What is the admission process for this program?",
    answer: "The admission process typically involves completing an application form, meeting the eligibility criteria, and passing an entrance exam or interview if applicable."
  },
  {
    question: "Are there any scholarships available?",
    answer: "Yes, there are various scholarships available based on merit, need, and specific criteria set by institutions or government schemes."
  }
];

const NursingIndia = () => {
  const overviewRef = useRef(null);
  const courseRef = useRef(null);
  const educationRef = useRef(null);
  const detailsRef = useRef(null);
  const eligibilityRef = useRef(null);
  const faqRef = useRef(null);
  const { singleCountry, countries } = useSelector((state) => state.country);
  const overviewControls = useAnimation();
  const courseControls = useAnimation();
  const educationControls = useAnimation();
  const detailsControls = useAnimation();
  const eligibilityControls = useAnimation();
  const faqControls = useAnimation();

  return (
   <div className=' bg-gray-50'>
     <div className=' w-[100%] flex bg-gray-50' >

      <div className='w-[75%]'>
        <div className="space-y-24 px-2 ">

          {/* Section 1 */}
          <motion.div
            className="flex flex-col md:flex-row items-center"
            {...fadeInUp}
          >
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold text-blue-main">B.SC <span className='text-gold-main'>(Nursing)</span></h2>
              <p className="text-lg text-gray-700">
                Bachelor of Nursing (B.Sc. in Nursing) is an undergraduate course that trains students in general nursing practices. The programme focuses on mastering various aspects of paramedical studies.
              </p>
            </div>
            <div className="md:w-1/2 flex m-5 ">
              <img
                src='https://cdn.dribbble.com/userupload/5146251/file/original-3286ea0b2e4beb67efc8ef54b5b5be83.jpg?resize=400x0'
                // src="https://universityexpert.co.in/wp-content/uploads/2023/05/6113-07761948en_Masterfile-removebg-preview.png"
                alt="Why BHMS"
                className="ml-20 w-[300px] hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            className="flex "
            {...fadeInUp}
          >
            <div className="  ">
              <img
                src='https://cdn.dribbble.com/userupload/5146251/file/original-3286ea0b2e4beb67efc8ef54b5b5be83.jpg?resize=400x0'
                alt="Required Documents"
                className="w-[900px]  hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="ml-10">
              <h2 className="text-3xl  font-bold text-blue-main">Nursing <span className="text-gold-main">Course</span></h2>
              <p className="text-lg text-gray-700">
                We are India’s most trusted and fastest growing Admission Consulting Company. Our innovative and exclusively designed counselling programs help you accomplish your dream to become a Nurser.
              </p>
              <ul className="list-disc list-inside text-lg text-gray-700 ">
                <li>Class 12th mark sheet with Physics, Chemistry, Biology, and English.</li>
                <li>Qualifying exam score report and completion certificate.</li>
                <li>Valid NEET scorecard and rank.</li>
                <li>Caste certificate for SC/ST/OBC candidates (if applicable).</li>
                <li>Student visa for foreign nationals.</li>
              </ul>
            </div>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-10"
            {...fadeInUp}
          >
            <div className=" space-y-4">
              <h2 className="text-3xl font-bold text-blue-main">About Nursing <span className="text-gold-main">Education</span></h2>
              <p className="text-lg text-gray-700 w-[500px]">
                Nursing education involves practical training provided to students with the purpose to prepare them for their future duties as nursing care professionals. Clinical education is provided to nursing students by experienced teachers and medical professionals.
              </p>
            </div>
            <div className="">
              <img
                src='https://cdn.dribbble.com/userupload/5146251/file/original-3286ea0b2e4beb67efc8ef54b5b5be83.jpg?resize=400x0'
                alt="Education"
                className="w-[300px] hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>

          {/* Section 4: Eligibility */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-10"
            {...fadeInUp}
          >
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://universityexpert.co.in/wp-content/uploads/2023/05/6113-07761948en_Masterfile-removebg-preview.png"
                alt="Eligibility"
                className="w-[300px] hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="md:w-1/2 space-y-6 p-6 rounded-lg ">
              <h2 className="text-3xl font-bold text-blue-main">Admission <span className="text-gold-main">Eligibility Criteria</span></h2>
              <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
                <li><strong>Minimum Age:</strong> Must be 17+ years by 31st December of the admission year.</li>
                <li>
                  <strong>Minimum Education:</strong>
                  <ul className="list-disc ml-6 mt-2">
                    <li>10+2 with Science (PCB) & English, 50% aggregate marks from a recognized board.</li>
                  </ul>
                </li>
                <li><strong>Medical Fitness:</strong> Candidate must be medically fit.</li>
                <li><strong>Open School:</strong> NIOS students need at least 50% in 10+2 Science.</li>
                <li><strong>Admission Frequency:</strong> Once per year only.</li>
              </ul>
            </div>
          </motion.div>

     
        </div>
      </div>

      <div className='w-[25%] '>
        <div className="w-full mt-4 space-y-6">
          <form className="bg-white  rounded-lg border-gold-main shadow-xl p-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
              <input id="phone" type="tel" placeholder="Enter your phone number"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-main text-white font-bold py-2 px-4 rounded-md hover:bg-blue-dark transition duration-300"
            >
              Submit
            </button>
          </form>

          <div>
            <p className="text-blue-main font-bold text-2xl text-center">Top countries for MBBS</p>
            <div className="rounded-xl my-4 space-y-4 px-2">
              {countries.map((country) => (
                <Link
                  to={`/MbbsCountryDetailed/${country._id}`}
                  key={country._id}
                  className="flex items-center gap-4 p-2 bg-white rounded-xl shadow-md border hover:border-gold-main hover:bg-gold-main-100 group"
                >
                  <img
                    src={country.flagURL}
                    className="w-14 h-14 rounded-full border-2 border-red-200 shadow-sm group-hover:scale-105 transition-transform"
                    alt={country.name}
                  />
                  <p className="text-xl font-semibold text-gray-800 group-hover:text-gold-main">
                    {country.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
         <motion.div
            className="flex justify-center bg-gray-50 mt-10 items-center gap-10"
            {...fadeInUp}
          >

            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 text-center space-y-4">
              <p className="text-gold-main text-sm sm:text-base font-semibold">Contact Us</p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-main">
                Don't Hesitate to Contact Us for Any Information
              </h2>

              <p className="text-gold-main text-sm sm:text-base font-medium">
                Call us on this number for immediate support
              </p>

              <button className="mt-4 bg-blue-main text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                Make Appointment
              </button>
            </div>


            <div className="md:w-1/2 flex justify-center">
              <img
                src='https://universityexpert.co.in/wp-content/uploads/2023/05/depositphotos_140637986-stock-photo-woman-talking-by-telephone.webp'
                alt="Education"
                className="w-[500px] hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>
   </div>
  );
};

export default NursingIndia;
