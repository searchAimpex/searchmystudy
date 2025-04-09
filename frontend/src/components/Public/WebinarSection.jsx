import React, { useEffect } from 'react';
import { useAllWebinarMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FetchWebinar } from '../../slices/webinarSlice';

export default function WebinarSection() {
    const dispatch = useDispatch();
    const { webinar } = useSelector(state => state.webinar);
    const [AllWebinar] = useAllWebinarMutation();

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
        <div className="flex flex-col items-center justify-center px-4 py-8">
           <div className="text-center mb-6 px-4">
  <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-blue-main">
    Upcoming <span className="text-gold-main">Webinar</span>
  </h2>
  <p className="text-sm sm:text-base md:text-lg text-gray-500 mt-2">
    Join Our Informative and Interactive Webinar
  </p>
</div>


            <div className=" flex justify-center webinar items-center  w-[100%]  place-items-center">
                {webinar.map((items) => (
                    <div
                        key={items._id}
                        style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.24)' }}
                        className="flex flex-col items-center justify-center p-2 m-4 rounded-lg "
                    >
                        <img
                            src={items.imageURL}
                            alt="webinar"
                            className="w-[270px] h-[300px] md:h-[320px] rounded-lg"
                        />

                        <div  className="flex flex-wrap  sm:flex-nowrap items-start w-full gap-2 mt-3">
                            <p className="text-sm font-bold text-white bg-blue-main px-3 py-2 rounded-lg">{items.date}</p>
                            <p className="text-sm font-bold text-black bg-gray-200 px-3 py-2 rounded-lg">{items.day} {items.time}</p>
                        </div>

                        <div className="mt-3 w-full">
                            <p className="text-lg font-bold text-blue-main capitalize">{items.title}</p>
                        </div>

                        <div className="mt-3  w-full">
                            <button className="bg-gold-main w-full text-base font-bold  border border-blue-main p-3 rounded-lg hover:bg-blue-main hover:text-white transition">
                                REGISTER
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
