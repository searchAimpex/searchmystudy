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
import banner from "../../assets/india-banners/BannerNursing.jpg"
import aboutNursing from "../../assets/india-banners/nursing.jpg"
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
      <motion.div

      >
        <div className="w-full h-[200px] sm:h-[100%] md:h-[100%] lg:h-[100%] overflow-hidden">
          <img
            src={banner}
            alt="Country Banner"
            className="w-full h-full object-cover object-center"
          />
        </div>


      </motion.div>

      <div className="flex flex-col md:flex-row bg-gray-50 w-full">

        {/* Left Content */}
        
        <div className="w-full md:w-3/4 p-4 md:p-8 space-y-4">
  <div className=" flex justify-center md:justify-start mt-4 overflow-hidden md:mt-0">
              <img
                src={aboutNursing}
                alt="Why BHMS"
                className="w-[1200px] h-[700px] rounded-md shadow-lg scale-130"
              />
            </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main ">
            About <span className="text-gold-main">Nursing</span>
          </h2>
          <motion.div
            className="flex flex-col md:flex-row items-center gap-6"
            {...fadeInUp}
          >
            {/* Text Section */}
            <div className=" space-y-4 ">

              <p className="text-sm sm:text-base md:text-2xl text-gray-700">
                Nursing is one of the most respected and in-demand professions in the healthcare sector. With the growing need for quality medical services in India and abroad, nursing has emerged as a rewarding career path for students who are passionate about patient care and healthcare services. A career in nursing is not just about treating illness; it is about serving humanity with compassion, skill, and dedication.
              </p>
              <p className="text-sm sm:text-base md:text-2xl text-gray-700">
                India has become a hub for nursing education, offering a wide range of programs at diploma, undergraduate, and postgraduate levels. From Auxiliary Nursing Midwifery (ANM) and General Nursing and Midwifery (GNM) to advanced degrees like B.Sc Nursing, Post Basic B.Sc Nursing, and M.Sc Nursing, students have multiple options to choose from depending on their academic background and career goals.
              </p>
            </div>

            {/* Image Section */}
          
          </motion.div>


          {/* Section 2 */}
          <motion.div className="flex flex-col md:flex-row items-center gap-6" {...fadeInUp}>

            <div className="w-full space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-main">
                Types of <span className="text-gold-main">Nursing Programs</span> in India

              </h2>
              <p className="text-sm sm:text-base md:text-2xl text-gray-700">
                Nursing education in India is structured in different stages to cater to the needs of students at various academic levels. Below are the major nursing programs available in India:
              </p>
              <ol className=" text-sm sm:text-base md:text-2xl  text-gray-700 space-y-5">
                <li className='text-2xl leading-relaxed' ><span className='font-semibold'>1. Class 12th mark sheet with Physics, Chemistry, Biology, and English.</span>
                  <ul className='list-disc mx-8'>
                    <li><span className='font-semibold'>Course Duration:</span> 2 years</li>
                    <li ><span className='font-semibold'>Level:</span> Diploma</li>
                    <li> <span className='font-semibold'>Overview:</span> ANM is a foundation-level course that trains students in providing basic healthcare services, maternal and child health, community health, and first aid.</li>
                    <li> <span className='font-semibold'>Career Scope:</span>    ANM graduates often work in rural healthcare centers, government hospitals, NGOs, and community health programs. They play a vital role in promoting preventive healthcare, especially in rural areas.</li>
                  </ul>
                </li>
                <li className=' my-20'> <span className='font-semibold '>2.GNM (General Nursing and Midwifery)</span>

                  <ul className='leading-relaxed list-disc mx-8'>
                    <li><span className='font-semibold'>Course Duration:</span> 3 years</li>
                    <li ><span className='font-semibold'>Level:</span> Diploma</li>
                    <li> <span className='font-semibold'>Overview:</span> GNM is one of the most popular nursing programs, focusing on general healthcare, patient care, and midwifery. Students gain practical knowledge in medical-surgical nursing, pediatric care, mental health nursing, and community health.</li>
                    <li> <span className='font-semibold'>Career Scope:</span>    GNM graduates can work as staff nurses in hospitals, clinics, schools, and community health organizations. They can also pursue higher studies such as Post Basic B.Sc Nursing.</li>
                  </ul>

                </li>
                <li ><span className='font-semibold'>3. B.Sc Nursing</span>

                  <ul className='leading-relaxed list-disc mx-8'>
                    <li><span className='font-semibold'>Course Duration:</span> 4 years</li>
                    <li ><span className='font-semibold'>Level:</span> Diploma</li>
                    <li> <span className='font-semibold'>Overview:</span> B.Sc Nursing is a professional degree program designed to prepare graduates for comprehensive nursing practices. The course includes theoretical and practical training in subjects like anatomy, physiology, pharmacology, psychology, and nursing research.</li>
                    <li> <span className='font-semibold'>Career Scope:</span>B.Sc Nursing graduates have wide career opportunities in government and private hospitals, defense services, public health organizations, and abroad. They can also pursue M.Sc Nursing, MPH (Public Health), or Ph.D. in Nursing for advanced career growth.</li>
                  </ul>

                </li>
                <li> <span className='leading-relaxed font-semibold'>4. Post Basic B.Sc Nursing</span>
                  <ul className='list-disc mx-8'>
                    <li><span className='font-semibold'>Course Duration:</span> 2 years</li>
                    <li ><span className='font-semibold'>Level:</span> Undergraduate Bridge Course</li>
                    <li> <span className='font-semibold'>Overview:</span> This program is specifically designed for students who have completed a diploma in nursing (GNM) and want to upgrade their qualification to a bachelor’s degree. It enhances both theoretical knowledge and practical skills.</li>
                    <li> <span className='font-semibold'>Career Scope:</span>Post Basic B.Sc Nursing graduates can take up leadership roles in hospitals, teaching positions in nursing colleges, and pursue higher studies.</li>
                  </ul>
                </li>
                <li><span className=''> <span className='font-semibold'>5. M.Sc Nursing</span> 


                  <ul className='leading-relaxed list-disc mx-8'>
                    <li><span className='font-semibold'>Course Duration:</span> 2 years</li>
                    <li ><span className='font-semibold'>Level:</span> Postgraduate Degree</li>
                    <li> <span className='font-semibold'>Overview:</span> M.Sc Nursing is a specialization-oriented course that allows students to focus on fields like Medical-Surgical Nursing, Pediatric Nursing, Psychiatric Nursing, Obstetrics & Gynecology Nursing, and Community Health Nursing. The program includes advanced clinical training, research, and management skills.</li>
                    <li> <span className='font-semibold'>Career Scope:</span>M.Sc Nursing graduates can work as specialist nurses, nurse educators, administrators, researchers, or healthcare managers. They are also eligible for high-paying international opportunities.</li>
                  </ul>
                </span></li>
              </ol>
            </div>
          </motion.div>

          {/* Section 3 */}
          <motion.div className="leading-relaxed flex flex-col text-2xl md:flex-row items-center gap-6" {...fadeInUp}>
            <div className="w-full  space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl mt-5  font-bold text-blue-main">
                Admission Process for  <span className="text-gold-main">Nursing in India</span>
              </h2>
             <ul className='mx-'>
                <li><span className='font-semibold'>1. Application Form: </span>Students must apply to their chosen colleges/universities through online or offline forms.</li>
                   <li><span className='font-semibold'>2. Entrance Exam:</span>Many universities and state authorities conduct entrance exams for B.Sc Nursing and M.Sc Nursing admissions. NEET may also be required for admission to some top colleges.</li>
                   <li><span className='font-semibold'>3. Merit-Based Selection:</span>For ANM and GNM, admissions are often based on marks obtained in Class 12th.</li>
                <li><span className='font-semibold'>4. Counselling:</span>Selected candidates are invited for counselling sessions where they choose colleges and courses based on their rank</li>
                <li><span className='font-semibold'>5. Document Verification & Admission Confirmation :</span>Final admission is confirmed after verification of original documents and payment of fees.</li>
             </ul>
            </div>
          </motion.div>


 <motion.div className="md:flex-row items-center gap-6" {...fadeInUp}>
            <div className="w-full  space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-4xl mt-10 font-bold text-blue-main">
                Eligibility Criteria for <span className="text-gold-main">Nursing in India</span>
              </h2>
                   <p className="text-sm sm:text-base md:text-2xl leading-relaxed text-gray-700">
              Eligibility requirements vary by course level. Below is the detailed criteria:
              </p>
              
             <ul className='leading-relaxed mx-8 list-disc text-2xl'>
                <li > <span className='font-semibold'>ANM (Auxiliary Nursing Midwifery):</span> 
                  <ul className='list-[circle] mx-8'>
                    <li>Qualification: Class 12th (any stream, preferably science).</li>
                    <li>Minimum Marks: 45-50%.</li>
                  </ul>
                </li>

                 <li className='mt-5'> <span className='font-semibold '>GNM (General Nursing & Midwifery):</span>
                  <ul className='list-[circle] mx-8'>
                    <li>Qualification: Class 12th with Physics, Chemistry, Biology, and English.</li>
                    <li>Minimum Marks: 45-50%.</li>
                    <li>Age Limit: 17–35 years.</li>
                  </ul>
                </li>


                  <li className='mt-5'> <span className='font-semibold'>B.Sc Nursing:</span>
                  <ul className='mx-8 leading-relaxed list-[circle]'>
                    <li>Qualification: Class 12th with Physics, Chemistry, Biology, and English.</li>
                    <li>Minimum Marks:  50% aggregate.</li>
                    <li>Entrance Exam: NEET or state-level exams in some colleges.</li>
                  </ul>
                </li>

                  <li className='mt-5'> <span className='font-semibold'>Post Basic B.Sc Nursing:</span> 
                  <ul className='leading-relaxed mx-8 list-[circle]'>
                    <li className='leading-relaxed'>Qualification: GNM diploma + Registered Nurse/Midwife certification.</li>
                    <li className='leading-relaxed'>Duration:  2 Years</li>
                    {/* <li>Entrance Exam: NEET or state-level exams in some colleges.</li> */}
                  </ul>
                </li>


                   <li className='mt-5'> <span className='font-semibold'>M.Sc Nursing:</span>
                  <ul className='list-[circle] mx-8'>
                    <li>Qualification:  B.Sc Nursing/Post Basic B.Sc Nursing with minimum 55%</li>
                    <li>Experience:  1-year work experience is often required.</li>
                    <li>Entrance Exam: University/state-level exams may apply.</li>
                  </ul>
                </li>
              
              
             </ul>
            </div>

            
          </motion.div>
        
          {/* Section 4: Eligibility */}
          <motion.div className="flex flex-col md:flex-row items-center gap-6" {...fadeInUp}>
            
            <div className="mt-8 rounded-lg ">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-blue-main">
                Admission <span className="text-gold-main">Eligibility Criteria</span>
              </h2>
              <ul className="list-disc  list-inside mt-5 text-sm sm:text-base md:text-2xl text-gray-700 space-y-4">
                <li ><strong>Minimum Age:</strong> Must be 17+ years by 31st December of the admission year.</li>
                <li>
                  <strong>Minimum Education: </strong>
                  {/* <ul className="ml-6 mt-1"> */}
                    10+2 with Science (PCB) & English, 50% aggregate marks from a recognized board.
                  {/* </ul> */}
                </li>
                <li><strong>Medical Fitness:</strong> Candidate must be medically fit.</li>
                <li><strong>Open School:</strong> NIOS students need at least 50% in 10+2 Science.</li>
                <li><strong>Admission Frequency:</strong> Once per year only.</li>
              </ul>
            </div>
          </motion.div>

        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-1/4 p-4 md:p-8 mt-6 md:mt-0 space-y-6">

          {/* Form */}
          <form className="bg-white rounded-lg border border-gold-main shadow-xl p-4 space-y-4">
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-bold mb-2" htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main text-sm sm:text-base" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-bold mb-2" htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main text-sm sm:text-base" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-bold mb-2" htmlFor="phone">Phone</label>
              <input id="phone" type="tel" placeholder="Enter your phone number"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main text-sm sm:text-base" />
            </div>
            <button type="submit" className="w-full bg-blue-main text-white font-bold py-2 px-4 rounded-md hover:bg-blue-dark transition duration-300 text-sm sm:text-base">
              Submit
            </button>
          </form>

          {/* Top Countries */}
          <div>
            <p className="text-blue-main font-bold text-lg sm:text-xl md:text-2xl text-center">Top countries for MBBS</p>
            <div className="rounded-xl my-4 space-y-4 px-2">
              {countries.map((country) => (
                <Link
                  to={`/MbbsCountryDetailed/${country._id}`}
                  key={country._id}
                  className="flex items-center gap-4 p-2 bg-white rounded-xl shadow-md border hover:border-gold-main hover:bg-gold-main-100 group"
                >
                  <img
                    src={country.flagURL}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-red-200 shadow-sm group-hover:scale-105 transition-transform"
                    alt={country.name}
                  />
                  <p className="text-sm sm:text-base md:text-xl font-semibold text-gray-800 group-hover:text-gold-main">
                    {country.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      <motion.div
        className="flex justify-center bg-gray-50 mt-10 items-center gap-10"
        {...fadeInUp}
      >

        <div className="w-full p-4 sm:p-6 md:p-8 text-center space-y-4">
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
