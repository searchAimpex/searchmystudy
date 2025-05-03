import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useFetchOneUniversityMutation } from '../../slices/adminApiSlice';
import { FetchOneUniversitys } from '../../slices/universitySlice';
import Loader from '../../components/Loader';
import { Accordion, AccordionDetails, AccordionSummary, Box, Tab, Tabs, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
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
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = React.useState(0);
    const [FetchOneUniversity, { isLoading }] = useFetchOneUniversityMutation();
    const { singleUniversity } = useSelector((state) => state.university);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchOneUniversity(id).unwrap();
                dispatch(FetchOneUniversitys(result));
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
        <div className='px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-10'>
            <div className='flex flex-col space-y-10 md:space-y-20'>
                <div className='relative'>
                    <motion.img
                        src={singleUniversity.bannerURL}
                        className='w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] rounded-lg object-cover'
                        alt='University Banner'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className='absolute bottom-[-75px] left-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 sm:mt-[75px]'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <div className='rounded-full'>
                            <img
                                src={singleUniversity.logo}
                                className='w-[100px] sm:w-[120px] md:w-[150px] h-[100px] sm:h-[120px] md:h-[150px] rounded-full border-4 border-white object-cover'
                                alt='University Logo'
                            />
                        </div>

                        <div className='text-black sm:ml-4'>
                            <h2 className='text-sm sm:text-2xl md:text-3xl md:mt-[100px] font-bold'>{singleUniversity.name}</h2>
                            <div className='flex flex-wrap mt-2 items-center text-sm sm:text-base'>
                                {/* <div className='rounded-full w-[40px] sm:w-[50px] md:w-[60px] h-[40px] sm:h-[50px] md:h-[60px] flex items-center border-r p-2'>
                                    <img className='object-cover rounded-full' src={singleUniversity?.Province?.Country?.flagURL} alt="Country Flag" />
                                </div> */}
                                <div className='p-2 border-r'>{singleUniversity?.Province?.Country.name}</div>
                                <div className='p-2'>{singleUniversity?.Province?.name}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>


                {/* Tabs */}
                <Box className="py-12 ">
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
                        <Tab label=" Campus Life & Hostel" icon={<SchoolIcon />} iconPosition="start" />
                        {/* <Tab label="Hostel" icon={<CategoryIcon />} iconPosition="start" /> */}
                    </Tabs>

                    <TabPanel value={tabValue} index={0}>
                        <Box className="space-y-4">
                            <Typography variant="h5" fontWeight="bold">Overview</Typography>
                            <div className='flex flex-wrap justify-between gap-4'>
                                <Typography><strong>Grade:</strong> {singleUniversity.grade}</Typography>
                                <Typography variant="body1" className="flex items-center gap-2">
                                    <strong>Rating:</strong>
                                    {renderStars(singleUniversity.rank)}
                                </Typography>
                                <Typography><strong>Type:</strong> {singleUniversity.type}</Typography>
                            </div>
                            <div>
                                <Typography variant="h6" fontWeight="bold">About the University</Typography>
                                <Typography>{cleanedDescription}</Typography>
                                <Link to={singleUniversity.UniLink} target="_blank" className="mt-4 inline-block px-4 py-2 bg-gold-main text-white hover:bg-gold-400 transition rounded-full text-center">
                                    Explore University
                                </Link>
                            </div>
                        </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <Box className="space-y-4">
                            <Typography variant="h5" fontWeight="bold"> Campus Life & Hostel</Typography>
                            {/* <Typography><strong>Fees:</strong> {singleUniversity?.fees || 'N/A'}</Typography> */}
                            <Typography><strong>Campus Life:</strong> {cleanedCampusLife}</Typography>
                            <Typography><strong>Hostel:</strong> {cleanedHostel}</Typography>
                        </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                        <Box className="space-y-4">
                            <Typography variant="h5" fontWeight="bold">Eligibility</Typography>
                            <Typography>{singleUniversity.eligiblity || 'Not available'}</Typography>
                        </Box>
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
}
