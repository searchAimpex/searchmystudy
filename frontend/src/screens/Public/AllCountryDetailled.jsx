import React, { useEffect } from 'react';
import Image from '../../assets/ChoseUs3.png';
import { useCountryFetchMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function AllCountryDetailled() {
    const dispatch = useDispatch();
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
        <div>
            <div className='flex flex-col items-center justify-center space-y-4 bg-blue-200 p-10'>
                <div className='flex flex-row space-x-2'>
                    <span className='text-5xl font-bold text-blue-main'>Best</span>
                    <span className='text-5xl font-bold text-gold-main'>Country</span>
                    <span className='text-5xl font-bold text-blue-main'>To</span>
                    <span className='text-5xl font-bold text-blue-main'>Study</span>
                    <span className='text-5xl font-bold text-blue-main'>Abroad</span>
                </div>
                <div>
                    <span className='text-xl'>Discover the top countries offering world-class education in medical and other fields.</span>
                </div>
                <div>
                    <span className="text-lg font-bold">Learn about the culture, universities, visa requirements, and more.</span>
                </div>
                <div>
                    <button className='bg-blue-main text-white px-4 py-2 rounded-xl font-bold'>Get Counselling</button>
                </div>
                <div>
                    <img src={Image} alt="Chose Us" className='w-[300px] h-[100px] object-contain' />
                </div>
            </div>
            <div className='mx-[200px] p-10'>
                <div className='grid grid-cols-1 gap-10'>
                    {countries.map((item) => (
                        <div key={item._id} className='shadow-xl flex w-full p-5'>
                            <div className='flex-shrink-0 overflow-hidden'>
                                <img
                                    src={item.flagURL}
                                    className='h-[100px] w-[100px] border shadow-xl object-cover rounded-full'
                                    alt={item.name}
                                />
                            </div>
                            <div className='ml-5 flex flex-col w-full justify-center'>
                                <p className='text-xl text-blue-main font-bold'>{item.name}</p>
                                <p className='text-sm text-gray-600 mt-2'>
                                    {item.description || 'A brief description about the country.'}
                                </p>
                                <div className='mt-4 flex justify-end space-x-4'>
                                    <button className='bg-blue-main text-white p-2 rounded-xl font-bold'>
                                        Talk to Counselor
                                    </button>
                                    <button className='bg-gold-main text-white p-2 rounded-xl font-bold'>
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
