import React from 'react'
import CourseCards from './CourseCards'

function CourseSection() {
  return (
    <div className='my-20 w-[100%]'>
    <div className='flex flex-col justify-center items-center w-[95%] m-auto'>
    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-center">
  <span className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">POPULAR</span>
  <span className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold-main">COURSES</span>
</div>

        <div className='my-10'>
            <CourseCards />
        </div>
    </div>
    </div>
  )
}

export default CourseSection