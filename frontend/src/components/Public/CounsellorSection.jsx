import React, { useEffect, useRef } from 'react'
import Gallery from './Gallery'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTestimonialFetchAllMutation } from '../../slices/adminApiSlice';
import { FetchAllTestimonial } from '../../slices/testimonialSlice';

function CounsellorSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [TestimonialFetchAll, { isSuccess, isLoading }] = useTestimonialFetchAllMutation();
  const { testimonial } = useSelector((state) => state.testimonial);

  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await TestimonialFetchAll().unwrap();
        dispatch(FetchAllTestimonial(result));
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };
    fetchData();
  }, [TestimonialFetchAll, dispatch]);
  return (
    <div className=' py-2 bg-[#F1FAFA] mt-[100px]'>
    <div className='flex flex-col justify-center items-center mx-[100px] '>
        <div className='flex flex-row space-x-3'>
            <span className='text-4xl font-bold text-blue-main'>Meet</span>
            <span className='text-4xl font-bold text-gold-main'>Our</span>
            <span className='text-4xl font-bold text-blue-main'>Experienced</span>
            <span className='text-4xl font-bold text-gold-main'>Counselor</span>
        </div>
        <div className='my-2'>
               <p className='text-xl font-bold  text-gray-500'>Discover dedicated professionals ready to support you on your journey</p>
            </div>
        <div className='mt-10'>
            <Gallery  isLoading = {isLoading}testimonial = { testimonial}/>
        </div>
    </div>
    </div>
  )
}

export default CounsellorSection