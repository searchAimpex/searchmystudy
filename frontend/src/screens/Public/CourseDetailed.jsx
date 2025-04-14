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
import { toast } from 'react-toastify';

export default function CourseDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleCourse } = useSelector((state) => state.course);
  const [FetchOneCourse] = useFetchOneCourseMutation();
  const [tabValue, setTabValue] = useState(0);
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
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="p-4 mx-auto max-w-screen-xl my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PopUp isModalOpen={isModalOpen} handleModalClose={handleModalClose} />
      {singleCourse && (
        <>
          <motion.div className="relative mb-6" initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <CardMedia component="img" height="250" image={singleCourse?.University?.bannerURL} alt={singleCourse?.University?.name} className="object-cover w-full rounded-lg" />
            <div className="flex flex-col sm:flex-row items-center mt-6 space-y-6 sm:space-y-0 sm:space-x-6">
              <motion.img
                src={singleCourse?.University?.logo}
                alt={singleCourse?.University?.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
              <CardContent className="flex flex-col items-start space-y-2 w-full sm:w-auto">
                <Box className="flex flex-col sm:flex-row gap-4 mb-2">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ boxShadow: 2, fontWeight: 'bold', textTransform: 'none' }}
                    onClick={handleModalOpen}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => openBrochure(singleCourse?.broucherURL)}
                    sx={{ boxShadow: 1, fontWeight: 'bold', textTransform: 'none' }}
                  >
                    Brochure
                  </Button>
                </Box>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>{singleCourse?.ProgramName}</Typography>
                <Typography variant="h6" component="div">{singleCourse?.University?.name}</Typography>
                <Typography variant="subtitle2" color="text.secondary">{singleCourse?.Location}</Typography>
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
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Details" icon={<InfoIcon />} iconPosition="start" />
              <Tab label="Intake" icon={<EventNoteIcon />} iconPosition="start" />
              <Tab label="Requirements" icon={<SchoolIcon />} iconPosition="start" />
              <Tab label="Campus Life" icon={<SchoolIcon />} iconPosition="start" />
              <Tab label="Hostel" icon={<SchoolIcon />} iconPosition="start" />
              <Tab label="Fees" icon={<SchoolIcon />} iconPosition="start" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
  <Box   style={{
      boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.28), -4px -4px 10px rgba(0, 0, 0, 0.28)',
    }} className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-5xl mx-auto">
    <Typography
      variant="h6"
      sx={{ fontWeight: 'bold' }}
      className="text-lg sm:text-xl md:text-2xl text-center sm:text-left"
    >
      Program Details
    </Typography>

    <Box className="mt-4 space-y-3 sm:space-y-4 text-sm sm:text-base">
      <Box className="flex flex-col sm:flex-row items-start sm:items-center">
        <InfoIcon className="text-blue-500 mr-2 mb-1 sm:mb-0" />
        <Typography className="flex-1">
          Program Name: <strong>{singleCourse.ProgramName}</strong>
        </Typography>
      </Box>

      <Box className="flex flex-col sm:flex-row items-start sm:items-center">
        <CategoryIcon className="text-blue-500 mr-2 mb-1 sm:mb-0" />
        <Typography className="flex-1">
          Category: <strong>{singleCourse.Category}</strong>
        </Typography>
      </Box>

      <Box className="flex flex-col sm:flex-row items-start sm:items-center">
        <TimerIcon className="text-blue-500 mr-2 mb-1 sm:mb-0" />
        <Typography className="flex-1">
          Duration: <strong>{singleCourse.Duration}</strong>
        </Typography>
      </Box>

      <Box className="flex flex-col sm:flex-row items-start sm:items-center">
        <TimerIcon className="text-blue-500 mr-2 mb-1 sm:mb-0" />
        <Typography className="flex-1">
          Program Level: <strong>{singleCourse.ProgramLevel}</strong>
        </Typography>
      </Box>
    </Box>

    <Box className="mt-6 text-center sm:text-right">
      <Button
        variant="outlined"
        color="primary"
        onClick={() => openKnowMore(singleCourse?.WebsiteURL)}
        className="w-full sm:w-auto"
      >
        Know More
      </Button>
    </Box>
  </Box>
</TabPanel>


            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Intake Details</Typography>
              {singleCourse?.Intake?.map((intake, index) => (
                <Accordion key={index} className="my-2">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100">
                    <Typography>Intake {index + 1}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Status: {intake.status ? 'Yes' : 'No'}</Typography>
                    <Typography>Date: {intake.date}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Language Requirements</Typography>
              {singleCourse?.LanguageRequirements ? (
                Object.entries(singleCourse.LanguageRequirements).map(([key, req]) => (
                  <Accordion key={key} className="my-2">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100">
                      <Typography>{key}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Status: {req.status ? 'Required' : 'Not Required'}</Typography>
                      <Typography>Description: {req.description}</Typography>
                      <Typography>Minimum Requirement: {req.minRequirement}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : <Typography>No language requirements available</Typography>}

              <Typography variant="h6" className="mt-6" sx={{ fontWeight: 'bold' }}>Standardized Requirements</Typography>
              {singleCourse?.StandardizeRequirement ? (
                Object.entries(singleCourse.StandardizeRequirement).map(([key, req]) => (
                  <Accordion key={key} className="my-2">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100">
                      <Typography>{key}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Status: {req.status ? 'Required' : 'Not Required'}</Typography>
                      <Typography>Description: {req.description}</Typography>
                      <Typography>Minimum Requirement: {req.minRequirement}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : <Typography>No standardized requirements available</Typography>}
            </TabPanel>
          </Box>
        </>
      )}
    </motion.div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function PopUp({ isModalOpen, handleModalClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [createLead, { isLoading, isSuccess, isError, error }] = useCreateLeadMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Thank you for applying, we will get back to you shortly!');
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const leadData = { name, email, phoneNo };
      await createLead(leadData).unwrap();
      setName('');
      setEmail('');
      setPhoneNo('');
      handleModalClose();
    } catch (err) {
      console.error('Failed to submit form:', err.message || err.data);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-[10%] left-1/2 transform -translate-x-1/2 p-6 rounded-lg bg-white shadow-2xl w-[90%] max-w-md"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Apply for the Course</Typography>
          <span onClick={handleModalClose} className="cursor-pointer hover:text-red-500">X</span>
        </Box>

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

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>

        {isError && <Typography color="error" mt={2}>{error?.data?.message || 'Something went wrong. Please try again.'}</Typography>}
      </motion.div>
    </Modal>
  );
}
