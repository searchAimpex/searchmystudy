import React from "react";
import { motion } from "framer-motion";
import { Typography, Card, CardContent, CardHeader, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MdIndiaImage from "../../assets/AboutHero.png";
import banner from "../../assets/india-banners/MD.jpg"
const faq = [
  { question: "What is MD in India?", answer: "MD in India is a postgraduate degree that focuses on the study of medicine in a specialized field." },
  { question: "How to pursue MD in India?", answer: "To pursue MD in India, candidates must have completed an MBBS degree and cleared the NEET-PG exam." },
];

const blogs = [
  { title: "Top Medical Colleges for MD in India", description: "Discover the leading medical colleges offering MD programs in India.", link: "#" },
  { title: "Specializations in MD: A Guide", description: "Explore the various specializations available in MD programs in India.", link: "#" },
];
const mdSpecializations = [
  "General Medicine",
  "Pediatrics",
  "Dermatology",
  "Radiology",
  "Anesthesiology",
  "Psychiatry",
  "Community Medicine",
];

const msSpecializations = [
  "General Surgery",
  "Orthopedics",
  "ENT",
  "Ophthalmology",
  "Obstetrics & Gynecology",
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
      <motion.div
      //  ref={refBanner}
      //  initial={{ opacity: 0 }}
      //  animate={inViewBanner ? { opacity: 1 } : {}}
      //  transition={{ duration: 1 }}
      >
        <div className="w-full h-[200px] sm:h-[100%] md:h-[100%] lg:h-[100%] overflow-hidden">
          <img
            src={banner}
            alt="Country Banner"
            className="w-full h-full object-cover object-center"
          />
        </div>


      </motion.div>

      <section className="mt-12 ">
        {/* About Section */}
        <div className="mb-8 px-6 bg-white ">
          <div className="">
            <h1 className=" font-bold text-blue-main  text-4xl mb-4">About <span className="text-gold-main">MD/MS </span>in India</h1>
            <p className="text-gray-800 text-2xl">
              <span className="text-blue-main">MD (Doctor of Medicine) and MS (Master of Surgery)</span> are among the most prestigious
              postgraduate medical programs in India. These are three-year specialized courses pursued
              after completing MBBS, designed to provide in-depth knowledge, advanced clinical training, and
              expertise in specific areas of medicine and surgery.
            </p>
            {/* <img className="w-[500px] shadow-lg rounded-lg" src="https://medical.universityexpert.co.in/wp-content/uploads/2023/05/NEET-PG-2023.jpg" alt="" /> */}
          </div>
        </div>

        <div className="mb-8 px-6 bg-white ">
          <div className="">

            <h2 className=" font-bold text-blue-main text-3xl mb-4">Key Features <span >of MD/MS</span> in India</h2>

            <ul className="space-y-4 text-gray-700 text-xl">
              <li className="flex items-start">
                {/* <span className="text-blue-500 text-xl mr-3">🎓</span> */}
                <span>
                  <strong >Eligibility:</strong> MBBS degree with internship completion + NEET-PG qualification
                </span>
              </li>

              <li className="flex items-start">
                {/* <span className="text-green-500 text-xl mr-3">⏱️</span> */}
                <span>
                  <strong >Duration:</strong> 3 years full-time including clinical work, research, and thesis submission
                </span>
              </li>


              <li className="flex items-start">
                {/* <span className="text-red-500 text-xl mr-3">🏥</span> */}
                <span>
                  <strong >MD Specializations:</strong> General Medicine, Pediatrics, Dermatology, Radiology,
                  Anesthesiology, Psychiatry, Community Medicine, etc.
                </span>
              </li>

              <li >
                {/* <span className="text-indigo-500 text-xl mr-3">🌐</span> */}
                <span>
                  <strong >MS Specializations:</strong> General Surgery, Orthopedics, ENT, Ophthalmology, Obstetrics &
                  Gynecology, etc.
                </span>
              </li>


              <li >
                {/* <span className="text-indigo-500 text-xl mr-3">🌐</span> */}
                <span>
                  <strong >Training:</strong> Intensive hospital-based clinical training under senior doctors and professors.
                </span>
              </li>

              <li >
                {/* <span className="text-indigo-500 text-xl mr-3">🌐</span> */}
                <span>
                  <strong >Recognition :</strong>  Degrees are approved by the National Medical Commission (NMC) and
                  globally recognized.
                </span>
              </li>
            </ul>

          </div>
        </div>

        <div className="container ">
          <p className="mb-8 p-6 bg-white">
            <h2 className=" font-bold text-blue-main  text-4xl mb-4"> <span className="text-gold-main">MD/MS </span>admission in India</h2>
            <p className="text-2xl text-gray-700">To get admission to MD/MS in INDIA an aspirant has to qualify the NEET-PG entrance test conducted by NBE every year. To apply for NEET-PG the aspirants must have permanent or Provisional registration with MCI and have completed his/her MBBS degree from MCI recognizes medical college/institute with a 1-year compulsory internship. After successfully qualifying the NEET-PG entrance test the students have to go through the Central level and state level NEET-PG counseling.To get admission to MD/MS in INDIA an aspirant has to qualify the NEET-PG entrance test conducted by NBE every year. To apply for NEET-PG the aspirants must have permanent or Provisional registration with MCI and have completed his/her MBBS degree from MCI recognizes medical college/institute with a 1-year compulsory internship. After successfully qualifying the NEET-PG entrance test the students have to go through the Central level and state level NEET-PG counseling.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* First half */}
              <ul className="list-none text-base md:text-lg list-inside space-y-2 text-gray-800">
                {branches?.slice(0, Math.ceil(branches.length / 2)).map((branch, index) => (
                  <li key={index} className="text-xl">
                    <span className="text-blue-500 mr-2">➤</span> {/* Arrow bullet */}

                    {branch}</li>
                ))}
              </ul>

              {/* Second half */}
              <ul className="list-none text-base md:text-lg list-inside space-y-2 text-gray-800">
                {branches?.slice(Math.ceil(branches.length / 2)).map((branch, index) => (
                  <li key={index} className="text-xl">
                    <span className="text-blue-500 mr-2">➤</span> {/* Arrow bullet */}

                    {branch}</li>
                ))}
              </ul>
            </div>

          </p>



        </div>

        <div className="mb-8 p-6 bg-white ">
          <div className="">
            <p className=" container">
              <h1 className=" font-bold text-blue-main  text-4xl mb-4">MD/MS  <span className="text-gold-main">Colleges and Institutes </span>by state</h1>
              <p className="text-2xl text-gray-800">MD/MS in India is one of the most prominent career options for the student’s looking to pursue, Post-graduation Medical course In INDIA. MD stands for Doctor of Medicine and it involves 3-year Clinical training in the field of Medicine while doing MD students get specialty training to treat patients/diseases through non-surgical procedures i.e. with Medicines only.        </p>


              <div className="grid grid-cols-1 md:grid-cols-2  mt-4">
                {/* First half */}
                <ul className="list-none text-base md:text-xl  space-y-2 text-gray-800">
                  <li> <span className="text-blue-500 mr-2">➤</span>MD MS in DELHI NCR</li>
                  <li> <span className="text-blue-500 mr-2">➤</span>MD MS UTTAR PRADESH</li>
                  <li> <span className="text-blue-500 mr-2">➤</span>MD MS in KARNATAKA</li>
                  <li> <span className="text-blue-500 mr-2">➤</span> MD MS in RAJASTHAN</li>

                </ul>

                <ul className="list-none text-base md:text-xl list-inside space-y-2 text-gray-800">
                  <li> <span className="text-blue-500 mr-2">➤</span> MD MS in MAHARASHTRA</li>
                  <li> <span className="text-blue-500 mr-2">➤</span> MD MS in MADHYA PRADESH</li>
                  <li> <span className="text-blue-500 mr-2">➤</span> MD MS in UTTARAKHAND</li>
                  <li> <span className="text-blue-500 mr-2">➤</span> MD MS in BIHAR</li>
                </ul>

              </div>
            </p>


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
          <div className="container">
            <p className="text-gray-700 text-xl ">
              <h1 className=" font-bold text-blue-main  text-4xl mb-4">How to Apply for   <span className="text-gold-main">MD/MS in India </span></h1>
              <p className="text-2xl">    Candidates who have a valid MBBS or equivalent degree from India or other countries, which is recognized by MCI (Medical Council of India) can apply for the MD/MS course.
                Candidates must have cleared the Common Entrance Test NEET -PG (National Eligibility cum Entrance Test) for Medical Postgraduate Courses (MD/MS/PG -Diploma). NEET-PG exam is conducted by NBE in online mode throughout India.</p>
              <ul className="list-disc mt-5 list-inside space-y-2 text-gray-700">
                <h2 className=" font-bold text-blue-main  text-2xl mb-4">MD MS | Colleges and institutes IN STATES OF INDIA</h2>

                {states?.map((state, index) => (
                  <li className="text-Indixl" key={index}>{state}</li>
                ))}
              </ul>

              <div className="">
                <h2 className="text-2xl  font-bold text-blue-main mb-4 mt-5">
                  Branches Available in <span className="">MD/MS</span>
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
                    <p key={index} className="font-semibold text-xl">
                      {branch}
                    </p>
                  ))}
                </div>
              </div>


              <div className="container mt-10">
                <h1 className="text-4xl  font-bold text-blue-main ">
                  Career Scope After  <span className="text-gold-main">MD/MS</span>
                </h1>
                <div className="">
                  <ul className="list-disc mt-5 list-inside text-xl  text-gray-800">
                    <li className="mt-2" >Specialist doctor or consultant in government and private hospitals</li>
                    <li className="mt-2">Teaching faculty in medical colleges and universities
                      <li className="mt-2">Research and clinical trials in advanced medical sciences</li>
                      <li className="mt-2">Opportunities abroad through licensing exams like USMLE, PLAB, AMC</li>
                      <li className="mt-2">High earning potential in specialized fields like cardiology, radiology, and orthopedics</li>
                    </li>
                  </ul>
                </div>
              </div>
              

            </p>

          </div>
          <p className="text-2xl font-semibold mt-6">Pursuing MD/MS in India not only enhances knowledge but also provides professional
recognition, better career opportunities, and the ability to serve patients with advanced
medical expertise.</p>
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
