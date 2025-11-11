import React from 'react'
import TestimonialCard from './TestimonialCard'
import VerticalCardSlider from './VerticalCardsSlider'

function TestmonialSection() {
  return (
    <div className='mt-12'>
      <div className='flex flex-col justify-center items-center'>
        <div
          className="space-x-2 sm:space-x-4 space-y-2 sm:space-y-0 flex-wrap justify-center items-center"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">
            What
          </span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main text-gold-main">
            Our
          </span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main text-blue-main">
            Students
          </span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main text-gold-main">
            Say
          </span>
        </div>

        <div className='my-2'>
        <p className="text-lg text-left sm:text-base md:text-lg lg:text-xl font-semibold text-gray-500  ">
        Hear what our students have to say about their experience.</p>
        </div>
        <div className="w-[95%] max-w-[500px] mx-auto py-[60px] ">
          <VerticalCardSlider />
        </div>
      </div>

    </div>
  )
}

export default TestmonialSection