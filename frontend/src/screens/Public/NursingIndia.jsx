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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
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

  const overviewControls = useAnimation();
  const courseControls = useAnimation();
  const educationControls = useAnimation();
  const detailsControls = useAnimation();
  const eligibilityControls = useAnimation();
  const faqControls = useAnimation();

  const handleScroll = () => {
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          switch (entry.target) {
            case overviewRef.current:
              overviewControls.start('visible');
              break;
            case courseRef.current:
              courseControls.start('visible');
              break;
            case educationRef.current:
              educationControls.start('visible');
              break;
            case detailsRef.current:
              detailsControls.start('visible');
              break;
            case eligibilityRef.current:
              eligibilityControls.start('visible');
              break;
            case faqRef.current:
              faqControls.start('visible');
              break;
            default:
              break;
          }
        }
      });
    }, options);

    observer.observe(overviewRef.current);
    observer.observe(courseRef.current);
    observer.observe(educationRef.current);
    observer.observe(detailsRef.current);
    observer.observe(eligibilityRef.current);
    observer.observe(faqRef.current);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Banner Section */}
      <div className="relative">
        <img src={bannerImage} alt="Banner" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-transparent to-transparent">
          <Typography variant="h2" className="text-white font-bold text-center p-4">
            Elevate Your Nursing Career
          </Typography>
          <button className="mt-4 px-6 py-2 bg-blue-main text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </div>
      </div>

      <Container className="p-8">
        {/* Header Section */}
        <Typography variant="h3" gutterBottom className="text-blue-main font-bold text-center mb-6">
          B.Sc Nursing
        </Typography>

        {/* Overview Section */}
        <motion.div
          ref={overviewRef}
          initial="hidden"
          animate={overviewControls}
          variants={slideIn}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Card elevation={5} className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader title="Overview" className="bg-blue-main text-white" />
            <CardContent>
              <img src={nursingImage} alt="Nursing" className="w-full h-auto rounded-lg mb-4" />
              <Typography variant="body1">
                Bachelor of Nursing (B.Sc. in Nursing) is an undergraduate course that trains students in general nursing practices. The programme focuses on mastering various aspects of paramedical studies.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* Nursing Course Section */}
        <motion.div
          ref={courseRef}
          initial="hidden"
          animate={courseControls}
          variants={slideIn}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Card elevation={5} className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader title="Nursing Course" className="bg-blue-main text-white" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img src={courseImage} alt="Nursing Course" className="w-full h-auto rounded-lg" />
                </Grid>
                <Grid item xs={12} md={6} className="flex flex-col justify-center">
                  <Typography variant="body1" className="mb-2">
                    We are India’s most trusted and fastest growing Admission Consulting Company. Our innovative and exclusively designed counselling programs help you accomplish your dream to become a Nurse.
                    Our exclusively designed smart counselling process has made us a force to reckon with in the highly competitive industry.
                    With our commendable track record in such a short span of time, University Expert has become the most sought after consulting firm for medical admissions in India through NEET UG & NEET PG aspirants. With the help of our associates, we are able to extend our support to medical aspirants across Mumbai, Delhi, Bangalore, Kolkata, Chennai, Lucknow, Patna, Ranchi, Chandigarh, Jaipur, Dehradun, Ahmedabad, Bhubaneshwar, Raipur, Bhopal, Gurgaon, Indore, Nagpur, and Guwahati.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* About Nursing Education Section */}
        <motion.div
          ref={educationRef}
          initial="hidden"
          animate={educationControls}
          variants={slideIn}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Card elevation={5} className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader title="About Nursing Education" className="bg-blue-main text-white" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img src={educationImage} alt="Nursing Education" className="w-full h-auto rounded-lg" />
                </Grid>
                <Grid item xs={12} md={6} className="flex flex-col justify-center">
                  <Typography variant="body1">
                    Nursing education involves practical training provided to students with the purpose to prepare them for their future duties as nursing care professionals. To apply skills to practice settings, clinical experiences are important for the students mentioned that approximately 50% of any nursing curriculum is dedicated to clinical education. This clinical education is provided to nursing students by experienced college teachers, nursing preceptors and other medical professionals who are qualified in this educational task, use many techniques to organize students’ clinical experiences and supervision.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* B.Sc Nursing Details Section */}
        <motion.div
          ref={detailsRef}
          initial="hidden"
          animate={detailsControls}
          variants={slideIn}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Card elevation={5} className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader title="B.Sc Nursing Details" className="bg-blue-main text-white" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img src={detailsImage} alt="Nursing Details" className="w-full h-auto rounded-lg" />
                </Grid>
                <Grid item xs={12} md={6} className="flex flex-col justify-center">
                  <Typography variant="body1"><strong>Duration:</strong> 4 years</Typography>
                  <Typography variant="body1"><strong>Eligibility:</strong> 10+2 with science subjects</Typography>
                  <Typography variant="body1"><strong>Mode:</strong> Full-time</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Eligibility Criteria Section */}
        <motion.div
          ref={eligibilityRef}
          initial="hidden"
          animate={eligibilityControls}
          variants={slideIn}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Card elevation={5} className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader title="Eligibility Criteria" className="bg-blue-main text-white" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img src={eligibilityImage} alt="Eligibility Criteria" className="w-full h-auto rounded-lg" />
                </Grid>
                <Grid item xs={12} md={6} className="flex flex-col justify-center">
                  <Typography variant="body1">
                    To be eligible for B.Sc Nursing, candidates generally need to have completed their 10+2 education with science subjects (Physics, Chemistry, and Biology). Additionally, certain institutions may have specific requirements or entrance exams.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQs Section */}
        <motion.div
          ref={faqRef}
          initial="hidden"
          animate={faqControls}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Typography variant="h4" gutterBottom className="text-blue-main font-bold text-center mb-6">
            Frequently Asked Questions
          </Typography>
          {faqList.map((faq, index) => (
            <Accordion key={index} className="mb-4 border-none rounded-lg shadow-sm">
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-blue-main text-white">
                <Typography variant="body1">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails className="bg-gray-100 p-4 rounded-b-lg">
                <Typography variant="body2">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </motion.div>
      </Container>
    </div>
  );
};

export default NursingIndia;
