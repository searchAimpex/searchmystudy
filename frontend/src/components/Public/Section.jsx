import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = ({ item, index }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <div className='mt-[100px]'>
            <motion.div
                className='px-[100px] flex flex-row items-center space-x-24'
                ref={ref}
                initial={{ opacity: 0, x: -100 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
            >
                <span className='text-4xl font-bold'>
                    {item?.title.split(' ').map((word, i) => (
                        <span
                            key={i}
                            className={`${
                                i % 2 === 0 ? 'text-blue-main' : 'text-gold-main'
                            }`}
                        >
                            {word}{" "}
                        </span>
                    ))}
                </span>
            </motion.div>
            <motion.div
                className='mt-[50px] flex flex-row space-x-20'
                ref={ref}
                initial={{ opacity: 0, x: -100 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
            >
                {index % 2 === 0 ? (
                    <>
                        <motion.div
                            className='w-1/2 flex items-start'
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            dangerouslySetInnerHTML={{ __html: item?.description }}
                        >

                            
                        </motion.div>




                        <motion.div
                            className='w-1/2 flex items-start'
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={item?.url}
                                alt={item?.title}
                                className='h-[450px] w-[450px] object-cover rounded-xl'
                            />
                        </motion.div>
                    </>
                ) : (
                    <>
                        <motion.div
                            className='w-1/2 flex items-start'
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={item?.url}
                                alt={item?.title}
                                className='h-[450px] w-[450px] object-cover rounded-xl'
                            />
                        </motion.div>
                        <motion.div
                            className='w-1/2 flex items-start'
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className='text-md'>{item?.description}</p>
                        </motion.div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default Section;
