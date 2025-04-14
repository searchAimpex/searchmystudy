import React from 'react';
import { Container, Typography, Grid, Card, CardHeader, CardContent, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import bvScImage from '../../assets/BannerService.png';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const BvScIndia = () => {
  const documentsRequired = [
    "10th & 12th Marksheet",
    "NEET Scorecard",
    "Passport Size Photographs",
    "Aadhar Card",
    "Category Certificate (if applicable)"
  ];

  const admissionProcess = [
    "Appear for the NEET exam",
    "Apply to colleges through the centralized counseling process",
    "Participate in the counseling process and select your preferred college",
    "Complete the admission formalities at the allocated college",
  ];

  const bvscColleges = [
    { name: "Indian Veterinary Research Institute", location: "Bareilly, Uttar Pradesh" },
    { name: "College of Veterinary Science and Animal Husbandry", location: "Anand, Gujarat" },
    { name: "Rajiv Gandhi Institute of Veterinary Education and Research", location: "Puducherry" }
  ];

  const faqData = [
    { question: "What is the duration of the B.V.Sc & AH course?", answer: "The duration of the course is 5.5 years, including a compulsory internship." },
    { question: "What is the eligibility criteria for B.V.Sc & AH?", answer: "Students must have passed 10+2 with Physics, Chemistry, Biology, and English, and should have appeared for NEET." },
    { question: "What is the average salary after completing B.V.Sc & AH?", answer: "The average salary ranges from INR 5 LPA to INR 8 LPA." }
  ];

  const bvscSpecialisations = [
    "Animal Genetics and Breeding",
    "Veterinary Microbiology",
    "Veterinary Surgery & Radiology",
    "Animal Production & Management",
    "Animal Nutrition",
    "Livestock Production and Management",
    "Veterinary Medicine, Public Health & Hygiene",
    "Veterinary Pathology"
  ];

  return (
    <Container maxWidth="lg" className="py-8 px-4 sm:px-6 lg:px-12">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.8 }}
        className="relative w-full mb-12"
      >
        <img
          src={bvScImage}
          alt="Bachelor of Veterinary Sciences & Animal Husbandry"
          className="object-cover w-full h-64 sm:h-72 md:h-80 lg:h-[28rem] xl:h-[32rem] rounded-xl shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-300 to-green-100 opacity-60 rounded-xl" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-12 lg:px-20 space-y-4 sm:space-y-6">
          <Typography
            variant="p"
            className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl font-bold drop-shadow-md"
          >
            Bachelor in Veterinary Sciences & Animal Husbandry
          </Typography>

          <Typography
            variant="p"
            className="text-sm sm:text-base md:text-lg lg:text-2xl font-light drop-shadow-sm"
          >
            A comprehensive 5½ years program for aspiring veterinarians.
          </Typography>

        </div>
      </motion.div>

      {/* About Section */}
      <Grid container spacing={6} className="mb-12">
        <Grid item xs={12} md={8}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            transition={{ duration: 0.8 }}
          >
 <Typography
            variant="p"
            className="text-3xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl font-bold drop-shadow-md mb-6 text-blue-main"
          >
          About B.V.Sc & AH
          </Typography>
            {/* <Typography variant="h2" className="text-2xl md:text-4xl font-bold mb-6 text-blue-main">About B.V.Sc & AH</Typography> */}
            <Typography variant="body1" className="text-base md:text-lg mb-6 leading-relaxed">
              Bachelor in Veterinary Sciences & Animal Husbandry (B.V.Sc. & A.H.) is a 5½ years undergraduate program under the medical discipline. It focuses on the study of medical diagnostics and treatment of animal diseases. The course includes subjects like Veterinary Anatomy, Histology, Physiology, Biochemistry, Pharmacology, and Toxicology.
            </Typography>
            <Typography variant="body1" className="text-base md:text-lg mb-6 leading-relaxed">
              Eligibility: Students must have passed 10+2 with Physics, Chemistry, Biology, and English, with a minimum of 50% marks. The minimum age required is 19 years. NEET is the entrance exam required for admission.
            </Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4} className="hidden md:block">
          <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">Interested in Studying B.V.Sc & AH?</Typography>
              <Typography variant="body1" className="mb-4">
                Get expert guidance and counseling to help you make an informed decision about pursuing a career in veterinary sciences.
              </Typography>
              <Button variant="contained" color="primary" className="w-full">Contact Us</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Course Details Section */}
      <Typography variant="h2" className="text-2xl md:text-4xl font-bold mb-6 text-blue-main">Course Details</Typography>
      <Grid container spacing={6} className="mb-12">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className="text-xl font-semibold mb-4">Course Highlights</Typography>
          <Typography variant="body1" className="mb-4 text-sm sm:text-base">
            <strong>Course Level:</strong> Bachelor in Veterinary Sciences & Animal Husbandry<br />
            <strong>Duration:</strong> 5.5 Years<br />
            <strong>Eligibility:</strong> Passed 10+2 with Physics, Biology, Chemistry, and English<br />
            <strong>Examination Type:</strong> Entrance Exams or Merit<br />
            <strong>Course Fee:</strong> Up to INR 15,000 to 1 Lakh per annum<br />
            <strong>Average Salary:</strong> INR 5 LPA – INR 8 Lacs per annum<br />
            <strong>Top Recruiting Companies:</strong> Government and Private sectors<br />
            <strong>Course Mode:</strong> Full time
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className="text-xl font-semibold mb-4">Specializations</Typography>
          <Typography variant="body1" className="mb-4 text-sm sm:text-base">
            - Animal Genetics and Breeding<br />
            - Veterinary Microbiology<br />
            - Veterinary Surgery & Radiology<br />
            - Animal Production & Management<br />
            - Animal Nutrition<br />
            - Livestock Production and Management<br />
            - Veterinary Medicine, Public Health & Hygiene<br />
            - Veterinary Pathology
          </Typography>
        </Grid>
      </Grid>

      {/* Documents Required Section */}
      <Typography variant="h2" className="text-2xl md:text-4xl font-bold mb-6 text-blue-main">Documents Required</Typography>
      <Grid container spacing={6} className="mb-12">
        {documentsRequired.map((doc, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              transition={{ duration: 0.8 }}
            >
              <Card elevation={3} className="p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all">
                <Typography variant="body1" className="text-sm sm:text-base">{doc}</Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Admission Process Section */}
      <Typography variant="h2" className="text-2xl md:text-4xl font-bold mb-6 text-blue-main">Admission Process</Typography>
      <Grid container spacing={6} className="mb-12">
        {admissionProcess.map((step, index) => (
          <Grid item xs={12} key={index}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="body1" className="mb-2 text-sm sm:text-base">{step}</Typography>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Top B.V.Sc Colleges Section */}
      <Typography variant="h2" className="text-2xl md:text-4xl font-bold mb-6 text-blue-main">Top B.V.Sc Colleges in India</Typography>
      <Grid container spacing={6} className="mb-12">
        {bvscColleges.map((college, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              transition={{ duration: 0.8 }}
            >
              <Card elevation={3} className="p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all">
                <Typography variant="h6" className="font-semibold">{college.name}</Typography>
                <Typography variant="body2" className="text-gray-600">{college.location}</Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* FAQ Section */}
      <Typography variant="h2" className="text-2xl md:text-4xl font-bold mb-6 text-blue-main">Frequently Asked Questions (FAQs)</Typography>
      <Grid container spacing={6} className="mb-12">
        {faqData.map((faq, index) => (
          <Grid item xs={12} key={index}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              transition={{ duration: 0.8 }}
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" className="font-semibold text-sm sm:text-base">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" className="text-sm sm:text-base">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

};

export default BvScIndia;
