import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { useCountryFetchMutation, useServiceFetchAllMutation } from "../../slices/adminApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllServices } from "../../slices/serviceSlice";
import { FetchCountry } from "../../slices/countrySlice";
import { ExpandLess, ExpandMore } from '@mui/icons-material'; // Import Material-UI icons
import LiveCounselling from "../Buttons/LiveCounselling";
import CallUs from "../Buttons/CallUs";
import WhatappUs from "../Buttons/WhatappUs";
import DownloadApp from "../Buttons/DownloadApp";
import Logo from "../../assets/NewLogo.png"
import CounsellingModal from "./PopUp/CounsellingModal";
const initialLinks = [

    {
        name: "ABROAD",
        submenu: true,
        sublinks: []
    },
    {
        name: "MEDICAL",
        submenu: true,
        sublinks: []
    },
    {
        name: "COUNTRIES",
        submenu: true,
        sublinks: [],
        path: '/country'
    },

    {
        name: "RESOURCES",
        submenu:true,
        sublinks: [
            {name: "ABOUT US", link: "/aboutus", path: "/aboutus"},
            {name: "BLOG", link: "/blog", path: "/blog"},
            {name: "SERVICE", link: "/services", path: "/services"},
            {name:"CONTACT US",link:"/contactus",path:"/contactus"},
        ]
    }
];

