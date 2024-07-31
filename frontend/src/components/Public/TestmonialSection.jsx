import React from 'react'
import TestimonialCard from './TestimonialCard'
import VerticalCardSlider from './VerticalCardsSlider'

 function TestmonialSection() {
  return (
    <div className='mx-[100px] mt-[100px] py-2'>
        <div className='flex flex-col justify-center items-center'>
            <div>
                <p className=' text-4xl font-bold  text-gradient'>WHAT OUR STUDENT SAY</p>
            </div>
            <div className='my-2'>
               <p className='text-2xl font-bold  text-gradient'>Discover dedicated professionals ready to support you on your journey</p>
            </div>
            <div className='mt-10'>
            <VerticalCardSlider />
            </div>
        </div>

    </div>
  )
}

export default TestmonialSection