import React, { useEffect } from 'react';
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
          {countries.map((item, index) => (
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
      </div>
    </div>
  );
}

export default CountriesSection;
