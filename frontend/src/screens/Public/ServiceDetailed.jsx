import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useServiceOneMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GetOneService } from '../../slices/serviceSlice';
import Loader from '../../components/Loader';
import './ServiceScreen.css';
import { motion } from 'framer-motion';
import { Skeleton } from '@mui/material';

// Assuming other imports and setup remain unchanged
function ServiceDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [ServiceOne, { isLoading }] = useServiceOneMutation();
    const { oneService } = useSelector((state) => state.service);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ServiceOne(id).unwrap();
                dispatch(GetOneService(result));
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchData();
    }, [id, dispatch, ServiceOne]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="service-detailed">
            {/* Display Banner */}
            {oneService?.banner && (
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                    src={oneService.banner}
                    alt="Service Banner"
                />
            )}

            {/* Display Title */}
            {oneService?.heading && (
                <div className="mx-[100px] my-[40px] text-color-1 flex items-center justify-center text-3xl text-custom-color whitespace-pre">
                    <span>{oneService.title}</span>
                </div>
            )}

            {/* Display Section One */}
            {oneService?.sectionOne && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mx-[100px] my-[20px] flex items-center shadow-xl p-4 rounded-lg bg-white"
                >
                   
                        {oneService.sectionOne.heroOne && (
                            <img
                                className="w-2/6 h-[400px] rounded-lg  object-contained mr-4 rounded-md"
                                src={oneService.sectionOne.heroOne}
                                alt="Section One"
                            />
                        )}
                    
                    <div className="w-4/6 flex items-center justify-center">
                        <h3 className="text-xl font-semibold">{oneService.sectionOne.title}</h3>
                        <p>{oneService.sectionOne.content}</p>
                    </div>
                </motion.div>
            )}

            {/* Display Section Two */}
            {oneService?.sectionTwo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mx-[100px] my-[20px] flex items-center shadow-lg p-4 rounded-lg bg-white"
                >
                    <div className="w-4/6">
                        <h3 className="text-xl font-semibold">{oneService.sectionTwo.title}</h3>
                        <p>{oneService.sectionTwo.content}</p>
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mx-[100px] my-[20px] shadow-lg p-4 rounded-lg bg-white"
                >
                    <h3 className="text-xl font-semibold">{oneService.sectionThree.title}</h3>
                    <p>{oneService.sectionThree.content}</p>
                </motion.div>
            )}

            {/* Display Eligibility */}
            {oneService?.eligibility?.pointerOne && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mx-[100px] my-[20px] shadow-lg p-4 rounded-lg bg-white"
                >
                    <ul>
                        <li>{oneService.eligibility.pointerOne}</li>
                        <li>{oneService.eligibility.pointerTwo}</li>
                        <li>{oneService.eligibility.pointerThree}</li>
                        <li>{oneService.eligibility.pointerFour}</li>
                        <li>{oneService.eligibility.pointerFive}</li>
                    </ul>
                </motion.div>
            )}
        </div>
    );
}

export default ServiceDetailed;
