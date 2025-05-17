import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MdIndiaImage from "../../assets/AboutHero.png";
import AboutBamsImage from "../../assets/AboutHero.png";
import FutureScopeImage from "../../assets/AboutHero.png";
import EligibilityImage from "../../assets/AboutHero.png";
import FaqImage from "../../assets/AboutHero.png";
// import poster from "../../assets/Red and Yellow Abstract Study Abroad Facebook Post.JPG"
import image from "../../assets/BannerService-e90bab99.png"

const faq = [
  { question: "What is MD in India?", answer: "MD in India is a postgraduate degree that focuses on the study of medicine in a specialized field." },
  { question: "How to pursue MD in India?", answer: "To pursue MD in India, candidates must have..." },
];

const sections = [
  "About BAMS",
  "Analyzed Future Scope",
  "Eligibility Criteria",
  "Frequently Asked Questions"
];

const BamsIndia = () => {
  const controls = useAnimation();
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true });
  const { ref: futureScopeRef, inView: futureScopeInView } = useInView({ triggerOnce: true });
  const { ref: eligibilityRef, inView: eligibilityInView } = useInView({ triggerOnce: true });
  const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true });

  React.useEffect(() => {
    if (aboutInView) controls.start("visible");
    if (futureScopeInView) controls.start("visible");
    if (eligibilityInView) controls.start("visible");
    if (faqInView) controls.start("visible");
  }, [aboutInView, futureScopeInView, eligibilityInView, faqInView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepClick = (index) => {
    setActiveStep(index);
    const section = document.querySelector(`#section-${index}`);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Offset to account for potential fixed headers
        behavior: "smooth",
      });
    }
  };

  React.useEffect(() => {
    if (aboutInView) setActiveStep(0);
    if (futureScopeInView) setActiveStep(1);
    if (eligibilityInView) setActiveStep(2);
    if (faqInView) setActiveStep(3);
  }, [aboutInView, futureScopeInView, eligibilityInView, faqInView]);

  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      {/* Hero Section */}
      <div className="relative w-full h-[200px]">
        <img src={image} alt="" className="h-[200px] w-full object-cover" />

        <div className="absolute inset-0 pt-10 bg-gray-400  bg-opacity-50 ">
          <h1 className="text-white text-5xl font-bold  bg-opacity-50 px-4 py-2 rounded">
            Study BAMS in India
          </h1>

          <p className="px-4 text-white">
            Get Guidance From The Experts Who Will Lead You To Your Dreams . For Studying in Abroad Contact Us
          </p>
        </div>
      </div>


      {/* Stepper and Content Layout */}
      <Grid container spacing={5}>
        {/* Stepper */}


        {/* Main Content */}
        <div className="w-full px-4 md:px-8 py-8 bg-gray-50">
          {/* About BAMS */}
          <section className="mb-12">
            <div className=" rounded-2xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-600">About BAMS</h2>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6 items-center">
                <img
                  src={AboutBamsImage}
                  alt="About BAMS"
                  className="w-full rounded-xl object-cover max-h-[300px]"
                />
                <div className="text-gray-700 space-y-4">
                  <p>
                    After completing Class 12, candidates who want to pursue a career in medicine can enroll in the Bachelor of Ayurveda Medicine and Surgery (BAMS). In India, BAMS is an undergraduate medical program based on Ayurveda, the traditional healing arts.
                  </p>
                  <p>
                    The BAMS course covers all aspects of “Ashtanga Ayurveda,” as well as scientific advances in modern medicine and extensive practical training. The Central Council of Indian Medicine (CCIM) is the governing body for admission to Ayurveda education.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Future Scope */}
          <section className="mb-12">
            <div className="rounded-2xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-600">Analyzed Future Scope</h2>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6 items-center">
                <img
                  src={FutureScopeImage}
                  alt="Future Scope"
                  className="w-full rounded-xl object-cover max-h-[300px]"
                />
                <div className="text-gray-700 space-y-4">
                  <p>
                    Ayurveda, a traditional form of medicine that has been practiced in India for centuries, is gaining recognition worldwide. With the increasing awareness of alternative medicine, the demand for qualified Ayurvedic practitioners is on the rise.
                  </p>
                  <p>
                    BAMS graduates can pursue careers in clinical practice, research, teaching, or consultancy. They may also work in Ayurvedic hospitals, wellness centers, or herbal product companies.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Eligibility Criteria */}
          <section>
            <div className=" rounded-2xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-600">Eligibility Criteria</h2>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6 items-start">
                <img
                  src={EligibilityImage}
                  alt="Eligibility"
                  className="w-full rounded-xl object-cover max-h-[300px]"
                />
                <ul className="text-gray-700 space-y-4 list-disc pl-5">
                  <li>
                    Students must complete the Higher Secondary Examination with a minimum of 50% marks (General) or 40% (Reserved categories) in Science with Physics, Chemistry, and Biology.
                  </li>
                  <li>
                    They must also qualify for the entrance exam as per the university or institution guidelines.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div>
      {faq.map((item, index) => (
        <Accordion
          key={index}
          sx={{
            borderRadius: "10px",
            mb: 2,
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "#e7f0ff",
              borderRadius: "10px",
              minHeight: "56px",
            }}
          >
            <Typography fontWeight="bold" color="#007bff">
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="#555">{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
      </Grid>
    </div>
  );
};

export default BamsIndia;