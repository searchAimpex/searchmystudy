import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { useCountryFetchMutation, useLinkFetchMutation, useServiceFetchAllMutation } from "../../slices/adminApiSlice";
import { useDispatch, useSelector } from "react-redux";
import CallIcon from '@mui/icons-material/Call';
import { FetchAllServices } from "../../slices/serviceSlice";
import { FetchCountry } from "../../slices/countrySlice";
// import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Logo from "../../assets/SearchMyStudy.png";
import CounsellingModal from "./PopUp/CounsellingModal";
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RoomIcon from '@mui/icons-material/Room';
import { Tabs, Tab } from "@mui/material";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// Initial menu links
import { Menu, Close, ExpandMore, ExpandLess } from "@mui/icons-material";
import { IconButton, Drawer, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
// import { Link } from "react-router-dom";


const initialLinks = [
    {
        name: "RESOURCES",
        submenu: true,
        sublinks: [
            { name: "ABOUT US", link: "/aboutus" },
            { name: "BLOG", link: "/blog" },
            { name: "CONTACT US", link: "/contactus" },
        ]
    },
    {
        name: "MEDICAL STUDY",
        submenu: true,
        tabs: [
            {
                name: "INDIA", sublinks: [
                    { name: "MBBS", link: "/mbbsindia" },
                    { name: "MD", link: "/mdindia" },
                    { name: "BAMS", link: "/bamsindia" },
                    { name: "BHMS", link: "/bhmsindia" },
                    { name: "BDS", link: "/bdsindia" },
                    { name: "NURSING", link: "/nursingindia" },
                    { name: "PHARMACY", link: "/pharmacyindia" },
                    { name: "Bv Sc", link: "/bvScindia" }
                ]
            },
            { name: "ABROAD", sublinks: [] },
        ],
    },
    {
        name: "ABROAD STUDY",
        submenu: true,
        sublinks: [],
        path: '/country'
    },
    { name: "SERVICE", link: "/services" }
];

export default function PublicNavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ServiceFetchAll] = useServiceFetchAllMutation();
    const [CountryFetch] = useCountryFetchMutation();
    const [LinkFetch] = useLinkFetchMutation();
    const { services } = useSelector((state) => state.service);
    const { countries } = useSelector((state) => state.country);

    const [menuLinks, setMenuLinks] = useState(initialLinks);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [tabValue, setTabValue] = useState(0);

    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 875);
    const [expanded, setExpanded] = useState(null);
    // const [isOpen, setIsOpen] = useState(false);
    // const navigate = useNavigate();
    // const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleAccordionToggle = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    // useEffect(() => {
    //     const handleResize = () => setIsMobile(window.innerWidth <= 875);
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);
    // const handleAccordionToggle = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : null);
    // };

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
                                link: `/service/${service._id}`
                            }))
                        };
                    } else if (link.name === "ABROAD STUDY") {
                        return {
                            ...link,
                            sublinks: countryResult.map(country => ({
                                name: country.name,
                                link: `/country/${country._id}`
                            }))
                        };
                    } else if (link.name === "MEDICAL STUDY") {
                        const updatedTabs = link.tabs.map(tab => {
                            if (tab.name === "ABROAD") {
                                return {
                                    ...tab,
                                    sublinks: linkResult.map(item => ({
                                        name: item.name,
                                        link: `/country/${item._id}`
                                    }))
                                };
                            }
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

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            {/* Social Media Icons */}
            <div className="bg-gold-main h-[30px] flex justify-between items-center text-white px-[20px] space-x-4">
                {/* Address Section */}
                <div className="flex items-center space-x-2">
                    <RoomIcon style={{ color: "white", fontSize: 20 }} />
                    <p className="text-sm">
                        Plot no 34, Dwarka Mor Metro Station, Uttam Nagar, Delhi, Pincode – 110059
                    </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-3">
                    <FaFacebook className="text-white text-lg cursor-pointer hover:text-gray-300" />
                    <FaInstagramSquare className="text-white text-lg cursor-pointer hover:text-gray-300" />
                    <FaTwitter className="text-white text-lg cursor-pointer hover:text-gray-300" />
                    <FaLinkedin className="text-white text-lg cursor-pointer hover:text-gray-300" />
                </div>
            </div>

            {/* Logo & Buttons */}
            <div className="flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-12 ">

                {/* Logo Section */}
                <div className="cursor-pointer" onClick={() => navigate('/')}>
                    <img src={Logo} className=" sm:h-[40px] w-auto " alt="Logo" />
                </div>

                {/* Right Section */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2 md:mt-0">

                    {/* Get Counselling */}
                    <a
                       href="tel:+918400770308" 
                        rel="noopener noreferrer"
                        className="sm:w-[190px] h-12 border-2 border-red-600 rounded-lg flex items-center px-2 hover:scale-105 transition-transform duration-500 hover:shadow-lg cursor-pointer group"
                    >
                        {/* Icon with shake effect on hover */}
                        <HeadsetMicOutlinedIcon className="shakable-icon text-red-600 text-xl sm:text-2xl" style={{ fontSize: "35px" }} />
                        <p className="ml-2 text-sm sm:text-base font-semibold text-red-600">Get Counselling</p>
                    </a>


                    <div className="h-10 w-[0.5px] bg-gray mx-4" style={{ backgroundColor: "#cccccc" }}></div>

                    {/* Contact Us */}
                    <a
                     href="tel:+918400770308" 
                        className="res flex items-center p-2 transition-transform duration-500 cursor-pointer group"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <CallOutlinedIcon className="text-red-600 text-2xl sm:text-3xl ring-bell" style={{ fontSize: "30px" }} />
                        <div className="ml-2">
                            <p className="text-sm sm:text-base font-semibold text-red-600">Contact Us</p>
                            <p className="text-lg font-bold text-red-600">8400770308</p>
                        </div>
                    </a>
                    <div className="h-10 w-[0.5px] bg-gray mx-4" style={{ backgroundColor: "#cccccc" }}></div>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/8400770308?text=Hello%2C%20I%20am%20interested%20in%20your%20university%20admission%20services.%20Can%20you%20please%20provide%20more%20details%3F"                        target="_blank"

                        className="res flex items-center p-2 transition-transform duration-500 cursor-pointer group"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {/* Apply class to the icon for shaking effect */}
                        <WhatsAppIcon
                            style={{ fontSize: "40px", color: "#09953e" }}
                            className="shakable-icon transition-transform duration-300"
                        />
                        <div className="ml-2">
                            <p className="text-sm sm:text-base font-semibold text-black">WhatsApp</p>
                            <p className="text-lg font-bold text-[#09953e]">8400770308</p>
                        </div>
                    </a>

                </div>
            </div>

            <div className="border-t h-[40px] text-white px-[20px] ">
                <div className="flex justify-between items-center">

                    {/* Hamburger Icon for Mobile */}
                    <div className="text-gray text-2xl md:hidden">
                        <IconButton onClick={() => setIsOpen(true)} color="inherit">
                            <Menu className="text-black text-2xl" />
                        </IconButton>
                    </div>

                    <ul className="hidden md:flex space-x-8">
                        {menuLinks?.map((link) => (
                            <div key={link.name} className="relative flex items-center text-left md:cursor-pointer group">
                                {link.path ? (
                                    <Link to={link.path}>
                                        <h1
                                            className="text-sm text-text-color flex justify-start items-center md:pr-0 pr-5 group"
                                            onClick={() => {
                                                heading !== link.name ? setHeading(link.name) : setHeading("");
                                                setSubHeading("");
                                            }}>
                                            {link.name}
                                            <span className="md:hidden inline flex items-center">
                                                {heading === link.name ? <ExpandLess /> : <ExpandMore />}
                                            </span>
                                            <span className="md:hidden flex items-center group-hover:rotate-180">
                                                {link?.submenu && <ExpandMore />}
                                            </span>
                                        </h1>
                                    </Link>
                                ) : (
                                    <h1
                                        className="py-2 text-sm text-text-color flex justify-start items-center md:pr-0 pr-5 group"
                                        onClick={() => {
                                            heading !== link.name ? setHeading(link.name) : setHeading("");
                                            setSubHeading("");
                                        }}
                                    >
                                        {link.name}
                                        <span className="text-sm md:hidden inline flex items-center">
                                            {heading === link.name ? <ExpandLess /> : <ExpandMore />}
                                        </span>
                                        <span className="text-sm md:block hidden group-hover:rotate-180">
                                            {link?.submenu && <ExpandMore />}
                                        </span>
                                    </h1>
                                )}
                                {link?.submenu && (
                                    <div className="absolute top-10 hidden w-[800px] z-[50] group-hover:md:block hover:md:block">
                                        <div className="py-3">
                                            <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                                        </div>
                                        <div className="bg-white w-[700px] p-5 grid grid-cols-3 gap-6">
                                            {link.sublinks?.map((sublink, index) => (
                                                <div key={index}>
                                                    <li className="text-xs text-gray-600 my-2.5">
                                                        <Link to={sublink.link} className="hover:bg-blue-100 rounded-md p-2 space-x-2 flex flex-row">
                                                            <img className="object-contained h-[20px] w-[20px]" src={sublink?.flagURL} />
                                                            <span>{sublink?.name}</span>
                                                        </Link>
                                                    </li>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {link.name === "MEDICAL STUDY" && (
                                    <div className="absolute top-10 hidden w-[800px] z-[50] bg-white group-hover:md:block hover:md:block">
                                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="medical tabs" className="p-5 space-between">
                                            {link.tabs.map((tab, index) => (
                                                <Tab className="text-xs font-bold" key={index} label={tab.name} />
                                            ))}
                                        </Tabs>
                                        <div className="p-5 grid grid-cols-4 gap-4">
                                            {link.tabs[tabValue]?.sublinks.map((sublink, index) => (
                                                <div key={index}>
                                                    <li className="text-xs hover:bg-blue-100 p-2 rounded-md text-gray-600 my-2.5">
                                                        <Link to={sublink.link} className="flex space-x-2 flex-row">
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

                    {/* Login Button */}
                    <div className="">
                        <button onClick={() => navigate('/login')} className="px-3 py-1 text-sm text-white font-bold rounded-lg bg-blue-500 hover:bg-blue-600 transition">
                            LOGIN
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer Menu */}
                <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="flex justify-end p-2">
                        <IconButton onClick={() => setIsOpen(false)}>
                            <Close />
                        </IconButton>
                    </div>
                    <div className="p-4 w-[250px]">
                        {initialLinks.map((link, index) => (
                            <Accordion key={index} expanded={expanded === index} onChange={handleAccordionToggle(index)}>
                                <AccordionSummary expandIcon={expanded === index ? <ExpandLess /> : <ExpandMore />}>
                                    <Typography>{link.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {link.tabs ? (
                                        <>
                                            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                                                {link.tabs.map((tab, i) => (
                                                    <Tab key={i} label={tab.name} />
                                                ))}
                                            </Tabs>
                                            <div className="mt-2">
                                                {link.tabs[tabValue]?.sublinks.map((sublink, i) => (
                                                    <div key={i}>
                                                        <Link to={sublink.link} className="block py-1 text-sm">{sublink.name}</Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        link.sublinks?.map((sublink, i) => (
                                            <div key={i}>
                                                <Link to={sublink.link} className="block py-1 text-sm">{sublink.name}</Link>
                                            </div>
                                        ))
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </Drawer>
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