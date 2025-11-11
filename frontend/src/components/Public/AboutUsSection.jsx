import React from 'react'
import AboutHero from '../../assets/AboutHero.png'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function AboutUsSection() {
  const navigate = useNavigate()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div className="mt-[100px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8">
      <div
        ref={ref}
        className="flex flex-col-reverse lg:flex-row items-center"
      >
        {/* Left: Text Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-start space-y-6 lg:space-y-8 "
        >
          <div className="flex flex-row space-x-2">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-main">About</span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-main">Us</span>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-center lg:text-left text-gray-700 font-medium leading-relaxed">
            At SearchMyStudy, we are dedicated to helping students achieve their academic dreams. Our comprehensive platform offers detailed information on a wide range of medical and study abroad courses, extensive databases of universities and countries, and personalized counseling services. We strive to provide an intuitive and user-friendly experience, guiding you every step of the way in your educational journey.
          </p>
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <button
              onClick={() => navigate('/aboutus')}
              className="px-6 py-2 bg-blue-main rounded-xl text-white font-bold hover:bg-blue-700 transition-all"
            >
              Know More
            </button>
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
          className=" lg:w-1/2 flex justify-center mb-6 lg:mb-0"
        >
         <div className="relative w-full max-w-md md:max-w-lg lg:max-w-full">
  <img
    src={AboutHero}
    alt="About Us"
    className="w-full object-contain"
  />
  <div className=""></div>
</div>

        </motion.div>
      </div>
    </div>
  )
}

export default AboutUsSection
