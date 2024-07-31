import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchOneCourseMutation } from '../../slices/adminApiSlice';
import { FetchOneCourses } from '../../slices/courseSlice';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import TimerIcon from '@mui/icons-material/Timer';

export default function CourseDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleCourse } = useSelector((state) => state.course);
  const [FetchOneCourse] = useFetchOneCourseMutation();
  const [tabValue, setTabValue] = React.useState(0);

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

  return (
    <div className="p-4 mx-auto max-w-7xl my-8">
      {singleCourse && (
        <>
          <Card className="mb-6 shadow-lg">
            <CardMedia
              component="img"
              height="300"
              image={singleCourse?.University?.bannerURL}
              alt={singleCourse?.University?.name}
              className="object-cover"
            />
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                {singleCourse?.University?.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {singleCourse?.Location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {singleCourse?.description}
              </Typography>
            </CardContent>
          </Card>

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
                  <span style={{ fontWeight: 'bold' }}>Website URL:</span> 
                  <a href={singleCourse.WebsiteURL} className="text-blue-500 underline">
                    {singleCourse.WebsiteURL}
                  </a>
                </Typography>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>Intake Details</Typography>
              {singleCourse?.Intake?.map((intake, index) => (
                <Accordion key={index} className="mb-2">
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
              <Typography variant="h6" gutterBottom>Language Requirements</Typography>
              {singleCourse?.LanguageRequirements ? (
                Object.entries(singleCourse.LanguageRequirements).map(([key, req]) => (
                  <Accordion key={key} className="mb-2">
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
              ) : (
                <Typography>No language requirements available</Typography>
              )}
              
              <Typography variant="h6" className="mt-4 mb-2">Standardized Requirements</Typography>
              {singleCourse?.StandardizeRequirement ? (
                Object.entries(singleCourse.StandardizeRequirement).map(([key, req]) => (
                  <Accordion key={key} className="mb-2">
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
              ) : (
                <Typography>No standardized requirements available</Typography>
              )}
            </TabPanel>
          </Box>
        </>
      )}
    </div>
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
      className="border p-4 rounded-lg bg-white shadow-sm"
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}
