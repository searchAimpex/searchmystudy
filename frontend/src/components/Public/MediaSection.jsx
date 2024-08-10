import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchMediaMutation } from '../../slices/adminApiSlice';
import { FetchMedias } from '../../slices/mediaSlice';

export default function MediaSection() {
    const dispatch = useDispatch();
    const { media } = useSelector(state => state.media);
    const [FetchMedia] = useFetchMediaMutation();
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchMedia().unwrap();
                dispatch(FetchMedias(result));
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
            }
        };
        fetchData();
    }, [FetchMedia, dispatch]);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className='flex flex-col items-center justify-center mx-[200px] mt-10'>
            <div className='flex flex-row items-center space-x-4'>
                <span className='text-4xl font-bold text-blue-main'>Media</span>
                <span className='text-4xl font-bold text-gold-main'>Coverage</span>
            </div>
            <div className='flex flex-row items-center'> 
                <p className='text-xl font-bold text-gray-500'>Feature in top publication and media outlet</p>
            </div>
            <div className='relative mt-10 w-full'>
                {/* Scroll Buttons */}
                <button className='absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full' onClick={scrollLeft}>
                    &lt;
                </button>
                <button className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full' onClick={scrollRight}>
                    &gt;
                </button>

                {/* Slider */}
                <div ref={sliderRef} className='flex space-x-4 overflow-x-auto scrollbar-hide'>
                    {media.map((item) => (
                        <div key={item._id} className='flex-none w-[350px] shadow-xl p-4 border rounded-lg'>
                            <img 
                                src={item.imageURL} 
                                alt='webinar' 
                                className='w-[350px] h-[250px] rounded-lg' 
                            />
                            <p className='text-xl font-bold text-blue-main mt-2'>{item.title}</p>
                            <p className='text-lg font-bold text-gray-400 mt-2'>{item.description}</p>
                            <button className='text-lg font-bold text-blue-main border border-blue-main p-2 rounded-lg mt-4'>VISIT</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
