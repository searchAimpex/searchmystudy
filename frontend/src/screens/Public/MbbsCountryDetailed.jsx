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

const truncateText = (text, maxWords = 250) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

export default function MbbsCountryDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [CountryFetchOne, { isLoading }] = useCountryFetchOneMutation();
  const { singleCountry } = useSelector((state) => state.country);

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
  
        // ✅ Check if mbbsabroad is true before dispatching
        if (result?.mbbsAbroad === true) {
          dispatch(FetchOneCountry(result));
        } else {
          console.warn('This country is not marked as MBBS Abroad.');
        }
      } catch (error) {
        console.error('Failed to fetch country:', error);
      }
    };
  
    fetchData();
  }, [id, dispatch, CountryFetchOne]);
  
  if (isLoading) return <Loader />;

  return (
    <div>
      {/* Banner */}
      <motion.div ref={refBanner} initial={{ opacity: 0 }} animate={inViewBanner ? { opacity: 1 } : {}} transition={{ duration: 1 }}>
        <img src={singleCountry?.bannerURL} alt="Country Banner" className="h-[300px] md:h-[450px] w-full object-cover" />
      </motion.div>

      {/* Country Info */}
      <motion.div ref={refInfo} className="max-w-7xl mx-auto p-4 mt-10" initial={{ opacity: 0, y: 50 }} animate={inViewInfo ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }}>
        <h2 className="text-2xl sm:text-3xl text-center md:text-4xl p-2 font-bold  text-gray-800 bg-gray-300 rounded-xl" >MBBS in <span className='capitalize'>{singleCountry?.name}</span></h2>
        <div className="mt-4 text-sm sm:text-base md:text-lg text-gray-600" dangerouslySetInnerHTML={{ __html: truncateText(singleCountry?.description, 400) }} />
      </motion.div>

      {singleCountry?.sections?.length > 0 && (
        <motion.div
          ref={refSections}
          className="max-w-7xl mx-auto px-4 mt-12 space-y-16"
          initial={{ opacity: 0 }}
          animate={inViewSections ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {singleCountry.sections.map((section, index) => {
            const isReversed = index % 2 === 0;

            return (
              <div
                key={section._id}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
              >
                {/* Text Block Animation */}
                <motion.div
                  className="md:w-1/2 p-4"
                  initial={{ opacity: 0, x: isReversed ? 100 : -100 }}
                  animate={inViewSections ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-main mb-4">
                    {section.title}
                  </h3>
                  <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: truncateText(section?.description, 250) }}
                  />
                </motion.div>

                {/* Image Block Animation */}
                <motion.div
                  className="md:w-1/2 p-4"
                  initial={{ opacity: 0, x: isReversed ? -100 : 100 }}
                  animate={inViewSections ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1 }}
                >
                  <motion.img
                    src={section.url}
                    alt={section.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      )}


      {/* Province Header */}
      <motion.div ref={refProvinces} className="mt-16 text-center px-4" initial={{ opacity: 0 }} animate={inViewProvinces ? { opacity: 1 } : {}} transition={{ duration: 1 }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main">
          Province-wise Universities/Colleges in {singleCountry?.name}
        </h2>
      </motion.div>

      {/* Provinces */}
      <motion.div ref={refProvinces} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 mt-10 max-w-7xl mx-auto" initial="hidden" animate={inViewProvinces ? "visible" : "hidden"} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delayChildren: 0.3, staggerChildren: 0.2 } } }}>
        {singleCountry?.Province?.map((province) => (
          <motion.div key={province._id} className="relative group border-2 shadow-xl p-6 bg-white rounded-lg" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <div className="text-center">
              <img src={UniversityLogo} className="h-[80px] mx-auto mb-4" alt={province.name} />
              <h3 className="text-xl font-bold text-blue-main">{province.name}</h3>
              <button onClick={() => navigate(`/province/${province._id}`)} className="mt-4 bg-blue-main text-white py-1 px-3 rounded-full">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Help with Application */}
      <motion.div ref={refHelp} className="my-20 py-10 px-4 bg-blue-main text-white" initial={{ opacity: 0, y: 50 }} animate={inViewHelp ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img src={FormImage} alt="Help" className="w-full h-[300px] object-cover rounded-md" />
          <form className="space-y-4">
            <h3 className="text-xl font-bold">Need help with your application?</h3>
            <input type="text" name="fullName" placeholder="Full Name" className="w-full p-2 rounded text-black" />
            <input type="email" name="email" placeholder="Email" className="w-full p-2 rounded text-black" />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" className="w-full p-2 rounded text-black" />
            <button type="submit" className="bg-gold-main hover:bg-yellow-600 py-2 px-4 rounded text-white">Submit</button>
          </form>
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div ref={refFaq} className="max-w-7xl mx-auto px-4 my-20" initial={{ opacity: 0, y: 50 }} animate={inViewFaq ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }}>
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-blue-main mb-6">Frequently Asked Questions</h2>
        {singleCountry?.faq?.map((faqItem, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />} sx={{ bgcolor: '#003366', color: 'white' }}>
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
