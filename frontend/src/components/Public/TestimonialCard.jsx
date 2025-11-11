import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllCounsellorMutation } from "../../slices/adminApiSlice";
import { getCounsellor } from "../../slices/counsellorSlice";
import { toast } from "react-toastify";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const swipeVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    },
  }),
};

export default function TestimonialCard() {
  const dispatch = useDispatch();
  const [AllCounsellor, { isSuccess }] = useAllCounsellorMutation();
  const { counsellors } = useSelector((state) => state.counsellor);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Testimonials fetched successfully");
    }
  }, [isSuccess]);

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

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 2) % counsellors.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 2 + counsellors.length) % counsellors.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
  });

  useInterval(() => {
    handleNext();
  }, 5000); // Change slide every 5 seconds

  return (
    <div {...handlers} className="shadow-sm">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <AnimatePresence initial={false} custom={direction}>
          {counsellors.slice(currentIndex, currentIndex + 2).map((counsellor, index) => (
            <motion.div
              key={counsellor.id}
              custom={direction}
              variants={swipeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full"
            >
              <div className="flex flex-col grow pb-8 pl-8 mt-8 w-full bg-white border border-black border-solid shadow-sm max-md:mt-4 max-md:max-w-full">
                <div className="z-10 self-end mt-0 max-w-full w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[80%] max-md:ml-0 max-md:w-full">
                      <div className="mt-8 text-xl font-medium text-black underline max-md:mt-4">
                        {counsellor.name} - {counsellor.course}
                      </div>
                    </div>
                    <div className="flex flex-col items-center w-[15%]">
                      <div className="w-[60px] h-[60px]">
                        <img
                          loading="lazy"
                          src={counsellor.imageURL}
                          className="grow shrink-0 max-w-full object-contain rounded-full shadow-sm aspect-[1.02] max-md:mt-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-start mt-4 text-lg p-2 text-black max-md:mt-4 max-md:max-w-full">
                  {counsellor.experience}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
