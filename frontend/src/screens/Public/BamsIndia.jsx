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
              <div className="p-6 bg-gradient-to-r from-blue-100 via-blue-300 rounded-xl to-green-200 mt-6 ml-8">
                <h2 className="text-2xl md:text-4xl font-bold text-blue-600 h-[20] text-white  text-center ">About BAMS</h2>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-6 items-center">
                <img
                  src={AboutBamsImage}
                  alt="About BAMS"
                  className="w-full rounded-xl object-cover max-h-[300px]"
                />
                <div className="text-gray-700 space-y-4">
                  <p className="text-lg">
                    After completing Class 12, candidates who want to pursue a career in medicine can enroll in the Bachelor of Ayurveda Medicine and Surgery (BAMS). In India, BAMS is an undergraduate medical program based on Ayurveda, the traditional healing arts. The BAMS course covers all aspects of “Ashtanga Ayurveda,” as well as scientific advances in modern medicine and extensive practical training. The Central Council of Indian Medicine (CCIM) is the governing body for admission to Ayurveda education at both the undergraduate and postgraduate levels, as well as the practice of Ayurveda medicine in India. Ayurveda is one of the oldest medical systems, dating back to Vedic times. Its treatment are known for the natural elements they contain and are based on the curative properties of herbs. Even the World Health Organization has set up a global forum to promote traditional medicine systems like Ayurveda. As a result, the Bachelor of Ayurveda Medicine and Surgery (BAMS) program has provided students with numerous promising opportunities.</p>
                  <p className="text-lg">
                    The BAMS course covers all aspects of “Ashtanga Ayurveda,” as well as scientific advances in modern medicine and extensive practical training. The Central Council of Indian Medicine (CCIM) is the governing body for admission to Ayurveda education.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Future Scope */}
          <section className="mb-12  ">
            <div className="rounded-2xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-100 via-blue-300 rounded-xl to-green-200 mt-6 ml-8">
                <h2 className="text-2xl md:text-4xl font-bold text-blue-600 h-[20] text-white  text-center ">Analyzed Future Scope</h2>
              </div>

              <p className="text-lg pl-8 pt-5">
                Because of the growing popularity and recognition of the benefits of natural aspects in the Ayurvedic medical system, BAMS students will have plenty of future opportunities in India and other advanced nations like the United States. While traditional notions such as Ayurveda or Yoga have long been prevalent in various parts of the nation, they are now gaining traction around the world, with so many people bringing this treasure back to their nations.
                As a result, the program and its understanding and professional experience have a lot of potential for future employment in a variety of relevant verticals.</p>
            </div>
          </section>

          {/* Eligibility Criteria */}
          <section>
            <div className=" rounded-2xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-100 via-blue-300 rounded-xl to-green-200 mt-6 ml-8">
                <h2 className="text-2xl md:text-4xl font-bold text-blue-600 h-[20] text-white  text-center "> Colleges and universities in India that provide the BAMS </h2>
              </div>
              <div className="p-6">
                <h2 className="text-2xl  md:text-5xl font-bold text-blue-main pl-3">Eligibility Criteria</h2>
              </div>
              <p>
                <p className="text-2xl pl-7">
                  Aspirants must meet certain eligibility requirements to be admitted to the BAMS program. The following are some basic BAMS eligibility criteria:
                </p>

              </p>
              <div className="p-6 w-[100%]  grid md:grid-cols-2 gap-6 items-start">


                <div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mt-1 mr-2">✔</span>
                      <span>
                        Candidates must have passed a Class 12 or equivalent examination with science subjects (Physics, Chemistry, and Biology) and an English core in both Class 11 and 12.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mt-1 mr-2">✔</span>
                      <span>He or she must be at least 17 years old at the time of admission.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mt-1 mr-2">✔</span>
                      <span>
                        A general category aspirant must obtain a minimum of 50% in their Class 12 Board examination. The qualifying percentage for SC/ST/OBC candidates is 40%.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mt-1 mr-2">✔</span>
                      <span>
                        To be admitted to the BAMS course, candidates must have passed the NEET with a minimum qualifying cutoff percentile.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mt-1 mr-2">✔</span>
                      <span>
                        For international students, any other equivalent qualification recognised by the university will be accepted.
                      </span>
                    </li>
                  </ul>

                </div>



                {/* <img
                  src={EligibilityImage}
                  alt="Eligibility"
                  className="w-full rounded-xl object-cover max-h-[300px]"
                /> */}
                {/* <ul className="text-gray-700 space-y-4 list-disc pl-5">
                  <li>
                    Students must complete the Higher Secondary Examination with a minimum of 50% marks (General) or 40% (Reserved categories) in Science with Physics, Chemistry, and Biology.
                  </li>
                  <li>
                    They must also qualify for the entrance exam as per the university or institution guidelines.
                  </li>
                </ul> */}
              </div>


              <div>
                  

              <div class="overflow-x-auto p-4 space-y-10">
  {/* <!-- UTTAR PRADESH Table --> */}
  <table class="table-auto w-full border border-gray-300">
    <thead class="bg-gray-100">
      <tr>
        <th class="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">UTTAR PRADESH (INDIA) Colleges</th>
        <th class="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">Location</th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="border px-4 py-2">Guru Gorakshnath Institute of Medical Sciences</td><td class="border px-4 py-2">Gorakhpur</td></tr>
      <tr><td class="border px-4 py-2">SAS Ayurvedic Medical College and Hospital</td><td class="border px-4 py-2">Varanasi</td></tr>
      <tr><td class="border px-4 py-2">Kalawati Ayurvedic Medical College and Research Center</td><td class="border px-4 py-2">Kasganj</td></tr>
      <tr><td class="border px-4 py-2">Shamm-E-Gausiya Minority Ayurvedic Medical College</td><td class="border px-4 py-2">Ghazipur</td></tr>
      <tr><td class="border px-4 py-2">Gangasheel Ayurvedic Medical College &amp; Hospital</td><td class="border px-4 py-2">Bareilly</td></tr>
      <tr><td class="border px-4 py-2">Ankerite Ayurvedic Medical College &amp; Hospital</td><td class="border px-4 py-2">Lucknow</td></tr>
      <tr><td class="border px-4 py-2">Sardar Patel Institute of Ayurvedic Medical Sciences &amp; Research Centre</td><td class="border px-4 py-2">Lucknow</td></tr>
      <tr><td class="border px-4 py-2">RB Ayurvedic Medical College &amp; Hospital</td><td class="border px-4 py-2">Agra</td></tr>
      <tr><td class="border px-4 py-2">R.K. Ayurvedic Medical College and Hospital</td><td class="border px-4 py-2">Azamgarh</td></tr>
      <tr><td class="border px-4 py-2">Jeevan Jyoti Ayurvedic Medical College &amp; Hospital</td><td class="border px-4 py-2">Aligarh</td></tr>
    </tbody>
  </table>

  {/* <!-- MAHARASHTRA Table --> */}
  <table class="table-auto w-full border border-gray-300">
    <thead class="bg-gray-100 ">
      <tr>
        <th class="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">MAHARASHTRA (INDIA) Colleges</th>
        <th class="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">Location</th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="border px-4 py-2">YMT Ayurvedic College</td><td class="border px-4 py-2">Navi Mumbai</td></tr>
      <tr><td class="border px-4 py-2">Ayurvedic Medical College</td><td class="border px-4 py-2">Nalasopara</td></tr>
      <tr><td class="border px-4 py-2">BSD Trust’s Ayurvedic Mahavidyalaya Vaghol</td><td class="border px-4 py-2">Pune</td></tr>
      <tr><td class="border px-4 py-2">PDEA’s Ayurved Mahavidyalaya and Sanshodhan Kendra</td><td class="border px-4 py-2">Pune</td></tr>
      <tr><td class="border px-4 py-2">Sumatibhai Shah Ayurved Mahavidyalaya Hadapsar</td><td class="border px-4 py-2">Pune</td></tr>
      <tr><td class="border px-4 py-2">Ayurvedic Medical College</td><td class="border px-4 py-2">Kolhapur</td></tr>
      <tr><td class="border px-4 py-2">JJ Magdum Ayurved Mahavidyalay</td><td class="border px-4 py-2">Jaisingpur</td></tr>
      <tr><td class="border px-4 py-2">Yeshwant Ayurvedic Mahavidyalaya</td><td class="border px-4 py-2">Kolhapur</td></tr>
      <tr><td class="border px-4 py-2">LKRSS Ayurvedic College</td><td class="border px-4 py-2">Kolhapur</td></tr>
      <tr><td class="border px-4 py-2">Hon. Shri. Annasaheb Dange Ayu. Med. Col.</td><td class="border px-4 py-2">Sangli</td></tr>
      {/* <!-- Add more Maharashtra rows below as needed, using the same structure --> */}
    </tbody>
  </table>
</div>



              </div>
            </div>
          </section>
        </div>

        <div className=" w-[100%]">
          {faq.map((item, index) => (
            <Accordion
              key={index}
              sx={{
                borderRadius: "10px",
                mb: 2,
                minWidth: "80%",
                ml: 5,
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