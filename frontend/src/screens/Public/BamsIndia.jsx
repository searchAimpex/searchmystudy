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
import AboutBamsImage from "../../assets/india-banners/BAMS-(Edited).jpg";
import FutureScopeImage from "../../assets/AboutHero.png";
import EligibilityImage from "../../assets/AboutHero.png";
import FaqImage from "../../assets/AboutHero.png";
// import poster from "../../assets/Red and Yellow Abstract Study Abroad Facebook Post.JPG"
import image from "../../assets/india-banners/BAMS.jpg"

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
  const colleges = [
    { name: "YMT AYURVEDIC COLLEGE", location: "NAVI MUMBAI" },
    { name: "AYURVEDIC MEDICAL COLLEGE", location: "NALASOPARA" },
    { name: "BSD TRUST’S AYURVEDIC MAHAVIDYALAYA VAGHOL", location: "PUNE" },
    { name: "PDEA’s AYURVED MAHAVIDYALAYA AND SANSHODHAN KENDRA", location: "PUNE" },
    { name: "SUMATIBHAI SHAH AYURVED MAHAVIDYALAYA HADAPSAR", location: "PUNE" },
    { name: "AYURVEDIC MEDICAL COLLEGE", location: "KOLHAPUR" },
    { name: "JJ MAGDUM AYURVED MAHAVIDYALAY", location: "JAISINGPUR" },
    { name: "YESHWANT AYURVEDIC MAHAVIDYALAYA", location: "KOLHAPUR" },
    { name: "LKRSS AYURVEDIC COLLEGE", location: "KOLHAPUR" },
    { name: "HON.SHRI.ANNASAHEB DANGE AYU. MED. COL.", location: "SANGLI" },
    { name: "SANGAM SEVABHAVI TRUST’S AYURVEDIC COLLEGE", location: "SANGAMNER" },
    { name: "SHRI VIVEKANAND NURSING HOME’S AYU.COL.", location: "RAHURI" },
    { name: "PRAVARA MED. TRUST’S AYU MAHAVIDYALAY & EKNATH AYU HOSP", location: "AHMEDNAGAR" },
    { name: "SIDDHAKALA AYURVED MAHAVIDYALAYA", location: "SANGAMNER" },
    { name: "SHREE SAPTASHRINGI AYURVEDIC COLLEGE", location: "NASIK" },
    { name: "KC AJMERA AYURVED MAHAVIDYALAYA", location: "DHULE" },
    { name: "KDMG AYURVEDIC MEDICAL COLLEGE", location: "CHALISGAON" },
    { name: "CHAITANYA AYURVED MAHAVIDYALAYA", location: "SAKEGAON" },
    { name: "ASHVIN RURAL AYURVED MAHAVIDYALAY", location: "SANGAMNER" },
    { name: "LRP AYURVED MAHAVIDYALAYA", location: "SANGLI" },
    { name: "MES AYURVED MAHAVIDYALAYA", location: "RATNAGIRI" },
    { name: "SMBT AYURVED MAHAVIDYALAY", location: "NASIK" },
    { name: "MATOSHRI ASARABAI DARADE AYURVED MAHAVIDYALAY", location: "NASIK" },
    { name: "SAI AYURVEDIC COLLEGE", location: "SOLAPUR" },
    { name: "SWAMI VIVEKANAND AYURVEDIC COLLEGE", location: "AHMEDNAGAR" },
    { name: "SANT GAJANAN MAHARAJ AYURVEDIC COLLEGE", location: "GADHINGLAJ" },
    { name: "DR DEEPAK PATIL AYURVEDIC COLLEGE", location: "KOLHAPUR" },
    { name: "ASVM’s BHIMASHANKAR AYURVEDIC COLLEGE", location: "PUNE" },
    { name: "B.R. HARNE AYURVEDIC COLLEGE", location: "AMBERNATH" },
    { name: "RASHTRASANT JANARDAN SWAMI AYURVEDIC COLLEGE", location: "AHMEDNAGAR" },
    { name: "IDEAL COLLEGE OF AYURVED", location: "PALGHAR" },
    { name: "ASHOKRAO MANE AYURVEDIC MEDICAL COLLEGE", location: "KOLHAPUR" },
    { name: "MATOSHRI AYURVED MAHAVIDYALAY", location: "NASHIK" },
    { name: "GRAMIN AYURVED MAHAVIDYALAYA", location: "NAVEGAON" },
    { name: "SHREE GAJANAN MAHARAJ SANSTHAN AYU. COL.", location: "PUSAD YAVATMAL" },
    { name: "APES’S MS AYURVEDIC M COLLEGE", location: "GONDIA" },
    { name: "SUNIL RAMSINGHJI CHUNAWALA AYU. MAHA.", location: "BULDHANA" },
    { name: "JUPITER AYURVEDIC MEDICAL COLLEGE", location: "NAGPUR" },
    { name: "SKR PANDAV AYURVED MAHAVIDYALAYA", location: "NAGPUR" },
    { name: "MUPS AYURVED MAHAVIDYALAYA", location: "WASHIM" },
    { name: "SMT. VIMLADEVI AYURVEDIC COLLEGE", location: "CHANDRAPUR" },
    { name: "ASPM AYURVED COLLEGE AND RESEARCH INSTITUTE", location: "BULDHANA" },
    { name: "DR.R.N.LAHOTI AYURVDIC COLLEGE", location: "BULDHANA" },
    { name: "DR. RAJENDRA GHODE AYU. MAHAVIDYALAYA", location: "AMRAVATI" },
    { name: "B MULAK AYURVED MAHAVIDYALAYA", location: "NAGPUR" },
    { name: "DATTA MEGHE AYURVED MEDICAL COLLEGE", location: "NAGPUR" },
    { name: "SMT. SHANLINITAI MEGHE AYURVED COLLEGE", location: "BHILEWADA" },
    { name: "CSMSS AYURVED MAHAVIDYALAYA", location: "AURANGABAD" },
    { name: "LATE BABRUWAN VILLALRAO KALE AYURVED COLLEGE", location: "LATUR" },
    { name: "BSPM’S DHANWANTARI AYU. MAHAVIDYALAYA UDGIR", location: "LATUR" },
    { name: "BSS’S RAMRAO PATIL AYU. MAHAVIDYALAYA", location: "PURNA" },
    { name: "SAU. SHANTADEVI VEDPRAKASH PATIL AYURVED MAHAVIDYALAYA", location: "HINGOLI" },
    { name: "SHIVA TRUST’S YESHVANTRAO CHAVAN AYURVED MAHAVIDYALAYA", location: "AURANGABAD" },
    { name: "DR.VEDPRAKASH AYURVED MAHAVIDYALAYA REVGAON", location: "JALNA" },
    { name: "ANAND AYURVED MEDICAL COLLEGE", location: "VAIJAPUR" },
    { name: "SAI AYURVEDIC MEDICAL COLLEGE AND RESEARCH", location: "AURANGABAD" },
    { name: "DHANESHWARI AYURVEDIC COLLEGE", location: "AURANGABAD" },
  ];

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

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
      <div className="">
        <img src={image} alt="" className=" w-full object-cover" />
{/* 
        <div className="absolute inset-0 pt-10 bg-gray-400  bg-opacity-50 ">
          <h1 className="text-white text-5xl font-bold  bg-opacity-50 px-4 py-2 rounded">
            Study BAMS in India
          </h1>

          <p className="px-4 text-white">
            Get Guidance From The Experts Who Will Lead You To Your Dreams . For Studying in Abroad Contact Us
          </p>
        </div> */}
      </div>


      {/* Stepper and Content Layout */}
      <Grid container spacing={5}>
        {/* Stepper */}


        {/* Main Content */}
        <div className="w-full px-4 md:px-8 py-8 bg-gray-50">
          {/* About BAMS */}
        <section className="">
  <div className="rounded-2xl overflow-hidden">
    <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
      
    

      {/* Text Section */}
      <div className="w-full    leading-relaxed space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-blue-main">
          About BAMS
        </h2>
        <p className="text-2xl ">
          After completing Class 12, candidates who want to pursue a career in
          medicine can enroll in the Bachelor of Ayurveda Medicine and Surgery
          (BAMS). In India, BAMS is an undergraduate medical program based on
          Ayurveda, the traditional healing arts. The BAMS course covers all
          aspects of “Ashtanga Ayurveda,” as well as scientific advances in
          modern medicine and extensive practical training. The Central Council
          of Indian Medicine (CCIM) is the governing body for admission to
          Ayurveda education at both the undergraduate and postgraduate levels,
          as well as the practice of Ayurveda medicine in India. Ayurveda is one
          of the oldest medical systems, dating back to Vedic times. Its
          treatment are known for the natural elements they contain and are
          based on the curative properties of herbs. Even the World Health
          Organization has set up a global forum to promote traditional medicine
          systems like Ayurveda. As a result, the Bachelor of Ayurveda Medicine
          and Surgery (BAMS) program has provided students with numerous
          promising opportunities.
        </p>
        <p className="text-2xl">
          The BAMS course covers all aspects of “Ashtanga Ayurveda,” as well as
          scientific advances in modern medicine and extensive practical
          training. The Central Council of Indian Medicine (CCIM) is the
          governing body for admission to Ayurveda education.
        </p>
        
      </div>
    </div>
  </div>
