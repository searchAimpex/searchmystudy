import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCountryFetchMutation } from '../../slices/adminApiSlice';
import { FetchCountry } from '../../slices/countrySlice';
import { useNavigate } from 'react-router-dom';

function CountriesSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [CountryFetch, { isSuccess }] = useCountryFetchMutation();
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
    <div className='mx-[200px] mt-10'>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-row space-x-3'>
          <span className='text-5xl text-blue-main font-bold'>Countries</span>
          <span className='text-5xl text-gold-main font-bold'>We</span>
          <span className='text-5xl text-blue-main font-bold'>Work</span>
          <span className='text-5xl text-gold-main font-bold'>With</span>
        </div>
        <div className='my-2'>
          <p className='text-xl text-gray-600 font-bold'>500+ Universities around the world</p>
        </div>
        <div className='grid grid-cols-3 gap-6 mt-10 w-full'>
          {countries.map((item) => (
            <div
              className='cursor-pointer flex flex-row space-x-10 shadow-xl rounded-md items-center p-4'
              key={item.id} 
              onClick={() => navigate(`/country/${item._id}`)}
            >
              <div className='rounded-full flex items-center justify-center border shadow-xl h-[100px] w-[100px] overflow-hidden'>
                <img src={item.flagURL} alt="flag" className='object-cover h-[200px] w-[200px]' />
              </div>
              <div className='flex flex-col space-x-4'>
                <p className='text-2xl font-bold'>{item.name}</p>
                
                <span className='text-[6px] font-bold text-gray-600'>{item.bullet}</span>
                 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CountriesSection;
