import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import heroImage from '../../assets/BannerService.png';
import dPharmaImage from '../../assets/LoginHero.png';
import bPharmaImage from '../../assets/LoginHero.png';
import bPharmaLateralImage from '../../assets/LoginHero.png';
import bPharmaHonsImage from '../../assets/LoginHero.png';
import bPharmaAyurvedaImage from '../../assets/LoginHero.png';
import mPharmaImage from '../../assets/LoginHero.png';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const courses = [
  {
    title: 'D.Pharma (Diploma in Pharmacy)',
    image: dPharmaImage,
    description: `D.Pharm is a foundation course in pharmacy, with a duration of 2 years divided into four semesters. The course deals with the fundamentals of pharmaceutical studies and provides a basic understanding of common medicines. Course Duration: 2 Years. Eligibility Criteria: The basic eligibility to pursue a Diploma in Pharmacy is to complete 10+2 with a minimum of 50% aggregate in biology. Subjects: Human Anatomy, Biochemistry, Pharmaceutical studies, Drug store, and Business Management, and Pharmacology & Toxicology. Course Fee: INR 9,000 to INR 2 Lakhs. Areas of Recruitment: Pharma Stores, Logistics Management, Drug Testing, etc.`,
  },
  {
    title: 'B.Pharma (Bachelor of Pharmacy)',
    image: bPharmaImage,
    description: `B.Pharm degree is a foundational program that equips a student with the relevant knowledge required to practice pharmacy. It is one of the most popular pharmacy courses in the country, which aims to provide extensive knowledge on fundamental applications of biochemistry in pharmacology. Course Duration: 4 Years. Eligibility Criteria: The basic eligibility to pursue a B.Pharm is to complete 10+2 with a minimum of 50% aggregate in biology and chemistry. Subjects: Human Anatomy & Physiology, Biochemistry, Pharmaceutical Maths & Biostatistics, and Pharmaceutical Biotechnology. Course Fee: INR 40,000 to INR 1 Lakh. Areas of Recruitment: Biotechnology, Biomedical Research, Medicine Technology, Hospitals, Pharmacology, Testing Labs, etc. Entrance Exam for B.Pharma: WBJEE, Odisha JEE, GCET, HPCET, and much more`,
  },
  {
    title: 'B.Pharma (Lateral)',
    image: bPharmaLateralImage,
    description: `Lateral entry to the B.Pharma course is given to students who have completed a pharmacy degree and want to pursue higher learning in pharmacy. The coursework is similar, but the eligibility criteria vary among regular students. Course Duration: 3 Years. Eligibility Criteria: The basic eligibility to pursue a Bachelor of Pharmacy via lateral entry is to complete a Diploma in Pharmacy or Diploma in Biochemistry with a minimum of 50% aggregate. Course Fees: INR 40,000 to INR 90,000. Areas of Recruitment: Biotechnology, Biomedical Research, Medicine Technology, Hospitals, Pharmacology, Testing Labs, etc.`,
  },
  {
    title: 'B. Pharma (Hons.)',
    image: bPharmaHonsImage,
    description: `B.Pharm (Hons.) is an advanced program that involves additional coursework and research compared to a standard B.Pharm degree. This course is designed for students interested in pursuing careers in research or academia. Course Duration: 4 Years. Eligibility Criteria: To pursue B.Pharm (Hons.), students need to complete 10+2 with a minimum of 50% aggregate in biology and chemistry. Course Fee: INR 60,000 to INR 1.5 Lakhs. Areas of Recruitment: Research Labs, Pharmaceutical Companies, Educational Institutes, etc. Entrance Exams: WBJEE, Odisha JEE, GCET, HPCET, etc.`,
  },
  {
    title: 'B. Pharma (Ayurveda)',
    image: bPharmaAyurvedaImage,
    description: `B.Pharm (Ayurveda) is a specialized course focusing on the pharmaceutical aspects of Ayurvedic medicine. This course provides insights into the traditional Indian medicine system. Course Duration: 4 Years. Eligibility Criteria: Students need to complete 10+2 with a minimum of 50% aggregate in biology and chemistry. Course Fee: INR 60,000 to INR 1.5 Lakhs. Areas of Recruitment: Ayurvedic Clinics, Pharmaceutical Companies, Research Labs, etc. Entrance Exams: BAMS Entrance Test, University-level tests`,
  },
  {
    title: 'M. Pharma (Master of Pharmacy)',
    image: mPharmaImage,
    description: `M.Pharm is a postgraduate degree in pharmacy that delves deeper into the pharmaceutical sciences, offering specializations in various areas of pharmacy. Course Duration: 2 Years. Eligibility Criteria: To pursue M.Pharm, students must complete a B.Pharm with a minimum of 55% aggregate. Course Fee: INR 1 Lakh to INR 3 Lakhs. Areas of Recruitment: Pharmaceutical Companies, Research Labs, Educational Institutes, etc. Entrance Exams: GPAT, State-level entrance exams, University-specific tests`,
  },
];

const PharmacyPage = () => {
  return (
    <Container maxWidth="lg" className="py-8">
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
          src={heroImage}
          alt="Hero Banner"
          className="object-cover w-full h-72 md:h-80 lg:h-96"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 opacity-70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8 space-y-6">
          <Typography variant="h1" className="text-4xl md:text-5xl font-bold text-shadow-lg">Pharmacy Courses</Typography>
          <Typography variant="h6" className="text-lg md:text-xl font-light text-shadow-lg">Explore our comprehensive pharmacy programs and career paths.</Typography>
          <Button variant="contained" color="secondary" size="large" className="hover:bg-secondary-dark transition-colors">Explore Programs</Button>
        </div>
      </motion.div>

      {/* Content Section */}
      <Grid container spacing={6} className="mb-12">
        <Grid item xs={12} md={8}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={pageVariants}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">About Pharmacy</Typography>
            <Typography variant="body1" className="text-base md:text-lg mb-6 leading-relaxed">
              Pharmacy courses are a demanding career stream for many science students, involving health and chemical sciences to understand drug manufacturing and pharmaceuticals.
            </Typography>
            <Typography variant="body1" className="text-base md:text-lg mb-6 leading-relaxed">
              The main objective of pursuing a pharmacy degree is to understand the process behind drug manufacturing and the benefits of pharmaceuticals for human welfare.
            </Typography>

            {/* Detailed Course Information */}
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={sectionVariants}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <Typography variant="h3" className="text-2xl md:text-3xl font-bold mb-6 text-blue-900">{course.title}</Typography>
                <Grid container spacing={6} className="mb-8">
                  <Grid item xs={12} md={5}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="object-cover w-full h-48 md:h-60 lg:h-72 rounded-lg shadow-lg"
                    />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <Typography variant="body1" className="text-base md:text-lg leading-relaxed">
                      {course.description}
                    </Typography>
                  </Grid>
                </Grid>
              </motion.div>
            ))}
          </motion.div>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4} className="hidden md:block">
          <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">Interested in Our Courses?</Typography>
              <Typography variant="body1" className="mb-4">
                Get in touch with us to learn more about our pharmacy programs and how they can benefit your career.
              </Typography>
              <Button variant="contained" color="primary" className="w-full">Contact Us</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PharmacyPage;
