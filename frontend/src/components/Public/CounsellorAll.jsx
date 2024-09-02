import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Step, StepButton, Stepper, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CounsellerHero from '../../assets/counsellerHero.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCounsellerCreateLeadMutation, useTestimonialFetchAllMutation } from '../../slices/adminApiSlice';
import { FetchAllTestimonial } from '../../slices/testimonialSlice';
import { Rating } from '@mui/material';
import { motion } from 'framer-motion';

export default function CounsellorAll() {
  const [openStepper, setOpenStepper] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    intersetedCountry: '',
    intersetedCourse: '',
    type: 'ABROAD',
    test: '',
    score: 0,
  });
  const [CounsellerCreateLead] = useCounsellerCreateLeadMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [TestimonialFetchAll, { isSuccess, isLoading }] = useTestimonialFetchAllMutation();
  const { testimonial } = useSelector((state) => state.testimonial);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await TestimonialFetchAll().unwrap();
        dispatch(FetchAllTestimonial(result));
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };
    fetchData();
  }, [TestimonialFetchAll, dispatch]);

  const handleCardClick = (id) => {
    navigate(`/counsellor/${id}`);
  };

  const handleOpenStepper = () => {
    setOpenStepper(true);
  };

  const handleCloseStepper = () => {
    setOpenStepper(false);
    setActiveStep(0);
    setFormValues({
      name: '',
      phone: '',
      email: '',
      city: '',
      intersetedCountry: '',
      intersetedCourse: '',
      type: 'ABROAD',
      test: '',
      score: 0,
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      await CounsellerCreateLead(formValues).unwrap();
      handleCloseStepper(); // Close the stepper after successful submission
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  const steps = ['Personal Information', 'Location & Interests', 'Test Details'];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-300 to-blue-500 p-8 mb-8 shadow-lg">
        <div className="absolute inset-0 z-0 bg-blue-500 opacity-30"></div>
        <div className="relative z-10 flex items-center justify-between p-8">
          <div className="flex-1 text-white">
            <h1 className="text-5xl font-bold mb-4">Set Your Future Now</h1>
            <p className="mb-6 text-xl">Get expert guidance and start your journey today.</p>
            <Button variant="contained" color="primary" className="bg-blue-900 text-white hover:bg-blue-800">
              Get Counselling
            </Button>
          </div>
          <div className="flex-1">
            <img src={CounsellerHero} alt="Counsellor Hero" className="w-full h-[450px]" />
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="flex flex-row gap-8 px-4 lg:px-16 xl:px-32">
        {/* Counsellor Cards */}
        <motion.div className="flex flex-col space-y-8 w-full lg:w-2/3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {testimonial.map((item) => (
            <motion.div
              key={item._id}
              className="flex bg-white border border-gray-200 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(item._id)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={item.imageURL}
                alt={item.title}
                className="w-64 h-64 rounded-lg object-cover"
              />
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                </div>
                <div className="mb-4">
                  <Rating value={item.rating} readOnly className="mb-4" />
                  <Button
                    variant="contained"
                    color="primary"
                    className="bg-blue-900 text-white hover:bg-blue-800 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenStepper(); // Open stepper form
                    }}
                  >
                    Book Counselling
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Blog Section */}
        <motion.div className="flex flex-col w-full lg:w-1/3 space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold mb-4">Recent Blogs</h2>
          {/* Example Blog */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <img src="/path-to-blog-image.jpg" alt="Blog" className="w-full h-auto rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Blog Title</h3>
            <p className="text-gray-600">Blog summary or excerpt...</p>
          </div>
          {/* Add more blogs as needed */}
        </motion.div>
      </section>

      {/* Stepper Form */}
      <Dialog open={openStepper} onClose={handleCloseStepper} fullWidth maxWidth="md">
        <DialogTitle>Book Counselling</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={() => setActiveStep(index)}>{label}</StepButton>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <TextField
                name="name"
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formValues.name}
                onChange={handleChange}
              />
              <TextField
                name="phone"
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formValues.phone}
                onChange={handleChange}
              />
              <TextField
                name="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formValues.email}
                onChange={handleChange}
              />
            </motion.div>
          )}
          {activeStep === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>City</InputLabel>
                <Select
                  name="city"
                  value={formValues.city}
                  onChange={handleChange}
                >
                  <MenuItem value="City1">City1</MenuItem>
                  <MenuItem value="City2">City2</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="intersetedCountry"
                label="Interested Country"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formValues.intersetedCountry}
                onChange={handleChange}
              />
              <TextField
                name="intersetedCourse"
                label="Interested Course"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formValues.intersetedCourse}
                onChange={handleChange}
              />
            </motion.div>
          )}
          {activeStep === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <TextField
                name="test"
                label="Test"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formValues.test}
                onChange={handleChange}
              />
              <TextField
                name="score"
                label="Score"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={formValues.score}
                onChange={handleChange}
              />
            </motion.div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
