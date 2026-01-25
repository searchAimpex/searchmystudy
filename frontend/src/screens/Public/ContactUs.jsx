import React, { useEffect, useState } from 'react';
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
import { useCreateContactLeadMutation } from '../../slices/adminApiSlice';

export default function ContactUs() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [comment, setComment] = useState('');
  const [webData, setWebData] = useState(null);

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



    useEffect(() => {
      const fetchWebDetails = async () => {
        try {
          const response = await fetch(
            'https://searchmystudy.com/api/admin/getWebsiteDetails'
          );
  
          if (!response.ok) throw new Error('Failed to fetch website details');
          const result = await response.json();
          setWebData(Array.isArray(result) ? result[0] : result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchWebDetails();
      console.log(webData,">>>>>>>>>>>>>>>>>>>>>>>>>>")
    }, []);



  return (
    <div>
      {/* Section 1 - Main header with images */}
      <div className='relative px-5 py-12 flex flex-col space-y-8 justify-center items-center bg-blue-200'>
        <div className='flex flex-wrap justify-center items-center gap-4'>
          <span className='text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-center text-blue-main font-bold'>Get</span>
          <span className='text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-center text-gold-main font-bold'>In</span>
          <span className='text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-center text-blue-main font-bold'>Touch</span>
          <span className='text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-center text-gold-main font-bold'>With</span>
          <span className='text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-center text-gold-main font-bold'>Us</span>
        </div>
        <div>
          <span className='text-2xl sm:text-3xl md:text-4xl font-bold'>We are here to help you on your Education Journey</span>
        </div>
        <div>
          <span className='text-lg sm:text-xl md:text-2xl'>Whether you have questions, need advice, or want more information, feel free to reach out.</span>
        </div>

        {/* Left image centered at the bottom-left */}
        <img
          className='res absolute  w-[150px] bottom-[10px] left-[-40px] transform translate-x-1/2 translate-y-1/2 '
          src={ContactUs1}
          alt="Contact Us 1"
        />

        {/* Right image centered at the bottom-right */}
        <img
          className='res w-[150px] absolute bottom-[-80px] right-[0px]  transform  '
          src={ContactUs2}
          alt="Contact Us 2"
        />
      </div>

      {/* Section 2 - Contact Us header */}
      <div className="flex flex-col items-center justify-center mt-10">
        <div>
          <span className='text-3xl sm:text-4xl md:text-5xl font-bold text-blue-main'>Contact</span>
          <span className='text-3xl sm:text-4xl md:text-5xl font-bold text-gold-main'>Us</span>
        </div>
        <div>
          <span className=' text-lg sm:text-xl md:text-2xl font-bold'>Need help? Get in touch with us</span>
        </div>
      </div>

      {/* Section 3 - Contact Form and Contact Info */}
      <div className='my-4 flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-6 shadow-xl p-6 sm:mx-8 '>
        {/* Contact Info Section */}
        <div className=' flex flex-col space-y-12 bg-blue-main w-full sm:w-1/2 p-3'>
          <div className='p-4 bg-blue-main border-b-2'>
            <span className='text-2xl font-bold text-white'>Get In Touch</span>
          </div>
          <div className='flex flex-row space-x-6'>
            <div className='text-white'>
              <LocationOnIcon />
            </div>
            <div>
              {/* https://www.facebook.com/profile.php?id=61578705533772 */}
              <span className='text-lg text-white '>{webData?.address}</span>
            </div>
          </div>
          <div className='flex flex-row space-x-6'>
            <div className='text-white'>
              <LocalPhoneIcon />
            </div>
            <div>
              <span className='text-lg text-white'>{webData?.call_no}</span>
            </div>
          </div>
          <div className='flex flex-row space-x-6'>
            <div className='text-white'>
              <EmailIcon />
            </div>
            <div>
              <span className='text-lg text-white '>{webData?.mail}</span>
            </div>
          </div>
          <div className='flex flex-row space-x-3 text-white'>
            <a href={webData?.facebook}><FacebookIcon /></a>
            
            <a href={webData?.insta}><InstagramIcon /></a>
            <a href={webData?.linkedIn}>
            <LinkedInIcon />
            </a>
            {/* <XIcon /> */}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className=' flex flex-col space-y-4 w-full sm:w-1/2'>
          <div>
            <span className='text-2xl sm:text-3xl'>Fill the form</span>
          </div>
          <div>
            <span className='text-md sm:text-lg font-bold text-gray-400'>Enter your personal data and we will get back to you!</span>
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
