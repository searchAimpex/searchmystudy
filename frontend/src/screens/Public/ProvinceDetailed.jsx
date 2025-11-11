import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchOneProvinceMutation } from '../../slices/adminApiSlice';
import { FetchOneProvinces } from '../../slices/provinceSlice';
import Loader from '../../components/Loader';
import { motion } from 'framer-motion';
import Section from '../../components/Public/Section'; // Import the Section component

export default function ProvinceDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [FetchOneProvince, { isLoading }] = useFetchOneProvinceMutation();
    const { singleProvince } = useSelector((state) => state.province);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchOneProvince(id).unwrap();
                dispatch(FetchOneProvinces(result));
            } catch (error) {
                console.error('Failed to fetch province:', error);
            }
        };
        fetchData();
    }, [id, dispatch, FetchOneProvince]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className='bg-gray-100'>
            <div className='relative'>
                <motion.img
                    className='h-[450px] w-full object-cover'
                    src={singleProvince?.bannerURL}
                    alt="Province Banner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='bg-black bg-opacity-30 p-4 rounded-lg text-white'>
                        <h1 className='text-5xl font-bold'>{singleProvince?.name}</h1>
                    </div>
                </div>
            </div>
            <div className='mx-[200px] my-[50px]'>
                <motion.div
                    className='flex flex-row space-x-24'
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className='w-1/3 h-[400px] rounded-xl overflow-hidden'
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            src={singleProvince?.heroURL}
                            alt="Province Hero"
                            className='w-full h-full object-cover'
                        />
                    </motion.div>
                    <motion.div
                        className='w-2/3 flex items-start'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        dangerouslySetInnerHTML={ {__html: singleProvince?.description}} 
                    >
                    </motion.div>
                </motion.div>
                <div>
                    {singleProvince?.sections?.map((item, index) => (
                        <Section key={index} item={item} index={index} />
                    ))}
                </div>
                <div className='my-[50px]'>
                    <motion.div
                        className='grid grid-cols-3 gap-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {singleProvince?.University?.map((items) => (
                            <motion.div
                                key={items._id}
                                className='shadow-xl flex flex-col p-2'
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className='flex items-center justify-center'>
                                    <img
                                        src={items?.heroURL}
                                        alt={items.name}
                                        className='object-contain w-[350px] h-[350px] rounded-xl'
                                    />
                                </div>
                                <div className='flex flex-col items-start p-5'>
                                    <div className='flex justify-start items-start'> 
                                        <span className='text-xl font-bold'>{items.name}</span>

                                    </div>
                                    <div>
                                        <span className='text-sm text-gray-500 font-bold' >{items.description}</span>
                                    </div>
                                    <div className='flex flex-col w-full justify-end items-end'>
                                        <button
                                            onClick={() => navigate(`/university/${items._id}`)}
                                            className='text-md text-white px-4 py-2 rounded-xl bg-blue-main font-bold mt-2 hover:text-gold-main transition-colors duration-300'
                                        >
                                            VIEW
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
