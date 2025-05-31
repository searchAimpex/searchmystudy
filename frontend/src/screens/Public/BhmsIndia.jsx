import React from "react";
import { Typography, Card, CardContent, CardHeader, Grid, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import BhmsHeroImage from "../../assets/AboutHero.png"; // Replace with actual image path
import BhmsContentImage from "../../assets/counsellerHero.png"; // Replace with actual image path
import asdc from "../../assets/BannerService-e90bab99.png"
const faq = [
  { question: "Why Choose BHMS Admission in India?", answer: "There are many reasons to choose BHMS admission in India. First, the coursework is designed to give students a comprehensive understanding of human health and disease..." },
  { question: "How to Get Admission in Top BHMS College?", answer: "BHMS in India is recognized by the Central Council of Homeopathy (CCH) and accredited by the National Accreditation Board for Hospitals & Healthcare Providers (NABH)..." },
  { question: "Documents Required For Admission In Top BHMS Colleges In India?", answer: "One must have specific documentation in order to enroll in the BHMS program in India, including Class 12th certificates, NEET scorecard, and more..." },
];

const BhmsIndia = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-cover bg-center bg-no-repeat px-4 py-16 relative"
        style={{ backgroundImage: `url(${asdc})` }}
      >
        <div className="absolute inset-0 bg-blue-main opacity-30"></div>
        <div className="relative z-10">
          <p className="text-4xl text-white font-bold">
            Get Guidance From The Experts Who Will Lead You To Your Dreams
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 sm:px-8 lg:px-10 py-8">
        {/* Left Column */}
        <div className="md:col-span-8 space-y-6">
          {/* Why Choose BHMS */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
          >
            <div className="p-4">
              <h2 className="text-3xl text-blue-main font-bold mb-4">Why Choose BHMS <span className="text-gold-main">Admission in India?</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <img className="w-[350px] h-[350px] " src="https://medical.universityexpert.co.in/wp-content/uploads/2023/05/study-bams-in-india.jpg"
                    alt="" />
                </div>
                <div className="md:col-span-8">
                  <p className="text-base text-lg leading-relaxed">
                    There are many reasons to choose BHMS admission in India. <br />
                    First, the coursework is designed to give students a comprehensive understanding of human health and disease. <br />
                    Second, the curriculum includes a strong emphasis on clinical training, which helps students develop the skills they need to be successful health care providers. <br />
                    Third, the Indian healthcare system is one of the most respected in the world, and BHMS graduates will have access to some of the best hospitals and clinics in the country. <br />
                    Finally, by choosing BHMS admission in India, students will be able to take advantage of the diverse cultural and religious traditions of this amazing country.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Admission Process */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="p-4">
              <h1 className="text-3xl mb-4 font-bold text-blue-main">
                How to Get Admission in <span className="text-gold-main">Top BHMS College?</span>
              </h1>
              <p className="text-base leading-relaxed text-xl">
                BHMS in India is recognized by the Central Council of Homeopathy (CCH) and accredited by the National Accreditation Board for Hospitals & Healthcare Providers (NABH). BHMS courses are offered by many reputed colleges and universities in India. BHMS colleges in India use various admission processes to select students for their BHMS programs. BHMS colleges offer a wide range of academic and professional programs which prepare students for successful careers in homeopathy. BHMS colleges also provide ample opportunities for research and development in homeopathy. BHMS Admission in India provides opportunity to get admission into good BHMS colleges, which offer good placement options after successful completion of the course. There are many reasons why parents want their children to get admission in top BHMS colleges. The main reason is that they want their children to get the best education and career opportunities. BHMS colleges in India offer quality education and career growth opportunities. They provide good infrastructure and facilities for students. These colleges also have a good placement record. </p>
            </div>
          </motion.div>

          {/* Documents Required */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 1 }}
          >
            <div className=" p-4">
              <h3 className="text-3xl text-blue-main font-bold mb-2">
                Documents Required For Admission In <span className="text-gold-main">Top BHMS Colleges In India</span>
              </h3>
              <p className="text-base text-xl mb-2">You must provide specific documentation to enroll in BHMS:</p>
              <ul className="list-disc text-lg list-inside space-y-2 ml-5">
                <li>
                  The candidate must have passed Class 12th or a comparable exam in Physics,
                  Chemistry, Biology/Biotechnology, and English.
                </li>
                <li>
                  They must submit their qualifying exam score report and proof of completion.
                  Students who are taking their final year examinations can also apply, but they must
                  submit the necessary paperwork later.
                </li>
                <li>A valid NEET scorecard and rank.</li>
                <li>
                  Candidates who fall under the SC, ST, or OBC categories are required to submit a
                  caste certificate issued by an appropriate body.
                </li>
                <li>
                  Finally, international nationals must apply for a student visa at the Indian consulate
                  there.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-4 space-y-6">
          {/* FAQ Section */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
          >
            <div className=" p-4">
              <h2 className="text-xl text-blue-main font-bold mb-2">Frequently Asked Questions</h2>
              {faq.map((item, index) => (
                <details key={index} className="mb-2">
                  <summary className="cursor-pointer font-medium">{item.question}</summary>
                  <p className="text-sm mt-1">{item.answer}</p>
                </details>
              ))}
            </div>
          </motion.div>

          {/* Top Colleges */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 1 }}
          >
            <div className=" p-4">
              <h2 className="text-xl text-blue-main font-bold mb-2">Top BHMS Colleges in India</h2>
              <ul className="list-disc pl-6 space-y-1 text-base">
                <li>Baroda Homeopathic Medical College, Vadodara</li>
                <li>KUHS Thrissur – Kerala University of Health Sciences</li>
                <li>Lokmanya Homeopathic Medical College, Pune</li>
                <li>National Institute of Homeopathy, Kolkata</li>
                <li>Bharati Vidyapeeth Homeopathic Medical College, Pune</li>
                <li>Govt. Homeopathic Medical College & Hospital, Bangalore</li>
                <li>Smt Chandaben Mohanbhai Patel Homeopathic Medical College, Mumbai</li>
                <li>Anand Homeopathic Medical College & Research Institute, Anand</li>
                <li>SJPES Homeopathy Medical College, Kolhapur</li>
                <li>Naiminath Homeopathic Medical College Hospital, Agra</li>
                <li>Dr. GD Pol Foundation’s YMT College, Navi Mumbai</li>
                <li>GD Memorial College & Hospital, Patna</li>
                <li>Dhondumama Sathe Homeopathic Medical College, Pune</li>
                <li>Dr NTR University of Health Sciences, Vijayawada</li>
                <li>Pt Deendayal Upadhyay Memorial Health Sciences, Raipur</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1 }}
        className="w-full px-4 sm:px-8 lg:px-10"
      >
        <div className="bg-white overflow-hidden p-6 text-center mb-10">
          <h2 className="text-4xl text-gold-main font-bold mb-4">
            <span className="text-blue-main">Don't Hesitate, Contact Us</span>  for Any Information
          </h2>
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Get Free Counselling
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BhmsIndia;
