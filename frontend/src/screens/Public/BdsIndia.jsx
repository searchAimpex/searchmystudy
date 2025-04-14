import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HeroImage from '../../assets/BannerService.png'; // Adjust path as needed
import { motion } from 'framer-motion';

// Scroll animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const BdsIndia = () => {
  const eligibilityData = [
    { title: 'Minimum Qualification Required', detail: '10+2 (Chemistry, Biology & Physics)' },
    { title: 'Minimum Marks Required', detail: '50% (for General category students) and 40% (for reserved category students)' },
    { title: 'Minimum Age Required', detail: '17 years' },
    { title: 'Upper Age Limit', detail: '25 Years' },
  ];

  const documentsRequired = [
    '10th marks card',
    '12th pass certificate and mark sheet',
    'Migration certificate',
    'Transfer certificate',
    'NEET admit card',
    'NEET scorecard',
    'Document for date of birth',
    'Identity proof',
    'A medical certificate, if applicable',
    'Income certificate, if applicable',
    'Community or caste certificate, if applicable',
  ];

  const admissionProcess = [
    'Admission is done on the basis of national or institute-level entrance exams.',
    'The biggest and nationally accepted entrance exam for BDS is NEET (National Eligibility cum Entrance Test).',
  ];

  const faqData = [
    { question: 'What is BDS?', answer: 'BDS stands for Bachelor of Dental Surgery, which is a professional degree in dentistry.' },
    { question: 'What are the eligibility criteria for BDS?', answer: 'Eligibility criteria include having completed 10+2 with Physics, Chemistry, and Biology with a minimum of 50% marks.' },
  ];

  const bdsColleges = [
    { name: 'Dr. DY Patil Dental College and Hospital', location: 'Navi Mumbai' },
    { name: 'Dr. DY Patil Dental College and Hospital', location: 'Pune' },
    { name: 'Kalinga Institute of Dental Sciences', location: 'Bhubaneswar' },
    { name: 'Manipal College of Dental Science', location: 'Mangalore' },
    { name: 'Bharati Vidyapeeth DU Dental College and Hospital', location: 'Pune' },
    { name: 'BVDU Dental College and Hospital', location: 'Sangli' },
    { name: 'Indira Gandhi Dental College', location: 'Pondicherry' },
    { name: 'Sree Balaji Dental College and Hospital', location: 'Chennai' },
    { name: 'Sri Ramachandra Dental and Hospital', location: 'Chennai' },
    { name: 'Santosh Dental College and Hospital', location: 'Ghaziabad' },
    { name: 'Manav Rachna Dental College', location: 'Faridabad' },
    { name: 'Sathyabama Dental College and Hospital', location: 'Chennai' },
    { name: 'M.M. College of Dental Sciences and Research', location: 'Haryana' },
    { name: 'Yenepoya Dental College', location: 'Yenepoya' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative text-center text-white">
        <div className="relative w-full h-[25vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <img
            src={HeroImage}
            alt="Hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="shine-bar"></div> {/* Shine effect layer */}
        </div>


        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 sm:p-1 md:p-12 bg-black bg-opacity-40  rounded-lg w-[90%] max-w-2xl text-center">
          <Typography
            variant="p"
            gutterBottom
            className="font-bold text-gold-main text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
          >
            Study BDS in India
          </Typography>
          <Typography
            variant="p"
            paragraph
            className="text-sm sm:text-base md:text-lg"
          >
            Get expert guidance for your dream career in dentistry.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="bg-blue-main text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 mt-4 w-full sm:w-auto"
          >
            Get Free Counselling
          </Button>

        </div>

      </div>

      {/* Main Content Section */}
      <Container>
        <Grid container spacing={3} className="p-8">
          <Grid item xs={12} md={8}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card elevation={5} className="rounded-lg mb-4 shadow-lg">
                <CardHeader title="Why Study BDS in India?" className="bg-blue-main text-white" />
                <CardContent>
                  <Typography variant="body1" paragraph>
                    The Bachelor of Dental Surgery (BDS) is a professional degree in dentistry. It is a five-year program that includes four years of study followed by one year of internship. India is home to some of the best dental colleges that provide quality education and training. Studying BDS in India is a good option due to the reasonable fees, excellent infrastructure, and abundant career opportunities.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card elevation={5} className="rounded-lg shadow-lg">
                <CardHeader title="Recent Blogs" className="bg-blue-main text-white" />
                <CardContent>
                  <Typography variant="body2">Blog Post 1</Typography>
                  <Typography variant="body2">Blog Post 2</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Eligibility Criteria */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Container className="p-8">
            <Typography variant="h4" gutterBottom className="text-blue-main">
              Eligibility Criteria for BDS
            </Typography>
            {eligibilityData.map((item, index) => (
              <Card key={index} elevation={5} className="rounded-lg mb-4 shadow-lg">
                <CardHeader title={item.title} className="bg-blue-main text-white" />
                <CardContent>
                  <Typography variant="body1">{item.detail}</Typography>
                </CardContent>
              </Card>
            ))}
          </Container>
        </motion.div>

        {/* Documents Required */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Container className="p-8">
            <Typography variant="h4" gutterBottom className="text-blue-main">
              Documents Required for BDS Admission
            </Typography>
            <Card elevation={5} className="rounded-lg mb-4 shadow-lg">
              <CardHeader title="Documents Required" className="bg-blue-main text-white" />
              <CardContent>
                <ul>
                  {documentsRequired.map((doc, index) => (
                    <li key={index}>
                      <Typography variant="body1">{doc}</Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Container>
        </motion.div>

        {/* Admission Process */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Container className="p-8">
            <Typography variant="h4" gutterBottom className="text-blue-main">
              Admission Process for BDS
            </Typography>
            <Card elevation={5} className="rounded-lg mb-4 shadow-lg">
              <CardHeader title="Admission Process" className="bg-blue-main text-white" />
              <CardContent>
                <ul>
                  {admissionProcess.map((step, index) => (
                    <li key={index}>
                      <Typography variant="body1">{step}</Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Container>
        </motion.div>

        {/* Top Colleges */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Container className="p-8">
            <Typography variant="h4" gutterBottom className="text-blue-main">
              Top BDS Colleges in India
            </Typography>
            <Card elevation={5} className="rounded-lg mb-4 shadow-lg">
              <CardHeader title="Colleges" className="bg-blue-main text-white" />
              <CardContent>
                <ul>
                  {bdsColleges.map((college, index) => (
                    <li key={index}>
                      <Typography variant="body1">
                        {college.name}, {college.location}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Container>
        </motion.div>

        {/* FAQs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Container className="p-8">
            <Typography variant="h4" gutterBottom className="text-blue-main">
              Frequently Asked Questions (FAQs)
            </Typography>
            <Card elevation={5} className="rounded-lg mb-4 shadow-lg">
              <CardHeader title="FAQs" className="bg-blue-main text-white" />
              <CardContent>
                {faqData.map((faq, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>
          </Container>
        </motion.div>
      </Container>
    </div>
  );
};

export default BdsIndia;
