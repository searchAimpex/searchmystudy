import React, { useState, useEffect } from 'react';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import { FetchBlogs } from '../../slices/blogSlice';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepButton,
  Stepper,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Rating,
  Typography,
  Box
} from '@mui/material';
import CounsellerHero from '../../assets/counsellerHero.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCounsellerCreateLeadMutation, useFetchBlogMutation, useTestimonialFetchAllMutation } from '../../slices/adminApiSlice';
import { FetchAllTestimonial } from '../../slices/testimonialSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function CounsellorAll() {
  const [openStepper, setOpenStepper] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const { blog } = useSelector((state) => state.blog);
  const [FetchBlog] = useFetchBlogMutation();


  const getTruncatedContent = (text, maxChars = 75) => {
    if (!text) return '';
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchBlog();
        dispatch(FetchBlogs(res.data));

        const result = await CountryFetch().unwrap();
        const shuffled = [...result].sort(() => 0.5 - Math.random());
        setcountry(shuffled.slice(0, 5));
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);



  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    intersetedCountry: '',
    Counsellors: "",
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
  // console.log(testimonial)
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

  const handleOpenStepper = (id) => {
    setFormValues(() => ({ ...formValues, Counsellors: id }));
    setOpenStepper(true);
  }

  const handleCloseStepper = () => {
    setOpenStepper(false);
    setActiveStep(0);
    setFormValues({
      name: '', phone: '', email: '', city: '', intersetedCountry: '', intersetedCourse: '',
      type: 'ABROAD', test: '', score: 0
    });
  };

  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
    setFormValues({
      name: '', phone: '', email: '', city: '', intersetedCountry: '', intersetedCourse: '',
      type: 'ABROAD', test: '', score: 0, Counsellors: ''
    });
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!formValues.name || !formValues.phone || !formValues.email) {
        toast.error('Please fill all required fields.');
        return;
      }
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === 1) {
      if (!formValues.city || !formValues.intersetedCountry || !formValues.intersetedCourse) {
        toast.error('Please fill all required fields.');
        return;
      }
      setActiveStep((prev) => prev + 1);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  }
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      console.log(formValues, "---------------------------------");
      const res = await CounsellerCreateLead(formValues).unwrap();
      console.log(res,"+++++++++++++++++++++++");
      handleCloseStepper();
      setShowThankYouModal(true);
    } catch (error) {
      console.error('Form submission failed:', error);
      toast.error('Failed to submit form. Please try again.');
    }
  };

  const steps = ['Personal Information', 'Location & Interests', 'Test Details'];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col bg-gray-50">
      <section className="relative bg-gradient-to-r from-blue-300 to-blue-500 p-4 md:p-8 mb-8 shadow-lg">
        <div className="absolute inset-0 z-0 bg-blue-500 opacity-30"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-white text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Set Your Future Now</h1>
            <p className="mb-6 text-lg md:text-xl">Get expert guidance and start your journey today.</p>
            <Button variant="contained" color="primary" className="bg-blue-900 text-white hover:bg-blue-800">
              Get Counselling
            </Button>
          </div>
          <div className="flex-1 w-full max-w-md mx-auto">
            <img src={CounsellerHero} alt="Counsellor Hero" className="w-full h-auto max-h-[450px] object-contain" />
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row gap-[50px] px-6 mb-4 sm:px-8 lg:px-16 ">
        <motion.div
          className="flex flex-col space-y-8 w-full lg:w-3/4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {testimonial.map((item) => (
            <motion.div
              key={item._id}
              className="flex flex-col md:flex-row bg-white border rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.01 }}
            >
              {/* Left Image */}
              <div className="flex-shrink-0 w-full md:w-[300px]">
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Content */}
              <div className="flex-1 p-4 flex flex-col justify-center">
                {/* Header: Name + Rating */}
                {item.name && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                      {item.name}
                    </h1>
                    <Rating
                      value={item.rating}
                      readOnly
                      className="flex items-center"
                    />
                  </div>
                )}

                {/* Profile Details */}
                <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-gray-700 text-sm md:text-base">
                  {item.degree && (
                    <li className="flex items-center gap-1">
                      <SchoolIcon fontSize="small" />
                      <span>{item.degree}</span>
                    </li>
                  )}
                  {item.location && (
                    <li className="flex items-center gap-1">
                      <LocationOnIcon fontSize="small" />
                      <span>{item.location}</span>
                    </li>
                  )}
                  {item.experience && (
                    <li className="flex items-center gap-1">
                      <ElectricBoltIcon fontSize="small" />
                      <span>{item.experience}</span>
                    </li>
                  )}
                </ul>

                {/* Job Title */}
                {item.title && (
                  <p className="mt-3 text-base md:text-lg font-medium flex items-center gap-2 text-gray-800">
                    <BusinessCenterIcon fontSize="small" />
                    {item.title}
                  </p>
                )}

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom Actions */}
                <div className="mt-4">
                  <Button
                    variant="contained"
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold shadow-md hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenStepper(item._id);
                    }}
                  >
                    Book Counselling
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

        </motion.div>



        <motion.div className="w-full lg:w-1/4 mt-8 lg:mt-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* <h2 className="text-2xl font-bold mb-4">Recent Blogs</h2> */}
          {/* Latest Blog List */}
          <h1 className='text-gray-700 font-bold text-2xl mb-4'>
            <span className='text-gold-main'>—</span> Latest Blog
          </h1>
          {blog?.slice(0, 7).map((blog) => (
            <div
              onClick={() => navigate(`/blog/${blog._id}`)} key={blog._id} className='hover:cursor-pointer flex gap-3 pb-5'>
              <img
                src={blog.thumbnailURL}
                className='rounded-xl w-[90px] h-[85px] object-cover'
                alt={blog.title}
              />
              <div className='flex flex-col'>
                <p className='text-sm text-gold-main font-semibold'>Feb 28, 2025</p>
                <div
                  className="prose max-w-none text-lg pt-1 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: getTruncatedContent(blog?.content) }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      <Dialog open={openStepper} onClose={handleCloseStepper} fullWidth maxWidth="md">
        <DialogTitle>Book Counselling</DialogTitle>
        <DialogContent>
          <div className="w-full px-2 sm:px-4">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton onClick={() => setActiveStep(index)}>{label}</StepButton>
                </Step>
              ))}
            </Stepper>

            <div className="mt-6">
              {activeStep === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <TextField name="name" label="Full Name" fullWidth margin="normal" value={formValues.name} onChange={handleChange} />
                  <TextField name="phone" label="Phone Number" fullWidth margin="normal" value={formValues.phone} onChange={handleChange} />
                  <TextField name="email" label="Email Address" fullWidth margin="normal" value={formValues.email} onChange={handleChange} />
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <TextField name="city" label="City" fullWidth margin="normal" value={formValues.city} onChange={handleChange} />
                  <TextField name="intersetedCountry" label="Interested Country" fullWidth margin="normal" value={formValues.intersetedCountry} onChange={handleChange} />
                  <TextField name="intersetedCourse" label="Interested Course" fullWidth margin="normal" value={formValues.intersetedCourse} onChange={handleChange} />
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Type</InputLabel>
                    <Select name="type" value={formValues.type} onChange={handleChange} label="Eligiblity Test Type">
                      <MenuItem value="ABROAD">ABROAD</MenuItem>
                      <MenuItem value="MEDICAL">MEDICAL</MenuItem>
                    </Select>
                  </FormControl>

                  {formValues.type === 'ABROAD' && (
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Test</InputLabel>
                      <Select name="test" value={formValues.test} onChange={handleChange} label="Eligiblity Test">
                        <MenuItem value="">I don't have it</MenuItem>
                        <MenuItem value="IELTS">IELTS</MenuItem>
                        <MenuItem value="TOEFL">TOEFL</MenuItem>
                        <MenuItem value="PTE">PTE</MenuItem>
                        <MenuItem value="GRE">GRE</MenuItem>
                        <MenuItem value="DET">DET</MenuItem>
                        <MenuItem value="GERMENY">GERMENY</MenuItem>
                      </Select>
                    </FormControl>
                  )}

                  {formValues.type === 'MEDICAL' && (
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Medical Test</InputLabel>
                      <Select name="test" value={formValues.test} onChange={handleChange} label="Medical Test">
                        <MenuItem value="">Don't have it</MenuItem>
                        <MenuItem value="NEET">NEET</MenuItem>
                      </Select>
                    </FormControl>
                  )}

                  <TextField name="score" label="Score" type="number" fullWidth margin="normal" value={formValues.score} onChange={handleChange} />
                </motion.div>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} disabled={activeStep === 0}>Back</Button>
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
          <Button onClick={handleCloseStepper}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Thank You Modal */}
      <Dialog open={showThankYouModal} onClose={handleCloseThankYouModal} maxWidth="sm" fullWidth>
        <DialogContent>
          <Box textAlign="center" py={4}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: '#4CAF50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '40px',
                color: 'white'
              }}
            >
              ✓
            </Box>
            <Typography variant="h4" component="h2" gutterBottom color="primary" fontWeight="bold">
              Thank You!
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Your counselling request has been submitted successfully.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Our team will get back to you within 24 hours to schedule your counselling session.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
              We look forward to helping you achieve your study abroad goals!
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={handleCloseThankYouModal}
            variant="contained"
            color="primary"
            size="large"
            sx={{ minWidth: 120 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
