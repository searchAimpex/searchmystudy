import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    const { singleUniversity } = useSelector((state) => state.university);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchOneUniversity(id).unwrap();
                console.log(result,"/////////////***************************");
                
                dispatch(FetchOneUniversitys(result));
            } catch (error) {
                console.error('Failed to fetch university:', error);
            }
        };
        fetchData();
    }, [id, dispatch, FetchOneUniversity]);

    if (isLoading) {
        return <Loader />;
    }
    const cleanedDescription = singleUniversity.description?.replace(/<p>/g, '').replace(/<\/p>/g, '') || 'No description available.';
    const cleanedCampusLife = singleUniversity.campusLife?.replace(/<p>/g, '').replace(/<\/p>/g, '') || 'No campus life information available.';
    const cleanedHostel = singleUniversity.hostel?.replace(/<p>/g, '').replace(/<\/p>/g, '') || 'No hostel information available.';

    return (
        <div className='mx-[200px]'>
            <div className='flex flex-col space-y-20'>
                <div className='relative'>
                    {/* Rounded Banner Image */}
                    <motion.img 
                        src={singleUniversity.bannerURL} 
                        className='w-full h-[400px] rounded-lg object-cover' 
                        alt='University Banner' 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />

                    {/* Logo, University Name, and Province Name */}
                    <motion.div 
                        className='absolute bottom-[-75px] left-4 flex items-center space-x-4'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <div className='bg-white rounded-full border'>
                            <img src={singleUniversity.logo} className='w-[150px] h-[150px] rounded-full border-4 border-white object-cover' alt='University Logo' />
                        </div>
                        <div className='text-white mt-[75px]'>
                            <h2 className='text-2xl text-black font-bold'>{singleUniversity.name}</h2>
                            <div className='flex flex-row mt-2 items-center'>
                                <div className='rounded-full w-[60px] h-[60px] flex items-center border-r p-2'>
                                    <img className='object-cover rounded-full' src={singleUniversity?.Province?.Country?.flagURL} alt="Country Flag"/>
                                </div>
                                <div className='p-2 border-r'>
                                    <span className='text-lg text-black'>{singleUniversity?.Province?.Country.name}</span>
                                </div>
                                <div className='p-2'>
                                    <span className='text-lg text-black'>{singleUniversity?.Province?.name}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tabs Section */}
                <Box>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="university tabs"
                        className="mb-4"
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        centered
                    >
                        <Tab label="Overview" icon={<InfoIcon />} iconPosition="start" />
                        <Tab label="Fees & Campus Life" icon={<SchoolIcon />} iconPosition="start" />
                        <Tab label="Eligibility" icon={<CategoryIcon />} iconPosition="start" />
                    </Tabs>

                    {/* Overview Tab */}
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
                                Overview
                            </Typography>
                            {/* Display information in a row */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 2,
                                }}
                            >
                                 <Typography variant="body1">
                                    <strong>Grade:</strong>{singleUniversity.grade}
                                   
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Rank:</strong> {singleUniversity.rank}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Rating</strong>
                                    {renderStars(singleUniversity.rating)}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Type:</strong> {singleUniversity.type}
                                </Typography>
                            </Box>

                            {/* Section for university description */}
                            <Box sx={{ marginTop: 4 }}>
                                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    About the University
                                </Typography>
                                <Typography variant="body1">
{cleanedDescription}                      
                                </Typography>
                                <Link
                        to={singleUniversity.UniLink}
                        target='_blank'
                        className="mt-4 flex align-center w-[200px] mx-auto justify-center inline-block px-4 py-2 bg-gold-main text-white  hover:bg-gold-400 transition font-semibold"
                        style={{borderRadius:"20px"}}
                      >
                        Explore University
                      </Link>
                            </Box>
                        </Box>
                    </TabPanel>

                    {/* Fees & Campus Life Tab */}
                    <TabPanel value={tabValue} index={1}>
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
                                Fees & Campus Life
                            </Typography>
                            <Typography variant="body1">
                                <strong>Fees:</strong> {singleUniversity?.fees || 'N/A'}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Campus Life:</strong> {cleanedCampusLife}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Hostel:</strong> {cleanedHostel}
                            </Typography>
                        </Box>
                    </TabPanel>

                    {/* Eligibility Tab */}
                    <TabPanel value={tabValue} index={2}>
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
                                Eligibility
                            </Typography>
                            <Typography variant="body1">
                                {singleUniversity.eligiblity}
                            </Typography>
                        </Box>
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
}
