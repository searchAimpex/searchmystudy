import React, { useEffect } from 'react'
import Flag from "../../assets/RUSSIA.png"
import { useDispatch, useSelector } from 'react-redux'
import { useCountryFetchMutation } from '../../slices/adminApiSlice';
import { FetchCountry } from '../../slices/countrySlice';
import { useNavigate } from 'react-router-dom';

function CountriesSection() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [CountryFetch, { isSuccess }] = useCountryFetchMutation();
    const {countries} = useSelector(state=>state.country);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await CountryFetch().unwrap();

                dispatch(FetchCountry(result));
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchData();
    }, [CountryFetch, dispatch]);
  return (
    <div className='mx-[100px] mt-10'>
        <div className='flex flex-col justify-center items-center'>
            <div>
                <p className='text-4xl font-bold  text-gradient'>COUNTRIES WE WORK WITH</p>
            </div>
            <div className='my-2'>
               <p className='text-2xl font-bold  text-gradient'> 500+ University around the world</p>
            </div>
            <div className='grid grid-cols-5 gap-20 mt-10'>
                { countries.map((item)=>{
                    return (
                    <div className='cursor-pointer' key={item.id} onClick={()=> navigate(`/country/${item._id}`)}>
                        <img src={item.flagURL} alt="fix" className='w-[220px] h-[130px] object-cover' />
                    </div>
                        )
                    })
                }

            </div>
        </div>
        
    </div>
  )
}

export default CountriesSection