import React from 'react'
import AboutUs from '../../assets/AboutUsHero.png'
import Vision from '../../assets/Vision.png'
import Mission from '../../assets/Mission.png'
import About from '../../assets/About1.png'
import Excellence from '../../assets/excellence.png'
import Intregity from '../../assets/integrity.png'
import Innovation from '../../assets/innovation.png'

export default function AboutDetailed() {
  return (
    <div>
        <div className='flex flex-col'>
            <div className='bg-[#C4C4C4]'>
                <div>
                    <img src={AboutUs} className='w-full' />
                </div>
            </div>
            <div className='flex flex-row space-x-12 mt-10 mx-[200px]'>
                <div className='flex flex-col p-10 space-y-4 shadow-lg'>
                    <div>
                        <img src={Mission} className='w-[100px]' />
                    </div>
                    <div className='flex flex-row space-x-3'>
                        <span className='font-bold text-blue-main text-4xl'>Our</span>
                        <span className='font-bold text-gold-main text-4xl'>Mission</span>
                    </div>
                    <div className='p-1'>
                        <p className='text-lg text-gray-400'>
                            At SearchMyStudy, our mission is to provide students with the resources, guidance, and support they need to find the perfect study programs and universities worldwide. We are dedicated to helping students achieve their academic and career goals by offering comprehensive, reliable, and up-to-date information.
                        </p>
                    </div>
                </div>

                <div className='flex flex-col p-10 space-y-4 shadow-lg'>
                    <div>
                        <img src={Vision} className='w-[100px]' />
                    </div>
                    <div className='flex flex-row space-x-3'>
                        <span className='font-bold text-blue-main text-4xl'>Our</span>
                        <span className='font-bold text-gold-main text-4xl'>Vision</span>
                    </div>
                    <div className='p-1'>
                        <p className='text-lg text-gray-400'>
                            At SearchMyStudy, our vision is to be the leading platform for students seeking international education, making the journey to academic success as smooth and informed as possible.
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row space-x-12 mx-[200px]'>
                <div className='flex flex-col p-10 space-y-4 w-1/2'>
                    <div>
                        <img src={About} className='object-cover' />
                    </div>
                </div>

                <div className='flex flex-col p-10 space-y-4 w-1/2 shadow-lg mt-24'>
                    <div className='flex flex-row space-x-3'>
                        <span className='font-bold text-blue-main text-4xl'>Our</span>
                        <span className='font-bold text-gold-main text-4xl'>Story</span>
                    </div>
                    <div className='p-1 mr-16'>
                        <p className='text-lg text-gray-400'>
                            Founded in [Year], SearchMyStudy was born out of a passion for education and a commitment to helping students navigate the complex world of academic opportunities. Our founders, [Founder Names], recognized the challenges students face in finding the right courses and universities. With a background in education and counseling, they set out to create a platform that simplifies this process and offers personalized support.
                        </p>
                    </div>
                </div>
            </div>

            <div className='bg-blue-200 flex flex-col space-y-10 w-full justify-center items-center p-10'>
                <div className='flex flex-row space-x-4'>
                    <span className='font-bold text-4xl text-blue-main'>Our</span>
                    <span className='font-bold text-4xl text-gold-main'>Values</span>
                </div>
                <div>
                    <span className='text-xl text-gray-400'>Explore the Unique Features That Make SearchMyStudy Your Ideal Educational Partner</span>
                </div>

                <div className='grid grid-cols-3 gap-10 mx-[200px]'>
                    <div className='bg-white flex flex-col p-4 justify-start items-start rounded-lg'>
                        <div>
                            <img src={Excellence} alt="Excellence" />
                        </div>
                        <div>
                            <span className='font-bold text-blue-main text-xl'>Excellence</span>
                        </div>
                        <div>
                            <p className='text-gray-400'>Excellence is at the core of everything we do. We strive to deliver the highest quality services and resources to students.</p>
                        </div>
                    </div>
                    <div className='bg-white flex flex-col p-4 justify-start items-start rounded-lg'>
                        <div>
                            <img src={Intregity} alt="Excellence" />
                        </div>
                        <div>
                            <span className='font-bold text-blue-main text-xl'>Integrity</span>
                        </div>
                        <div>
                            <p className='text-gray-400'>Integrity is at the core of everything we do. We strive to deliver the highest quality services and resources to students.</p>
                        </div>
                    </div>
                    <div className='bg-white flex flex-col p-4 justify-start items-start rounded-lg'>
                        <div>
                            <img src={Innovation} alt="Excellence" />
                        </div>
                        <div>
                            <span className='font-bold text-blue-main text-xl'>Innovation</span>
                        </div>
                        <div>
                            <p className='text-gray-400'>Innovation is at the core of everything we do. We strive to deliver the highest quality services and resources to students.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
