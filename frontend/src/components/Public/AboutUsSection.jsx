import React from 'react'
import AboutHero from '../../assets/AboutHero.png'

function AboutUsSection() {
  return (
    <div className='mt-[100px] mx-[200px] py-2'>
        <div className='flex flex-row w-full'>
            <div className='flex flex-col justify-center items-center w-1/2'>
                <img src={AboutHero}/>
            </div>
            <div className='w-1/2 flex flex-col items-center justify-start  p-20 space-y-4'>
                <div className='flex flex-row w-full'>
                    <span className='text-4xl font-bold text-blue-main'>About</span>
                    <span className='text-4xl font-bold text-gold-main'>Us</span>
                </div>
                <div>
                    <p className='font-bold text-xl text-gray-700'>At SearchMyStudy, we are dedicated to helping students achieve their academic dreams. Our comprehensive platform offers detailed information on a wide range of medical and study abroad courses, extensive databases of universities and countries, and personalized counseling services. We strive to provide an intuitive and user-friendly experience, guiding you every step of the way in your educational journey.</p>
                </div>
                <div className='w-full'>
                    <button className='p-2 bg-blue-main rounded-xl text-white font-bold'>Know More</button>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default AboutUsSection