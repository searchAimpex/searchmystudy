import React, { useEffect, useState } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCountryFetchMutation, useLinkFetchMutation } from '../../slices/adminApiSlice';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FetchedLinked } from '../../slices/courseSlice';
import { FetchCountry } from '../../slices/countrySlice';
import Logo from '../../assets/SearchMyStudy.png';
export default function Footer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [CountryFetch, { isSuccess }] = useCountryFetchMutation();
    const [LinkFetch] = useLinkFetchMutation();
    const [extraLink,setExtraLink] = useState()
    const { countries } = useSelector((state) => state.country);
    const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await CountryFetch().unwrap();
                dispatch(FetchCountry(result));
                const linkResult = await LinkFetch().unwrap();
                dispatch(FetchedLinked(linkResult));
                setExtraLink(linkResult)
            } catch (error) {
                console.error('Failed to fetch countries:', error);
            }
        };
        fetchData();
    }, [CountryFetch, dispatch]);
  useEffect(() => {
    const fetchWebDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/getWebsiteDetails"
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWebDetails();
  }, []);
    return (
        <footer className="bg-blue-main text-white py-10">
        <div className="container mx-auto px-4 space-y-10">
      
          {/* Head Office and Contact Info */}
          <div className="grid grid-cols-1 gap-8 border-b border-white pb-8">
            {/* Logo */}
            <div className="flex justify-center">
              <img src={Logo} alt="Logo" className="h-12 sm:h-[60px] w-auto" />
            </div>
      
            {/* Info Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Head Office */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Head Office</h3>
                <p className="text-sm sm:text-base">
                 
                  {data?.map((ele) => {
    return <span key={ele._id}>{ele?.address}</span>;
})}

                 
                </p>
              </div>
      
              {/* Contact Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold mb-2">Emails:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <EmailOutlinedIcon className="mr-2" />
                      <a href={`
                        ${data?.map((ele) => {
    return <span key={ele._id}>{ele?.mail}</span>;
})}
                        `} className="hover:text-gray-300">
                                         {data?.map((ele) => {
    return <span key={ele._id}>{ele?.mail}</span>;
})}
                      </a>
                    </li>
                    {/* <li className="flex items-center">
                      <EmailOutlinedIcon className="mr-2" />
                      <a href="mailto:support@company.com" className="hover:text-gray-300">support@company.com</a>
                    </li> */}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Phone Numbers:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <PhoneOutlinedIcon className="mr-2" />
                      <a href="tel:+1234567890" className="hover:text-gray-300">
                                         {data?.map((ele) => {
    return <span key={ele._id}>{ele?.call_no}</span>;
})}
                      </a>
                    </li>
                    <li className="flex items-center">
                      <PhoneOutlinedIcon className="mr-2" />
                      <a href={`
                        ${data?.map((ele) => {
                            return <span key={ele._id}>{ele?.counselling_no}</span>;
                        })}`} className="hover:text-gray-300">
                          {data?.map((ele) => {
    return <span key={ele._id}>{ele?.counselling_no}</span>;
})}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
      
              {/* Socials */}
              <div>
                <h4 className="text-xl font-bold mb-2">Socials</h4>
                <div className="flex space-x-4 mt-2">
                  <a target='blank' href={`
                     ${data?.map((ele) => {
    return <span key={ele._id}>{ele?.facebook}</span>;
})}
                    `} className="hover:text-gray-300"><FacebookIcon /></a>
                  <a target='blank'  href={`
                     ${data?.map((ele) => {
    return <span key={ele._id}>{ele?.twitter}</span>;
})}
                    `} className="hover:text-gray-300"><TwitterIcon /></a>
                  <a target='blank'  href={`
                     ${data?.map((ele) => {
    return <span key={ele._id}>{ele?.insta}</span>;
})}
                    `} className="hover:text-gray-300"><InstagramIcon /></a>
                  <a target='blank' 
                    href={`
                     ${data?.map((ele) => {
    return <span key={ele._id}>{ele?.linkedIn}</span>;
})}
                    `}
                  className="hover:text-gray-300"><LinkedInIcon /></a>
                </div>
              </div>
            </div>
          </div>
      
          {/* Quick Links */}
          <div className="border-b border-white pb-8">
            <h3 className="text-center text-2xl font-bold mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Explore */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Explore Our Services</h4>
                <ul className="space-y-2 text-sm">
                  <li><span onClick={() => navigate('/')} className="cursor-pointer hover:text-gray-300">Home</span></li>
                  <li><span onClick={() => navigate('/aboutus')} className="cursor-pointer hover:text-gray-300">About Us</span></li>
                  <li><span onClick={() => navigate('/services')} className="cursor-pointer hover:text-gray-300">Services</span></li>
                  <li><span onClick={() => navigate('/blog')} className="cursor-pointer hover:text-gray-300">Blog</span></li>
                  <li><span onClick={() => navigate('/contactus')} className="cursor-pointer hover:text-gray-300">Contact Us</span></li>
                </ul>
              </div>
      
              {/* Study Abroad */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Study Abroad</h4>
                <ul className="space-y-2 text-sm">
                  {countries.map((item) => (
                    <li key={item._id}>
                      <span onClick={() => navigate(`/country/${item._id}`)} className="cursor-pointer hover:text-gray-300">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
      
              {/* Medical in India */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Medical in India</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    'mbbsindia', 'mdindia', 'bamsindia', 'bhmsindia', 'bdsindia',
                    'nursingindia', 'pharmacyindia', 'bvScindia'
                  ].map(path => (
                    <li key={path}>
                      <span onClick={() => navigate(`/${path}`)} className="cursor-pointer hover:text-gray-300">
                        {path.replace(/india/i, '').toUpperCase()} in India
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
             
      
      
              {/* Important Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Important Links</h4>
                <ul className="space-y-2 text-sm">
                  {extraLink?.map((item) => (
                    <li key={item._id}>
                      <span onClick={() => navigate(`/country/${item._id}`)} className="hover:text-gray-300 cursor-pointer">
                        MBBS in {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

               {/* MBBS Abroad */}
              <div>
                <h4 className="text-lg font-semibold mb-4">MBBS Abroad</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    { name: 'WDOMS', url: 'https://www.wdoms.org/' },
                    { name: 'NMC', url: 'https://www.nmc.org.in/' },
                    { name: 'NEET', url: 'https://neet.nta.nic.in/' },
                    { name: 'FMGE', url: 'https://natboard.edu.in/viewnbeexam?exam=fmge' },
                    { name: 'MCI', url: 'https://www.nmc.org.in/' },
                    { name: 'USMLE', url: 'https://www.usmle.org/' },
                    { name: 'NBE', url: 'https://natboard.edu.in/' },
                  ].map(link => (
                    <li key={link.name}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        {link.name}
                      </a>
                    </li>
                  ))}
                  <li><span onClick={() => navigate('/nursingindia')} className="hover:text-gray-300 cursor-pointer">Privacy Policy</span></li>
                  <li><span onClick={() => navigate('/pharmacyindia')} className="hover:text-gray-300 cursor-pointer">Refund Policy</span></li>
                  <li><span onClick={() => navigate('/bvScindia')} className="hover:text-gray-300 cursor-pointer">Terms and Conditions</span></li>
                </ul>
              </div>
            </div>
          </div>
      
          {/* Disclaimer */}
          <div className="text-center text-sm">
            <h3 className="text-xl font-bold mb-2">Disclaimer</h3>
            <p className="mb-2">
              All content provided is for informational purposes only. The company does not guarantee the accuracy or completeness of the information presented.
            </p>
            <p>&copy; {new Date().getFullYear()} Company Name. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      
    );
}
