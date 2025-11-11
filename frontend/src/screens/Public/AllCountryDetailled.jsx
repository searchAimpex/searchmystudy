import React, { useEffect } from 'react';
import Image from '../../assets/ChoseUs3.png';
import { useCountryFetchMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AllCountryDetailled() {
    function stripHtml(html) {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
    const dispatch = useDispatch();
    const [CountryFetch, { isSuccess }] = useCountryFetchMutation();
    const { countries } = useSelector((state) => state.country);
    const navigate = useNavigate();
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
            <div
                className="grid grid-cols-1 sm:grid-cols-2 mb-20 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-10 mx-auto"
                style={{ width: "95%" }}
            >
                {countries.slice(0, 20)?.map((item, index) => {
                    const routeBase = item?.mbbsAbroad ? "MbbsCountryDetailed" : "country";

                    return (
                        <motion.div
                            key={item._id}
                            onClick={() => navigate(`/${routeBase}/${item._id}`)}
                            className="border rounded-2xl shadow-xl group relative cursor-pointer h-[120px] bg-white flex items-center justify-center overflow-hidden transition-all duration-300"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Hover Overlay Circle */}
                            <div className="absolute w-[70px] h-[70px] bg-[#dfdfdf] rounded-full top-[20px] left-[10px] z-0 transition-transform duration-500 scale-100 group-hover:scale-[10]"></div>

                            {/* Content */}
                            <div className="flex w-[95%] justify-between items-center z-10 relative">
                                {/* Flag Image */}
                                <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-[#dfdfdf] shadow-md bg-white flex items-center justify-center group-hover:bg-[#db7e19] group-hover:border-white transition-all duration-300">
                                    <img
                                        src={item.flagURL}
                                        alt={item.name}
                                        className="rotate-on-hover"
                                    />

                                    <style jsx>{`
            .rotate-on-hover {
              width: 100px;
              height: 100px;
              object-fit: contain;
              transition: transform 0.5s ease-in-out;
            }
          
            .rotate-on-hover:hover {
              transform: rotate(360deg);
            }
          `}</style>


                                </div>

                                {/* Country Info */}
                                <div className=" ">
                                    <p className="text-xl text-right text-gray-700 font-bold ">{item.name}</p>

                                    <p className="text-sm text-gray-700 text-right  w-[200px]">
                                        {stripHtml(item.description).slice(0, 50)}...
                                    </p>
                                    {/* <p className="text-lg font-semibold text-gray-400	hover:text-blue-main mt-1">{item.bullet}</p> */}
                                </div>

                            </div>
                        </motion.div>
                    );
                })}


            </div>
        </div>
    );
}
