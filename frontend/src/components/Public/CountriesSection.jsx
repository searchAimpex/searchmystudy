import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCountryFetchMutation } from '../../slices/adminApiSlice';
import { FetchCountry } from '../../slices/countrySlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function CountriesSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [CountryFetch] = useCountryFetchMutation();
  const { countries } = useSelector((state) => state.country);
  
  // State to toggle showing all countries or just the first 8
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CountryFetch().unwrap();
        dispatch(FetchCountry(result));
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };
    fetchData();
  }, [CountryFetch, dispatch]);

  // Handle the toggle for showing all countries
  const handleToggleCountries = () => {
    setShowAll(!showAll);
  };

  // Get only the first 8 countries or all depending on the state
  const displayedCountries = showAll ? countries : countries.slice(0, 8);

  return (
    <div className='my-20'>
      <div className='flex flex-col justify-center items-center'>

        {/* Title Animation */}
        <motion.div
          className="flex gap-x-2 gap-y-1 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-blue-main">Countries</span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gold-main">We</span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-blue-main">Work</span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gold-main">With</span>
        </motion.div>

        {/* Subtitle Animation */}
        <motion.div
          className='my-3'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className='text-lg text-left sm:text-base md:text-lg lg:text-xl font-semibold text-gray-500'>
            500+ Universities around the world
          </p>
        </motion.div>

        {/* Grid of Countries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 m-auto" style={{ width: "95%" }}>
          {displayedCountries.map((item, index) => (
            <motion.div
              key={item._id}
              onClick={() => navigate(`/country/${item._id}`)}
              className="shadow-xl group relative cursor-pointer h-[120px] w-[95%] mx-4 bg-white shadow-md flex flex-col items-center justify-center overflow-hidden transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Circle Overlay */}
              <div className="absolute w-[70px] h-[70px] bg-[#dfdfdf] rounded-full top-[20px] left-[15px] z-0 transition-transform duration-500 scale-100 group-hover:scale-[10]"></div>

              <div className='flex w-[95%] justify-between'>
                {/* Flag Image */}
                <div style={{ borderRadius: "60%", overflow: "hidden" }} className="shadow-xl relative z-10 flex items-center justify-center w-[80px] h-[80px] bg-white border-2 border-[#dfdfdf] rounded-full transition-all duration-300 group-hover:bg-[#db7e19] group-hover:border-white">
                  <img
                    src={item.flagURL}
                    alt={item.name}
                    className="w-[100px] h-[100px] relative z-10 object-contain"
                  />
                </div>

                {/* Country Info */}
                <div className="relative z-10 mt-6 text-center">
                  <p className="text-lg font-bold text-gray-700">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.bullet}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Countries Button */}
        {!showAll && countries.length > 8 && (
         <button
         style={{ backgroundColor: 'transparent', color: 'black' }}
         onClick={handleToggleCountries}
         className="mt-8 px-6 py-2 font-semibold flex justify-center items-center mx-auto"
       >
         Browse all countries
         <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop:"2px"}} width="16" height="16" fill="currentColor" className="bi bi-arrow-right ml-2" viewBox="0 0 16 16">
           <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
         </svg>
       </button>
       
        )}
      </div>
    </div>
  );
}

export default CountriesSection;
