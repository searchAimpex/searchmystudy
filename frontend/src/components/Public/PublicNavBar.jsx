import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { useCountryFetchMutation, useLinkFetchMutation, useServiceFetchAllMutation } from "../../slices/adminApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllServices } from "../../slices/serviceSlice";
import { FetchCountry } from "../../slices/countrySlice";
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import LiveCounselling from "../Buttons/LiveCounselling";
import CallUs from "../Buttons/CallUs";
import WhatappUs from "../Buttons/WhatappUs";
import DownloadApp from "../Buttons/DownloadApp";
import Logo from "../../assets/NewLogo.png";
import CounsellingModal from "./PopUp/CounsellingModal";
import { Tabs, Tab } from '@mui/material';
import { FetchedLinked } from "../../slices/courseSlice";

const initialLinks = [
    {
        name: "ABROAD",
        submenu: true,
        sublinks: []
    },
    {
        name: "MEDICAL",
        submenu: true,
        tabs: [
            { name: "INDIA", sublinks: [] },
            { name: "ABROAD", sublinks: [] },
        ],
    },
    {
        name: "COUNTRIES",
        submenu: true,
        sublinks: [],
        path: '/country'
    },
    {
        name: "RESOURCES",
        submenu: true,
        sublinks: [
            { name: "ABOUT US", link: "/aboutus", path: "/aboutus" },
            { name: "BLOG", link: "/blog", path: "/blog" },
            { name: "SERVICE", link: "/services", path: "/services" },
            { name: "CONTACT US", link: "/contactus", path: "/contactus" },
        ]
    }
];

export default function PublicNavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ServiceFetchAll] = useServiceFetchAllMutation();
    const [CountryFetch] = useCountryFetchMutation();
    const [LinkFetch] = useLinkFetchMutation();
    const { services } = useSelector((state) => state.service);
    const { countries } = useSelector((state) => state.country);

    const [open, setOpen] = useState(false);
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [menuLinks, setMenuLinks] = useState(initialLinks);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    console.log("Menu link",menuLinks)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceResult = await ServiceFetchAll().unwrap();
                dispatch(FetchAllServices(serviceResult));
    
                const countryResult = await CountryFetch().unwrap();
                dispatch(FetchCountry(countryResult));
    
                const linkResult = await LinkFetch().unwrap();
                dispatch(FetchedLinked(linkResult));
    
                const updatedLinks = menuLinks.map(link => {
                    if (link.name === "SERVICE") {
                        return {
                            ...link,
                            sublinks: serviceResult.map(service => ({
                                name: service.title,
                                link: `/service/${service._id}`,
                                flagURL: service.card.cardImage
                            }))
                        };
                    } else if (link.name === "COUNTRIES") {
                        return {
                            ...link,
                            sublinks: countryResult.map(country => ({
                                name: country.name,
                                link: `/country/${country._id}`,
                                flagURL: country.flagURL
                            }))
                        };
                    } else if (link.name === "MEDICAL") {
                        const updatedTabs = link.tabs.map(tab => {
                            if (tab.name === "INDIA") {
                                return {
                                    ...tab,
                                    sublinks: linkResult.map(item => ({
                                        name: `${item.ProgramName} in ${item.Location}`,
                                        link: `/course/${item._id}`,
                                        flagURL: item.flagURL
                                    }))
                                };
                            }
                            // Ensure that 'ABROAD' tab remains unchanged
                            return tab;
                        });
                        return {
                            ...link,
                            tabs: updatedTabs
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
    }, [ServiceFetchAll, CountryFetch, LinkFetch, dispatch]);
    
    console.log("fix",menuLinks)

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            <div className="flex w-full flex-col">
                {/* Top section with social media icons */}
                <div className="bg-gold-main h-[30px] w-full flex flex-row items-center justify-end text-white space-x-4 px-[50px]">
                    <FaFacebook />
                    <FaInstagramSquare />
                    <FaTwitter />
                    <FaLinkedin />
                </div>

                {/* Middle section with logo and links */}
                <div className="flex space-x-10 w-full px-[50px] py-2">
                    <div className="flex flex-row space-x-6 w-full">
                        <div className="border cursor-pointer" onClick={() => navigate('/')}>
                            <img src={Logo} alt="Logo" />
                        </div>
                        <ul className="flex space-x-8 font-bold uppercase">
                            {menuLinks?.map((link) => (
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
                                    {link.name === "MEDICAL" && (
                                        <div className="absolute top-10 hidden w-[800px] z-[50] bg-white group-hover:md:block hover:md:block">
                                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="medical tabs" className="p-5">
                                                {link.tabs.map((tab, index) => (
                                                    <Tab key={index} label={tab.name} />
                                                ))}
                                            </Tabs>
                                            <div className="p-5 grid grid-cols-4 gap-4">
                                                {link.tabs[tabValue]?.sublinks.map((sublink, index) => (
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

                 
                </div>
            </div>

            {/* Counselling Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <CounsellingModal onClose={() => setIsModalOpen(false)} />
                </div>
            )}
        </div>
    );
}
