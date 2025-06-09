import React, { useState, useEffect } from 'react';
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
  Rating
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
  const [FetchBlog] = useFetchBlogMutation();
  const [blog, setBlog] = useState()
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
        const res = await FetchBlog();
        // const a = dispatch(FetchBlog(res.data));
        setBlog(res.data)
        console.log(res.data, "+++++++++++++++++");
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const getTruncatedContent = (text, maxChars = 95) => {
    if (!text) return '';
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  };

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

  const handleOpenStepper = () => setOpenStepper(true);

  const handleCloseStepper = () => {
    setOpenStepper(false);
    setActiveStep(0);
    setFormValues({
      name: '', phone: '', email: '', city: '', intersetedCountry: '', intersetedCourse: '',
      type: 'ABROAD', test: '', score: 0
    });
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await CounsellerCreateLead(formValues).unwrap();
      handleCloseStepper();
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  const steps = ['Personal Information', 'Location & Interests', 'Test Details'];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      <section className="relative bg-gradient-to-r from-blue-300 to-blue-500 h-[300px] p-4 md:p-8 mb-8 shadow-lg">
        <div className="absolute inset-0 z-0 bg-blue-500 opacity-30"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-white text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-2xl font-bold mb-4">Your Journey Begins Here – Talk to Our Counsellors</h1>
            <p className="mb-6 text-lg md:text-xl res">Choosing the right career or studying abroad can be challenging. Our expert counsellors guide you through every step—from selecting courses to understanding requirements—so you can make confident, informed decisions.

            </p>
            <Button variant="contained" color="primary" className="bg-blue-900 text-white hover:bg-blue-800">
              Get Counselling
            </Button>
          </div>
          <div className="flex-1 w-full max-w-md mx-auto">
            <img src={CounsellerHero} alt="Counsellor Hero" className="res w-full  max-h-[250px] object-contain" />
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row gap-8 px-4 sm:px-8 lg:px-16 xl:px-32">
        <motion.div
          className="flex flex-col space-y-8 w-full lg:w-2/3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {testimonial.map((item) => (
            <motion.div
              key={item._id}
              className="flex flex-col md:flex-row bg-white border border-gray-100 rounded-2xl p-1 shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-[1.02] group"
            >
              <div className="w-full md:w-64 h-64 rounded-xl overflow-hidden shadow-sm">
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 md:ml-6 mt-4 md:mt-0 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2 uppercase transition-colors duration-300 group-hover:text-blue-700">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-base text-sm leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-4">
                  <Rating value={item.rating} readOnly className="mb-3" />
                  <Button
                    variant="contained"
                    color="primary"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white w-full py-2 rounded-md shadow-md hover:from-blue-600 hover:to-blue-800 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenStepper();
                    }}
                  >
                    Book Counselling
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>


        <motion.div className="w-full lg:w-1/3 mt-8 lg:mt-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
                  className="prose max-w-none text-sm pt-1 text-gray-700"
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
    </div>
  );
}
