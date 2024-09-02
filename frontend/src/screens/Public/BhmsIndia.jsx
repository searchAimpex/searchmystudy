import React from "react";
import { Typography, Card, CardContent, CardHeader, Grid, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import BhmsHeroImage from "../../assets/AboutHero.png"; // Replace with actual image path
import BhmsContentImage from "../../assets/counsellerHero.png"; // Replace with actual image path

const faq = [
  { question: "Why Choose BHMS Admission in India?", answer: "There are many reasons to choose BHMS admission in India. First, the coursework is designed to give students a comprehensive understanding of human health and disease..." },
  { question: "How to Get Admission in Top BHMS College?", answer: "BHMS in India is recognized by the Central Council of Homeopathy (CCH) and accredited by the National Accreditation Board for Hospitals & Healthcare Providers (NABH)..." },
  { question: "Documents Required For Admission In Top BHMS Colleges In India?", answer: "One must have specific documentation in order to enroll in the BHMS program in India, including Class 12th certificates, NEET scorecard, and more..." },
];

const BhmsIndia = () => {
  return (
    <div style={{ padding: "2rem 200px" }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(${BhmsHeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          marginBottom: "2rem",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h2" component="h1">
          Get Guidance From The Experts Who Will Lead You To Your Dreams
        </Typography>
      </motion.div>

      {/* Main Content Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Why Choose BHMS Section */}
          <Card elevation={3} style={{ marginBottom: "2rem" }}>
            <CardHeader title="Why Choose BHMS Admission in India?" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <img src={BhmsContentImage} alt="BHMS Content" style={{ width: "100%", borderRadius: "10px" }} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="body1" paragraph>
                    There are many reasons to choose BHMS admission in India. First, the coursework is designed to give students a comprehensive understanding
                    of human health and disease. Second, the curriculum includes a strong emphasis on clinical training, which helps students develop the skills
                    they need to be successful health care providers. Third, the Indian healthcare system is one of the most respected in the world, and BHMS graduates
                    will have access to some of the best hospitals and clinics in the country. Finally, by choosing BHMS admission in India, students will be able to take
                    advantage of the diverse cultural and religious traditions of this amazing country.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Admission Process Section */}
          <Card elevation={3} style={{ marginBottom: "2rem" }}>
            <CardHeader title="How to Get Admission in Top BHMS College?" />
            <CardContent>
              <Typography variant="body1" paragraph>
                BHMS in India is recognized by the Central Council of Homeopathy (CCH) and accredited by the National Accreditation Board for Hospitals & Healthcare Providers (NABH).
                BHMS courses are offered by many reputed colleges and universities in India. BHMS colleges in India use various admission processes to select students for their BHMS programs.
                BHMS Admission in India provides opportunities to get admission into good BHMS colleges, which offer good placement options after successful completion of the course.
              </Typography>
            </CardContent>
          </Card>

          {/* Eligibility Section */}
          <Card elevation={3} style={{ marginBottom: "2rem" }}>
            <CardHeader title="Documents Required For Admission In Top BHMS Colleges In India" />
            <CardContent>
              <Typography variant="body1" paragraph>
                The following documentation is required to enroll in the BHMS program in India:
              </Typography>
              <ul>
                <li>Passed Class 12th or comparable exam in Physics, Chemistry, Biology/Biotechnology, and English.</li>
                <li>Qualifying exam score report and proof of completion.</li>
                <li>A valid NEET scorecard and rank.</li>
                <li>Caste certificate (for SC, ST, or OBC categories).</li>
                <li>International students must apply for a student visa at the Indian consulate.</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* FAQ Section */}
          <Card elevation={3} style={{ marginBottom: "2rem" }}>
            <CardHeader title="Frequently Asked Questions" />
            <CardContent>
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

          {/* Top Colleges Section */}
          <Card elevation={3} style={{ marginBottom: "2rem" }}>
            <CardHeader title="Top BHMS Colleges in India" />
            <CardContent>
              <ul>
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
        </Grid>
      </Grid>

      {/* Contact Us Section */}
      <Card elevation={3} style={{ marginBottom: "2rem" }}>
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Don't Hesitate, Contact Us for Any Information
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Get Free Counselling
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BhmsIndia;
