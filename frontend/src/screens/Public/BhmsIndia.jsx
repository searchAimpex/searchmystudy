import React from "react";
import { Typography, Card, CardContent, CardHeader, Grid, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import BhmsHeroImage from "../../assets/AboutHero.png"; // Replace with actual image path
import BhmsContentImage from "../../assets/counsellerHero.png"; // Replace with actual image path
import asdc from "../../assets/BannerService-e90bab99.png"
const faq = [
  { question: "Why Choose BHMS Admission in India?", answer: "There are many reasons to choose BHMS admission in India. First, the coursework is designed to give students a comprehensive understanding of human health and disease..." },
  { question: "How to Get Admission in Top BHMS College?", answer: "BHMS in India is recognized by the Central Council of Homeopathy (CCH) and accredited by the National Accreditation Board for Hospitals & Healthcare Providers (NABH)..." },
  { question: "Documents Required For Admission In Top BHMS Colleges In India?", answer: "One must have specific documentation in order to enroll in the BHMS program in India, including Class 12th certificates, NEET scorecard, and more..." },
];

const BhmsIndia = () => {
  return (
    <div
    //  className="px-4 sm:px-8 lg:px-10 py-8"
    >
      <div
        className="bg-cover bg-center bg-no-repeat px-4 py-16 relative"
        style={{
          backgroundImage: `url(${asdc})`,
        }}
      >
        <div className="absolute inset-0 bg-blue-main opacity-30"></div>
        <div className="relative ">
          <p className="text-4xl text-white font-bold">
            Get Guidance From The Experts Who Will Lead You To Your Dreams
          </p>
        </div>
      </div>



      {/* Main Content Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Why Choose BHMS Section */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className="w-full" // Ensure the width is full during animation
          >
            <Card elevation={3} className="mb-6">
              <CardHeader title="Why Choose BHMS Admission in India?" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <motion.img
                      src={BhmsContentImage}
                      alt="BHMS Content"
                      className="w-full rounded-lg"
                      initial={{ opacity: 0, scale: 1.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="body1" paragraph>
                      <p className="text-xl">There are many reasons to choose BHMS admission in India.
                        First, the coursework is designed to give students a comprehensive understanding of human health and disease.
                        Second, the curriculum includes a strong emphasis on clinical training, which helps students develop the skills they need to be successful health care providers.
                        Third, the Indian healthcare system is one of the most respected in the world, and BHMS graduates will have access to some of the best hospitals and clinics in the country
                        Finally, by choosing BHMS admission in India, students will be able to take advantage of the diverse cultural and religious traditions of this amazing country.

                      </p>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {/* Admission Process Section */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }} // Final position when in view
            initial={{ opacity: 0, y: 0 }} // Start position (off the screen to the right)
            transition={{ duration: 1 }} // Animation duration
            className="w-full"
          >
            <Card elevation={3} className="mb-6">
              <CardHeader />
              <CardContent>
                <Typography variant="body1" paragraph>
                  <h1 className="text-3xl mb-4 font-bold text-blue-main">How to Get Admission in Top BHMS College?</h1>
                  BHMS in India is recognized by the Central Council of Homeopathy (CCH) and accredited by the National Accreditation Board for Hospitals & Healthcare Providers (NABH). BHMS courses are offered by many reputed colleges and universities in India. BHMS colleges in India use various admission processes to select students for their BHMS programs.
                  BHMS colleges offer a wide range of academic and professional programs which prepare students for successful careers in homeopathy. BHMS colleges also provide ample opportunities for research and development in homeopathy. BHMS Admission in India provides opportunity to get admission into good BHMS colleges, which offer good placement options after successful completion of the course.
                  There are many reasons why parents want their children to get admission in top BHMS colleges. The main reason is that they want their children to get the best education and career opportunities. BHMS colleges in India offer quality education and career growth opportunities. They provide good infrastructure and facilities for students. These colleges also have a good placement record.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>


          {/* Eligibility Section */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <div className="elementor-widget-container">
              <h3 className="text-3xl ml-2 text-blue-main font-semibold">Documents Required For Admission In Top BHMS Colleges In India</h3>
              <p className="text-lg  mt-3 ml-2">
                One must have specific documentation in order to enroll in the Bachelor of Homeopathic Medicine &amp; Surgery (BHMS) program in India.
              </p>
              <ul className="list-disc text-lg list-inside space-y-2 ml-5">
                <li>
                  The candidate must have passed Class 12th or a comparable exam in Physics, Chemistry, Biology/Biotechnology, and English.
                </li>
                <li>
                  They must submit their qualifying exam score report and proof of completion. Students who are taking their final year examinations can also apply, but they must submit the necessary paperwork later.
                </li>
                <li>A valid NEET scorecard and rank.</li>
                <li>
                  Candidates who fall under the SC, ST, or OBC categories are required to submit a caste certificate issued by an appropriate body.
                </li>
                <li>
                  Finally, international nationals must apply for a student visa at the Indian consulate there.
                </li>
              </ul>
            </div>

          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* FAQ Section */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className=""
          >
            <Card elevation={3} className="mb-6">
              <CardHeader />
              <CardContent>
              <h2 className="text-xl text-xl text-blue-main font-bold mb-2">Frequently Asked Questions</h2>

                {faq.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Colleges Section */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <Card elevation={3} className="mb-6">
              <CardHeader  />
              <CardContent>
                <h2 className="text-xl text-xl text-blue-main font-bold mb-2">Top BHMS Colleges in India</h2>
  <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
    <li>Baroda Homeopathic Medical College, Vadodara.</li>
    <li>KUHS Thrissur – Kerala University of Health Sciences.</li>
    <li>Lokmanya Homeopathic Medical College, Pune.</li>
    <li>National Institute of Homeopathy, Kolkata.</li>
    <li>Bharati Vidyapeeth Homeopathic Medical College, Pune.</li>
    <li>Government Homeopathic Medical College and Hospital, Bangalore.</li>
    <li>Smt Chandaben Mohanbhai Patel Homeopathic Medical College, Mumbai.</li>
    <li>Anand Homeopathic Medical College and Research Institute, Anand</li>
    <li>SJPES Homeopathy Medical College, Kolhapur.</li>
    <li>Naiminath Homeopathic Medical College Hospital and Research Center, Agra.</li>
    <li>Dr. GD Pol Foundation’s YMT Homeopathic Medical College Hospital, Navi Mumbai.</li>
    <li>GD Memorial Homeopathic Medical College and Hospital, Patna.</li>
    <li>Dhondumama Sathe Homeopathic Medical College, Pune.</li>
    <li>Dr NTR University of Health Sciences, Vijayawada.</li>
    <li>Pt Deendayal Upadhyay Memorial Health Sciences and the Ayush University of Chhattisgarh, Raipur.</li>
  </ul>
</CardContent>

            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Contact Us Section */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <Card elevation={3} className="mb-6">
          <CardContent className="text-center">
            <Typography variant="h4" gutterBottom>
              Don't Hesitate, Contact Us for Any Information
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Get Free Counselling
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BhmsIndia;
