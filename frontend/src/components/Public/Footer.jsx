import React, { useEffect, useState } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCountryFetchMutation, useLinkFetchMutation } from '../../slices/adminApiSlice';
import { FetchedLinked } from '../../slices/courseSlice';
import { FetchCountry } from '../../slices/countrySlice';
import Logo from '../../assets/SearchMyStudy.png';

export default function Footer({webData}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [CountryFetch] = useCountryFetchMutation();
  const [LinkFetch] = useLinkFetchMutation();
  const [extraLink, setExtraLink] = useState([]);

  // Fetch countries and links
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countryResult, linkResult] = await Promise.all([
          CountryFetch().unwrap(),
          LinkFetch().unwrap(),
        ]);
        dispatch(FetchCountry(countryResult));
        dispatch(FetchedLinked(linkResult));
        setExtraLink(linkResult);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, [CountryFetch, LinkFetch, dispatch]);

  // Fetch website details

  const importantLinks = [
    { name: 'WDOMS', url: 'https://www.wdoms.org/' },
    { name: 'NMC', url: 'https://www.nmc.org.in/' },
    { name: 'NEET', url: 'https://neet.nta.nic.in/' },
    { name: 'FMGE', url: 'https://natboard.edu.in/viewnbeexam?exam=fmge' },
    { name: 'MCI', url: 'https://www.nmc.org.in/' },
    { name: 'USMLE', url: 'https://www.usmle.org/' },
    { name: 'NBE', url: 'https://natboard.edu.in/' },
  ];

  const policyLinks = [
    { name: 'Privacy Policy', path: '/nursingindia' },
    { name: 'Refund Policy', path: '/pharmacyindia' },
    { name: 'Terms and Conditions', path: '/bvScindia' },
  ];

  const servicesLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/aboutus' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contactus' },
  ];

  const socialLinks = [
    { icon: FacebookIcon, url: webData?.facebook },
    { icon: TwitterIcon, url: webData?.twitter },
    { icon: InstagramIcon, url: webData?.insta },
    { icon: LinkedInIcon, url: webData?.linkedIn },
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-gray-100">
      <div className="container mx-auto px-4">
        {/* Top Section - Contact Info & Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-blue-700">
          {/* Logo & Brand */}
          <div className="flex flex-col items-start space-y-4">
            <img src={Logo} alt="SearchMyStudy Logo" className="h-12 w-auto" />
            <p className="text-sm text-gray-300">
              Guiding your path to excellence in education abroad.
            </p>
          </div>

          {/* Head Office */}
          <div>
            <h4 className="text-lg font-bold text-white mb-3">Head Office</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {webData?.address || 'Address information loading...'}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-bold text-white mb-3">Contact</h4>
            <ul className="space-y-3 text-sm">
              {webData?.mail && (
                <li className="flex items-start gap-2">
                  <EmailOutlinedIcon className="mt-0.5 flex-shrink-0" fontSize="small" />
                  <a
                    href={`mailto:${webData.mail}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {webData.mail}
                  </a>
                </li>
              )}
              {webData?.call_no && (
                <li className="flex items-start gap-2">
                  <PhoneOutlinedIcon className="mt-0.5 flex-shrink-0" fontSize="small" />
                  <a
                    href={`tel:${webData.call_no}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {webData.call_no}
                  </a>
                </li>
              )}
              {webData?.counselling_no && (
                <li className="flex items-start gap-2">
                  <PhoneOutlinedIcon className="mt-0.5 flex-shrink-0" fontSize="small" />
                  <a
                    href={`tel:${webData.counselling_no}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {webData.counselling_no}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-3">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return social.url ? (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 px-[11px] bg-blue-800 hover:bg-blue-700 rounded-full transition-colors"
                    aria-label="Social link"
                  >
                    <Icon fontSize="small" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="py-12 border-b border-blue-700">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Quick Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Services */}
            <div>
              <h5 className="font-semibold text-white mb-4">Services</h5>
              <ul className="space-y-2 text-sm">
                {servicesLinks.map((link) => (
                  <li key={link.name}>
                    <span
                      onClick={() => navigate(link.path)}
                      className="text-gray-300 hover:text-white cursor-pointer transition-colors"
                    >
                      {link.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links */}
            <div>
              <h5 className="font-semibold text-white mb-4">Important Links</h5>
              <ul className="space-y-2 text-sm">
                {importantLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h5 className="font-semibold text-white mb-4">Policies</h5>
              <ul className="space-y-2 text-sm">
                {policyLinks.map((link) => (
                  <li key={link.name}>
                    <span
                      onClick={() => navigate(link.path)}
                      className="text-gray-300 hover:text-white cursor-pointer transition-colors"
                    >
                      {link.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Disclaimer & Copyright */}
        <div className="py-8 space-y-4">
          <div className="text-center text-sm text-gray-300">
            <p className="mb-3">
              All content provided is for informational purposes only. We do not guarantee the accuracy
              or completeness of the information presented.
            </p>
            <p className="border-t border-blue-700 pt-4">
              &copy; {new Date().getFullYear()} SearchMyStudy. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
