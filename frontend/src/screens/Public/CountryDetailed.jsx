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

  const truncateText = (text, maxWords = 250) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
  };

  const [refBanner, inViewBanner] = useInView({ triggerOnce: true });
  const [refInfo, inViewInfo] = useInView({ triggerOnce: true });
  const [refSections, inViewSections] = useInView({ triggerOnce: true });
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
    <div className="w-full overflow-x-hidden">
      <motion.div
        ref={refInfo}
        className="bg-gray-100 flex flex-col p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={inViewInfo ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <img
          src={singleCountry?.bannerURL}
          alt="Country Banner"
          className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover"
        />
        <div className="my-8 bg-gradient-to-r from-gray-100 via-blue-900 to-gray-100 text-white text-center p-4">
          <h1 className="text-lg sm:text-3xl md:text-4xl lg:text-2xl font-bold">{singleCountry?.name}</h1>
        </div>
        <div
          className=" sm:px-8 md:px-16 text-sm sm:text-base md:text-lg text-gray-600"
          dangerouslySetInnerHTML={{ __html: truncateText(singleCountry?.description, 400) }}
        />
      </motion.div>

      <motion.div
        ref={refSections}
        className="my-10 space-y-16 px-4 sm:px-6 md:px-12"
        initial={{ opacity: 0 }}
        animate={inViewSections ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {singleCountry?.sections?.map((section, index) => (
          <motion.div
            key={section._id}
            className="flex flex-col lg:flex-row gap-6 items-center"
            initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
            animate={inViewSections ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="w-full flex flex-col-reverse lg:flex-row gap-6 items-center">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-main mb-4">
                  {section.title}
                </h3>

                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: yourSavedContent }}
                ></div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <motion.img
                  src={section.url}
                  alt={section.title}
                  className="w-full max-w-[500px] h-auto object-cover rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        ref={refHelp}
        className='my-20 pt-10 border-2 shadow-xl px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32'
        initial={{ opacity: 0, y: 50 }}
        animate={inViewHelp ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <div className='flex flex-wrap gap-2 items-center justify-center  text-center text-2xl sm:text-3xl md:text-4xl font-bold'>
          <span className='text-blue-main'>Need</span>
          <span className='text-gold-main'>help</span>
          <span className='text-blue-main'>with</span>
          <span className='text-gold-main'>your</span>
          <span className='text-blue-main'>application?</span>
        </div>
        <div className='flex flex-col md:flex-row mt-10 gap-10 items-center'>
          <motion.div
            className='w-full  md:w-1/2 flex items-center justify-center'
            initial={{ opacity: 0 }}
            animate={inViewHelp ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <img src={FormImage} className='object-cover w-full max-w-md h-auto' alt='Contact Form' />
          </motion.div>

          <motion.div
            className='w-full md:w-1/2 flex flex-col p-6 sm:p-10 bg-blue-main rounded-lg'
            initial={{ opacity: 0, }}
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

      <motion.div
        ref={refFaq}
        className="max-w-7xl mx-auto px-4 my-20"
        initial={{ opacity: 0, }}
        animate={inViewFaq ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-blue-main mb-6">
          Frequently Asked Questions
        </h2>
        {singleCountry?.faq?.map((faqItem, index) => (
          <Accordion key={index} className='my-3'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              sx={{ bgcolor: '#003366', color: 'white' }}
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
