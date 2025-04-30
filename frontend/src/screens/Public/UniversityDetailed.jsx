import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetchCourseMutation, useFetchOneUniversityMutation } from '../../slices/adminApiSlice';
import { FetchOneUniversitys } from '../../slices/universitySlice';

import Loader from '../../components/Loader';
import { Accordion, AccordionDetails, AccordionSummary, Box, Tab, Tabs, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, StarBorder } from '@mui/icons-material';
import { FetchCourses } from '../../slices/courseSlice';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <AnimatePresence mode="wait">
            {value === index && (
                <motion.div
                    role="tabpanel"
                    id={`tabpanel-${index}`}
                    aria-labelledby={`tab-${index}`}
                    {...other}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="border p-4 rounded-lg bg-white shadow-sm"
                >
                    <Box>
                        {children}
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const renderStars = (grade) => {
    const totalStars = 5; // Total number of stars
    const filledStars = Math.round(grade); // Number of filled stars based on grade

    return (
        <div className='flex items-center'>
            {[...Array(totalStars)].map((_, index) => (
                index < filledStars ? (
                    <Star key={index} color="primary" />
                ) : (
                    <StarBorder key={index} color="primary" />
                )
            ))}
        </div>
    );
};

export default function UniversityDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = React.useState(0);

    const navigate = useNavigate();
    const [FetchOneUniversity, { isLoading }] = useFetchOneUniversityMutation();
    const [FetchCourse, { isProcess }] = useFetchCourseMutation();

    const { singleUniversity } = useSelector((state) => state.university);
    const [idUniversity, setIdUniversity] = useState(singleUniversity._id || '');  // Initialize with default value
    const [courses, setCourses] = useState([]);  // Initialize courses as an empty array
    
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    console.log(courses,"coursescoursescoursescoursescoursescoursescoursescoursescoursescoursescourses")
    
    console.log(idUniversity,"idididididididididididididididididididididididididididididididididididididid");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchOneUniversity(id).unwrap();
                dispatch(FetchOneUniversitys(result));

                // Fetch courses for the university
                const course = await FetchCourse().unwrap();
                const filteredCourses = course.filter((item) => item.University._id === idUniversity);
                
                setCourses(filteredCourses);
                dispatch(FetchCourses(filteredCourses));

                
            } catch (error) {
                console.error('Failed to fetch university:', error);
            }
        };
        fetchData();
    }, [id, idUniversity, dispatch, FetchOneUniversity]);

    if (isLoading) {
        return <Loader />;
    }

    // Handle description safely, with fallback
    const description = singleUniversity?.description || 'No description available';
    const eligibility = singleUniversity?.eligiblity || 'No eligibility available';
    const campuslife = singleUniversity?.campusLife || 'No campuslife available';
    
    return (
        <div className='w-full'>
            <div className='flex flex-col space-y-20'>
                <div className='relative'>
                    {/* Banner Image */}
                    <motion.img
                        src={singleUniversity?.bannerURL}
                        className='w-full h-[400px] rounded-lg object-cover'
                        alt='University Banner'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />

                    {/* Logo, University Name, and Province */}
                    <motion.div
                        className='absolute bottom-[-75px] left-4 flex items-center space-x-4 sm:space-x-6'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <div className='bg-white rounded-full border'>
                            <img src={singleUniversity?.logo} className='w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full border-4 border-white object-cover' alt='University Logo' />
                        </div>
                        <div className='text-white mt-[75px]'>
                            <h2 className='text-2xl sm:text-3xl text-black font-bold'>{singleUniversity?.name}</h2>
                            <div className='flex flex-col sm:flex-row mt-2 items-center'>
                                <div className='rounded-full w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] flex items-center border-r p-2'>
                                    <img className='object-cover rounded-full' src={singleUniversity?.Province?.Country?.flagURL} alt="Country Flag" />
                                </div>
                                <div className='p-2 border-r'>
                                    <span className='text-lg text-black'>{singleUniversity?.Province?.Country?.name}</span>
                                </div>
                                <div className='p-2'>
                                    <span className='text-lg text-black'>{singleUniversity?.Province?.name}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className='flex flex-col sm:flex-row'>
                    <div className='w-full sm:w-[75%]'>
                        {/* Tabs Section */}
                        <Box>
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                aria-label="university tabs"
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                centered
                            >
                                <Tab label="Overview" icon={<InfoIcon />} iconPosition="start" />
                                <Tab label="Campus Life" icon={<SchoolIcon />} iconPosition="start" />
                                <Tab label="Eligibility" icon={<CategoryIcon />} iconPosition="start" />
                            </Tabs>

                            {/* Overview Tab */}
                            <TabPanel value={tabValue} index={0}>
                                <Box
                                    
                                    
                                >
                                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        Overview
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 2,
                                        }}
                                    >
                                        <Typography variant="body1">
                                            <strong>Grade:</strong> {singleUniversity?.grade}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Rating:</strong>
                                            {renderStars(singleUniversity?.rank)}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Type:</strong> {singleUniversity?.type}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ marginTop: 4 }}>
                                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                            About the University
                                        </Typography>
                                        <Typography variant="body1">
                                            <div
                                                className="university-detail-container"
                                                dangerouslySetInnerHTML={{ __html: description }}
                                            />
                                        </Typography>
                                    </Box>
                                </Box>
                            </TabPanel>

                            {/* Campus Life Tab */}
                            <TabPanel value={tabValue} index={1}>
                                <Box
                                  
                                >
                                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        Campus Life
                                    </Typography>
                                    <Typography variant="body1">
                                    <div
                                                className="university-detail-container"
                                                dangerouslySetInnerHTML={{ __html: campuslife }}
                                            />
                                        {/* {singleUniversity?.campusLife || 'No information available.'} */}
                                    </Typography>
                                </Box>
                            </TabPanel>

                            {/* Eligibility Tab */}
                            <TabPanel value={tabValue} index={2}>
                                <Box
                                   
                                >
                                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        Eligibility
                                    </Typography>
                                    <Typography variant="body1">
                                    <div
                                                className="university-detail-container"
                                                dangerouslySetInnerHTML={{ __html: eligibility }}
                                            />
                                        {/* {singleUniversity?.eligibility || 'No eligibility information available.'} */}
                                    </Typography>
                                </Box>
                            </TabPanel>
                        </Box>
                    </div>

                    <div className='w-full sm:w-[35%] mt-8 sm:mt-0'>
                        {/* Courses Section */}
                        <div className='bg-gray-100 rounded-lg p-4'>
                                <h1 className='text-center font-semibold text-2xl text-blue-main'>Available Courses</h1>
                            {courses.length === 0 ? (
                                <Typography variant="body1">No courses available at the moment.</Typography>
                            ) : (
                                <Box>
                                    {courses.map((course) => (
                                        <Link
                                            key={course._id}
                                            className="flex items-center gap-4 p-2 bg-white rounded-xl shadow-md border hover:border-gold-main hover:bg-gold-main-100 group"
                                        >
                                            <img
                                                src={course.University.logo}
                                                className="w-14 h-14 rounded-full border-2 border-red-200 shadow-sm group-hover:scale-105 transition-transform"
                                                alt={course.ProgramName}
                                            />
                                            <p className="text-xl font-semibold text-gray-800 group-hover:text-gold-main">
                                                {course.ProgramName}
                                            </p>
                                        </Link>
                                    ))}
                                </Box>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
