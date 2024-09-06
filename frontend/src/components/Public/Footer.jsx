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
export default function Footer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [CountryFetch, { isSuccess }] = useCountryFetchMutation();
    const [LinkFetch] = useLinkFetchMutation();
    const [extraLink,setExtraLink] = useState()
    const { countries } = useSelector((state) => state.country);

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

    return (
        <footer className="bg-blue-main text-white py-10">
            <div className="mx-[100px] space-y-10">

                {/* Section 1: Head Office and Contact Info */}
                <div className="grid grid-cols-1 gap-8 border-b border-white pb-8">
                    {/* Row 1: Head Office */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className='text-center'>
                        <h3 className="text-2xl font-bold mb-4">LOGO</h3>
                    </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Head Office</h3>
                            <p> Plot no 34,  Dwarka Mor <br></br> Metro Station, Uttam Nagar,<br></br>Delhi,Pincode – 110059</p>
                        </div>

                        <div className='flex flex-col space-y-6'>
                            <div>
                                <h4 className="text-2xl font-bold mb-2">Emails:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <EmailOutlinedIcon className="mr-2" />
                                        <a href="mailto:info@company.com" className="hover:text-gray-300">info@company.com</a>
                                    </li>
                                    <li className="flex items-center">
                                        <EmailOutlinedIcon className="mr-2" />
                                        <a href="mailto:support@company.com" className="hover:text-gray-300">support@company.com</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold mb-2">Phone Numbers:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <PhoneOutlinedIcon className="mr-2" />
                                        <a href="tel:+1234567890" className="hover:text-gray-300">+1 234 567 890</a>
                                    </li>
                                    <li className="flex items-center">
                                        <PhoneOutlinedIcon className="mr-2" />
                                        <a href="tel:+0987654321" className="hover:text-gray-300">+0 987 654 321</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex flex-col mt-4">
                            <h4 className="text-2xl font-bold mb-2">Socials</h4>
                            <div className='flex flex-row space-x-5'>
                                <a href="https://facebook.com" className="hover:text-gray-300" aria-label="Facebook">
                                    <FacebookIcon fontSize="large" />
                                </a>
                                <a href="https://twitter.com" className="hover:text-gray-300" aria-label="Twitter">
                                    <TwitterIcon fontSize="large" />
                                </a>
                                <a href="https://instagram.com" className="hover:text-gray-300" aria-label="Instagram">
                                    <InstagramIcon fontSize="large" />
                                </a>
                                <a href="https://instagram.com" className="hover:text-gray-300" aria-label="LinkedIn">
                                    <LinkedInIcon fontSize="large" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Cities and Branches */}
                    {/* <div className="mt-8">
                        <h4 className="text-2xl font-bold mb-2">Cities We Are In:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <h4 className="font-semibold mb-2">City 1</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <PhoneOutlinedIcon className="mr-2" />
                                        <a href="tel:+1234567890" className="hover:text-gray-300">+1 234 567 890</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">City 2</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <PhoneOutlinedIcon className="mr-2" />
                                        <a href="tel:+0987654321" className="hover:text-gray-300">+0 987 654 321</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">City 3</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <PhoneOutlinedIcon className="mr-2" />
                                        <a href="tel:+0198765432" className="hover:text-gray-300">+0 198 765 432</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Section 2: Quick Links */}
                <div className="grid grid-cols-1 border-b border-white pb-8">
                    <div className='text-center'>
                        <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                        <div>
                            <h4 className="text-xl font-semibold mb-4">Explore Our Services</h4>
                            <ul className="space-y-2">
                                <li><span onClick={() => navigate('/')} className="hover:text-gray-300">Home</span></li>
                                <li><span onClick={() => navigate('/aboutus')} className="hover:text-gray-300">About Us</span></li>
                                <li><span onClick={() => navigate('/services')} className="hover:text-gray-300">Services</span></li>
                                <li><span onClick={() => navigate('/blog')} className="hover:text-gray-300">Blog</span></li>
                                <li><span onClick={() => navigate('/contactus')} className="hover:text-gray-300">Contact Us</span></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-4">Study Abroad</h4>
                            <ul className="space-y-2">
                                {countries.map((items) => (
                                    <li key={items._id}>
                                        <span onClick={() => navigate(`/country/${items._id}`)} className="hover:text-gray-300">{items.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <h4 className="text-xl font-semibold mb-4">Medical in India</h4>

                            <ul className="space-y-2">
                                <li><span onClick={() => navigate('/mbbsindia')} className="hover:text-gray-300 cursor-pointer">MBBS in India</span></li>
                                <li><span onClick={() => navigate('/mdindia')} className="hover:text-gray-300 cursor-pointer">MD in India</span></li>
                                <li><span onClick={() => navigate('/bamsindia')} className="hover:text-gray-300 cursor-pointer">BAMS in India</span></li>
                                <li><span onClick={() => navigate('/bhmsindia')} className="hover:text-gray-300 cursor-pointer">BHMS in India</span></li>
                                <li><span onClick={() => navigate('/bdsindia')} className="hover:text-gray-300 cursor-pointer">BDS in India</span></li>
                                <li><span onClick={() => navigate('/nursingindia')} className="hover:text-gray-300 cursor-pointer">NURSING in India</span></li>
                                <li><span onClick={() => navigate('/pharmacyindia')} className="hover:text-gray-300 cursor-pointer">PHARMACY in India</span></li>
                                <li><span onClick={() => navigate('/bvScindia')} className="hover:text-gray-300 cursor-pointer">Bv Sc in India</span></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-4">MBBS Abroad</h4>
                            <ul className="space-y-2">
                            <li><a href='https://www.wdoms.org/' target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 cursor-pointer">WDOMS</a></li>
                                <li><a href='https://www.nmc.org.in/' target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 cursor-pointer">NMC</a></li>
                                <li><a href='https://neet.nta.nic.in/' target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 cursor-pointer">NEET</a></li>
                                <li><a href='https://natboard.edu.in/viewnbeexam?exam=fmge' target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 cursor-pointer">FMGE</a></li>
                                <li><a href='https://www.nmc.org.in/' target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 cursor-pointer">MCI</a></li>
                                <li><a href='https://www.usmle.org/' target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 cursor-pointer">USMLE</a></li>
                                <li><a href='https://natboard.edu.in/' target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 cursor-pointer">NBE</a></li>

                                <li><span onClick={() => navigate('/nursingindia')} className="hover:text-gray-300 cursor-pointer">Privacy Policy</span></li>
                                <li><span onClick={() => navigate('/pharmacyindia')} className="hover:text-gray-300 cursor-pointer">Refund Policy</span></li>
                                <li><span onClick={() => navigate('/bvScindia')} className="hover:text-gray-300 cursor-pointer">Terms and Condition</span></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-4">Important Links</h4>
                            <ul className="space-y-2">
                                {extraLink?.map((items) => (
                                    <li key={items._id}>
                                        <span onClick={() => navigate(`/country/${items._id}`)} className="hover:text-gray-300">{`MMBS in ${items.name}`}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Disclaimer Section */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Disclaimer</h3>
                    <p className="mb-4">
                        All content provided is for informational purposes only. The company does not guarantee the accuracy or completeness of the information presented.
                    </p>
                    <p className="text-sm">&copy; {new Date().getFullYear()} Company Name. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
