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

      <div>
        <div className='flex p-4'>
          <img src="https://lirp.cdn-website.com/07841d62/dms3rep/multi/opt/Examining+Filling-1920w.jpg" className='w-[600px] shadow-lg' alt="Dental Filling" />

          <p className='ml-4 text-xl'>
            <div className=" p-2 bg-gradient-to-r from-blue-100 via-blue-300 to-green-200  ">
              <h2 className="text-2xl md:text-4xl font-bold text-blue-600 h-[20] text-white  text-center ">About Pharmacy</h2>
            </div>
            BDS in India is offered by many BDS colleges BDS admission in India BDS fee structure in India are BDS colleges BDS admission BDS fee BDS courses BDS syllabus BDS eligibility BDS Duration.

            The Clinical Sciences portion covers subjects like Dental Materials, Oral Pathology, Preventative Dentistry, and Prosthodontics. Candidates who want to pursue BDS in India must have completed 10+2 with Physics, Chemistry and Biology as their main subjects.

            They must also have secured a minimum of 50% marks in aggregate. Admission to BDS in India is through an entrance exam conducted at the national or state level.

            The BDS course duration is four years including one year of internship. The BDS syllabus is divided into two parts namely the Basic Sciences and the Clinical Sciences. The Basic Sciences portion covers subjects like Human Anatomy, Physiology, Biochemistry, and Pharmacology.</p>
        </div>

        <div className='flex p-4'>

          <p className='mr-4 text-xl'>
            <div className=" p-2 bg-gradient-to-r from-blue-100 via-blue-300 to-green-200  ">
              <h2 className="text-2xl md:text-4xl font-bold text-blue-600 h-[20] text-white  text-center ">Why BDS in India</h2>
            </div>
            <div class="elementor-widget-container"><p>The Bachelor of Dental Science (BDS) is a professional degree in the field of dentistry. It is a four-year degree program that leads to the Doctor of Dental Medicine (DMD) or Doctor of Dental Surgery (DDS) degree.</p><p>The BDS program is designed to prepare students for a career in dentistry. After completing the BDS program, graduates will be eligible to take the state licensing examinations and practice dentistry in the United States.</p><p>There are many reasons why students choose to pursue BDS admission in India. India has a long tradition of excellence in dentistry, and Indian dental schools are among the best in the world.</p><p>In addition, the cost of attending an Indian dental school is often much lower than the cost of attending a dental school in the United States. As a result, BDS admission in India can be an excellent way to save money on your education while still receiving a high-quality education.</p></div>
          </p>
          <img src="https://lirp.cdn-website.com/07841d62/dms3rep/multi/opt/Examining+Filling-1920w.jpg" className='w-[600px] shadow-lg' alt="Dental Filling" />
        </div>


        <div>
          <h1 className='text-blue-main text-5xl mt-4 ml-4 font-semibold '>BDS Eligibility Criteria</h1>

          <p className='text-xl ml-4 mt-3'>The eligibility criteria for the BDS course have been mentioned below.</p>
          <ul class="text-xl ml-4 mt-3 list-disc pl-5 space-y-2 text-gray-800">
            <li>Minimum Qualification Required for BDS: 10+2 (Chemistry, Biology & Physics)</li>
            <li>Minimum Marks Required for BDS (Aggregate): 50% (for General category students) and 40% (for reserved category students)</li>
            <li>Minimum Age Required for BDS: 17 years</li>
            <li>Upper Age Limit for BDS: 25 years</li>
          </ul>

        </div>


        <div>
          <h1 className='text-blue-main text-5xl mt-4 ml-4 font-semibold '>Documents Required To Get Admission In BDS </h1>

          <p className='text-xl ml-4 mt-3'>The list of documents you must bring with you when you go for document verification is as follows: –</p>
          <ul className="text-xl ml-4 mt-3 list-disc pl-5 space-y-2 text-gray-800">
            <li>10th marks card.</li>
            <li>12th pass certificate and mark sheet</li>
            <li>Migration certificate.</li>
            <li>Transfer certificate.</li>
            <li>NEET admit card.</li>
            <li>NEET scorecard.</li>
            <li>Document for date of birth.</li>
            <li>Identity proof.</li>
            <li>A medical certificate, if applicable.</li>
            <li>Income certificate, if applicable.</li>
            <li>Community or caste certificate, if applicable.</li>
          </ul>


        </div>


        <div className=' p-5'>
          <h1 className='font-semibold mb-5 text-blue-main text-5xl'>Top BDS colleges in India .</h1>
          <table className="table-auto border-collapse border border-gray-300 w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">BDS (INDIA) Colleges</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Dr. DY Patil Dental College and Hospital</td>
                <td className="border border-gray-300 px-4 py-2">Navi Mumbai</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Dr. DY Patil Dental College and Hospital</td>
                <td className="border border-gray-300 px-4 py-2">Pune</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Kalinga Institute of Dental Sciences</td>
                <td className="border border-gray-300 px-4 py-2">Bhubaneswar</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Manipal College of Dental Science</td>
                <td className="border border-gray-300 px-4 py-2">Mangalore</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Bharati Vidyapeeth DU Dental College and Hospital</td>
                <td className="border border-gray-300 px-4 py-2">Pune</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">BVDU Dental College and Hospital</td>
                <td className="border border-gray-300 px-4 py-2">Sangli</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Indira Gandhi Dental College</td>
                <td className="border border-gray-300 px-4 py-2">Pondicherry</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Sree Balaji Dental College and Hospital</td>
                <td className="border border-gray-300 px-4 py-2">Chennai</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Sri Ramachandra Dental and Hospital</td>
                <td className="border border-gray-300 px-4 py-2">Chennai</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Santosh Dental College and Hospital</td>
                <td className="border border-gray-300 px-4 py-2">Ghaziabad</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Manav Rachna Dental College</td>
                <td className="border border-gray-300 px-4 py-2">Faridabad</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Sathyabama Dental College and Hospital</td>
                <td className="border border-gray-300 px-4 py-2">Chennai</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">M.M. College of Dental Sciences and Research</td>
                <td className="border border-gray-300 px-4 py-2">Haryana</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Yenepoya Dental College</td>
                <td className="border border-gray-300 px-4 py-2">Yenepoya</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
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
    </div>
  );
};

export default BdsIndia;
