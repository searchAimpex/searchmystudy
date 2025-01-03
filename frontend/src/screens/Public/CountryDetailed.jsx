import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCountryFetchOneMutation } from '../../slices/adminApiSlice';
import { FetchOneCountry } from '../../slices/countrySlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import UniversityLogo from "../../assets/UniversityLogo.png";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormImage from '../../assets/FormImage.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function CountryDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [CountryFetchOne, { isLoading }] = useCountryFetchOneMutation();
    const { singleCountry } = useSelector((state) => state.country);

    // Ensure all hooks are called consistently
    const [refBanner, inViewBanner] = useInView({ triggerOnce: true });
    const [refInfo, inViewInfo] = useInView({ triggerOnce: true });
    const [refSections, inViewSections] = useInView({ triggerOnce: true });
    const [refProvinces, inViewProvinces] = useInView({ triggerOnce: true });
    const [refHelp, inViewHelp] = useInView({ triggerOnce: true });
    const [refFaq, inViewFaq] = useInView({ triggerOnce: true });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await CountryFetchOne(id).unwrap();
                dispatch(FetchOneCountry(result));
            } catch (error) {
                console.error('Failed to fetch country:', error);
            }
        };
        fetchData();
    }, [id, dispatch, CountryFetchOne]);

    // Render loading state after hooks have been initialized
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            {/* Section 1: Country Banner */}
            <motion.div
                ref={refBanner}
                initial={{ opacity: 0 }}
                animate={inViewBanner ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
            >
                <img src={singleCountry?.bannerURL} className="h-[450px] w-full object-cover" alt="Country Banner" />
            </motion.div>

            {/* Section 2: Country Information */}
            <motion.div
                ref={refInfo}
                className='flex flex-col items-center space-x-12 mt-10 justify-center mx-[200px]'
                initial={{ opacity: 0, y: 50 }}
                animate={inViewInfo ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
            >
                <span className='text-4xl font-bold text-blue-main'>{singleCountry?.name}</span>
                <div
                        className="text-md font-bold mt-5 text-gray-600"
                        dangerouslySetInnerHTML={{ __html: singleCountry?.description }}
                        ></div>
            </motion.div>

            {/* Render sections if they exist */}
            {singleCountry.sections && singleCountry.sections.length > 0 && (
                <motion.div
                    ref={refSections}
                    className="mt-10 mx-[200px] space-y-16"
                    initial={{ opacity: 0 }}
                    animate={inViewSections ? { opacity: 1 } : {}}
                    transition={{ duration: 1 }}
                >
                    {singleCountry.sections.map((section, index) => (
                        <motion.div
                            key={section._id}
                            className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                            animate={inViewSections ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 1 }}
                        >
                            <div className="md:w-1/2 text-center md:text-left">
                                <h3 className="text-2xl font-bold px-10 text-blue-main mb-4">{section.title}</h3>
                                <div className="text-gray-600 p-10"   dangerouslySetInnerHTML={{ __html: singleCountry?.description }}></div>
                            </div>
                            <div className="md:w-1/2 mt-4 md:mt-0">
                                <motion.img
                                    src={section.url}
                                    alt={section.title}
                                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Section: Province Header */}
            <motion.div
                ref={refProvinces}
                className='mt-10 flex flex-col items-center justify-center'
                initial={{ opacity: 0 }}
                animate={inViewProvinces ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
            >
                <span className='text-blue-main text-4xl font-bold'>PROVINCE (state) wise Universitiy/College in {singleCountry?.name}</span>
            </motion.div>

            {/* Section 3: Province Cards */}
            <motion.div
                ref={refProvinces}
                className='grid grid-cols-3 gap-10 mt-10 mx-[200px]'
                initial="hidden"
                animate={inViewProvinces ? "visible" : "hidden"}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            delayChildren: 0.3,
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >
                {singleCountry?.Province?.map((province) => (
                    <motion.div
                        key={province._id}
                        className="relative group perspective"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flip-card flex flex-col items-center justify-center border-2 shadow-xl p-6 bg-white rounded-lg">
                            {/* Front side */}
                            <div className="flip-card-front flex flex-col items-center justify-center">
                                <img src={UniversityLogo} className='h-[100px] object-cover mb-4' alt={province.name} />
                                <span className="text-2xl font-bold text-blue-main">{province.name}</span>
                            </div>
                            {/* Back side */}
                            <div
                                className="flip-card-back absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center p-6"
                                style={{ backgroundImage: `url(${province.heroURL})` }}
                            >
                                <button
                                    className="bg-blue-main text-white py-2 px-4 rounded-full"
                                    onClick={() => navigate(`/province/${province._id}`)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Section: Help with Application */}
            <motion.div
                ref={refHelp}
                className='my-20 pt-10 border-2 shadow-xl'
                initial={{ opacity: 0, y: 50 }}
                animate={inViewHelp ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
            >
                <div className='flex flex-row items-center justify-center mt-10 space-x-4'>
                    <span className='text-4xl font-bold text-blue-main'>Need</span>
                    <span className='text-4xl font-bold text-gold-main'>help</span>
                    <span className='text-4xl font-bold text-blue-main'>with</span>
                    <span className='text-4xl font-bold text-gold-main'>your</span>
                    <span className='text-4xl font-bold text-blue-main'>application?</span>
                </div>
                <div className='flex flex-row p-10 mx-[200px]'>
                    {/* Image Div */}
                    <motion.div
                        className='w-1/2 flex items-center'
                        initial={{ opacity: 0, x: -100 }}
                        animate={inViewHelp ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1 }}
                    >
                        <img src={FormImage} className='object-cover w-[520px] h-[450px]' alt='Contact Form' />
                    </motion.div>

                    {/* Form Div */}
                    <motion.div
                        className='w-1/2 flex flex-col p-14 bg-blue-main h-[450px]'
                        initial={{ opacity: 0, x: 100 }}
                        animate={inViewHelp ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1 }}
                    >
                        <span className='text-xl text-white font-bold mb-4'>
                            Contact our admissions team for personalized guidance.
                        </span>
                        <form className='flex flex-col space-y-4'>
                            <input
                                type='text'
                                name='fullName'
                                placeholder='Full Name'
                                className='p-2 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-gold-main'
                            />
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                className='p-2 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-gold-main'
                            />
                            <input
                                type='tel'
                                name='phoneNumber'
                                placeholder='Phone Number'
                                className='p-2 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-gold-main'
                            />
                            <button
                                type='submit'
                                className='bg-gold-main text-white font-bold py-2 rounded-md hover:bg-gold-dark'
                            >
                                Submit
                            </button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>

            {/* Section 4: FAQ Section */}
            <motion.div
                ref={refFaq}
                className='mx-[200px] my-20'
                initial={{ opacity: 0, y: 50 }}
                animate={inViewFaq ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
            >
                <div className='flex flex-row items-center justify-center space-x-4 my-10'>
                    <span className='text-4xl font-bold text-blue-main'>Frequently</span>
                    <span className='text-4xl font-bold text-gold-main'>asked</span>
                    <span className='text-4xl font-bold text-blue-main'>question ? </span>
                </div>
                {singleCountry?.faq?.map((faqItem, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="text-white" />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            sx={{
                                bgcolor: 'primary.main', // You can replace this with 'bg-blue-main' if you defined it in your Tailwind config
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            <Typography className="font-bold">{faqItem.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {faqItem.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </motion.div>
        </div>
    );
}
