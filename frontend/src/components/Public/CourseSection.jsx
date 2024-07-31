import React from 'react'
import CourseCards from './CourseCards'

function CourseSection() {
  return (
    <div className='mx-[100px] mt-10'>
    <div className='flex flex-col justify-center items-center'>
        <div>
            <p className=' text-2xl'>POPULARE COURSES</p>
        </div>
        <div className='my-10'>
            <CourseCards />
        </div>
    </div>
    </div>
  )
}

export default CourseSection