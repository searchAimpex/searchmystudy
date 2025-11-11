import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useServiceFetchAllMutation } from '../../slices/adminApiSlice';
import { FetchAllServices } from '../../slices/serviceSlice';
import { motion } from 'framer-motion';

// Image imports
import campusbuddy from '../../assets/campus-buddy.png';
import careercounselling from '../../assets/career-counselling.png';
import currencyexchange from '../../assets/currency-exchange.png';
import icondocument from '../../assets/icon-document.png';
import interviewtraining from '../../assets/interview-training.png';
import liveapplicationtracking from '../../assets/live-application-tracking.png';
import postarrivalservices from '../../assets/post-arrival-services.png';
import predepartureorientation from '../../assets/pre-departure-orientation.png';
import successfuladmits from '../../assets/successful-admits.png';
import travelpackage from '../../assets/travel-package.png';
import visadocumentation from '../../assets/visa-documentation.png';
import universityshortlists from '../../assets/university-shortlists.png';

const servicesList = [
  { img: careercounselling, label: 'Career Counselling' },
  { img: universityshortlists, label: 'University Shortlists' },
  { img: icondocument, label: 'Application Document' },
  { img: liveapplicationtracking, label: 'Application Tracking' },
  { img: interviewtraining, label: 'Interview Training' },
  { img: successfuladmits, label: 'Successful Admits' },
  { img: visadocumentation, label: 'Visa Documentation' },
  { img: travelpackage, label: 'Travel Package' },
  { img: currencyexchange, label: 'Currency Exchange' },
  { img: predepartureorientation, label: 'Departure Orientation' },
  { img: postarrivalservices, label: 'Post Arrival Services' },
  { img: campusbuddy, label: 'Campus Buddy' },
];

function ServiceSection() {
  const dispatch = useDispatch();
  const [ServiceFetchAll] = useServiceFetchAllMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ServiceFetchAll().unwrap();
        dispatch(FetchAllServices(result));
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };
    fetchData();
  }, [ServiceFetchAll]);

  return (
    <div className='mx-[50px] py-2'>
      <div className='flex flex-col justify-center items-center'>

        {/* Section Heading */}
        <motion.div
          className="flex gap-x-2 gap-y-1"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">Services</span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold-main">We</span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">Provided</span>
        </motion.div>

        {/* Subheading */}
        <motion.div
          className="my-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <p className="text-lg text-left sm:text-base md:text-lg lg:text-xl font-semibold text-gray-500">
            Empowering Your Journey with Personalized Guidance and Support
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-10'>
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center p-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
            >
              <img className='w-[80px] h-[80px]' src={service.img} alt={service.label} />
              <div className='flex items-center justify-center w-full mt-2 text-center text-sm font-medium text-gray-700'>
                {service.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ServiceSection;
