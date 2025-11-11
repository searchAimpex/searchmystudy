import React, { useEffect, useState } from 'react';
import { useAllWebinarMutation, useSendWebinarLinkToMailMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FetchWebinar } from '../../slices/webinarSlice';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import {
  Box,
  Typography,
  Button,
  Modal,
} from '@mui/material';
import { motion } from 'framer-motion';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function WebinarSection() {
  const dispatch = useDispatch();
  const { webinar } = useSelector(state => state.webinar);
  const [AllWebinar] = useAllWebinarMutation();
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const visibleWebinars = showAll ? webinar : webinar.slice(0, 6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AllWebinar().unwrap();
        dispatch(FetchWebinar(result));
      } catch (error) {
        console.error('Failed to fetch webinars:', error);
      }
    };
    fetchData();
  }, [AllWebinar, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center px-3 sm:px-6 md:px-10 py-8 sm:py-12 lg:py-16 bg-[#f9fafa]">
      <PopUp isModalOpen={isModalOpen} handleModalClose={handleModalClose} />

      {/* Heading */}
      <motion.div
        className="text-center mb-6 sm:mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">
          Upcoming <span className="text-gold-main">Webinar</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-600">
          Join Our Informative and Interactive Webinar
        </p>
      </motion.div>

      {/* Webinar Cards */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-stretch w-full">
        {visibleWebinars.map((items, index) => (
          <motion.div
            key={items._id}
            style={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)' }}
            className="flex-shrink-0 w-full sm:w-[280px] md:w-[340px] lg:w-[400px] flex flex-col p-4 rounded-xl bg-white transition-transform hover:scale-[1.02]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Image */}
            <div className="relative h-[180px] sm:h-[200px] rounded-lg overflow-hidden">
              <img
                src={items.imageURL}
                alt="webinar"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white p-3 w-full">
                <p className="font-semibold">{items.trainer_name}</p>
                <p className="text-xs sm:text-sm">{items.trainer_profession}</p>
              </div>
            </div>

            {/* Content */}
            <div className="mt-4">
              <p className="text-base sm:text-lg font-semibold capitalize">{items.title}</p>
            </div>

            {/* Date & Time */}
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
              <p className="text-gray-700 flex items-center">
                <DateRangeIcon fontSize="small" className="mr-1 text-blue-main" />
                {new Date(items.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="text-gold-main font-bold">{items.weekday}</p>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-700">
              <AccessTimeIcon fontSize="small" className="mr-1 text-blue-main" />
              {items.timeStart} AM – {items.timeEnd} PM
            </div>

            {/* Register Button */}
            <div className="mt-4">
              <StyledWrapper>
                <button onClick={handleModalOpen} className="button w-full">
                  REGISTER
                </button>
              </StyledWrapper>
            </div>
          </motion.div>
        ))}

        {webinar.length > 6 && !showAll && (
          <div className="w-full mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 font-semibold text-black hover:underline"
            >
              Explore More Webinars →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PopUp({ isModalOpen, handleModalClose }) {
  const [Data, setData] = useState({ name: "", email: "", number: "", state: "", country: "" });
  const [sendWebinarLink, { isLoading, isSuccess, isError, error }] = useSendWebinarLinkToMailMutation();

  useEffect(() => {
    if (isSuccess) toast.success('Thank you for applying, we will get back to you shortly!');
  }, [isSuccess]);

  const sendWebinarToEmail = async (e) => {
    e.preventDefault();
    try {
      if (Object.values(Data).every(val => val !== "")) {
        await sendWebinarLink(Data).unwrap();
        handleModalClose();
      } else {
        toast.error("All fields are required!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md sm:max-w-lg p-6 rounded-xl bg-white shadow-2xl"
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Apply for the Webinar</Typography>
            <span onClick={handleModalClose} className="cursor-pointer hover:text-red-500">X</span>
          </Box>

          <form className="space-y-3 sm:space-y-4">
            {["Full Name", "Email Address", "Phone Number", "State", "Country"].map((field, i) => (
              <input
                key={i}
                type={field === "Email Address" ? "email" : "text"}
                placeholder={field}
                onChange={(e) => setData(prev => ({ ...prev, [field.toLowerCase().replace(" ", "")]: e.target.value }))}
                className="w-full px-4 py-2 border rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            ))}

            <Button
              onClick={sendWebinarToEmail}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>

          {isError && <Typography color="error" mt={2}>{error?.data?.message || 'Something went wrong. Please try again.'}</Typography>}
        </motion.div>
      </div>
    </Modal>
  );
}


const StyledWrapper = styled.div`
.button {
 --color: #264790;
 padding: 0.6em 1.2em;
 background-color: transparent;
 border-radius: .5em;
 position: relative;
 overflow: hidden;
 cursor: pointer;
 transition: .5s;
 font-weight: 600;
 font-size: 14px;
 border: 2px solid;
 color: var(--color);
 z-index: 1;
}
.button::before, .button::after {
 content: '';
 display: block;
 width: 50px;
 height: 50px;
 transform: translate(-50%, -50%);
 position: absolute;
 border-radius: 50%;
 z-index: -1;
 background-color: var(--color);
 transition: 1s ease;
}
.button::before { top: -1em; left: -1em; }
.button::after { left: calc(100% + 1em); top: calc(100% + 1em); }
.button:hover::before, .button:hover::after { height: 420px; width: 420px; }
.button:hover { color: #fff; }
.button:active { filter: brightness(.85); }
`;
