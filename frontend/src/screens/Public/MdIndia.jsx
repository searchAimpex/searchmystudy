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
      <section className="relative flex flex-col lg:flex-row items-center space-x-10 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-200 py-8 md:px-12 lg:px-24 overflow-hidden shadow-lg rounded-lg">
        {/* Left Side: Image */}
        <motion.div
          className="flex-1 w-full lg:w-1/2 flex items-center justify-center mb-8 lg:mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <img src={MdIndiaImage} alt="MD in India" className="w-full h-auto rounded-lg" />
        </motion.div>
        {/* Right Side: Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-md"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            MD in India
          </motion.h1>
          <motion.h2
            className="mt-4 text-xl md:text-2xl lg:text-3xl font-semibold text-gray-100 drop-shadow-sm"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Advance Your Medical Career
          </motion.h2>
        </motion.div>
      </section>

      {/* Two-Column Section */}
      <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-8 lg:px-24">
        {/* Content Column */}
        <motion.div className="space-y-10" initial="hidden" animate="visible" variants={sectionVariants}>
          {/* About Section */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader title="About MD/MS in India" className="text-blue-main flex items-center justify-center" />
            <CardContent>
              <Typography variant="body2" color="textSecondary" className="leading-relaxed text-gray-600">
                MD/MS in India is one of the most prominent career options for students looking to pursue a postgraduate medical course in India. MD stands for Doctor of Medicine and it involves 3-year clinical training in the field of Medicine. MS stands for Master of Surgery and it involves 3-year clinical training in the field of Surgery.
              </Typography>
            </CardContent>
          </Card>

          {/* Branches Available Section */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader title="Branches Available in MD/MS" className="text-blue-main flex items-center justify-center" />
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {branches?.map((branch, index) => (
                  <li key={index} className="text-gray-600">{branch}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* States Offering MD/MS */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader title="MD/MS Colleges and Institutes by State" className="text-blue-main flex items-center justify-center" />
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {states?.map((state, index) => (
                  <li key={index} className="text-gray-600">{state}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Admission Information */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader title="MD / MS Admission in India" className="text-blue-main flex items-center justify-center" />
            <CardContent>
              <Typography variant="body2" color="textSecondary" className="leading-relaxed text-gray-600">
                To get admission to MD/MS in India, an aspirant must qualify for the NEET-PG entrance test conducted by NBE every year. After qualifying, students undergo Central and State level NEET-PG counseling.
              </Typography>
            </CardContent>
          </Card>

          {/* How to Apply Section */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader title="How to Apply for MD/MS in India" className="text-blue-main flex items-center justify-center" />
            <CardContent>
              <Typography variant="body2" color="textSecondary" className="leading-relaxed text-gray-600">
                Candidates with a valid MBBS degree recognized by the MCI can apply for the MD/MS course after clearing the NEET-PG exam, conducted online by NBE across India.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar Column */}
        <motion.div className="space-y-10" initial="hidden" animate="visible" variants={sectionVariants}>
          {/* FAQ Section */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader title="Frequently Asked Questions" className="text-blue-main flex items-center justify-center" />
            <CardContent>
              {faq?.map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                    <Typography variant="subtitle1" className="font-medium text-gray-700">
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" className="text-gray-600">
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>

          {/* Blog Section */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader title="Recent Blogs" className="text-blue-main flex items-center justify-center" />
            <CardContent>
              <ul className="space-y-4">
                {blogs.map((blog, index) => (
                  <li key={index}>
                    <Typography variant="h6" className="font-semibold text-blue-600 hover:underline cursor-pointer">
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className="leading-relaxed text-gray-600">
                      {blog.description}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default MdIndia;
