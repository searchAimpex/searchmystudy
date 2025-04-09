import React, { useEffect } from 'react'
import ServiceLogo from '../../assets/services.png'
import { useDispatch, useSelector } from 'react-redux'
import { useServiceFetchAllMutation } from '../../slices/adminApiSlice'
import { toast } from 'react-toastify'
import { FetchAllServices } from '../../slices/serviceSlice'
import campusbuddy from '../../assets/campus-buddy.png'
import careercounselling from '../../assets/career-counselling.png'

import currencyexchange from '../../assets/currency-exchange.png'

import icondocument from '../../assets/icon-document.png'
import interviewtraining from '../../assets/interview-training.png'
import liveapplicationtracking from '../../assets/live-application-tracking.png'
import postarrivalservices from '../../assets/post-arrival-services.png'
import predepartureorientation from '../../assets/pre-departure-orientation.png'
import successfuladmits from '../../assets/successful-admits.png'
import travelpackage from '../../assets/travel-package.png'
import visadocumentation from '../../assets/visa-documentation.png'
import universityshortlists from '../../assets/university-shortlists.png'

function ServiceSection() {
    const dispatch = useDispatch()
    const [ServiceFetchAll, { isSuccess }] = useServiceFetchAllMutation()
    const { services } = useSelector((state) => state.service);
    // useEffect(()=>{
    //     if(isSuccess){
    //         toast.success("Service Fetached Successfull")
    //     }
    // },[isSuccess])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ServiceFetchAll().unwrap();
                dispatch(FetchAllServices(result));
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchData();

    }, [ServiceFetchAll])
    return (
        <div className='mx-[50px] py-2'>
            <div className='flex flex-col justify-center items-center'>
                <div className="flex gap-x-2 gap-y-1 ">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main text-blue-main">Services</span>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold  text-gold-main">We</span>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main">Provided
                    </span>
                </div>
                <div className="my-2 ">
                    <p className="text-lg text-left sm:text-base md:text-lg lg:text-xl font-semibold text-gray-500  ">
                        Empowering Your Journey with Personalized Guidance and Support
                    </p>
                </div>


                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-10 '>
                    <div className="flex flex-col items-center justify-center p-2 ">
                        <div>
                            <img className='w-[80px] h-[80px]' src={careercounselling} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            Career Counselling
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg ">
                        <div>
                            <img className='w-[80px] h-[80px]' src={universityshortlists} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            University Shortlists
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg car">
                        <div>
                            <img className='w-[80px] h-[80px]' src={icondocument} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            Application Document
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg car">
                        <div>
                            <img className='w-[80px] h-[80px]' src={liveapplicationtracking} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            Application Tracking
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg car">
                        <div>
                            <img className='w-[80px] h-[80px]' src={interviewtraining} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            Interview Training
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg car">
                        <div>
                            <img className='w-[80px] h-[80px]' src={successfuladmits} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            Successfull Admits
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg car">
                        <div>
                            <img className='w-[80px] h-[80px]' src={visadocumentation} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            Visa Documentation
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-2 rounded-lg car">
                        <div>
                            <img className='w-[80px] h-[80px]' src={travelpackage} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            Travel Package
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg car">
                        <div>
                            <img className='w-[80px] h-[80px]' src={currencyexchange} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            Currency Exchange
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg car">
                        <div>
                            <img className='w-[80px] h-[80px]' src={predepartureorientation} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            Departure Orientation
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg car">
                        <div>
                            <img className='w-[80px] h-[80px]' src={postarrivalservices} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            Post Arrival Services
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg car">
                        <div>
                            <img className='w-[80px] h-[80px]' src={campusbuddy} />
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            Campus Buddy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceSection