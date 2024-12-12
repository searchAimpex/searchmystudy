import * as React from "react";
import Logo from "../../assets/logo2.png"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Map from  '../../assets/Map.png';
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
    <div className="flex flex-col bg-white w-full p-32 rounded-md">
      <div className="flex flex-col items-center">
          <div className="flex flex-row space-x-4 items-center">
            <span className="text-4xl text-center text-blue-main font-bold">Contact</span>
            <span className="text-4xl text-center text-gold-main font-bold">Us</span>



          </div>
            <p className='text-xl font-bold my-2  text-gray-500'>Discover dedicated professionals ready to support you on your journey</p>
      </div>
      <div className="flex flex-row w-full mt-10 p-5">
        <div className="w-1/2 flex flex-col justify-between space-y-10">
            <span className="text-4xl font-bold text-blue-main">Leave Us A Message</span>
            <input
              className="w-full p-3 rounded-md border-2 border-blue-main border-solid"
              type="text"
              placeholder="Your Name..."
              value = {name}
              onChange={(e)=>setName(e.target.value)}
            />
            <input
              className="w-full p-3 rounded-md border-2 border-blue-main border-solid"
              type="email"
              placeholder="Your Email..."
              value = {email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <textarea
              className="w-full p-3 rounded-md border-2 border-blue-main border-solid"
              placeholder="Write your message here..."
              value = {comment}
              onChange={(e)=>setComment(e.target.value)}
            /> 
            <button               
              className="w-full p-3 text-white bg-blue-main font-bold rounded-md shadow-xl border-solid"
              onClick = {(e)=>handleSubmit(e)}
              >SEND</button>
        </div>
        <div className="w-1/2 flex flex-col p-5 items-center justify-start space-y-10">
            <div>
                <img src={Map} />
            </div>
            <div className="w-full flex flex-col justify-start space-y-4 items-center">
              <div className="flex flex-row text-xl w-full text-blue-main items-start justify-start space-x-4">
                  <LocationOnIcon />
                  <span className="text-blue-main">Sewake Park ,Dwarka Mor,New Delhi</span>
              </div>
              <div className="flex flex-row text-xl w-full text-blue-main items-center justify-start space-x-4">
                  <PhoneIcon />
                  <span className="text-blue-main">+91 9910565820</span>
              </div>
              <div className="flex flex-row text-xl w-full text-blue-main items-center justify-start space-x-4">
                  <EmailIcon />
                  <span className="text-blue-main">Aimpexinnovation@gmail.com</span>
              </div> 
            </div>
        </div>
      </div>
    </div>
  );
}
