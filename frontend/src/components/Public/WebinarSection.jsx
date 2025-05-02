import React, { useEffect, useState } from 'react';
import { useAllWebinarMutation, useCreateLeadMutation, useSendWebinarLinkToMailMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FetchWebinar } from '../../slices/webinarSlice';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import {
    Box,
    CardContent,
    CardMedia,
    Tab,
    Tabs,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Modal,
} from '@mui/material';
import { motion } from 'framer-motion';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
export default function WebinarSection() {
    const dispatch = useDispatch();
    const { webinar } = useSelector(state => state.webinar);
    const [AllWebinar] = useAllWebinarMutation();
    const [showAll, setShowAll] = useState(false);
    // const { webinar } = useSelector((state) => state.webinar);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    const visibleWebinars = showAll ? webinar : webinar.slice(0, 6);

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
            <PopUp isModalOpen={isModalOpen} handleModalClose={handleModalClose} />
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
            <div className="flex flex-wrap justify-center gap-20 items-center">
                {visibleWebinars.map((items, index) => (
                    <motion.div
                        key={items._id}
                        style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.24)' }}
                        className="flex-shrink-0 w-[300px] flex flex-col items-center justify-center p-2 rounded-lg bg-white"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="relative w-full h-[200px] md:h-[250px] rounded-lg overflow-hidden">
                            <img
                                src={items.imageURL}
                                alt="webinar"
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white p-2 w-full">
                                <p className="font-semibold">{items.trainer_name}</p>
                                <p className="text-sm">{items.trainer_profession}</p>
                            </div>
                        </div>

                        <div className="mt-3 w-full">
                            <p className="text-lg font-semibold capitalize">{items.title}</p>
                        </div>

                        <div className="flex flex-wrap items-start w-full gap-2 mt-2">
                            <p className="text-sm text-gray-700">
                                <DateRangeIcon fontSize="small" className="mb-1 mr-1 text-blue-main" />
                                {new Date(items.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>
                            <p className="text-sm text-gold-main font-bold">
                                &#x2022; {items.weekday}
                            </p>
                        </div>

                        <div className="flex items-start w-full gap-2 mt-2">
                            <p className="text-sm text-gray-700">
                                <AccessTimeIcon fontSize="small" className="mb-1 mr-1 text-blue-main" />
                                {items.timeStart} AM &nbsp;&minus;&nbsp; {items.timeEnd} PM
                            </p>
                        </div>

                        <div className="mt-3 w-full">

                            <StyledWrapper className="w-full md:w-auto">
                                <button
                           
                                 onClick={handleModalOpen}
                                  className="button w-full">
                                    REGISTER
                                </button>
                            </StyledWrapper>
                        </div>
                    </motion.div>
                ))}

                {webinar.length > 6 && !showAll && (
                    <div className="w-full mt-8 flex justify-center">
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-6 py-3  bg-transparent font-semibold text-black 
 outline-none "
                        >
                            <span className='hover:underline'>Explore More Webinars</span> →
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}

function PopUp({ isModalOpen, handleModalClose }) {
    const [Data, setData] =useState({name:"", email:"", number:"", state:"",country:""})
    // const [createLead, { isLoading, isSuccess, isError, error }] = useCreateLeadMutation();
    const [sendWebinarLink, { isLoading, isSuccess, isError, error }] = useSendWebinarLinkToMailMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success('Thank you for applying, we will get back to you shortly!');
        }
    }, [isSuccess]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const leadData = { name, email, phoneNo };
    //         await createLead(leadData).unwrap();
    //         setName('');
    //         setEmail('');
    //         setPhoneNo('');
    //         handleModalClose();
    //     } catch (err) {
    //         console.error('Failed to submit form:', err.message || err.data);
    //     }
    // };

    const   sendWebinarToEmail =  async (e)=>{
        e.preventDefault();
        // alert("hi shadab")
        try {
            if(Data.name !== "" && Data.email !== ""&& Data.number !== "" && Data.state !== "" && Data.country!==""){
                const res = await sendWebinarLink(Data).unwrap()
                console.log(Data);
                handleModalClose()
            }else{
                toast.error("All fields are required!")
            }
            
        } catch (error) {
            console.log(error);
        }
    } 




    return (
        <Modal open={isModalOpen} onClose={handleModalClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute left-[35%] top-[30%] p-6 rounded-lg bg-white shadow-2xl w-[90%] max-w-md"
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Apply for the Webinar</Typography>
                    <span onClick={handleModalClose} className="cursor-pointer hover:text-red-500">X</span>
                </Box>

                <form  className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        // value={name}
                        onChange={(e) => setData((prev)=>({...prev, name:e.target.value}))}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        // value={email}
                        onChange={(e) => setData((prev)=>({...prev, email:e.target.value}))}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        // value={phoneNo}
                        onChange={(e) => setData((prev)=>({...prev, number:e.target.value}))}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />

                    <input
                        type="text"
                        placeholder="State"
                        // value={phoneNo}
                        onChange={(e) => setData((prev)=>({...prev, state:e.target.value}))}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                    
                    <input
                        type="text"
                        placeholder="Country"
                        // value={phoneNo}
                        onChange={(e) => setData((prev)=>({...prev, country:e.target.value}))}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
               
                    <Button onClick={sendWebinarToEmail} type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </form>

                {isError && <Typography color="error" mt={2}>{error?.data?.message || 'Something went wrong. Please try again.'}</Typography>}
            </motion.div>
        </Modal>
    );
}


const StyledWrapper = styled.div`
.button {
 --color: #264790 ;
 padding: 0.5em 1.3em;
 background-color: transparent;
 border-radius: .3em;
 position: relative;
 overflow: hidden;
 cursor: pointer;
 transition: .5s;
 font-weight: 500;
 font-size: 14px;
 border: 2px solid;
 font-family: inherit;
//  text-transform: uppercase;
 color: var(--color);
//  font-weight: 700;     
 z-index: 1;
}

.button::before, .button::after {
 content: '';
 display: block;
 width: 50px;
 height: 50px;
 transform: translate(-50%, -50%);
 position: absolute;
 border-radius: 50%;
 z-index: -1;
 background-color: var(--color);
 transition: 1s ease;
}

.button::before {
 top: -1em;
 left: -1em;
}

.button::after {
 left: calc(100% + 1em);
 top: calc(100% + 1em);
}

.button:hover::before, .button:hover::after {
 height: 410px;
 width: 410px;
}

.button:hover {

 color: rgb(255, 255, 255);
}

.button:active {
 filter: brightness(.8);
}`;