import React, { useEffect, useState } from 'react';
import './VerticalCardSlider.css'; // Import CSS for animations
import { useDispatch, useSelector } from 'react-redux';
import { useAllCounsellorMutation } from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import { getCounsellor } from '../../slices/counsellorSlice';

const VerticalCardSlider = () => {
  const dispatch = useDispatch();
  const [AllCounsellor, { isSuccess }] = useAllCounsellorMutation();
  const { counsellors } = useSelector((state) => state.counsellor);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AllCounsellor().unwrap();
        dispatch(getCounsellor(result));
      } catch (error) {
        console.error("Failed to fetch counsellor:", error);
      }
    };
    fetchData();
  }, [AllCounsellor, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Counsellors fetched successfully");
    }
  }, [isSuccess]);

  const handleNext = () => {
    if (currentIndex < counsellors.length - 2) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  return (
    <div className="vertical-card-slider-wrapper">
      <button
        className="vertical-card-slider-button left"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        &#8249;
      </button>
      <div
        className="vertical-card-slider-outer"
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        {counsellors.map((counsellor, index) => (
          <div
            key={counsellor._id}
            className="vertical-card-slider-card"
          >
            <div className="content">
              <div className="details">
                <p className="text-xl text-white">"{counsellor.experience}"</p>
              </div>
              <div className="img space-x-6">
                <div className="imgContainer">
                  <img src={counsellor.imageURL} alt={counsellor.name} />
                </div>
                <div className=''>
                  <span className="text-lg font-bold text-white">{counsellor.name}</span>
                  <p className="text-sm font-bold text-white">{counsellor.course}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="vertical-card-slider-button right"
        onClick={handleNext}
        disabled={currentIndex >= counsellors.length - 2}
      >
        &#8250;
      </button>
    </div>
  );
};

export default VerticalCardSlider;
