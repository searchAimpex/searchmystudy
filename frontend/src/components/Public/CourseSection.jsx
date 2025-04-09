import React from 'react'
import CourseCards from './CourseCards'

function CourseSection() {
  return (
    <div className='my-20 w-[100%]'>
      <div className='flex flex-col justify-center items-center w-[95%] m-auto'>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-center">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold  text-blue-main">Popular</span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold  text-gold-main">Courses</span>
        </div>

        <div className="my-3 ">
                    <p className="text-lg text-left sm:text-base md:text-lg lg:text-xl font-semibold text-gray-500  ">
                    Explore our top-rated courses and join thousands of learners mastering new skills today.
                    </p>
                </div>

        <div className='my-10'>
          <CourseCards />
        </div>
      </div>
    </div>
  )
}

export default CourseSection