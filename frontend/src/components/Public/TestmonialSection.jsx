import React from 'react'
import TestimonialCard from './TestimonialCard'
import VerticalCardSlider from './VerticalCardsSlider'

 function TestmonialSection() {
  return (
    <div className='mt-[100px] py-2'>
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-row space-x-4'>
                <span className='text-4xl font-bold text-blue-main'>What</span>
                <span className='text-4xl font-bold text-gold-main'>Our</span>

                <span className='text-4xl font-bold text-blue-main'>Studeny</span>

                <span className='text-4xl font-bold text-gold-main'>Say</span>

            </div>
            <div className='my-2'>
               <p className='text-xl font-bold  text-gray-500'>Discover dedicated professionals ready to support you on your journey</p>
            </div>
            <div className='mt-10 w-full  px-[200px]'>
            <VerticalCardSlider />
            </div>
        </div>

    </div>
  )
}

export default TestmonialSection