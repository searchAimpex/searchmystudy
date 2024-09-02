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
    <div style={{ padding: "2rem 5%", backgroundColor: "#f4f4f4" }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(${MdIndiaImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          marginBottom: "3rem",
          borderRadius: "15px",
          position: "relative",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          style={{
            fontWeight: "bold",
            fontSize: "2.5rem",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          Get Guidance From The Experts Who Will Lead You To Your Dreams
        </Typography>
      </motion.div>

      {/* Stepper and Content Layout */}
      <Grid container spacing={5}>
        {/* Stepper */}
        <Grid item xs={12} md={3}>
          <Stepper
            orientation="vertical"
            activeStep={activeStep}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "0 1rem",
            }}
          >
            {sections.map((section, index) => (
              <Step key={index} onClick={() => handleStepClick(index)}>
                <StepLabel>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={activeStep === index ? { scale: 1.1, transition: { duration: 0.3 } } : { scale: 1 }}
                    style={{ cursor: "pointer" }}
                  >
                    <Typography
                      variant="body1"
                      style={{
                        fontWeight: activeStep === index ? "bold" : "normal",
                        color: activeStep === index ? "#007bff" : "#555",
                      }}
                    >
                      {section}
                    </Typography>
                  </motion.div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <div id="section-0">
            <motion.div
              ref={aboutRef}
              initial="hidden"
              animate={controls}
              variants={variants}
              style={{ marginBottom: "3rem" }}
            >
              <Card elevation={3} style={{ borderRadius: "15px", overflow: "hidden", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)" }}>
                <CardHeader
                  title="About BAMS"
                  titleTypographyProps={{ style: { color: "#007bff", fontWeight: "bold" } }}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <motion.img
                        src={AboutBamsImage}
                        alt="About BAMS"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={controls}
                        variants={variants}
                        style={{ width: "100%", borderRadius: "15px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={controls}
                        variants={variants}
                        style={{ transition: "transform 0.3s" }}
                      >
                        <Typography variant="body1" paragraph style={{ color: "#333", fontSize: "1rem" }}>
                          After completing Class 12, candidates who want to pursue a career in medicine can enroll in the Bachelor of Ayurveda Medicine and Surgery (BAMS).
                          In India, BAMS is an undergraduate medical program based on Ayurveda, the traditional healing arts. The BAMS course covers all aspects of 
                          “Ashtanga Ayurveda,” as well as scientific advances in modern medicine and extensive practical training.
                        </Typography>
                        <Typography variant="body1" paragraph style={{ color: "#333", fontSize: "1rem" }}>
                          The Central Council of Indian Medicine (CCIM) is the governing body for admission to Ayurveda education at both the undergraduate and 
                          postgraduate levels, as well as the practice of Ayurveda medicine in India. Ayurveda is one of the oldest medical systems, dating back to 
                          Vedic times. Its treatment is known for the natural elements it contains and is based on the curative properties of herbs.
                        </Typography>
                      </motion.div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div id="section-1">
            <motion.div
              ref={futureScopeRef}
              initial="hidden"
              animate={controls}
              variants={variants}
              style={{ marginBottom: "3rem" }}
            >
              <Card elevation={3} style={{ borderRadius: "15px", overflow: "hidden", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)" }}>
                <CardHeader
                  title="Analyzed Future Scope"
                  titleTypographyProps={{ style: { color: "#007bff", fontWeight: "bold" } }}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <motion.img
                        src={FutureScopeImage}
                        alt="Future Scope"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={controls}
                        variants={variants}
                        style={{ width: "100%", borderRadius: "15px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={controls}
                        variants={variants}
                        style={{ transition: "transform 0.3s" }}
                      >
                        <Typography variant="body1" paragraph style={{ color: "#333", fontSize: "1rem" }}>
                          Ayurveda, a traditional form of medicine that has been practiced in India for centuries, is gaining recognition worldwide for its 
                          holistic approach to health and wellness. With the increasing awareness of alternative and complementary medicine, the demand for 
                          qualified Ayurvedic practitioners is on the rise. This trend indicates a promising future for BAMS graduates, who can explore various 
                          career opportunities, including clinical practice, research, teaching, and consultancy.
                        </Typography>
                        <Typography variant="body1" paragraph style={{ color: "#333", fontSize: "1rem" }}>
                          BAMS graduates can also work in Ayurvedic hospitals, wellness centers, and herbal product companies, or even pursue further studies 
                          and specializations in Ayurveda or integrative medicine. With the potential for growth in the field, BAMS is a rewarding career path 
                          for those passionate about traditional medicine and holistic health.
                        </Typography>
                      </motion.div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div id="section-2">
            <motion.div
              ref={eligibilityRef}
              initial="hidden"
              animate={controls}
              variants={variants}
              style={{ marginBottom: "3rem" }}
            >
              <Card elevation={3} style={{ borderRadius: "15px", overflow: "hidden", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)" }}>
                <CardHeader
                  title="Eligibility Criteria"
                  titleTypographyProps={{ style: { color: "#007bff", fontWeight: "bold" } }}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <motion.img
                        src={EligibilityImage}
                        alt="Eligibility Criteria"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={controls}
                        variants={variants}
                        style={{ width: "100%", borderRadius: "15px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={controls}
                        variants={variants}
                        style={{ transition: "transform 0.3s" }}
                      >
                        <List>
                          <ListItem>
                            <Typography variant="body1" style={{ color: "#333", fontSize: "1rem", marginRight: "1rem" }}>
                              • Students must complete the Higher Secondary Examination with a minimum of 50% marks (General) or 40% (Reserved categories) 
                              in the Science stream with Physics, Chemistry, and Biology as subjects.
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography variant="body1" style={{ color: "#333", fontSize: "1rem", marginRight: "1rem" }}>
                              • They must also qualify for the entrance exam as per the guidelines of the university or institution.
                            </Typography>
                          </ListItem>
                        </List>
                      </motion.div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div id="section-3">
            <motion.div
              ref={faqRef}
              initial="hidden"
              animate={controls}
              variants={variants}
              style={{ marginBottom: "3rem" }}
            >
              <Card elevation={3} style={{ borderRadius: "15px", overflow: "hidden", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)" }}>
                <CardHeader
                  title="Frequently Asked Questions"
                  titleTypographyProps={{ style: { color: "#007bff", fontWeight: "bold" } }}
                />
                <CardContent>
                  {faq.map((item, index) => (
                    <Accordion
                      key={index}
                      style={{
                        marginBottom: "1rem",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                        }
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: "#e7f0ff", borderRadius: "10px" }}>
                        <Typography variant="body1" style={{ fontWeight: "bold", color: "#007bff" }}>
                          {item.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" style={{ color: "#555" }}>
                          {item.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default BamsIndia;
