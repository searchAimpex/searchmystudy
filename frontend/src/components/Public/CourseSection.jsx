import React from 'react'
import CourseCards from './CourseCards'

function CourseSection() {
  return (
    <div className='mx-[100px] mt-10'>
    <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-row space-x-4'>
          <span className='text-4xl font-bold text-blue-main'>POPULAR</span>
          <span className='text-4xl font-bold text-gold-main'>COURSES</span>
        </div>
        <div className='my-10'>
            <CourseCards />
        </div>
    </div>
    </div>
  )
}

export default CourseSection