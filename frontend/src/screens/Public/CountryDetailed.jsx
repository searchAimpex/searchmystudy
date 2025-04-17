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

   if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      
      <motion.div
        ref={refInfo}
        className='flex flex-col p-4 text-left justify-center  '
        initial={{ opacity: 0, y: 50 }}
        animate={inViewInfo ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <span className='text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main text-center'>{singleCountry?.name}</span>
        <div
          className="text-sm sm:text-base font-bold mt-5 text-gray-600 text-center md:text-left"
          dangerouslySetInnerHTML={{ __html: singleCountry?.description }}
        ></div>
      </motion.div>

      <motion.div
        ref={refSections}
        className="mt-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 space-y-16"
        initial={{ opacity: 0 }}
        animate={inViewSections ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {singleCountry?.sections?.map((section, index) => (
          <motion.div
            key={section._id}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
            animate={inViewSections ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-main mb-4">{section.title}</h3>
              <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: section?.description }}></div>
            </div>
            <div className="w-full md:w-1/2">
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

      {/* Province Header */}
      <motion.div
        ref={refProvinces}
        className='mt-10 flex items-center justify-center px-4 text-center'
        initial={{ opacity: 0 }}
        animate={inViewProvinces ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <span className='text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main'>
          PROVINCE (state) wise University/College in {singleCountry?.name}
        </span>
      </motion.div>

      {/* Province Cards */}
      <motion.div
        ref={refProvinces}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32'
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
            <div className="flip-card flex flex-col items-center justify-center border-2 shadow-xl p-6 bg-white rounded-lg h-full">
              <div className="flip-card-front flex flex-col items-center justify-center">
                <img src={UniversityLogo} className='h-[80px] sm:h-[100px] object-cover mb-4' alt={province.name} />
                <span className="text-xl font-bold text-blue-main">{province.name}</span>
              </div>
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

      {/* Help Section */}
      <motion.div
        ref={refHelp}
        className='my-20 pt-10 border-2 shadow-xl px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32'
        initial={{ opacity: 0, y: 50 }}
        animate={inViewHelp ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <div className='flex flex-wrap gap-2 items-center justify-center mt-10 text-center text-2xl sm:text-3xl md:text-4xl font-bold'>
          <span className='text-blue-main'>Need</span>
          <span className='text-gold-main'>help</span>
          <span className='text-blue-main'>with</span>
          <span className='text-gold-main'>your</span>
          <span className='text-blue-main'>application?</span>
        </div>
        <div className='flex flex-col md:flex-row mt-10 gap-10 items-center'>
          <motion.div
            className='w-full md:w-1/2 flex items-center justify-center'
            initial={{ opacity: 0, x: -100 }}
            animate={inViewHelp ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <img src={FormImage} className='object-cover w-full max-w-md h-auto' alt='Contact Form' />
          </motion.div>

          <motion.div
            className='w-full md:w-1/2 flex flex-col p-6 sm:p-10 bg-blue-main rounded-lg'
            initial={{ opacity: 0, x: 100 }}
            animate={inViewHelp ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className='text-white text-lg sm:text-xl font-bold mb-4'>
              Contact our admissions team for personalized guidance.
            </span>
            <form className='flex flex-col space-y-4'>
              <input type='text' placeholder='Full Name' className='p-2 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-gold-main' />
              <input type='email' placeholder='Email' className='p-2 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-gold-main' />
              <input type='tel' placeholder='Phone Number' className='p-2 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-gold-main' />
              <button type='submit' className='bg-gold-main text-white font-bold py-2 rounded-md hover:bg-gold-dark'>
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        ref={refFaq}
        className='px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 my-20'
        initial={{ opacity: 0, y: 50 }}
        animate={inViewFaq ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <div className='text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-10'>
          <span className='text-blue-main'>Frequently </span>
          <span className='text-gold-main'>asked </span>
          <span className='text-blue-main'>question?</span>
        </div>
        {singleCountry?.faq?.map((faqItem, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              <Typography className="font-bold">{faqItem.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faqItem.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </motion.div>

    </div>
  );
}