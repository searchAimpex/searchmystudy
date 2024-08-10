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
    <div className='mx-[200px] mt-[100px] py-2'>
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-row space-x-3'>
                <span className='text-4xl font-bold  text-blue-main'>SERVICES</span>
                <span className='text-4xl font-bold  text-gold-main'>WE</span>
                <span className='text-4xl font-bold  text-blue-main'>PROVIDE</span>
            </div>
            <div className='my-2'>
               <p className='text-xl font-bold  text-gray-500'> Empowering Your Journey with Personalized Guidance and Support</p>
            </div>
          
            <div className='grid grid-cols-4 gap-20 mt-10'>
                {services?.map((service, index) => (
                    <div
                        className={`flex flex-col items-center justify-center p-2 rounded-lg shadow-xl ${index === 0 ? '' : 'bg-white'}`}
                        style={index === 0 ? { background: 'linear-gradient(to right, #3C6EDD, #264790)' } : {}}
                    >
                        <div className='flex flex-row items-center space-x-4 w-full p-2'>
                            <div className='w-[50px] h-[50px] bg-white'>
                                <img className='object-contained' src={service.card.cardImage} alt="fix" />
                            </div>
                            <div>
                                <p className={`text-lg font-bold ${index === 0 ? 'text-white' : 'text-black'}`}>{service.card.title}</p>
                            </div>
                        </div>
                        <div className='p-2'>
                            <p className={`text-sm font-bold leading-1 ${index === 0 ? 'text-white' : 'text-black'}`}>{service.card.shortDescription}</p>
                        </div>
                        <div className={`p-2 flex justify-start w-full ${index === 0 ? 'text-white' : 'text-black'}`}>
                            <button>Learn More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ServiceSection