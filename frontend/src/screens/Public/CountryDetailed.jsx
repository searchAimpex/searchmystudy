import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCountryFetchOneMutation } from '../../slices/adminApiSlice';
import { FetchOneCountry } from '../../slices/countrySlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Typical from 'react-typical';
import { motion } from 'framer-motion';

export default function CountryDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [CountryFetchOne, { isLoading }] = useCountryFetchOneMutation();
    const { singleCountry } = useSelector((state) => state.country);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await CountryFetchOne(id).unwrap();
                dispatch(FetchOneCountry(result));
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchData();
    }, [id, dispatch, CountryFetchOne]);

    if (isLoading) {
        return <Loader />;
    }

    const fadeSlideVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div>
            <div>
                <motion.img 
                    initial="hidden"
                    animate="visible"
                    variants={fadeSlideVariants}
                    transition={{ duration: 1 }}
                    className='h-[600px] object-cover w-full' 
                    src={singleCountry?.bannerURL} 
                />
            </div>
            <div className='mx-[100px]'>
                <div className='px-[100px] mt-[50px] flex flex-row w-full justify-between items-center space-x-10'>
                    <div className='h-[10px] w-full bg-custom-color rounded-xl'></div>
                    <div>
                        <Typical
                            steps={[singleCountry.name, 5000]}
                            loop={5}
                            wrapper="span"
                            className="text-gradient text-4xl font-bold"
                        />
                    </div>
                    <div className='h-[10px] w-full bg-custom-color rounded-xl'></div>
                </div>
                <div className='mt-[50px] flex flex-row w-full'>
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeSlideVariants}
                        transition={{ duration: 1 }}
                        className='w-1/2 flex items-center justify-center'
                    >
                        <img src={singleCountry?.flagURL} />
                    </motion.div>
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeSlideVariants}
                        transition={{ duration: 1 }}
                        className='w-1/2 flex p-5 items-center justify-center'
                    >
                        <p className='text-xl text-gradient font-bold '>{singleCountry?.description} </p>
                    </motion.div>
                </div>
                <div>
                    {singleCountry?.sections?.map((items) => (
                        <div key={items.title}>
                            <div className='px-[100px] mt-[50px] flex flex-row w-full justify-start items-center space-x-10'>
                                <div className='h-[10px] w-1/6 bg-custom-color rounded-xl'></div>
                                <div>
                                    <span className='text-4xl text-gradient'>{items?.title}</span>
                                </div>
                            </div>
                            <div className='mt-[50px] flex flex-row w-full'>
                                <motion.div 
                                    initial="hidden"
                                    animate="visible"
                                    variants={fadeSlideVariants}
                                    transition={{ duration: 1 }}
                                    className='w-1/2 flex items-center justify-center p-5'
                                >
                                    <p className='text-xl text-gradient font-bold'>{items?.description} </p>
                                </motion.div>
                                <motion.div 
                                    initial="hidden"
                                    animate="visible"
                                    variants={fadeSlideVariants}
                                    transition={{ duration: 1 }}
                                    className='w-1/2 flex items-center justify-center'
                                >
                                    <img src={items?.url} className='h-[450px] object-cover' />
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='my-[50px]'>
                    <div>
                        <div className='px-[100px] mt-[50px] flex flex-row w-full justify-start items-center space-x-10'>
                            <div className='h-[10px] w-1/6 bg-custom-color rounded-xl'></div>
                            <div>
                                <span className='text-4xl text-gradient'>PROVINCE</span>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 gap-10 my-[50px]'>
                        {singleCountry?.Province?.map((items) => (
                            <motion.div 
                                key={items._id}
                                initial="hidden"
                                animate="visible"
                                variants={fadeSlideVariants}
                                transition={{ duration: 1 }}
                                className='shadow-xl flex flex-col p-2'
                            >
                                <div className='flex items-center'>
                                    <img src={items?.heroURL} className='object-cover h-[150px] w-full' />
                                </div>
                                <div className='flex flex-row justify-between p-5 items-center'>
                                    <p className='text-xl text-gradient font-bold'>{items.name}</p>
                                    <button
                                        onClick={() => navigate(`/province/${items._id}`)} 
                                        className='text-xl text-gradient font-bold'
                                    >
                                        VIEW
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
