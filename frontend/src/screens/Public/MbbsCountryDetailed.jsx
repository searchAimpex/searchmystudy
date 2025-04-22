import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCountryAllFetchMutation, useCountryFetchOneMutation } from '../../slices/adminApiSlice';
import { FetchOneCountry } from '../../slices/countrySlice';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
import { useCountryFetchMutation } from '../../slices/adminApiSlice';


// sidebar
import { FetchCountry } from '../../slices/countrySlice.js';


const truncateText = (text, maxWords = 250) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

export default function MbbsCountryDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleCountry } = useSelector((state) => state.country);
  const [CountryFetchOne, { isLoading }] = useCountryFetchOneMutation();
  const [CountryFetch, { isSuccess }] = useCountryAllFetchMutation();
  // const [CountryFetch] = useCountryFetchMutation();

  const [refBanner, inViewBanner] = useInView({ triggerOnce: true });
  const [refInfo, inViewInfo] = useInView({ triggerOnce: true });
  const [refSections, inViewSections] = useInView({ triggerOnce: true });
  const [refProvinces, inViewProvinces] = useInView({ triggerOnce: true });
  const [refHelp, inViewHelp] = useInView({ triggerOnce: true });
  const [refFaq, inViewFaq] = useInView({ triggerOnce: true });
  const { countries } = useSelector((state) => state.country);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const resultforsidebar = await CountryFetch().unwrap();
        const filtered = resultforsidebar.filter(country => country.mbbsAbroad === true);
        dispatch(FetchCountry(filtered));
        console.log(filtered, "************************************************")

        // country for webpage
        const result = await CountryFetchOne(id).unwrap();
        dispatch(FetchOneCountry(result));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [id, dispatch, CountryFetchOne, CountryFetch]);

  if (isLoading) return <Loader />;

  return (
    <div className="bg-gray-100 text-white">
      {/* Banner */}
      <motion.div
        ref={refBanner}
        initial={{ opacity: 0 }}
        animate={inViewBanner ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <img
          src={singleCountry?.bannerURL}
          alt="Country Banner"
          className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover"
        />
      </motion.div>

      {/* Content Wrapper */}
      <div className="flex flex-col lg:flex-row p-4 gap-6">
        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {/* Country Info */}
          <motion.div
            ref={refInfo}
            className="max-w-7xl mx-auto "
            initial={{ opacity: 0, y: 50 }}
            animate={inViewInfo ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="bg-[linear-gradient(to_right,#f3f4f6_0%,#264790_30%,#264790_70%,#f3f4f6_100%)] text-white text-center p-2 sm:p-2 md:p-2 lg:p-2">
              <h1 className="text-sm font-bold sm:text-3xl md:text-4xl lg:text-2xl">{singleCountry?.name}</h1>
            </div>

            <div
              className="mt-4 text-sm sm:text-base md:text-lg text-gray-600"
              dangerouslySetInnerHTML={{ __html: truncateText(singleCountry?.description, 400) }}
            />
          </motion.div>

          {/* Sections */}
          {singleCountry?.sections?.length > 0 && (
            <motion.div
              ref={refSections}
              className="max-w-7xl mx-auto mt-12 space-y-16"
              initial={{ opacity: 0 }}
              animate={inViewSections ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
            >
              {singleCountry.sections.map((section, index) => {
                const isReversed = index % 2 === 0;
                return (
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-blue-main">
                      {section.title}
                    </h2>
                    <div
                      key={section._id}
                      className={`flex flex-col md:flex-row ${isReversed ? 'md:flex-row-reverse' : ''} items-center gap-4`}
                    >

                      <div className="flex flex-col md:flex-row">
                        <motion.div
                          className="md:w-1/2 my-2"
                          initial={{ opacity: 0, x: isReversed ? 100 : -100 }}
                          animate={inViewSections ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 1 }}
                        >
                          <div
                            className="text-black px-3"
                            dangerouslySetInnerHTML={{ __html: truncateText(section?.description, 110) }}
                          />
                        </motion.div>

                        <motion.div
                          className="md:w-1/2 p-4"
                          initial={{ opacity: 0, x: isReversed ? -100 : 100 }}
                          animate={inViewSections ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 1 }}
                        >
                          <motion.img
                            src={section.url}
                            alt={section.title}
                            className="w-full h-80 object-cover rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/4 space-y-6">
          <form
            className='bg-white border rounded-lg border-gold-main shadow-xl p-4 p-2'
          >
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main'
              />
            </div>
            <button
              type="submit"
              className='w-full bg-blue-main text-white font-bold py-2 px-4 rounded-md hover:bg-blue-dark transition duration-300'
            >
              Submit
            </button>
          </form>


          <div>


            <p className='text-blue-main font-bold text-2xl text-center'>Top countries for MBBS</p>

            <div className="rounded-xl my-4 space-y-4 px-2">
              {countries.map((country, index) => (
                <Link
                  to={country.path}
                  key={index}
                  className="flex items-center gap-4 w-full p-2 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-gold-main hover:bg-gold-main-100 active:bg-gold-main transition-all duration-200 ease-in-out group"
                >
                  <img
                    src={country.flagURL}
                    className="w-14 h-14 rounded-full border-2 border-red-200 shadow-sm group-hover:scale-105 transition-transform"
                    alt={country.name}
                  />
                  <p className="text-xl  font-semibold text-gray-800 group-hover:text-gold-main group-active:text-white transition-all">
                    {country.name}
                  </p>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Province Grid */}
      <motion.div
        ref={refProvinces}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 mt-10 max-w-7xl mx-auto"
        initial="hidden"
        animate={inViewProvinces ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
        }}
      >
        {singleCountry?.Province?.map((province) => (
          <motion.div
            key={province._id}
            className="relative group border-2 shadow-xl p-6 bg-white rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <img src={UniversityLogo} className="h-[80px] mx-auto mb-4" alt={province.name} />
              <h3 className="text-xl font-bold text-blue-main">{province.name}</h3>
              <button
                onClick={() => navigate(`/province/${province._id}`)}
                className="mt-4 bg-blue-main text-white py-1 px-3 rounded-full"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Help Section */}
      <motion.div
        ref={refHelp}
        className="my-20 py-10 px-4 bg-blue-main text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={inViewHelp ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src={FormImage}
            alt="Help"
            className="w-full h-[300px] object-cover rounded-md"
          />
          {/* Sidebar */}
          <div className="w-full  space-y-6">
            <form
              className='p-4 p-2'
            >
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2 text-white' htmlFor="name">Name :</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className='w-full px-3 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-main'
                />
              </div>
              <div className='mb-4'>
                <label className='text-white block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email :</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className='w-full px-3 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-main'
                />
              </div>
              <div className='mb-4'>
                <label className='text-white block text-gray-700 text-sm font-bold mb-2' htmlFor="phone">Phone :</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main text-black'
                />
              </div>
              <button
                type="submit"
                className='w-full bg-gold-main text-white font-bold py-2 px-4 rounded-md hover:bg-blue-dark transition duration-300'
              >
                Submit
              </button>
            </form>

          </div>
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div
        ref={refFaq}
        className="max-w-7xl mx-auto px-4 my-20"
        initial={{ opacity: 0, y: 50 }}
        animate={inViewFaq ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-blue-main mb-6">
          Frequently Asked Questions
        </h2>
        {singleCountry?.faq?.map((faqItem, index) => (
          <Accordion key={index}>
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
