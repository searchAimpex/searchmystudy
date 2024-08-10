import React, { useEffect } from 'react'
import { useAllWebinarMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FetchWebinar } from '../../slices/webinarSlice';

export default function WebinarSection() {
    const dispatch = useDispatch();
    const {webinar} = useSelector(state=>state.webinar);
    const [AllWebinar, { isSuccess }] = useAllWebinarMutation();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await AllWebinar().unwrap();
                dispatch(FetchWebinar(result));
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
            }
        };
        fetchData();
    }, [AllWebinar, dispatch]);

  return (
    <div className='flex flex-col items-center justify-center mx-[200px]' >
        <div className='flex flex-row items-center space-x-4'>
            <span className='text-4xl font-bold text-blue-main'>Upcoming</span>
            <span className='text-4xl font-bold text-gold-main'>Webinar</span>
        </div>
        <div  className='flex flex-row items-center'> 
            <p className='text-xl font-bold text-gray-500'>Join Our Informative and Intractive Webinar</p>
        </div>
        <div className='grid grid-cols-3 gap-12 mt-10'>
                {
                    webinar.map((items) => (
                        <div className='flex flex-col items-center justify-center p-4 border rounded-lg' key={items._id}>
                            <div className='flex flex-row items-center space-x-2'>
                                <img 
                                    src={items.imageURL} 
                                    alt='webinar' 
                                    className='w-[350px] h-[250px] rounded-lg' 
                                />
                            </div>
                            <div className='flex flex-row items-start w-full space-x-2 mt-3'>
                                <p className='text-sm font-bold text-white bg-blue-main p-3 rounded-lg'>{items.date}</p>
                                <p className='text-sm font-bold text-black bg-gray-200 p-3 rounded-lg'>{items.day}  {items.time}</p>
                            </div>
                            <div className='flex flex-row items-start space-x-2 mt-2 w-full'>
                                <p className='text-xl font-bold text-blue-main'>{items.title}</p>
                            </div>
                            <div className='flex flex-row items-start space-x-2 mt-2 w-full'>
                                <button className='text-lg font-bold text-blue-main border border-blue-main p-2 rounded-lg'>REGISTER</button>
                            </div>
                          
                        </div>
                    ))
                }
        </div>

    </div>
  )
}
