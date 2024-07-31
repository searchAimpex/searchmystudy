import React from 'react'
import AboutCards from './AboutCards'

function AboutUsSection() {
  return (
    <div className='mt-[100px] py-2'>
        <div className='bg-custom-primary '>
            <div className='flex flex-col justify-center items-center mx-[100px] '>
                <div>
                    <p className=' text-4xl mt-10 text-white'>About Us</p>
                </div>
                <div className='my-10'>
                    <AboutCards />
                </div>
            </div>
        </div>
    

    </div>
  )
}

export default AboutUsSection