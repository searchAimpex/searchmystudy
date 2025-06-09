import React, { useEffect, useRef, useState } from 'react';
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
import { useFetchBlogMutation } from '../../slices/adminApiSlice';

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
  const [FetchBlog] = useFetchBlogMutation();
  const [blog, setblog] = useState()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchBlog();
        // dispatch(FetchBlogs(res.data));
        // console.log(res.data,"---------------------------");
        setblog(res.data)
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);



  const getTruncatedContent = (text, maxChars = 90) => {
    if (!text) return '';
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  };


  return (
    <div className=' bg-gray-50'>
      <div className=' w-[100%] flex bg-gray-50' >

        <div className='w-[75%] mt-5 '>
          <div className="space-y-5 px-2    ">



            {/* Section 2 */}
            <div
              className=" "
              {...fadeInUp}
            >

              <div className=''>
                <img src='https://cdn.dribbble.com/userupload/5146251/file/original-3286ea0b2e4beb67efc8ef54b5b5be83.jpg?resize=400x0'
                  alt=""
                  className=" w-full h-[500px] rounded-lg" />
              </div>

              <div className="mt-5">
                <h2 className="text-3xl  font-bold text-blue-main">Nursing <span className="text-gold-main">Course</span></h2>
                <p className="text-lg text-gray-700">
                  We are India’s most trusted and fastest growing Admission Consulting Company. Our innovative and exclusively designed counselling programs help you accomplish your dream to become a Nurser.Our exclusively designed smart counselling process has made us a force to recon with in the highly competitive industry. With our commendable track record in such a short span of time, University Expert  has become the most sought after consulting firm for medical admissions in India through NEET UG & NEET PG  aspirants.
                  With the help of our associates we are able to extend our support to medical aspirants across Mumbai, Delhi, Bangalore, Kolkata, Chennai, Lucknow, Patna, Ranchi, Chandigarh, Jaipur, Dehradun, Ahmedabad, Bhubaneshwar, Raipur, Bhopal, Gurgaon, Indore, Nagpur and Guwahati.                </p>
                {/* <ul className="list-disc list-inside text-lg text-gray-700 ">
                  <li>Class 12th mark sheet with Physics, Chemistry, Biology, and English.</li>
                  <li>Qualifying exam score report and completion certificate.</li>
                  <li>Valid NEET scorecard and rank.</li>
                  <li>Caste certificate for SC/ST/OBC candidates (if applicable).</li>
                  <li>Student visa for foreign nationals.</li>
                </ul> */}
              </div>
            </div>

            {/* Section 3 */}
            <div
              className=""
              {...fadeInUp}
            >
              <div className="">
                <h2 className="text-3xl font-bold text-blue-main">About Nursing Education<span className="text-gold-main">Education</span></h2>
                <p className="text-lg text-gray-700 ">
                  Nursing education involves practical training provided to students with the purpose to prepare them for their future duties as nursing care professionals. To apply skills to practice settings, clinical experiences are important for the students mentioned that approximately 50% of any nursing curriculum is dedicated to clinical education. This clinical education is provided to nursing students by experienced college teachers, nursing preceptors and other medical professionals who are qualified in this educational task, use many techniques to organize students’ clinical experiences and supervision
                </p>

                <h2 className="text-2xl mt-2 font-bold text-blue-main">  <span className="text-gold-main">B.SC Nursing</span></h2>
                <div >
                  <p> <span className='font-bold '>Course Type :</span>  UG</p>
                  <p> <span className='font-bold mt-2'>Course Duration :</span>  4 years (8 Semester)</p>
                  <p> <span className='font-bold mt-2'>Session Starts :</span>  August Every Year</p>
                  <p><span className='font-bold mt-2'>Course Fee :</span>  Depend on the Institute</p>
                </div>
              </div>
              {/* <div className="">
                <img
                  src='https://cdn.dribbble.com/userupload/5146251/file/original-3286ea0b2e4beb67efc8ef54b5b5be83.jpg?resize=400x0'
                  alt="Education"
                  className="w-[300px] hover:scale-105 transition-transform duration-300"
                />
              </div> */}
            </div>

            {/* Section 4: Eligibility */}
            <div
              className=""
              {...fadeInUp}
            >
              <div className="rounded-lg ">
                <h2 className="text-3xl font-bold text-blue-main">Admission <span className="text-gold-main">Eligibility Criteria</span></h2>
                <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
                  <li><strong>Minimum Age:</strong> Must be 17+ years by 31st December of the admission year.</li>
                  <li>
                    <strong>Minimum Education: </strong>
                    10+2 with Science (PCB) & English, 50% aggregate marks from a recognized board.

                  </li>
                  <li><strong>Medical Fitness:</strong> Candidate must be medically fit.</li>
                  <li><strong>Open School:</strong> NIOS students need at least 50% in 10+2 Science.</li>
                  <li><strong>Admission Frequency:</strong> Once per year only.</li>
                </ul>
              </div>
            </div>


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

            {blog?.slice(0, 5).map((blog) => (
              <div
                onClick={() => navigate(`/blog/${blog._id}`)} key={blog._id} className='hover:cursor-pointer flex gap-3'>
                <img
                  src={blog.thumbnailURL}
                  className='rounded-xl w-[90px] h-[85px] object-cover'
                  alt={blog.title}
                />
                <div className='flex flex-col'>
                  <p className='text-sm text-gold-main font-semibold'>Feb 28, 2025</p>
                  <div
                    className="prose max-w-none text-sm pt-1 text-gray-700"
                    dangerouslySetInnerHTML={{ __html: getTruncatedContent(blog?.content) }}
                  />
                </div>
              </div>
            ))}


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
