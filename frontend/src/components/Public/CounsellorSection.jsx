import React, { useEffect, useRef } from 'react'
import Gallery from './Gallery'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTestimonialFetchAllMutation } from '../../slices/adminApiSlice'
import { FetchAllTestimonial } from '../../slices/testimonialSlice'
import { motion } from 'framer-motion'

function CounsellorSection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [TestimonialFetchAll, { isSuccess, isLoading }] = useTestimonialFetchAllMutation()
  const { testimonial } = useSelector((state) => state.testimonial)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await TestimonialFetchAll().unwrap()
        dispatch(FetchAllTestimonial(result))
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
      }
    }
    fetchData()
  }, [TestimonialFetchAll, dispatch])

  return (
    <div className="py-16 bg-[#F1FAFA] mt-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center ">
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-x-2 gap-y-2"
        >  
        <h2 className="text-4xl text-center text-blue-main font-bold">Meet</h2>
        <h2 className="text-4xl text-center text-blue-main font-bold text-gold-main">Our</h2>
        <h2 className="text-4xl text-center text-blue-main font-bold text-blue-main">Experienced</h2>
        <h2 className="text-4xl text-center text-blue-main font-bold text-gold-main">Counselor</h2>

          {/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-main">Meet</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-main">Our</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-main">Experienced</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-main">Counselor</h2> */}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 font-medium mt-4 max-w-2xl"
        >
          Discover dedicated professionals ready to support you on your journey.
        </motion.p>

        {/* Gallery Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="  mt-12 "
        >
          <Gallery isLoading={isLoading} testimonial={testimonial} />
        </motion.div>
      </div>
    </div>
  )
}

export default CounsellorSection
