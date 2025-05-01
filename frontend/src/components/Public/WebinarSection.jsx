import React, { useEffect } from 'react';
import { useAllWebinarMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FetchWebinar } from '../../slices/webinarSlice';
import { motion } from 'framer-motion';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
export default function WebinarSection() {
    const dispatch = useDispatch();
    const { webinar } = useSelector(state => state.webinar);
    const [AllWebinar] = useAllWebinarMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await AllWebinar().unwrap();
                dispatch(FetchWebinar(result));
                console.log(result, "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            } catch (error) {
                console.error('Failed to fetch webinars:', error);
            }
        };
        fetchData();
    }, [AllWebinar, dispatch]);

    return (
        <div className="flex flex-col items-center justify-center px-4 py-8">
            {/* Heading Section */}
            <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold w-[100%] text-blue-main">
                    Upcoming <span className="text-gold-main">Webinar</span>
                </h2>
                <p className="text-lg py-2 text-left text-center sm:text-base md:text-lg lg:text-xl font-semibold text-gray-500">
                    Join Our Informative and Interactive Webinar
                </p>
            </motion.div>

            {/* Webinars Grid */}
            <div className="flex flex-wrap justify-center items-center ">
                {webinar.map((items, index) => (
                    <motion.div
                        key={items._id}
                        style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.24)' }}
                        className="flex flex-col items-center justify-center p-2 m-4 rounded-lg"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="relative w-[270px] h-[200px] md:h-[280px] rounded-lg overflow-hidden">
                            <img
                                src={items.imageURL}
                                alt="webinar"
                                className="w-full h-full object-cover rounded-lg"
                            />

                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-2 w-full">
                                <p className="font-semibold">Shadab Shaikh</p>
                                <p className="text-sm">Developer, NodeJs</p>
                            </div>
                        </div>



                        <div className="mt-3 w-full">
                            <p className="text-lg  font-semibold capitalize">{items.title}</p>
                        </div>


                        <div className="flex flex-wrap sm:flex-nowrap items-start w-full gap-2 mt-3">
                            <p className="text-l  text-gray-700">
                                <DateRangeIcon fontSize="small" className='mb-1 mr-1 text-blue-main' />
                                {new Date(items.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>


                            <p className="text-sm text-gold-main font-bold ">
                                &#x2022; {items.weekday}
                            </p>


                        </div>

                        <div className="flex flex-wrap sm:flex-nowrap items-start w-full gap-2 mt-3">



                            <p className="text-sm   text-gray-700">
                                <AccessTimeIcon fontSize='small' className='mb-1 mr-1 text-blue-main ' />{items.timeStart} AM
                                &nbsp;&minus;&nbsp;
                                {items.timeEnd} PM
                            </p>


                        </div>



                        <div className="mt-3 w-full">
                            <button className="w-full text-base font-bold border border-blue-main p-3 rounded-lg hover:bg-blue-main hover:text-white transition">
                                REGISTER
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
