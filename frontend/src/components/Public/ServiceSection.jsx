import React, { useEffect } from 'react'
import ServiceLogo from '../../assets/services.png'
import { useDispatch, useSelector } from 'react-redux'
import { useServiceFetchAllMutation } from '../../slices/adminApiSlice'
import { toast } from 'react-toastify'
import { FetchAllServices } from '../../slices/serviceSlice'

function ServiceSection() {
    const dispatch = useDispatch()
    const [ServiceFetchAll,{isSuccess}] = useServiceFetchAllMutation()
    const { services } = useSelector((state) => state.service);


    useEffect(()=>{
        if(isSuccess){
            toast.success("Service Fetached Successfull")
        }
    },[isSuccess])
    useEffect(()=>{ 
        const fetchData = async () => {
            try {
                const result = await ServiceFetchAll().unwrap();
                dispatch(FetchAllServices(result));
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchData();

    },[ServiceFetchAll])
  return (
    <div className='mx-[100px] mt-[100px] py-2'>
        <div className='flex flex-col justify-center items-center'>
            <div>
                <p className=' text-4xl font-bold  text-gradient'>SERVICES WE PROVIDE</p>
            </div>
            <div className='my-2'>
               <p className='text-2xl font-bold  text-gradient'> Empowering Your Journey with Personalized Guidance and Support</p>
            </div>
            <div className='grid grid-cols-4 gap-20 mt-10'>
                {   services?.map((service, index) => (
                        <div className='flex flex-col items-center justify-center p-5 border border-[#9B2948] rounded-sm shadow-custom-shadow' >
                            <div className='w-[70px] h-[70px]'>
                                <img className='object-contained' src={service.card.cardImage} alt="fix" />
                            </div>
                            <div>
                                <p className='text-lg font-bold text-[#9B2948]'>{service.card.title}</p>
                            </div>
                            <div>
                                <p className='text-[10px] font-bold leading-1'>{service.card.shortDescription}</p>
                            </div>

                        </div>
                       
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default ServiceSection