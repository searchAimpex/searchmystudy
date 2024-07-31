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

const initialLinks = [
    {
        name: "HOME",
        submenu: false,
        sublinks: [],
        path: "/"
    },
    {
        name: "SERVICE",
        submenu: true,
        sublinks: [],
        path: "/services" // Initially empty, will be populated dynamically
    },
    {
        name: "STUDY ABROAD",
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
        sublinks: []
    },
    {
        name: "BLOG",
        submenu: false,
        sublinks: [],
        path: "/blog"
    },
    {
        name: "ABOUT US",
        submenu: false,
        sublinks: [],
        path: "/about-us"
    },
    {
        name: "CONTACT US",
        submenu: false,
        sublinks: [],
        path: "/contact-us"
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
                <div className="w-full">
                    <div className="flex px-[50px] p-2 flex-row w-full items-center justify-between bg-custom-primary">
                        <div className="flex items-center text-sm space-x-4">
                            <button className="text-custom-color font-bold py-1 px-2 shadow-xl rounded-lg bg-white">
                                APPLY ONLINE
                            </button>
                            <button className="text-custom-color font-bold py-1 px-2 shadow-xl rounded-lg bg-white">
                                REQUEST A CALLBACK
                            </button>
                        </div>
                        <div className="flex items-center space-x-4 text-white">
                            <FaFacebook />
                            <FaTwitter />
                            <FaInstagramSquare />
                            <FaLinkedin />
                        </div>
                    </div>
                </div>

                {/* Middle section with logo */}
                <div className="flex justify-between w-full px-[50px] items-center px-6 py-3">
                    <div>
                        <span className="text-custom-color text-3xl border rounded-sm p-2">
                            AIMPEX PVT
                        </span>
                        <div className="text-3xl md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </div>
                    </div>
                    <div className="flex items-center space-x-8">
                        <LiveCounselling />
                        <CallUs />
                        <WhatappUs />
                        <DownloadApp />
                    </div>
                </div>

                {/* Links section */}
                <div className="flex justify-between items-center w-full px-[50px] py-4 bg-gray-100">
                    <ul className="flex space-x-8 font-bold uppercase">
                        {menuLinks.map((link) => (
                            <div key={link.name} className="relative text-left md:cursor-pointer group">
                                {link.path ? (
                                    <Link to={link.path}>
                                        <h1
                                            className="py-2 text-custom-color flex justify-start items-center md:pr-0 pr-5 group"
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
                                    </Link>
                                ) : (
                                    <h1
                                        className="py-2 text-custom-color flex justify-start items-center md:pr-0 pr-5 group"
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
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-custom-color transition duration-300 ease-in-out"
                        />
                        <button
                            onClick={handleSearch}
                            className="text-custom-color font-bold py-2 px-4 shadow-xl rounded-lg bg-white hover:bg-custom-color hover:text-white transition duration-300 ease-in-out"
                        >
                            Search
                        </button>
                        <button
                            className="text-custom-color font-bold py-2 px-4 shadow-xl rounded-lg bg-white hover:bg-custom-color hover:text-white transition duration-300 ease-in-out"
                            onClick={() => navigate('/login')}
                        >
                            LOGIN
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
        </div>
    );
}
