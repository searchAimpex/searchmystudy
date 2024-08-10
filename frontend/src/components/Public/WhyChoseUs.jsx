import React from 'react'
import ChoseUs1 from '../../assets/ChoseUs1.png'
import ChoseUs2 from '../../assets/ChoseUs2.png'
import ChoseUs3 from '../../assets/ChoseUs3.png'
import ChoseUs4 from '../../assets/ChoseUs4.png'
import ChoseUs5 from '../../assets/ChoseUs5.png'
import ChoseUs6 from '../../assets/ChoseUs6.png'

function WhyChoseUs() {
  return (
    <div className='bg-[#E2ECF4]'>
        <div className='mx-[200px] py-10 flex flex-col space-y-6'>
            <div className='flex flex-col items-center space-y-3'>
                <div className='flex flex-col space-y-3'>
                    <div className='flex flex-row space-x-2 items-center justify-center'>
                        <span className='text-4xl font-bold text-blue-main'>Why</span>
                        <span className='text-4xl font-bold text-gold-main'>Chose</span>
                    </div>
                    <div className='flex flex-row items-center w-full justify-center'>
                        <span className='text-4xl font-bold text-blue-main'>SearchMyStudy</span>
                        <span className='text-4xl font-bold text-gold-main'>?</span>
                    </div>

                </div>
                <div>
                    <p className='text-lg font-bold text-gray-500'>Explore the Unique Features That Make SearchMyStudy Your Ideal Educational Partner</p>
                </div>

            </div>
            <div className='grid grid-cols-3 gap-5'>
                <div className='bg-white rounded-xl shadow-xl p-6'>
                    <div className='h-1/2'>
                        <img src= {ChoseUs1} />
                    </div>
                    <div className='p-6'>
                        <p className='font-bold text-2xl'>Comprehensive Database</p>
                        <p className='font-bold text-lg text-gray-400'>Access Detailed Information on thousand of universities and course</p>
                    </div>
                </div>
                <div className='bg-white rounded-xl shadow-xl p-6'>
                    <div className='h-1/2'>
                        <img src= {ChoseUs2} />
                    </div>
                    <div className='p-6'>
                        <p className='font-bold text-2xl'>Expert conselling</p>
                        <p className='font-bold text-lg text-gray-400'>Get personal guidance from our expert counseler</p>
                    </div>
                </div>
                <div className='bg-white rounded-xl shadow-xl p-6'>
                    <div className='h-1/2'>
                        <img src= {ChoseUs3} />
                    </div>
                    <div className='p-6'>
                        <p className='font-bold text-2xl'>Country and Universities Profile</p>
                        <p className='font-bold text-lg text-gray-400'>Offering detailed insights into different study desitination </p>
                    </div>
                </div>
                <div className='bg-white rounded-xl shadow-xl p-6'>
                    <div className='h-1/2'>
                        <img src= {ChoseUs4} />
                    </div>
                    <div className='p-6'>
                        <p className='font-bold text-2xl'>Comprehensive Database</p>
                        <p className='font-bold text-lg text-gray-400'>Access Detailed Information on thousand of universities and course</p>
                    </div>
                </div>
                <div className='bg-white rounded-xl shadow-xl p-6'>
                    <div className='h-1/2'>
                        <img src= {ChoseUs5} />
                    </div>
                    <div className='p-6'>
                        <p className='font-bold text-2xl'>Comprehensive Database</p>
                        <p className='font-bold text-lg text-gray-400'>Access Detailed Information on thousand of universities and course</p>
                    </div>
                </div>
                <div className='bg-white rounded-xl shadow-xl p-6'>
                    <div className='h-1/2'>
                        <img src= {ChoseUs6} />
                    </div>
                    <div className='p-6'>
                        <p className='font-bold text-2xl'>Comprehensive Database</p>
                        <p className='font-bold text-lg text-gray-400'>Access Detailed Information on thousand of universities and course</p>
                    </div>
                </div>
                


            </div>

        </div>

    </div>
  )
}

export default WhyChoseUs