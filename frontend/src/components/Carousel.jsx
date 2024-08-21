import React, { useState, useEffect } from 'react';
import Hero from '../assets/Hero.png'

const Carousel = ({ interval = 3000 }) => {
  return (
    <div className='w-full flex flex-row bg-blue-100 h-[680px]'>
        <div className='flex flex-col items-center p-24 justify-start w-1/2 space-y-5'>
            <div className='flex flex-row w-full justify-start space-x-5'>
              <span className='text-blue-main text-6xl font-bold'>Achive</span>
              <span  className='text-gold-main text-6xl font-bold'>Your</span>
              <span  className='text-blue-main text-6xl font-bold'>Dream</span>

            </div>
            <div className='flex flex-row w-full justify-start space-x-5'>
              <span  className='text-gold-main text-6xl font-bold'>With</span>
              <span  className='text-blue-main text-6xl font-bold'>The</span>
              <span  className='text-gold-main text-6xl font-bold'>Best</span>
            </div>
            <div className='flex flex-row w-full space-x-5'>
              <span  className='text-blue-main text-6xl font-bold'>Medical</span>
              <span  className='text-gold-main text-6xl font-bold'>And</span>
              <span  className='text-blue-main text-6xl font-bold'>Study</span>
            </div>
            <div className='flex flex-row w-full space-x-5'>
              <span  className='text-gold-main text-6xl font-bold'>Abrod</span>
              <span  className='text-blue-main text-6xl font-bold'>Program</span>
            </div>
            <div className='flex w-full'>
              <span className='text-gray-600 font-bold'>Discover Top universities,explore exiting course and get personlize Counselling to guide your education journey</span>

            </div>
            <div className='flex flex-row w-full space-x-6'>
              <button  className='p-2 rounded-xl text-black font-bold shadow-xl'>Explore Course</button>
              <button className='bg-blue-main p-2 rounded-xl text-white font-bold shadow-xl'>Get Counselling</button>

            </div>
        </div>
        <div className='w-1/2'>
          <img src={Hero} alt="Hero" className="w-full h-[600px] object-contained" />
        </div>

    </div>
  );
};

export default Carousel;
