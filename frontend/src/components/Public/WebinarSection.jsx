import React, { useEffect } from 'react';
import { useAllWebinarMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FetchWebinar } from '../../slices/webinarSlice';
import { motion } from 'framer-motion';

export default function WebinarSection() {
    const dispatch = useDispatch();
    const { webinar } = useSelector(state => state.webinar);
    const [AllWebinar] = useAllWebinarMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await AllWebinar().unwrap();
                dispatch(FetchWebinar(result));
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
            <div className="flex flex-wrap justify-center items-center w-full">
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
                        <img
                            src={items.imageURL}
                            alt="webinar"
                            className="w-[270px] h-[300px] md:h-[320px] rounded-lg"
                        />

                        <div className="flex flex-wrap sm:flex-nowrap items-start w-full gap-2 mt-3">
                            <p className="text-sm font-bold text-white bg-blue-main px-3 py-2 rounded-lg">{items.date}</p>
                            <p className="text-sm font-bold text-black bg-gray-200 px-3 py-2 rounded-lg">
                                {items.day} {items.time}
                            </p>
                        </div>

                        <div className="mt-3 w-full">
                            <p className="text-lg font-bold text-blue-main capitalize">{items.title}</p>
                        </div>

                        <div className="mt-3 w-full">
                            <button className="bg-gold-main w-full text-base font-bold border border-blue-main p-3 rounded-lg hover:bg-blue-main hover:text-white transition">
                                REGISTER
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
