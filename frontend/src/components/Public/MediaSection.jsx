import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchMediaMutation } from '../../slices/adminApiSlice';
import { FetchMedias } from '../../slices/mediaSlice';
import styled from 'styled-components';

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
        console.log("url", url)
        window.location.href = url; // Redirect to external URL
    };

    return (
        <div className='flex flex-col items-center justify-center mt-10 w-[98%]'>
            <div className='flex flex-row items-center space-x-4'>
                <span className='text-4xl font-bold text-blue-main'>Media</span>
                <span className='text-4xl font-bold text-gold-main'>Coverage</span>
            </div>
            <div className='flex flex-row items-center'>
                <p className='text-xl font-bold text-gray-500'>Feature in top publication and media outlet</p>
            </div>
            <div className='relative mt-10 w-full'>
                {/* Scroll Buttons */}
                <button className='absolute left-[17px] z-10 top-1/2 transform -translate-y-1/2   text-[30px] p-1  bg-gray-00 font-bold text-blue-main rounded-full' onClick={scrollLeft}>
                    <StyledWrapper>
                        <button className="button">
                            <div className="button-box">
                                <span className="button-elem">
                                    <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                                    </svg>
                                </span>
                                <span className="button-elem">
                                    <svg viewBox="0 0 46 40">
                                        <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                                    </svg>
                                </span>
                            </div>
                        </button>
                    </StyledWrapper>
                </button>
                <button style={{backgroundColor:"#007bff"}} className='absolute right-[5px] z-10 top-1/2 transform -translate-y-1/2 text-[30px] p-1  bg-gray-00  bg-gold-main text-blue-main rounded-full' onClick={scrollRight}>
                <StyledWrapper>
                        <button className="button">
                            <div className="button-box">
                                <span className="button-elem">
                                    <svg viewBox="0 0 46 40" style={{transform: "rotate(180deg)"}} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                                    </svg>
                                </span>
                                <span className="button-elem">
                                <svg viewBox="0 0 46 40" style={{transform: "rotate(180deg)"}} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                                    </svg>
                                </span>
                            </div>
                        </button>
                    </StyledWrapper>
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

const StyledWrapper = styled.div`
  .button {
    display: block;
    position: relative;
    width: 26px;
    height: 36px;
    margin: 0;
    overflow: hidden;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    border: 0;
  }


  .button-box {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
  }

  .button-elem {
    display: block;
    width: 20px;
    height: 20px;
    margin: 7px 27px 0 10px;
    transform: rotate(180deg);
    fill: #f0eeef;
  }`;
