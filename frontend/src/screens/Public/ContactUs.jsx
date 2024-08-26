import React, { useState } from 'react';
import ContactUs1 from '../../assets/ContactUs1.png';
import ContactUs2 from '../../assets/ContactUs2.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { TextField } from '@mui/material';
import { useCreateContactLeadMutation } from '../../slices/adminApiSlice'; // Adjust the import path

export default function ContactUs() {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [comment, setComment] = useState('');
  
  const [createContactLead, { isLoading, isError, isSuccess }] = useCreateContactLeadMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContactLead({ name, phoneNo, email, occupation, comment }).unwrap();
      setName('');
      setPhoneNo('');
      setEmail('');
      setOccupation('');
      setComment('');
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <div>
      <div className='relative px-5 py-12 flex flex-col space-y-8 justify-center items-center bg-blue-200'>
        <div className='flex flex-row space-x-4 items-center'>
          <span className='text-6xl text-center text-blue-main font-bold'>Get</span>
          <span className='text-6xl text-center text-gold-main font-bold'>In</span>
          <span className='text-6xl text-center text-blue-main font-bold'>Touch</span>
          <span className='text-6xl text-center text-gold-main font-bold'>With</span>
          <span className='text-6xl text-center text-gold-main font-bold'>Us</span>
        </div>
        <div>
          <span className='text-4xl font-bold'>We are here to help you on your Education Journey</span>
        </div>
        <div>
          <span className='text-xl'>Whether you have questions, need advice, or want more information, feel free to reach out.</span>
        </div>

        {/* Left image centered at the bottom-left */}
        <img 
          className='absolute bottom-0 left-0 transform translate-x-1/2 translate-y-1/2' 
          src={ContactUs1} 
          alt="Contact Us 1" 
        />

        {/* Right image centered at the bottom-right */}
        <img 
          className='absolute bottom-0 right-0 transform -translate-x-1/2 translate-y-1/2' 
          src={ContactUs2} 
          alt="Contact Us 2" 
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-10">
        <div>
          <span className='text-4xl font-bold text-blue-main'>Contact</span>
          <span className='text-4xl font-bold text-gold-main'>Us</span>
        </div>
        <div>
          <span className='text-xl font-bold'>Need help? Get in touch with us</span>
        </div>
      </div>

      <div className='flex flex-row space-x-6 shadow-xl mt-10 p-6 mx-[200px]'>
        <div className='flex flex-col space-y-12 bg-blue-main w-1/2 p-10'>
          <div className='p-4 bg-blue-main border-b-2'>
            <span className='text-2xl font-bold text-white'>Get In Touch</span>
          </div>
          <div className='flex flex-row space-x-6'>
            <div className='text-white'>
              <LocationOnIcon /> 
            </div>
            <div>
              <span className='text-lg text-white font-bold'>House No. 47, Vishal Nagar, South Delhi, Delhi, 123007, India</span>
            </div>
          </div>
          <div className='flex flex-row space-x-6'>
            <div className='text-white'>
              <LocalPhoneIcon />
            </div>
            <div>
              <span className='text-lg text-white font-bold'>+91 XXXXXXXXX</span>
            </div>
          </div>
          <div className='flex flex-row space-x-6'>
            <div className='text-white'>
              <EmailIcon />
            </div>
            <div>
              <span className='text-lg text-white font-bold'>Mail Example</span>
            </div>
          </div>
          <div className='flex flex-row space-x-3 text-white'>
            <FacebookIcon />
            <InstagramIcon />
            <LinkedInIcon />
            <XIcon />
          </div>
        </div>

        <div className='flex flex-col space-y-4'>
          <div>
            <span className='text-2xl'>Fill the form</span>
          </div>
          <div>
            <span className='text-md font-bold text-gray-400'>Enter your personal data and we will get back to you!</span>
          </div>
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              focused
            />
            <TextField
              label="Phone Number"
              variant="standard"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              focused
            />
            <TextField
              label="Email Address"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focused
            />
            <TextField
              label="Occupation"
              variant="standard"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              focused
            />
            <TextField
              label="Comment"
              variant="standard"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              focused
            />
            <button
              type="submit"
              className='bg-blue-main text-white font-bold p-4 rounded-xl'
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            {isError && <p className='mt-2 text-red-500'>Failed to submit the form. Please try again.</p>}
            {isSuccess && <p className='mt-2 text-green-500'>Form submitted successfully!</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
