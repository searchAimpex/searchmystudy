import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {
  useCountryAllFetchMutation,
  useCountryFetchOneMutation,
  useFetchUniversityMutation
} from '../../slices/adminApiSlice';
import { FetchOneCountry, FetchCountry } from '../../slices/countrySlice';
import { FetchUniversitys } from '../../slices/universitySlice';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import UniversityLogo from '../../assets/UniversityLogo.png';
import FormImage from '../../assets/FormImage.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import "./mbbs.css"
const truncateText = (text, maxWords = 250) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

export default function MbbsCountryDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // Slice the universities to show only the first 10 if `showAll` is false
  const { singleCountry, countries } = useSelector((state) => state.country);
  const { university } = useSelector((state) => state.university);
  console.log(singleCountry, "=============================================");

  const [CountryFetchOne, { isLoading }] = useCountryFetchOneMutation();
  const [CountryFetch] = useCountryAllFetchMutation();
  const [FetchUniversity] = useFetchUniversityMutation();

  const [refBanner, inViewBanner] = useInView({ triggerOnce: true });
  const [refInfo, inViewInfo] = useInView({ triggerOnce: true });
  const [refSections, inViewSections] = useInView({ triggerOnce: true });
  const [refProvinces, inViewProvinces] = useInView({ triggerOnce: true });
  const [refFaq, inViewFaq] = useInView({ triggerOnce: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCountries = await CountryFetch().unwrap();
        const filteredCountries = allCountries.filter((country) => country.mbbsAbroad === true);
        dispatch(FetchCountry(filteredCountries));

        const countryDetails = await CountryFetchOne(id).unwrap();
        dispatch(FetchOneCountry(countryDetails));

        const allUniversities = await FetchUniversity().unwrap();
        const filteredUniversities = allUniversities.filter(
          (uni) => uni.Country === countryDetails._id
        );
        dispatch(FetchUniversitys(filteredUniversities));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [id, dispatch, CountryFetch, CountryFetchOne, FetchUniversity]);

  const scrollRef = useRef(null); // ✅ hooks must be on top, directly.

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };
  const universitiesToDisplay = showAll ? university : university.slice(0, 10);

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
          className="w-full h-[250px] sm:h-[350px] md:h-[550px] object-cover object-left"
        />

      </motion.div>

      <div className="flex flex-col lg:flex-row p-4 gap-6">
        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <motion.div
            ref={refInfo}
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={inViewInfo ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="bg-[linear-gradient(to_right,#f3f4f6_0%,#264790_30%,#264790_70%,#f3f4f6_100%)] text-white text-center p-2">
              <h1 className="text-sm sm:text-3xl md:text-4xl lg:text-2xl font-bold">{singleCountry?.name}</h1>
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
                  <div key={section._id}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-main mb-4">
                      {section.title}
                    </h2>
                    <div
                      className={`flex flex-col md:flex-row ${isReversed ? 'md:flex-row-reverse' : ''} items-center gap-4`}
                    >
                      <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: isReversed ? 100 : -100 }}
                        animate={inViewSections ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1 }}
                      >
                        <div className="relative">
                          <div
                            ref={scrollRef}
                            className="prose prose-sm hello h-[300px] overflow-y-scroll overflow-x-hidden scrollbar-hide text-black px-3"
                            dangerouslySetInnerHTML={{ __html: truncateText(section.description, 110) }}
                          />


                          <button
                            onClick={scrollDown}
                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm bg-gold-main text-white p-2 rounded-full shadow-lg animate-bounce"
                          >
                            Click to now more
                          </button>
                        </div>
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
                        />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/4 space-y-6">
          <form className="bg-white border rounded-lg border-gold-main shadow-xl p-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
              <input id="phone" type="tel" placeholder="Enter your phone number"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-main text-white font-bold py-2 px-4 rounded-md hover:bg-blue-dark transition duration-300"
            >
              Submit
            </button>
          </form>

          <div>
            <p className="text-blue-main font-bold text-2xl text-center">Top countries for MBBS</p>
            <div className="rounded-xl my-4 space-y-4 px-2">
              {countries.map((country) => (
                <Link
                  to={`/MbbsCountryDetailed/${country._id}`}
                  key={country._id}
                  className="flex items-center gap-4 p-2 bg-white rounded-xl shadow-md border hover:border-gold-main hover:bg-gold-main-100 group"
                >
                  <img
                    src={country.flagURL}
                    className="w-14 h-14 rounded-full border-2 border-red-200 shadow-sm group-hover:scale-105 transition-transform"
                    alt={country.name}
                  />
                  <p className="text-xl font-semibold text-gray-800 group-hover:text-gold-main">
                    {country.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Province Grid */}
      {/* <motion.div
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
      </motion.div> */}

      {/* Universities */}
      <div className="mt-12 text-center px-4">
        <h1 className="text-blue-main text-4xl font-bold">
          Top-Rated MBBS <span className="text-gold-main">Colleges and Universities</span> in{' '}
          {singleCountry?.name}
        </h1>
      </div>


      <div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {universitiesToDisplay.map((uni) => (
            <Link
              to={`/university/${uni._id}`}
              key={uni._id}
              className="cursor-pointer relative w-full h-[250px] bg-white rounded-2xl overflow-hidden shadow-lg group text-center"
            >
              <div
                style={{ backgroundImage: `url(${uni.heroURL})` }}
                className="absolute top-0 left-0 w-full h-[130px] bg-cover bg-center rounded-t-2xl transition-all duration-500 group-hover:h-full group-hover:scale-95"
              />
              <div
                className="w-[95px] h-[95px] border-2 border-white rounded-full mt-[80px] mx-auto relative z-10 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.6] group-hover:-translate-x-[100%] group-hover:-translate-y-[110%]"
                style={{ backgroundImage: `url(${uni.logo})` }}
              />
              <div className="relative z-10 flex flex-col items-center gap-2 transition-transform duration-500 group-hover:-translate-y-1/4">
                <span className="font-semibold bg-gold-main px-3 py-1 rounded-lg text-white text-lg leading-tight">
                  {uni.name}
                </span>
                <span className="font-semibold bg-blue-main px-3 py-1 rounded-lg text-white">
                  {singleCountry?.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {university.length > 10 && !showAll && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(true)}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
            >
              Explore More
            </button>
          </div>
        )}
      </div>

      <div>
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
    </div>
  );
}