</section>

          {/* Future Scope */}
          <section className="mb-12  ">
            <div className="rounded-2xl overflow-hidden">
              {/* <div className="p-6 bg-gradient-to-r from-blue-100 via-blue-300 rounded-xl to-green-200 mt-6 ml-8">
              </div> */}
                <h2 className="text-2xl pl-8 md:text-4xl font-bold text-blue-main  ">Analyzed Future Scope</h2>

              <p className="text-2xl pl-8 pt-5">
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
              <div className="p-6 gap-6 items-start">


                <div>
                  <ul className="space-y-2 text-2xl">
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


                <div class="overflow-x-auto text-2xl p-4 space-y-10">
                  {/* <!-- UTTAR PRADESH Table --> */}
                  <table class="table-auto w-full border border-gray-300">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="border border-gray-300 px-4 py-2 text-left text-lg font-semibold"> Colleges (INDIA)</th>
                        <th class="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">Location</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {[
                        ["Guru Gorakshnath Institute of Medical Sciences", "Gorakhpur"],
                        ["SAS Ayurvedic Medical College and Hospital", "Varanasi"],
                        ["Kalawati Ayurvedic Medical College and Research Center", "Kasganj"],
                        ["Shamm-E-Gausiya Minority Ayurvedic Medical College", "Ghazipur"],
                        ["Gangasheel Ayurvedic Medical College & Hospital", "Bareilly"],
                        ["Ankerite Ayurvedic Medical College & Hospital", "Lucknow"],
                        ["Sardar Patel Institute of Ayurvedic Medical Sciences & Research Centre", "Lucknow"],
                        ["RB Ayurvedic Medical College & Hospital", "Agra"],
                        ["R.K. Ayurvedic Medical College and Hospital", "Azamgarh"],
                        ["Jeevan Jyoti Ayurvedic Medical College & Hospital", "Aligarh"],
                        ["Dr. Vijay Ayurvedic Medical College Hospital & Research Center", "Varanasi"],
                        ["Prakash Institute of Ayurvedic Medical Sciences and Research", "Bulandshahr"],
                        ["Shri Ramchandra Vaidya Ayurvedic Medical College & Hospital", "Lucknow"],
                        ["Shivalik Ayurvedic Medical College", "Azamgarh"],
                        ["WTM Ayurvedic Medical College & Hospital", "Amroha"],
                        ["G S Ayurveda Medical College & Hospital", "Hapur"],
                        ["Shri Babu Singh Jay Singh Ayurvedic Medical College and Hospital", "Farrukhabad"],
                        ["S.R.S. Ayurvedic Medical College", "Agra"],
                        ["Bapu Ayurvedic Medical College and Hospital", "Mau"],
                        ["SKS Ayurvedic Medical College & Hospital", "Mathura"],
                        ["Shree Satya Ayurvedic Medical College & Hospital", "Moradabad"],
                        ["Sanjeevani Ayurvedic Medical College", "Amroha"],
                        ["Vaidya Yagya Dutt Sharma Ayurved Mahavidyalaya", "Bulandshahr"],
                        ["Sanskriti Ayurvedic Medical College & Hospital", "Mathura"],
                        ["Prabuddh Ayurvedic Medical College, Hospital and Research Center", "Lucknow"],
                        ["Dhanvantari Ayurvedic Medical College and Hospital", "Bareilly"],
                        ["Kunwar Shekhar Vijendra Ayurved Medical College & Research Center", "Gangoh"],
                        ["Divya Jyoti Ayurvedic Medical College & Hospital", "Modinagar"],
                        ["Vivek College of Ayurvedic Sciences and Hospital", "Bijnor"],
                        ["Sri Sai Ayurvedic Medical College and Hospital", "Aligarh"],
                        ["Jeevak Ayurvedic Medical College And Hospital Research Centre", "Chandauli"]
                      ].map(([name, city], index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          {/* <td className="px-4 py-2 border-b">{index + 1}</td> */}
                          <td className="px-4 py-2 border-b">{name}</td>
                          <td className="px-4 py-2 border-b">{city}</td>
                        </tr>
                      ))}
                      {colleges.map((college, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 "
                        >
                          <td className="px-6 text-gray-800">
                            {toTitleCase(college.name)}
                          </td>
                          <td className="px-6 py-2 text-gray-600 ">
                            {toTitleCase(college.location)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* <!-- MAHARASHTRA Table --> */}
                  <table class="table-auto w-full border border-gray-300">
                    {/* <thead class="bg-gray-100 ">
      <tr>
        <th class="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">MAHARASHTRA (INDIA) Colleges</th>
        <th class="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">Location</th>
      </tr>
    </thead> */}
                    <tbody>

                    </tbody>

                  </table>
                </div>



              </div>
            </div>
          </section>
        </div>

        <div className="w-[200%] flex justify-center">
          <div className="w-full max-w-6xl">
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
                  // Added margin bottom spacing
                  marginBottom: "16px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: "#e7f0ff",
                    borderRadius: "10px",
                    minHeight: "56px",
                    "& .MuiAccordionSummary-content": {
                      margin: 0,
                    },
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
        </div>
      </Grid>
    </div>
  );
};

export default BamsIndia;