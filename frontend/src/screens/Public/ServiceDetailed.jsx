import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServiceOneMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GetOneService } from '../../slices/serviceSlice';
import Loader from '../../components/Loader';
import { motion } from 'framer-motion';
import { Skeleton } from '@mui/material';
import './ServiceScreen.css';

function ServiceDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [ServiceOne, { isLoading }] = useServiceOneMutation();
    const { oneService } = useSelector((state) => state.service);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ServiceOne(id).unwrap();
                dispatch(GetOneService(result));
            } catch (error) {
                console.error('Failed to fetch services:', error);
                setError('Failed to fetch service details.');
            }
        };
        fetchData();
    }, [id, dispatch, ServiceOne]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const sectionVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    const bannerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="service-detailed">
            {/* Display Banner */}
            {oneService?.banner ? (
                <motion.img
                    initial="hidden"
                    animate="visible"
                    variants={bannerVariants}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover"
                    src={oneService.banner}
                    alt="Service Banner"
                />
            ) : (
                <Skeleton variant="rectangular" width="100%" height="300px" />
            )}

            {/* Display Title */}
            {oneService?.heading && (
                <div className="mx-[100px] my-[40px] text-gradient flex items-center justify-center text-5xl font-bold text-custom-color whitespace-pre">
                    <span>{oneService.title}</span>
                </div>
            )}

            {/* Display Section One */}
            {oneService?.sectionOne && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.8 }}
                    className="mx-[200px] my-[20px] flex items-center shadow-xl p-4 rounded-lg bg-white"
                >
                    {oneService.sectionOne.heroOne && (
                        <img
                            className="w-2/6 h-[400px] rounded-lg object-contain mr-4"
                            src={oneService.sectionOne.heroOne}
                            alt="Section One"
                        />
                    )}
                    <div className="w-4/6 flex p-10 items-center justify-center">
                        <h3 className="text-xl text-gradiant font-bold">{oneService.sectionOne.title}</h3>
                        <p className="text-xl text-gradient font-bold">{oneService.sectionOne.content}</p>
                    </div>
                </motion.div>
            )}

            {/* Display Section Two */}
            {oneService?.sectionTwo && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.8 }}
                    className="mx-[200px] my-[20px] flex items-center shadow-lg p-4 rounded-lg bg-white"
                >
                    <div className="w-4/6">
                        <h3 className="text-xl font-semibold">{oneService.sectionTwo.title}</h3>
                        <p className="text-xl text-gradient font-bold">{oneService.sectionTwo.content}</p>
                    </div>
                    {oneService.sectionTwo.heroTwo && (
                        <img
                            className="w-2/6 h-[400px] object-cover rounded-md"
                            src={oneService.sectionTwo.heroTwo}
                            alt="Section Two"
                        />
                    )}
                </motion.div>
            )}

            {/* Display Section Three */}
            {oneService?.sectionThree?.title && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.8 }}
                    className="mx-[200px] my-[20px] shadow-lg p-4 rounded-lg bg-white"
                >
                    <h3 className="text-xl font-semibold">{oneService.sectionThree.title}</h3>
                    <p className="text-xl text-gradient font-bold">{oneService.sectionThree.content}</p>
                </motion.div>
            )}

            {/* Display Eligibility */}
            {oneService?.eligibility && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.8 }}
                    className="mx-[100px] my-[20px] shadow-lg p-4 rounded-lg bg-white"
                >
                    <ul>
                        {oneService.eligibility.pointerOne && <li>{oneService.eligibility.pointerOne}</li>}
                        {oneService.eligibility.pointerTwo && <li>{oneService.eligibility.pointerTwo}</li>}
                        {oneService.eligibility.pointerThree && <li>{oneService.eligibility.pointerThree}</li>}
                        {oneService.eligibility.pointerFour && <li>{oneService.eligibility.pointerFour}</li>}
                        {oneService.eligibility.pointerFive && <li>{oneService.eligibility.pointerFive}</li>}
                    </ul>
                </motion.div>
            )}
        </div>
    );
}

export default ServiceDetailed;
