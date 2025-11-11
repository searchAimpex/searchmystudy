import React, { useEffect, useState } from 'react';
import { useAllVideoMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getVideo } from '../../slices/videoSlice';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const VideoCards = () => {
  const [AllVideo] = useAllVideoMutation();
  const dispatch = useDispatch();
  const { video } = useSelector((state) => state.video);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();
  console.log(video, "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}]]");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AllVideo().unwrap();
        dispatch(getVideo(result));
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };
    fetchData();
  }, [AllVideo, dispatch]);

  return (
    <div className="relative overflow-hidden ">
      {/* Header */}
      <div className="flex flex-wrap  gap-x-2 gap-y-1 justify-center">

        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">Explore</span>
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold-main">Our</span>
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">Video</span>
        {/* <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-main">Picks</span> */}
      </div>
      <p className="text-lg py-2 text-left text-center sm:text-base md:text-lg lg:text-xl font-semibold text-gray-500">
        Explore Knowledge Through Our Video-Powered Experience</p>

      {/* Custom Slider */}
      <StyledWrapper>
        <div
          className="slider"
          style={{
            border: "0px solid green",
            '--width': '370px',
            '--height': '520px',
            '--quantity': video.length
          }}
        >
          <div className="list">
            {video.map((item, index) => (

              <a target='_blank' href={item?.videoURL}>

                <div
                  key={item._id}
                  className="item"
                  style={{ '--position': index + 1 }}
                >
                  <div onClick={() => setSelectedVideo(item.videoURL)} className="shadow-[0_0_15px_rgba(0,0,0,0.2)] relative w-[300px] h-[420px] p-4 m-4 shadow-md bg-white rounded-lg overflow-hidden cursor-pointer transition-transform duration-500 group">
                    <div className="relative h-[370px]  rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      {/* Circular Border Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-29">
                        <div style={{ borderColor: "white " }} className="w-[100px] h-[100px] border-[2px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700"></div>
                      </div>

                      {/* Thumbnail Image */}
                      <img
                        src={item.thumbnailURL}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />

                      {/* Play Icon Overlay */}
                      <div className=" absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-10 z-10 space-y-2 top-2">
                        {/* Play Icon */}
                        <div className="flex items-center justify-center bg-white rounded-full w-14 h-14">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-[#db7e19]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>

                        <div>
                          <p style={{ backgroundColor: "rgb(0 0 0 / 61%)", height: "80px", color: "white", padding: "0px 10px 0px 10px", borderRadius: "0px" }} className="capitalize text-center absolute font-semibold left-0 bottom-[-20px] text-lg w-full my-5 object-cover">
                            {item.name}
                          </p>
                        </div>

                      </div>

                      {/* Video Title */}



                    </div>

                    {/* Video Name */}

                  </div>
                </div>
              </a>



            ))}
          </div>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .card {
  // border:1px solid red;
    width: 100%;
    height: 100%;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    color: white;
    text-align: center;
  }

  .card p {
    font-size: 14px;
    color: white;
  }

  .slider {
    width: 100%;
    height: var(--height);
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
    position: relative;
  }
  .slider .list {
    display: flex;
    width: 100%;
    min-width: calc(var(--width) * var(--quantity));
    position: relative;
  }
  .slider .list .item {
    width: var(--width);
    height: var(--height);
    position: absolute;
    left: 100%;
    animation: autoRun 20s linear infinite;
    transition: filter 0.5s;
    animation-delay: calc((20s / var(--quantity)) * (var(--position) - 1) - 20s) !important;
  }

  .slider:hover .item {
    animation-play-state: paused !important;
    filter: grayscale(1);
  }

  .slider .item:hover {
    filter: grayscale(0);
  }

  .slider[reverse="true"] .item {
    animation: reversePlay 20s linear infinite;
  }

  @keyframes autoRun {
    from {
      left: 100%;
    }
    to {
      left: calc(var(--width) * -1);
    }
  }

  @keyframes reversePlay {
    from {
      left: calc(var(--width) * -1);
    }
    to {
      left: 100%;
    }
  }
`;

export default VideoCards;