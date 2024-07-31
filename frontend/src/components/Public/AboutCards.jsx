import * as React from "react";
import Plane from "../../assets/Plane.png"
import Country from '../../assets/Country.png'
import Guy from "../../assets/Guy.png"
import Swarm from "../../assets/Swarm.png"
function AboutCards() {
  return (
    <div className="px-5">
      <div className="flex flex-row gap-4 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-full sm:w-6/12 lg:w-3/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col pt-10 w-full text-xl sm:text-md font-medium text-center text-black capitalize bg-white rounded-2xl shadow-[4px_4px_4px_rgba(0,0,0,0.95)] max-md:mt-6 max-md:max-w-full">
            <div className="self-start mt-2">
              <span className="text-lg sm:text-lg font-bold">
                Who We Are
              </span>
              <br />
              <span className="text-sm mt-20 px-10 sm:text-md">
                Dedicated team of education experts, counselors, and former
                international students passionate about helping students achieve
                their dreams of studying abroad.
              </span>
            </div> 
            <img
            src={Plane}
              loading="lazy"
         
              className="z-10 self-end max-w-full aspect-[1.33] w-[100px] sm:w-[150px]"
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-20 sm:w-6/12 lg:w-3/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col pt-10 w-full text-xl sm:text-md font-medium text-center text-black capitalize bg-white rounded-2xl shadow-[4px_4px_4px_rgba(0,0,0,0.95)] max-md:mt-6 max-md:max-w-full">
            <div className="self-start mt-2">
              <span className="text-lg sm:text-lg font-bold">
                Why we do it
              </span>
              <br />
              <span className="text-sm mt-20 px-10 sm:text-md">
              We believe that studying abroad is a transformative experience
               that broadens horizons, fosters personal growth, and
                enhances career opportunities.
              </span>
            </div> 
            <img
            src={Country}
              loading="lazy"
         
              className="z-10 self-end max-w-full aspect-[1.33] w-[100px] sm:w-[150px]"
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-20 sm:w-6/12 lg:w-3/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col pt-10 w-full text-xl sm:text-md font-medium text-center text-black capitalize bg-white rounded-2xl shadow-[4px_4px_4px_rgba(0,0,0,0.95)] max-md:mt-6 max-md:max-w-full">
            <div className="self-start mt-2">
              <span className="text-lg sm:text-lg font-bold">
                Who We Are
              </span>
              <br />
              <span className="text-sm mt-20 px-10 sm:text-md">
                Dedicated team of education experts, counselors, and former
                international students passionate about helping students achieve
                their dreams of studying abroad.
              </span>
            </div> 
            <img
            src={Guy}
              loading="lazy"
         
              className="z-10 self-end max-w-full aspect-[1.33] w-[100px] sm:w-[150px]"
            />
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-6/12 lg:w-3/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col pt-10 w-full text-xl sm:text-md font-medium text-center text-black capitalize bg-white rounded-2xl shadow-[4px_4px_4px_rgba(0,0,0,0.95)] max-md:mt-6 max-md:max-w-full">
            <div className="self-start mt-2">
              <span className="text-lg sm:text-lg font-bold">
                Who We Are
              </span>
              <br />
              <span className="text-sm mt-20 px-10 sm:text-md">
                Dedicated team of education experts, counselors, and former
                international students passionate about helping students achieve
                their dreams of studying abroad.
              </span>
            </div> 
            <img
            src={Swarm}
              loading="lazy"
         
              className="z-10 self-end max-w-full aspect-[1.33] w-[100px] sm:w-[150px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCards;
