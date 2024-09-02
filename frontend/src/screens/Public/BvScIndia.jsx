import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
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
          src={bvScImage}
          alt="Bachelor of Veterinary Sciences & Animal Husbandry"
          className="object-cover w-full h-72 md:h-80 lg:h-96"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-green-600 to-green-800 opacity-70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8 space-y-6">
          <Typography variant="h1" className="text-4xl md:text-5xl font-bold">Bachelor in Veterinary Sciences & Animal Husbandry</Typography>
          <Typography variant="h6" className="text-lg md:text-xl font-light">A comprehensive 5½ years program for aspiring veterinarians.</Typography>
          <Button variant="contained" color="secondary" size="large" className="hover:bg-secondary-dark transition-colors">Get Free Counselling</Button>
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
            <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-6 text-green-900">About B.V.Sc & AH</Typography>
            <Typography variant="body1" className="text-base md:text-lg mb-6 leading-relaxed">
              Bachelor in Veterinary Sciences & Animal Husbandry (B.V.Sc. & A.H.) is a 5½ years undergraduate program under the medical discipline. It focuses on the study of medical diagnostics and treatment of animal diseases. The course includes subjects like Veterinary Anatomy, Histology, Physiology, Biochemistry, Pharmacology, and Toxicology.
            </Typography>
            <Typography variant="body1" className="text-base md:text-lg mb-6 leading-relaxed">
              Eligibility: Students must have passed 10+2 with Physics, Chemistry, Biology, and English, with a minimum of 50% marks. The minimum age required is 19 years. NEET is the entrance exam required for admission.
            </Typography>
          </motion.div>
        </Grid>

        {/* Right Sidebar */}
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
      <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-6 text-green-900">Course Details</Typography>
      <Grid container spacing={6} className="mb-12">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className="text-xl font-semibold mb-4">Course Highlights</Typography>
          <Typography variant="body1" className="mb-4">
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
          <Typography variant="body1" className="mb-4">
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

     
    </Container>
  );
};

export default BvScIndia;
