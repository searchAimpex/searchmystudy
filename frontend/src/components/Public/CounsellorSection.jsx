import React, { useEffect } from 'react'
import Gallery from './Gallery'
import { useDispatch, useSelector } from 'react-redux'
import { useTestimonialFetchAllMutation } from '../../slices/adminApiSlice'
import { FetchAllTestimonial } from '../../slices/testimonialSlice'
import { motion } from 'framer-motion'

function CounsellorSection() {
  const dispatch = useDispatch()
  const [TestimonialFetchAll, { isSuccess, isLoading }] = useTestimonialFetchAllMutation()
  const { testimonial } = useSelector((state) => state.testimonial)
  console.log(testimonial);
  

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
    <div className="py-12  md:py-20 bg-[#F1FAFA] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center text-center">
        
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">Meet</h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold-main">Our</h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">Experienced</h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold-main">Counsellor</h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-medium max-w-2xl"
        >
          Discover dedicated professionals ready to support you on your journey.
        </motion.p>

        {/* Gallery Component */}
        <motion.div
       
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10  Counselor"
        >
          <Gallery isLoading={isLoading} testimonial={testimonial} />
        </motion.div>
      </div>
    </div>
  )
}

export default CounsellorSection
