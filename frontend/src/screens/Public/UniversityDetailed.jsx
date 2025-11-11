import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useAllCourseMutation, useFetchOneCourseMutation, useFetchOneUniversityMutation } from '../../slices/adminApiSlice';
import { FetchOneUniversitys } from '../../slices/universitySlice';
import Loader from '../../components/Loader';
import { Accordion, AccordionDetails, AccordionSummary, Box, Tab, Tabs, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import { useInView } from 'react-intersection-observer';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, StarBorder } from '@mui/icons-material';

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
                    className="md:border md:p-4 rounded-lg bg-white shadow-sm"
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
    const totalStars = 5;
    const filledStars = Math.round(grade);
    return (
        <div className='flex items-center'>
            {[...Array(totalStars)].map((_, index) => (
                index < filledStars ? <Star key={index} color="primary" /> : <StarBorder key={index} color="primary" />
            ))}
        </div>
    );
};

export default function UniversityDetailed() {
    const { id } = useParams();
    const [refBanner, inViewBanner] = useInView({ triggerOnce: true });
    
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = React.useState(0);
    const [FetchOneUniversity, { isLoading }] = useFetchOneUniversityMutation();
    const [FetchOneCourseByUniversity, { isloading }] = useAllCourseMutation();
    const { singleUniversity } = useSelector((state) => state.university);
    const [courseByUnivesity, setcourseByUnivesity] = useState()
    console.log(singleUniversity);    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchOneUniversity(id).unwrap();
                dispatch(FetchOneUniversitys(result));

                const courseData = await FetchOneCourseByUniversity().unwrap();

                const filteredCourses = courseData.filter(
                    (course) => course?.University?._id === id
                );

                console.log(filteredCourses, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Filtered Courses");
                setcourseByUnivesity(filteredCourses)


            } catch (error) {
                console.error('Failed to fetch university:', error);
            }
        };
        fetchData();
    }, [id, dispatch, FetchOneUniversity]);

    if (isLoading) return <Loader />;

    const cleanedDescription = singleUniversity.description?.replace(/<p>/g, '').replace(/<\/p>/g, '') || 'No description available.';
    const cleanedCampusLife = singleUniversity.campusLife?.replace(/<p>/g, '').replace(/<\/p>/g, '') || 'No campus life information available.';
    const cleanedHostel = singleUniversity.hostel?.replace(/<p>/g, '').replace(/<\/p>/g, '') || 'No hostel information available.';

    return (
        <div className=' '>
            <div className='flex flex-col space-y-10 md:space-y-20'>
                <div className='relative'>
                   <motion.div
                           ref={refBanner}
                           initial={{ opacity: 0 }}
                           animate={inViewBanner ? { opacity: 1 } : {}}
                           transition={{ duration: 1 }}
                         >
                           <div className="w-full h-[200px] sm:h-[100%] md:h-[100%] lg:h-[100%] overflow-hidden">
                             <img
                               src={singleUniversity.bannerURL}
                               alt="Country Banner"
                               className="w-full h-full object-cover object-center"
                             />
                           </div>
                   
                   
                         </motion.div>



                    <motion.div
                        className='absolute bottom-[-75px] left-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 sm:mt-[75px]'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <div className='rounded-full'>
                            <img
                                src={singleUniversity.logo}
                                className='w-[100px] sm:w-[120px] md:w-[150px] h-[100px] sm:h-[120px] md:h-[150px] rounded-full  object-cover'
                                alt='University Logo'
                            />
                        </div>

                        <div className='text-black sm:ml-4'>
                            <h2 className='text-sm sm:text-2xl md:text-3xl md:mt-[100px] font-bold'>{singleUniversity.name}</h2>
                            <div className='flex flex-wrap mt-2 items-center text-sm sm:text-base'>
                                {/* <div className='rounded-full w-[40px] sm:w-[50px] md:w-[60px] h-[40px] sm:h-[50px] md:h-[60px] flex items-center border-r p-2'>
                                    <img className='object-cover rounded-full' src={singleUniversity?.Province?.Country?.flagURL} alt="Country Flag" />
                                </div> */}
                                <div className='p-2 border-r'>{singleUniversity?.Province?.Country?.name}</div>
                                {/* <div className='p-2'>{singleUniversity?.Province?.name}</div> */}
                            </div>
                        </div>
                    </motion.div>
                </div>


                <div className="flex flex-col lg:flex-row border w-full gap-4">
                    {/* Tabs Section */}
                    <Box className="w-full lg:w-3/4 py-6">
                        <Tabs
                            value={tabValue}
                            onChange={(e, val) => setTabValue(val)}
                            aria-label="university tabs"
                            className="mb-4"
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                        >
                            <Tab label="Overview" icon={<InfoIcon />} iconPosition="start" />
                            <Tab label="Campus Life" icon={<SchoolIcon />} iconPosition="start" />
                            <Tab label="Hostel" icon={<CategoryIcon />} iconPosition="start" />
                        </Tabs>

                        <TabPanel value={tabValue} index={0}>
                            <Box className="space-y-4">
                                <Typography variant="h5" fontWeight="bold">Overview</Typography>
                                <div className="flex flex-wrap justify-between gap-4">
                                    <Typography><strong>Grade:</strong> {singleUniversity.grade}</Typography>
                                    <Typography variant="body1" className="flex items-center gap-2">
                                        <strong>Rating:</strong> {renderStars(singleUniversity.rank)}
                                    </Typography>
                                    {/* <Typography><strong>Type:</strong> {singleUniversity.type}</Typography> */}
                                </div>
                                <div>
                                    <Typography variant="h6" fontWeight="bold">About the University</Typography>
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: singleUniversity.description }}
                                    />
                                    <Link
                                        to={singleUniversity.UniLink}
                                        target="_blank"
                                        className="mt-4 inline-block px-4 py-2 bg-gold-main text-white hover:bg-gold-400 transition rounded-full text-center"
                                    >
                                        Explore University
                                    </Link>
                                </div>
                            </Box>
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <Box className="space-y-4">
                                <Typography variant="h5" fontWeight="bold">Campus Life & Hostel</Typography>
                                <div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: singleUniversity.campusLife }}
                                />
                            </Box>
                        </TabPanel>

                        <TabPanel value={tabValue} index={2}>
                            <Box className="space-y-4">
                                <Typography variant="h5" fontWeight="bold">Eligibility</Typography>
                                  <div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: singleUniversity.hostel }}
                                />
                                {/* <Typography>{singleUniversity.hostel || 'Not available'}</Typography> */}
                            </Box>
                        </TabPanel>
                    </Box>

                    {/* Courses Sidebar */}
                    <div className="w-full lg:w-1/4 p-4 bg-white rounded-xl space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            <span className="text-blue-main">Courses</span> <span className="text-gold-main">Offered</span>
                        </h2>

                        {courseByUnivesity?.map((course, index) => (
                            <div key={index} className="flex items-center space-x-3 border rounded-lg p-3 shadow-sm">
                                <img
                                    src={course?.University?.bannerURL}
                                    alt={course?.ProgramName}
                                    className="w-14 h-14 rounded-full object-cover border"
                                />
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-700">{course?.ProgramName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
