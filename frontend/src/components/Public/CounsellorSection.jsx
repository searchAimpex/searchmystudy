import React from 'react'
import Gallery from './Gallery'

function CounsellorSection() {
  return (
    <div className=' py-2 bg-[#F1FAFA] mt-[100px]'>
    <div className='flex flex-col justify-center items-center mx-[100px] '>
        <div>
            <p className=' text-4xl  font-bold  text-gradient'>Meet Our Experienced Counselors</p>
        </div>
        <div className='my-2'>
               <p className='text-2xl font-bold  text-gradient'>Discover dedicated professionals ready to support you on your journey</p>
            </div>
        <div className='mt-10'>
            <Gallery />
        </div>
    </div>
    </div>
  )
}

export default CounsellorSection