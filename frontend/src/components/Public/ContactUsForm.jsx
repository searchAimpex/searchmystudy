import * as React from "react";
import Logo from "../../assets/logo2.png"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function ContactUsForm() {
  return (
    <div className="flex flex-col bg-white w-full p-32 rounded-md">
      <div className="flex flex-row items-center">
        <div className="w-1/6">
          <img

            src={Logo}
            alt="Logo"
            className="w-[150px] mx-auto"
          />
        </div>
        <div className="flex flex-col w-5/6 items-center justify-center">
            <h1 className="text-4xl text-center text-gradient font-bold">CONTACT US</h1>
            <p className='text-2xl font-bold my-2  text-gradient'>Discover dedicated professionals ready to support you on your journey</p>
        </div>
      </div>
      <div className="flex flex-row w-full mt-10 p-5">
        <div className="w-2/3 flex flex-col justify-between space-y-10">
            <span className="text-4xl font-bold text-gradient">Leave Us A Message</span>
            <input
              className="w-full p-3 rounded-md border-2 border-custom-color border-solid"
              type="text"
              placeholder="Your Name..."
            />
            <input
              className="w-full p-3 rounded-md border-2 border-custom-color border-solid"
              type="email"
              placeholder="Your Email..."
            />
            <textarea
              className="w-full p-3 rounded-md border-2 border-custom-color border-solid"
              placeholder="Write your message here..."
            /> 
            <button               
            className="w-full p-3 text-white bg-custom-color font-bold rounded-md border-2 border-custom-color border-solid"
            >SEND</button>
        </div>
        <div className="w-1/3 flex flex-col p-5 items-center justify-center space-y-10">
          <div className="flex flex-row text-xl text-custom-color items-start">
              <LocationOnIcon />
              <span className="text-custom-color">Sewake Park ,Dwarka Mor,New Delhi</span>
          </div>
          <div className="flex flex-row text-xl text-custom-color items-center justify-start">
              <PhoneIcon />
              <span className="text-custom-color">+91 9910565820</span>
          </div>
          <div className="flex flex-row text-xl text-custom-color items-center justify-start">
              <EmailIcon />
              <span className="text-custom-color">Aimpexinnovation@gmail.com</span>
          </div> 

        </div>
      </div>
    </div>
  );
}
