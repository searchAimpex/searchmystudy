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
  useCreateQueryMutation,
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
import { set } from 'mongoose';
import { useStepContext } from '@mui/material';
import { toast } from 'react-toastify';
const truncateText = (text, maxWords = 250) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

export default function MbbsCountryDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countryValue , setCountryValue] = useState(20)
  const [showAll, setShowAll] = useState(false);
  const { singleCountry, countries } = useSelector((state) => state.country);
  const { university } = useSelector((state) => state.university);
  const [value, setValue] = useState(8)
  const [CountryFetchOne, { isLoading }] = useCountryFetchOneMutation();
  const [CreateQuery, { Loading }] = useCreateQueryMutation()
  const [CountryFetch] = useCountryAllFetchMutation();
  const [query, setQuery] = useState({ name: '', message: '', phone: '', email: '' })
  const [FetchUniversity] = useFetchUniversityMutation();

  const [refBanner, inViewBanner] = useInView({ triggerOnce: true });
  const [refInfo, inViewInfo] = useInView({ triggerOnce: true });
  const [refSections, inViewSections] = useInView({ triggerOnce: true });
  const [refProvinces, inViewProvinces] = useInView({ triggerOnce: true });
  const [refFaq, inViewFaq] = useInView({ triggerOnce: true });
  const [universitiesToDisplay, setuniversitiesToDisplay] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCountries = await CountryFetch().unwrap();
        const filteredCountries = allCountries.filter((country) => country.mbbsAbroad === true);
        dispatch(FetchCountry(filteredCountries));

        const countryDetails = await CountryFetchOne(id).unwrap();
        dispatch(FetchOneCountry(countryDetails));

        const allUniversities = await FetchUniversity().unwrap();
        // console.log(allUniversities);

        const filteredUniversities = allUniversities.filter(
          (uni) => uni.Country?._id === countryDetails._id
        );
        setuniversitiesToDisplay(filteredUniversities)
        // console.log(filteredUniversities, "))))))))))))))))))))))))))))))))))))))))))))))))");
        dispatch(FetchUniversitys(filteredUniversities));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [id, setuniversitiesToDisplay, dispatch, CountryFetch, CountryFetchOne, FetchUniversity]);

  const scrollRef = useRef(null); // ✅ hooks must be on top, directly.

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };


  const handleChange = (e) => {
    setQuery({ ...query, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const res = await CreateQuery(query).unwrap();
      if (res?.success) {
        toast.success(res?.message)
      }

    } catch (error) {
      console.error('Failed to create query:', error);
    }
  };
  return (
    <div className=" text-white">
      {/* Banner */}
      <motion.div
        ref={refBanner}
        initial={{ opacity: 0 }}
        animate={inViewBanner ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-[200px] sm:h-[100%] md:h-[100%] lg:h-[100%] overflow-hidden">
          <img
            src={singleCountry?.bannerURL}
            alt="Country Banner"
            className="w-full h-full object-cover object-center"
          />
        </div>


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
            {/* <div
              className="mt-4 text-sm sm:text-base md:text-lg text-gray-600"
              dangerouslySetInnerHTML={{ __html: truncateText(singleCountry?.description, 400) }}
            /> */}

             <div
              className="mt-4 text-[22px] text-black"
              dangerouslySetInnerHTML={{
                __html: truncateText(singleCountry?.description),
              }}
            />
          </motion.div>

          {singleCountry?.sections?.length > 0 && (
            <div ref={refSections} className=" mx-auto mt-16 px-4 space-y-16">
              {singleCountry.sections.map((section) => (
                <section key={section._id} className=" p-6">
                  <h2 className="text-3xl font-bold text-blue-main mb-4">{section.title}</h2>

                  <div className="relative flex flex-col md:flex-row gap-6  ">
                    {/* Text Section */}
                    <div
                      ref={scrollRef}
                      className="prose text-[17px]  "
                      dangerouslySetInnerHTML={{
                        __html: truncateText(section.description),
                      }}
                    />

                    {/* Image Section */}
                    <div className="md:w-1/3  flex justify-center items-start">
                      <img
                        src={section.url}
                        alt={section.title}
                        className="w-full  "
                      />
                    </div>

                    {/* Optional Scroll Button */}
                    {/* 
  <button
    onClick={scrollDown}
    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gold-main hover:bg-yellow-500 text-white px-4 py-1.5 text-sm rounded-full shadow-md transition-all"
  >
    Scroll Up ↑
  </button>
  */}
                  </div>

                </section>
              ))}
            </div>
          )}

        </div>

        <div className="w-full lg:w-1/4 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-lg border-gold-main shadow-xl p-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main"
                value={query.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main"
                value={query.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main"
                value={query.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main"
                value={query.message}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-main text-white font-bold py-2 px-4 rounded-md hover:bg-blue-dark transition duration-300"
            >
              Submitasdcsadc
            </button>
          </form>

          <div>
            <p className="text-blue-main font-bold text-2xl text-center">Top countries for MBBS</p>
            <div className="rounded-xl my-4 space-y-4 px-2">
              {countries.slice(0,countryValue).map((country) => (
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
                    Mbbs in {country.name}
                  </p>
                </Link>
              ))}

         {countryValue > 20 && (
  <div className="flex justify-center mt-8">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/country') }
      className="relative px-8 py-3 text-white font-semibold text-lg rounded-full 
                 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 
                 shadow-lg hover:shadow-2xl transition-all"
    >
      Explore More
    </motion.button>
  </div>
)}

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
                <div className="px-6 py-10">
                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {universitiesToDisplay.slice(0, value).map((uni) => (
                      <motion.div
                        key={uni._id}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Link
                          to={`/university/${uni._id}`}
                          className="relative block h-[320px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-gray-100 to-white group"
                        >
                          {/* Hero Background */}
                          <img src={uni?.heroURL}
                          className="absolute top-0 left-0 w-full h-[180px] bg-cover bg-center transition-all duration-500 group-hover:h-full group-hover:brightness-75"
                          
                          alt="" />
                          <img src={uni?.logo} 
                          className="w-[95px] h-[95px] border-4 border-white shadow-md rounded-full mt-[90px] mx-auto relative z-10 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 group-hover:translate-y-[-50%]"

                          alt="" />
  
                          {/* Content */}
                          <div className="relative z-20 flex flex-col items-center gap-2 mt-4 px-3">
                            <span className="font-bold text-lg text-gray-800 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                              {uni.name}
                            </span>
                            <span className="text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1 rounded-full">
                              {singleCountry?.name}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
  
                  {/* Explore More Button */}
                  {universitiesToDisplay?.length > 8 && !showAll && (
                    <div className="flex justify-center mt-8">
                      <motion.button
                        // onClick={scrollDown}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setValue(universitiesToDisplay?.length)}
                        className="relative px-8 py-3 text-white font-semibold text-lg rounded-full 
                         bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 
                         shadow-lg hover:shadow-2xl transition-all"
                      >
                        Explore More
                      </motion.button>
                    </div>
                  )}
                </div>
  
  
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
