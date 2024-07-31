import React, { useEffect } from 'react';
import './VerticalCardSlider.css'; // Import CSS for animations
import { useDispatch, useSelector } from 'react-redux';
import { useAllCounsellorMutation } from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import { getCounsellor } from '../../slices/counsellorSlice';

const VerticalCardSlider = () => {
  const dispatch = useDispatch();
  const [AllCounsellor, { isSuccess }] = useAllCounsellorMutation();
  const { counsellors } = useSelector((state) => state.counsellor);

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

  return (
    <div className="wrapper">
      <div className="outer">
        {counsellors.map((counsellor, index) => (
          <div key={counsellor._id} className="card" style={{ '--delay': index }}>
            <div className="content">
              <div className="img"><img src={counsellor.imageURL} alt={counsellor.name} /></div>
              <div className="details">
                <span className="name font-bold">{counsellor.name}</span>
                <p className='text-sm font-bold'>{counsellor.course}</p>
                <p className='text-xs text-gray-400'>{counsellor.experience}</p>
                {/* Add more details as needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCardSlider;
