import React from "react";
import { motion } from "framer-motion";
import { Typography, Card, CardContent, CardHeader, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MdIndiaImage from "../../assets/AboutHero.png";

const faq = [
  { question: "What is MD in India?", answer: "MD in India is a postgraduate degree that focuses on the study of medicine in a specialized field." },
  { question: "How to pursue MD in India?", answer: "To pursue MD in India, candidates must have completed an MBBS degree and cleared the NEET-PG exam." },
];

const blogs = [
  { title: "Top Medical Colleges for MD in India", description: "Discover the leading medical colleges offering MD programs in India.", link: "#" },
  { title: "Specializations in MD: A Guide", description: "Explore the various specializations available in MD programs in India.", link: "#" },
];

const branches = [
  "MD (Obstetrics and Gynecology)",
  "MD (Tuberculosis And Respiratory Diseases)",
  "MD (Psychiatry)",
  "MD (Dermatology)",
  "MD (Radio Diagnosis)",
  "MD (Pediatrics)",
  "MD (General Medicine)",
  "MD (Anesthesia)",
  "MD (Pharmacology)",
  "MD (Pathology)",
  "MD (Physiology)",
  "MS (General Surgery)",
  "MS (Orthopedics)",
  "MS (Ear Nose Throat)",
  "MS (Ophthalmology)",
  "MD (Forensic)",
  "MD (Radiology)",
  "MDS",
];

const states = [
  "MD MS in DELHI NCR",
  "MD MS UTTAR PRADESH",
  "MD MS in KARNATAKA",
  "MD MS in RAJASTHAN",
  "MD MS in MAHARASHTRA",
  "MD MS in MADHYA PRADESH",
  "MD MS in UTTARAKHAND",
  "MD MS in BIHAR",
];

const MdIndia = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-16 md:py-24 px-4 sm:px-10 lg:px-24"
        style={{
          backgroundImage: "url('https://medical.universityexpert.co.in/wp-content/uploads/2023/05/MD-MS-2023.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left text-white flex-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
              MD in India
            </h1>
            <p className="mt-6 text-lg md:text-xl lg:text-2xl font-medium text-gray-200 drop-shadow">
              Get Guidance From Experts Who Will Lead You To Your Dreams. <br />
              For Studying in Abroad – Contact Us Today.
            </p>
            <div className="mt-8">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition">
                Contact an Expert
              </button>
            </div>
          </motion.div>

          {/* Optional: Image Card or Statistic Block */}
          <motion.div
            className="flex-1 w-full max-w-md lg:max-w-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl border border-white border-opacity-20 shadow-lg text-white text-center">
              <h3 className="text-xl font-semibold mb-2">Why Choose MD in India?</h3>
              <p className="text-sm text-gray-200">
                Top-ranked institutions, affordable fees, and recognized degrees.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="mt-12 ">
        {/* About Section */}
        <div className="mb-8 p-6 bg-white ">
          <div className="flex">
            <p className="text-gray-700 text-xl mr-10 w-[600px] leading-relaxed">
              <h2 className=" font-bold text-blue-main  text-4xl mb-4">About <span className="text-gold-main">MD/MS </span>in India</h2>
              MD/MS in India is one of the most prominent career options for the student’s looking to pursue, Post-graduation Medical course In INDIA. MD stands for Doctor of Medicine and it involves 3-year Clinical training in the field of Medicine while doing MD students get specialty training to treat patients/diseases through non-surgical procedures i.e. with Medicines only.
            </p>
            <img className="w-[500px] shadow-lg rounded-lg" src="https://medical.universityexpert.co.in/wp-content/uploads/2023/05/NEET-PG-2023.jpg" alt="" />
          </div>
        </div>

        <div className="mb-8 p-6 bg-white ">
          <div className="flex">
            <p className="text-gray-700 text-xl mr-10 w-[600px] leading-relaxed">
              <h2 className=" font-bold text-blue-main  text-4xl mb-4"> <span className="text-gold-main">MD/MS </span>admission in India</h2>
              {/* MD/MS in India is one of the most prominent career options for the student’s looking to pursue, Post-graduation Medical course In INDIA. MD stands for Doctor of Medicine and it involves 3-year Clinical training in the field of Medicine while doing MD students get specialty training to treat patients/diseases through non-surgical procedures i.e. with Medicines only. */}
              To get admission to MD/MS in INDIA an aspirant has to qualify the NEET-PG entrance test conducted by NBE every year. To apply for NEET-PG the aspirants must have permanent or Provisional registration with MCI and have completed his/her MBBS degree from MCI recognizes medical college/institute with a 1-year compulsory internship. After successfully qualifying the NEET-PG entrance test the students have to go through the Central level and state level NEET-PG counseling.To get admission to MD/MS in INDIA an aspirant has to qualify the NEET-PG entrance test conducted by NBE every year. To apply for NEET-PG the aspirants must have permanent or Provisional registration with MCI and have completed his/her MBBS degree from MCI recognizes medical college/institute with a 1-year compulsory internship. After successfully qualifying the NEET-PG entrance test the students have to go through the Central level and state level NEET-PG counseling.
              <ul className="list-disc text-base md:text-lg mt-4 list-inside space-y-2 text-gray-700">
                {branches?.map((branch, index) => (
                  <li key={index}>{branch}</li>
                ))}
              </ul>
            </p>


            <img className="w-[500px] h-full shadow-lg rounded-lg" src="https://medical.universityexpert.co.in/wp-content/uploads/2023/05/NEET-PG-2023.jpg" alt="" />

          </div>
        </div>

        <div className="mb-8 p-6 bg-white ">
          <div className="flex">
            <p className="text-gray-700 text-xl mr-10 w-[600px] leading-relaxed">
              <h2 className=" font-bold text-blue-main  text-4xl mb-4">MD/MS  <span className="text-gold-main">Colleges and Institutes </span>by state</h2>
              MD/MS in India is one of the most prominent career options for the student’s looking to pursue, Post-graduation Medical course In INDIA. MD stands for Doctor of Medicine and it involves 3-year Clinical training in the field of Medicine while doing MD students get specialty training to treat patients/diseases through non-surgical procedures i.e. with Medicines only.
              <ul className="list-disc mt-5 list-inside space-y-2 text-gray-700">
                {states?.map((state, index) => (
                  <li key={index}>{state}</li>
                ))}
              </ul>
            </p>

            <img className="w-[500px] h-full shadow-lg rounded-lg" src="https://medical.universityexpert.co.in/wp-content/uploads/2023/05/NEET-PG-2023.jpg" alt="" />

          </div>
        </div>

        {/* States Offering */}
        {/* <div className="mb-8 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">MD/MS Colleges and Institutes by State</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {states?.map((state, index) => (
              <li key={index}>{state}</li>
            ))}
          </ul>
        </div> */}

        {/* Admission Info */}
        {/* <div className="mb-8 p-6 bg-white ">
          <h2 className="text-4xl font-bold text-blue-main mb-4">MD / MS <span className="text-gold-main">Admission in India</span></h2>
          <p className="text-gray-700 leading-relaxed">
            To get admission to MD/MS in India, an aspirant must qualify for the NEET-PG entrance test conducted by NBE every year.
            After qualifying, students undergo Central and State level NEET-PG counseling.
          </p>
        </div> */}


        <div className="mb-8 p-6 bg-white ">
          <div className="flex">
            <p className="text-gray-700 text-xl mr-10 w-[600px] leading-relaxed">
              <h2 className=" font-bold text-blue-main  text-4xl mb-4">How to Apply for   <span className="text-gold-main">MD/MS in India </span></h2>
              Candidates who have a valid MBBS or equivalent degree from India or other countries, which is recognized by MCI (Medical Council of India) can apply for the MD/MS course.
              Candidates must have cleared the Common Entrance Test NEET -PG (National Eligibility cum Entrance Test) for Medical Postgraduate Courses (MD/MS/PG -Diploma). NEET-PG exam is conducted by NBE in online mode throughout India.
              <ul className="list-disc mt-5 list-inside space-y-2 text-gray-700">
                <h2 className=" font-bold text-blue-main  text-xl mb-4">MD MS | Colleges and institutes <span className="text-gold-main">IN STATES OF INDIA</span></h2>

                {states?.map((state, index) => (
                  <li key={index}>{state}</li>
                ))}
              </ul>

              <div className="">
                <h2 className="text-xl  font-bold text-blue-main mb-4 mt-5">
                  Branches Available in <span className="text-gold-main">MD/MS</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 text-base md:text-lg">
                  {[
                    "MD (Obstetrics and Gynecology)",
                    "MD (Tuberculosis And Respiratory Diseases)",
                    "MD (Psychiatry)",
                    "MD (Dermatology)",
                    "MD (Radio Diagnosis)",
                    "MD (Pediatrics)",
                    "MD (General Medicine)",
                    "MD (Anesthesia)",
                    "MD (Pharmacology)",
                    "MD (Pathology)",
                    "MD (Physiology)",
                    "MS (General Surgery)",
                    "MS (Orthopedics)",
                    "MS (Ear Nose Throat)",
                    "MS (Ophthalmology)",
                    "MD (Forensic)",
                    "MD (Radiology)",
                    "MDS",
                  ].map((branch, index) => (
                    <p key={index} className="font-semibold">
                      {branch}
                    </p>
                  ))}
                </div>
              </div>

            </p>

            <img className="w-[500px] h-full shadow-lg rounded-lg" src="https://medical.universityexpert.co.in/wp-content/uploads/2023/05/NEET-PG-2023.jpg" alt="" />

          </div>
        </div>
        {/* How to Apply */}
        {/* <div className="mb-8 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">How to Apply for MD/MS in India</h2>
          <p className="text-gray-700 leading-relaxed">
           Candidates who have a valid MBBS or equivalent degree from India or other countries, which is recognized by MCI (Medical Council of India) can apply for the MD/MS course.
           Candidates must have cleared the Common Entrance Test NEET -PG (National Eligibility cum Entrance Test) for Medical Postgraduate Courses (MD/MS/PG -Diploma). NEET-PG exam is conducted by NBE in online mode throughout India.
          </p>
        </div> */}

        {/* Sidebar: FAQs */}
        <div className="mb-8 p-6 bg-white rounded-lg ">
          <h2 className="text-4xl font-bold text-blue-main mb-4">Frequently <span className="text-gold-main">Asked Questions</span></h2>
          <div className="space-y-4">
            {faq?.map((item, index) => (
              <details key={index} className="text-2xl border border-gray-200 rounded-lg p-4">
                <summary className="cursor-pointer font-semibold text-gray-800">{item.question}</summary>
                <p className="mt-2 text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Sidebar: Blogs */}
        {/* <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">Recent Blogs</h2>
          <ul className="space-y-4">
            {blogs?.map((blog, index) => (
              <li key={index}>
                <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
                  {blog.title}
                </h3>
                <p className="text-gray-700">{blog.description}</p>
              </li>
            ))}
          </ul>
        </div> */}
      </section>

    </div>
  );
};

export default MdIndia;
