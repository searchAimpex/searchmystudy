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

export default function CountryDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [CountryFetchOne, { isLoading }] = useCountryFetchOneMutation();
    const { singleCountry } = useSelector((state) => state.country);

    // Fetch Country Data
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

    // Handle loading state
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            {/* Section 1: Country Banner */}
            <div>
                <img src={singleCountry?.bannerURL} className="h-[450px] w-full object-cover" alt="Country Banner" />
            </div>

            {/* Section 2: Country Information */}
            <div className='flex flex-col items-center space-x-12 mt-10 justify-center mx-[200px]'>
                <span className='text-4xl font-bold text-blue-main'>{singleCountry?.name}</span>
                <span className='text-md font-bold mt-5 text-gray-600'>{singleCountry?.description}</span>
            </div>

            {/* Render sections if they exist */}
            {singleCountry.sections && singleCountry.sections.length > 0 && (
                <div className="mt-10 mx-[200px] space-y-16">
                    {singleCountry.sections.map((section, index) => (
                        <div
                            key={section._id}
                            className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}
                        >
                            <div className="md:w-1/2 text-center md:text-left">
                                <h3 className="text-2xl font-bold px-10 text-blue-main mb-4">{section.title}</h3>
                                <p className="text-gray-600 p-10">{section.description}</p>
                            </div>
                            <div className="md:w-1/2 mt-4 md:mt-0">
                                <img src={section.url} alt={section.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className='mt-10 flex flex-col items-center justify-center'>
                <span className='text-blue-main text-4xl font-bold'>PROVINCE</span>
            </div>

            {/* Section 3: Province Cards */}
            <div className='grid grid-cols-3 gap-10 mt-10 mx-[200px]'>
                {singleCountry?.Province?.map((province) => (
                    <div key={province._id} className="relative group perspective">
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
                    </div>
                ))}
            </div>
            <div className='my-20 pt-10 border-2 shadow-xl'>
                <div className='flex flex-row items-center justify-center mt-10 space-x-4'>
                    <span className='text-4xl font-bold text-blue-main'>Need</span>
                    <span className='text-4xl font-bold text-gold-main'>help</span>
                    <span className='text-4xl font-bold text-blue-main'>with</span>
                    <span className='text-4xl font-bold text-gold-main'>your</span>
                    <span className='text-4xl font-bold text-blue-main'>application?</span>
                </div>
                <div className='flex flex-row p-10 mx-[200px]'>
                    {/* Image Div */}
                    <div className='w-1/2 flex items-center'>
                        <img src={FormImage} className='object-cover w-[520px] h-[450px]' alt='Contact Form' />
                    </div>

                    {/* Form Div */}
                    <div className='w-1/2 flex flex-col p-14 bg-blue-main h-[450px]'>
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
                    </div>
                </div>
            </div>


            {/* Section 4: FAQ Section */}
            <div className='mx-[200px] my-20'>
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
        </div>
        </div>
    );
}
