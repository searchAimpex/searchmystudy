import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import { useGetAllBannerMutation } from '../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FetchBanner } from '../slices/bannerSlice';

const Carousel = ({ interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { banner } = useSelector((state) => state.banner);
  const [GetAllBanner, { isSuccess }] = useGetAllBannerMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetAllBanner();
        dispatch(FetchBanner(res.data));
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, [GetAllBanner, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Images loaded successfully');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (banner?.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banner?.length);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [interval, banner]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '500px', // Set a fixed height for the carousel
        overflow: 'hidden',
      }}
    >
      {banner?.map((image, index) => (
        <Box
          key={index}
          component="img"
          src={image?.imageURL}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 1s ease-in-out',
            opacity: currentIndex === index ? 1 : 0,
          }}
        />
      ))}
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        {banner?.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? 'white' : 'grey',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