export default function PublicNavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ServiceFetchAll, { isSuccess: serviceSuccess, isLoading: serviceLoading }] = useServiceFetchAllMutation();
    const [CountryFetch, { isSuccess: countrySuccess, isLoading: countryLoading }] = useCountryFetchMutation();
    const { services } = useSelector((state) => state.service);
    const { countries } = useSelector((state) => state.country);

    const [open, setOpen] = useState(false);
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [menuLinks, setMenuLinks] = useState(initialLinks);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch services and countries
                const serviceResult = await ServiceFetchAll().unwrap();
                dispatch(FetchAllServices(serviceResult));

                const countryResult = await CountryFetch().unwrap();
                dispatch(FetchCountry(countryResult));

                // Update menuLinks with fetched data
                const updatedLinks = menuLinks.map(link => {
                    if (link.name === "SERVICE") {
                        return {
                            ...link,
                            sublinks: serviceResult.map(service => ({ name: service.title, link: `/service/${service._id}`,flagURL:service.card.cardImage }))
                        };
                    } else if (link.name === "COUNTRIES") {
                        return {
                            ...link,
                            sublinks: countryResult.map(country => ({ name: country.name, link: `/country/${country._id}` ,flagURL:country.flagURL}))
                        };
                    }
                    return link;
                });
                setMenuLinks(updatedLinks);             
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, [ServiceFetchAll, CountryFetch, dispatch]);

    const handleSearch = () => {
        // Implement the search functionality
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            <div className="flex w-full flex-col">
                {/* Middle section with logo */}
                <div className="bg-gold-main h-[20px] w-full flex flex-row items-center justify-end text-white space-x-4 px-[50px]">
                    <FaFacebook />
                    <FaInstagramSquare />
                    <FaTwitter />
                    <FaLinkedin />
                </div>

                {/* Links section */}
                <div className="flex space-x-10 w-full px-[50px] py-2">
                    <div className="flex flex-row space-x-6 w-full">
                    <div className="border cursor-pointer" onClick={(e)=> navigate('/')}>
                        <img src={Logo} alt="Logo" />
                    </div>
                    <ul className="flex space-x-8 font-bold uppercase">
                        {menuLinks.map((link) => (
                            <div key={link.name} className="relative flex items-center text-left md:cursor-pointer group">
                                {link.path ? (
                                    <Link to={link.path}>
                                        <h1
                                            className="py-2 font-bold text-text-color flex justify-start items-center md:pr-0 pr-5 group"
                                            onClick={() => {
                                                heading !== link.name ? setHeading(link.name) : setHeading("");
                                                setSubHeading("");
                                            }}
                                        >
                                            {link.name}
                                            <span className="text-xl md:hidden inline flex items-center">
                                                {heading === link.name ? <ExpandLess /> : <ExpandMore />}
                                            </span>
                                            <span className="text-xl md:hidden flex items-center group-hover:rotate-180">
                                                {link?.submenu && (<ExpandMore />)}
                                            </span>
                                        </h1>
                                    </Link>
                                ) : (
                                    <h1
                                        className="py-2 text-text-color flex justify-start items-center md:pr-0 pr-5 group"
                                        onClick={() => {
                                            heading !== link.name ? setHeading(link.name) : setHeading("");
                                            setSubHeading("");
                                        }}
                                    >
                                        {link.name}
                                        <span className="text-xl md:hidden inline flex items-center">
                                            {heading === link.name ? <ExpandLess /> : <ExpandMore />}
                                        </span>
                                        <span className="text-xl md:block hidden group-hover:rotate-180">
                                            {link?.submenu && (<ExpandMore />)}
                                        </span>
                                    </h1>
                                )}
                                {link?.submenu && (
                                    <div className="absolute top-10 hidden w-[800px] z-[50] group-hover:md:block hover:md:block">
                                        <div className="py-3">
                                            <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                                        </div>
                                        <div className="bg-white w-[800px] p-5 grid grid-cols-3 gap-10">
                                            {link.sublinks?.map((sublink, index) => (
                                                <div key={index}>
                                                    <li className="text-sm text-gray-600 my-2.5">
                                                        <Link to={sublink.link} className="hover:text-primary underline flex flex-row">
                                                            <img className="object-contained h-[20px] w-[20px]" src={sublink?.flagURL} /> 
                                                            <span>{sublink?.name}</span>
                                                        </Link>
                                                    </li>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </ul>
                    </div>
                    <div className="flex items-center w-full space-x-2 justify-end">
                        <button
                            className=" font-bold py-2 px-4 bg-gray-200 shadow-xl rounded-lg bg-white hover:bg-blue-main hover:text-white transition duration-300 ease-in-out"
                            onClick={() => navigate('/login')}
                        >
                            Log in
                        </button>
                        <button
                            className="bg-gray-200 font-bold  py-2 px-4 shadow-xl rounded-lg bg-white hover:bg-blue-main  hover:text-white transition duration-300 ease-in-out"
                           
                        >
                            Contact Us
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)} 
                            className="text-white bg-blue-main font-bold py-2 px-4 shadow-xl rounded-xl hover:bg-white  hover:text-blue-main transition duration-300 ease-in-out"
                        >
                            Get Counselling
                        </button>
                    </div>
                </div>

                <div className="md:block hidden force-hidden">
                    <button />
                </div>

                {/* Mobile nav */}
                <ul
                    className={`md:hidden bg-white fixed w-full top-0 overflow-y-auto h-screen transition-transform duration-300 ${open ? "transform translate-x-0" : "transform -translate-x-full"}`}
                >
                    <div className="flex justify-between items-center px-4 py-3">
                        <h1 className="text-2xl font-bold text-custom-color">
                            AIMPEX PVT
                        </h1>
                        <button onClick={() => setOpen(false)} className="text-xl text-custom-color">
                            <ExpandLess />
                        </button>
                    </div>
                    <ul className="flex flex-col space-y-4 px-4">
                        {menuLinks.map((link) => (
                            <div key={link.name} className="relative text-left md:cursor-pointer group">
                                {link.path ? (
                                    <Link to={link.path}>
                                        <h1
                                            className="py-2 text-custom-color flex justify-start items-center"
                                            onClick={() => {
                                                heading !== link.name ? setHeading(link.name) : setHeading("");
                                                setSubHeading("");
                                            }}
                                        >
                                            {link.name}
                                            <span className="text-xl inline flex items-center">
                                                {heading === link.name ? <ExpandLess /> : <ExpandMore />}
                                            </span>
                                        </h1>
                                    </Link>
                                ) : (
                                    <h1
                                        className="py-2 text-custom-color flex justify-start items-center"
                                        onClick={() => {
                                            heading !== link.name ? setHeading(link.name) : setHeading("");
                                            setSubHeading("");
                                        }}
                                    >
                                        {link.name}
                                        <span className="text-xl inline flex items-center">
                                            {heading === link.name ? <ExpandLess /> : <ExpandMore />}
                                        </span>
                                    </h1>
                                )}
                                {link?.submenu && heading === link.name && (
                                    <div className="bg-white w-full p-5">
                                        <ul className="flex flex-col space-y-4">
                                            {link.sublinks?.map((sublink, index) => (
                                                <div key={index}>
                                                    <li className="text-sm text-gray-600 my-2.5">
                                                        <Link to={sublink.link} className="hover:text-primary underline">
                                                            {sublink.name}
                                                        </Link>
                                                    </li>
                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </ul>
                </ul>
            </div>
             {/* Render the Counselling Modal */}
             <CounsellingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
