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
                console.error('Failed to fetch media:', error);
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

    const handleCardClick = (url) => {
        console.log("url",url)
        window.location.href = url; // Redirect to external URL
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
                <button className='absolute left-[-10px] z-10 top-1/2 transform -translate-y-1/2  px-2 py-1 bg-gold-main font-bold text-blue-main rounded-full' onClick={scrollLeft}>
                    &lt;
                </button>
                <button className='absolute right-[5px] z-10 top-1/2 transform -translate-y-1/2  px-2 py-1 font-bold  bg-gold-main text-blue-main rounded-full' onClick={scrollRight}>
                    &gt;
                </button>

                {/* Slider */}
                <div ref={sliderRef} className='flex space-x-4 overflow-x-auto scrollbar-hide'>
                    {media.map((item) => (
                        <div
                            key={item._id}
                            onClick={(e) => handleCardClick(item.articalURL)}  // Redirect to external URL
                            className='flex-none w-[350px] shadow-xl p-4 border rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105'
                        >
                            <img 
                                src={item.imageURL} 
                                alt='webinar' 
                                className='w-[350px] h-[250px] rounded-lg' 
                            />
                            <p className='text-xl font-bold text-blue-main mt-2'>{item.title}</p>
                            <p className='text-md font-bold text-gray-400 mt-2'>{item.description}</p>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
