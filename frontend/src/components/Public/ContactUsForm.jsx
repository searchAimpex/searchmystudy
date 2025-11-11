import * as React from "react";
import Logo from "../../assets/logo2.png"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Map from '../../assets/Map.png';
import { useCreateContactLeadMutation } from "../../slices/adminApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
export default function ContactUsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const [createContactLead, { isLoading, isError, isSuccess }] = useCreateContactLeadMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Thank you we will get back to you sortly!');
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContactLead({ name, email, comment }).unwrap();
      setName('');
      setEmail('');
      setComment('');
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <div className="flex flex-col bg-white w-full px-4 py-10 sm:px-6 md:px-10 lg:px-20 xl:px-32 rounded-md">
    {/* Header */}
    <div className="flex flex-col items-center text-center">
      <div className="flex flex-row space-x-2 items-center justify-center">
        <span className="text-2xl sm:text-3xl md:text-4xl text-blue-main font-bold">Contact</span>
        <span className="text-2xl sm:text-3xl md:text-4xl text-gold-main font-bold">Us</span>
      </div>
      <p className="text-sm sm:text-base md:text-lg font-medium mt-2 text-gray-500">
        Discover dedicated professionals ready to support you on your journey
      </p>
    </div>
  
    {/* Main Section */}
    <div className="flex flex-col lg:flex-row w-full mt-8 gap-8">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-5">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-main">Leave Us A Message</span>
        
     
        <input
          className="w-full p-3 rounded-md border border-blue-main text-sm sm:text-base"
          type="email"
          placeholder="Your Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="w-full p-3 rounded-md border border-blue-main text-sm sm:text-base"
          placeholder="Write your message here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
        <button
          className="w-full p-3 text-white bg-blue-main font-bold rounded-md shadow-md text-sm sm:text-base"
          onClick={(e) => handleSubmit(e)}
        >
          SEND
        </button>
      </div>
  
      {/* Right: Contact Info & Map */}
      <div className="w-full lg:w-1/2 flex flex-col items-center space-y-6">
        <img src={Map} alt="Map" className="w-full h-auto rounded-md" />
  
        <div className="w-full flex flex-col space-y-4 text-blue-main text-sm sm:text-base md:text-lg">
          <div className="flex items-start space-x-3">
            <LocationOnIcon fontSize="small" />
            <span>Sewake Park, Dwarka Mor, New Delhi</span>
          </div>
          <div className="flex items-center space-x-3">
            <PhoneIcon fontSize="small" />
            <span>+91 9910565820</span>
          </div>
          <div className="flex items-center space-x-3">
            <EmailIcon fontSize="small" />
            <span>Aimpexinnovation@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}
