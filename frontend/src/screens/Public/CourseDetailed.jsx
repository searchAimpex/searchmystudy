import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateLeadMutation, useFetchOneCourseMutation } from '../../slices/adminApiSlice';
import { FetchOneCourses } from '../../slices/courseSlice';
import {
  Box,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Modal,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import TimerIcon from '@mui/icons-material/Timer';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify'

export default function CourseDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleCourse } = useSelector((state) => state.course);
  const [FetchOneCourse] = useFetchOneCourseMutation();
  const [tabValue, setTabValue] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

const handleModalOpen = () => setIsModalOpen(true);
const handleModalClose = () => setIsModalOpen(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchOneCourse(id).unwrap();
        dispatch(FetchOneCourses(result));
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }
    };
    fetchData();
  }, [id, dispatch, FetchOneCourse]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const openBrochure = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const openKnowMore = (url) => {
    console.log("url",url)
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <motion.div
      className="p-4 mx-auto max-w-7xl my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PopUp isModalOpen = {isModalOpen} handleModalClose={handleModalClose} />
      {singleCourse && (
        <>
          <motion.div
            className="relative mb-6"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardMedia
              component="img"
              height="300"
              image={singleCourse?.University?.bannerURL}
              alt={singleCourse?.University?.name}
              className="object-cover"
            />
            {/* <div className="absolute top-1/6 left-8 transform -translate-y-1/2"> */}
            <div className='flex flex-row  mt-6 space-x-10'>
              <motion.img
                src={singleCourse?.University?.logo}
                alt={singleCourse?.University?.name}
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            {/* </div> */}
            <CardContent className="relative flex flex-col items-start space-y-2">
              <Box className="flex space-x-4">
              <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    boxShadow: 2,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                  onClick={handleModalOpen}
                >
                  Apply
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick = {()=>openBrochure(singleCourse?.broucherURL)}
                  sx={{
                    boxShadow: 1,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  Brochure
                </Button>
                
              </Box>
              <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                {singleCourse?.ProgramName}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
                {singleCourse?.University?.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {singleCourse?.Location}
              </Typography>
            </CardContent>
            </div>
          </motion.div>

          <Box>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="course tabs"
              className="mb-4"
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              centered
            >
              <Tab label="Details" icon={<InfoIcon />} iconPosition="start" />
              <Tab label="Intake" icon={<EventNoteIcon />} iconPosition="start" />
              <Tab label="Requirements" icon={<SchoolIcon />} iconPosition="start" />
              <Tab label="Campus Life" icon={<SchoolIcon />} iconPosition="start" />
              <Tab label="Hostel" icon={<SchoolIcon />} iconPosition="start" />
              <Tab label="Fees" icon={<SchoolIcon />} iconPosition="start" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box
                sx={{
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: 1,
                  backgroundColor: 'background.paper',
                  maxWidth: 800,
                  margin: '0 auto',
                }}
              >
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Program Details
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
                    Program Name: <strong>{singleCourse.ProgramName}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                    Category: <strong>{singleCourse.Category}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <TimerIcon sx={{ mr: 1, color: 'primary.main' }} />
                    Duration: <strong>{singleCourse.Duration}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <TimerIcon sx={{ mr: 1, color: 'primary.main' }} />
                    Program Level: <strong>{singleCourse.ProgramLevel}</strong>
                  </Typography>
                </Box>

                <Typography variant="body1">
                
                  <Button
                  variant="outlined"
                  color="primary"
                  onClick = {()=>openKnowMore(singleCourse?.WebsiteURL)}
                  sx={{
                    boxShadow: 1,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  Know More
                </Button>
                </Typography>

              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Intake Details
              </Typography>
              {singleCourse?.Intake?.map((intake, index) => (
                <Accordion key={index} className="mb-2">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100">
                    <Typography sx={{ fontWeight: 'bold' }}>Intake {index + 1}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Status: {intake.status ? 'Yes' : 'No'}</Typography>
                    <Typography>Date: {intake.date}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Language Requirements
              </Typography>
              {singleCourse?.LanguageRequirements ? (
                Object.entries(singleCourse.LanguageRequirements).map(([key, req]) => (
                  <Accordion key={key} className="mb-2">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100">
                      <Typography sx={{ fontWeight: 'bold' }}>{key}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Status: {req.status ? 'Required' : 'Not Required'}</Typography>
                      <Typography>Description: {req.description}</Typography>
                      <Typography>Minimum Requirement: {req.minRequirement}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <Typography>No language requirements available</Typography>
              )}

              <Typography variant="h6" className="mt-4 mb-2" sx={{ fontWeight: 'bold' }}>
                Standardized Requirements
              </Typography>
              {singleCourse?.StandardizeRequirement ? (
                Object.entries(singleCourse.StandardizeRequirement).map(([key, req]) => (
                  <Accordion key={key} className="mb-2">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100">
                      <Typography sx={{ fontWeight: 'bold' }}>{key}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Status: {req.status ? 'Required' : 'Not Required'}</Typography>
                      <Typography>Description: {req.description}</Typography>
                      <Typography>Minimum Requirement: {req.minRequirement}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <Typography>No standardized requirements available</Typography>
              )}
            </TabPanel>

            {/* Add additional tabs content here */}
          </Box>
        </>
      )}
     
    </motion.div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
} // Import your RTK query endpoint

function PopUp({ isModalOpen, handleModalClose }) {
  // Controlled form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  // RTK Query mutation hook
  const [createLead, { isLoading, isSuccess, isError, error }] = useCreateLeadMutation();
  useEffect(()=>{
    if(isSuccess){
      toast.success("Thank you for applying , we will get back to you shortly!")
    }

  },[isSuccess])
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const leadData = { name, email, phoneNo };
      await createLead(leadData).unwrap(); // Perform mutation
      // Clear form fields
      setName('');
      setEmail('');
      setPhoneNo('');
      handleModalClose(); // Close the modal
    } catch (err) {
      console.error('Failed to submit form:', err.message || err.data);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute top-[20px] left-[40%] transform -translate-x-1/2 p-6 rounded-lg bg-white shadow-2xl max-w-sm w-full"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            Apply for the Course
          </Typography>
          <span
            onClick={handleModalClose}
            className="cursor-pointer hover:text-red-500 transition duration-200"
          >
            X
          </span>
        </Box>

        <Typography variant="body1" color="textSecondary" mb={3}>
          Fill in the details below to apply for this program.
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5, fontWeight: 'bold' }}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>

        {/* Show error message */}
        {isError && (
          <Typography color="error" mt={2}>
            {error?.data?.message || 'Something went wrong. Please try again.'}
          </Typography>
        )}

        {/* Success message */}
        {isSuccess && (
          <Typography color="green" mt={2}>
            Lead created successfully!
          </Typography>
        )}
      </motion.div>
    </Modal>
  );
}

