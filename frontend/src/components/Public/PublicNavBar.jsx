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
import contact from "../../assets/contact.png";
import about from "../../assets/about.png";
import blog from "../../assets/blog.png";
// import Logo from "../../assets/SearchMyStudy.png";
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
import { FetchedLinked } from "../../slices/courseSlice";

const initialLinks = [
    // {
    //     name: "HOME",
    //     submenu:false,

    //     path: '/'
    // },
    {
        name: "RESOURCES",
        submenu: true,
        sublinks: [
            { name: "ABOUT US", link: "/aboutus", path: "/aboutus",flagURL:about },
            { name: "BLOG", link: "/blog", path: "/blog" ,flagURL:blog},
            { name: "CONTACT US", link: "/contactus", path: "/contactus",flagURL:contact },
        ]
    }, {
        name: "MEDICAL STUDY IN ABROAD",
        submenu: true,
        sublinks: [
            { name: "ABOUT US", link: "/aboutus", path: "/aboutus",flagURL:about },
            { name: "BLOG", link: "/blog", path: "/blog" ,flagURL:blog},
            { name: "CONTACT US", link: "/contactus", path: "/contactus",flagURL:contact },
        ]
    },
    {
        name: "MEDICAL STUDY IN INDIA",
        submenu: true,
        sublinks: [
            { name: "MBBS", link: "/mbbsindia", path: "/mbbsindia", flagURL: "https://imgur.com/0L7BLOw.png" },
            { name: "MD", link: "/mdindia", path: "/mdindia", flagURL: "https://imgur.com/0L7BLOw.png" },

            { name: "BAMS", link: "/bamsindia", path: "/bamsindia", flagURL: "https://imgur.com/0L7BLOw.png" },

            { name: "BHMS", link: "/bhmsindia", path: "/bhmsindia", flagURL: "https://imgur.com/0L7BLOw.png" },

            { name: "BDS", link: "/bdsindia", path: "/bdsindia", flagURL: "https://imgur.com/0L7BLOw.png" },

            { name: "NURSING", link: "/nursingindia", path: "/nursingindia", flagURL: "https://imgur.com/0L7BLOw.png" },

            { name: "PHARMACY", link: "/pharmacyindia", path: "/pharmacyindia", flagURL: "https://imgur.com/0L7BLOw.png" },

            { name: "Bv Sc", link: "/bvScindia", path: "/bvScindia", flagURL: "https://imgur.com/0L7BLOw.png" }

        ]
    },



    // {
    //     name: "MEDICAL STUDY",
    //     submenu: true,
    //     tabs: [
    //         {
    //             name: "INDIA", sublinks: [
    //                 { name: "MBBS", link: "/mbbsindia", path: "/mbbsindia", flagURL: "https://imgur.com/0L7BLOw.png" },
    //                 { name: "MD", link: "/mdindia", path: "/mdindia", flagURL: "https://imgur.com/0L7BLOw.png" },

    //                 { name: "BAMS", link: "/bamsindia", path: "/bamsindia", flagURL: "https://imgur.com/0L7BLOw.png" },

    //                 { name: "BHMS", link: "/bhmsindia", path: "/bhmsindia", flagURL: "https://imgur.com/0L7BLOw.png" },

    //                 { name: "BDS", link: "/bdsindia", path: "/bdsindia", flagURL: "https://imgur.com/0L7BLOw.png" },

    //                 { name: "NURSING", link: "/nursingindia", path: "/nursingindia", flagURL: "https://imgur.com/0L7BLOw.png" },

    //                 { name: "PHARMACY", link: "/pharmacyindia", path: "/pharmacyindia", flagURL: "https://imgur.com/0L7BLOw.png" },

    //                 { name: "Bv Sc", link: "/bvScindia", path: "/bvScindia", flagURL: "https://imgur.com/0L7BLOw.png" }

    //             ]
    //         },
    //         { name: "ABROAD", sublinks: [
    //             { name: "MBBS", link: "/mbbsindia", path: "/mbbsindia", flagURL: "https://imgur.com/0L7BLOw.png" },
    //             { name: "MD", link: "/mdindia", path: "/mdindia", flagURL: "https://imgur.com/0L7BLOw.png" }
    //         ] },
    //     ],
    // },
    {
        name: "ABROAD STUDY",
        submenu: true,
        sublinks: [],
        path: '/country'
    },

    { name: "SERVICE", link: "/services", path: "/services" },

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

    // const handleTabChange = (event, newValue) => {
    //     setTabValue(newValue);
    // };
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
                                link: `/service/${service._id}`,
                                flagURL: service.card.cardImage
                            }))
                        };
                    } else if (link.name === "ABROAD STUDY") {
                        return {
                            ...link,
                            sublinks: countryResult
                              .filter(country => country.hasOwnProperty('mbbsAbroad') && country.mbbsAbroad == false)
                              .map(country => ({
                                name: country.name,
                                link: `/country/${country._id}`,
                                flagURL: country.flagURL
                              }))
                          };
                          
                    }else if(link.name === "MEDICAL STUDY IN ABROAD"){
                        return {
                            ...link,
                            sublinks: linkResult.map(item => ({
                                name: `${item.name}`,
                                link: `/MbbsCountryDetailed/${item._id}`,
                                flagURL: item.flagURL ? item?.flagURL : "https://i.imgur.com/0L7BLOw.png"
                            }))
                        };
                    } 
                    else if (link.name === "MEDICAL STUDY") { 
                        const updatedTabs = link.tabs.map(tab => {
                            if (tab.name === "ABROAD") {
                                return {
                                    ...tab,
                                    sublinks: linkResult.map(item => ({
                                        name: `${item.name}`,
                                        link: `/country/${item._id}`,
                                        flagURL: item.flagURL ? item?.flagURL : "https://i.imgur.com/0L7BLOw.png"
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

    console.log("fix", menuLinks)

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            {/* Social Media Icons */}
            <div className="w-full h-[30px] flex justify-between items-center text-white px-4 space-x-4 bg-orange-910">
                {/* Address Section */}
                <div className="res flex items-center space-x-2">
                    <RoomIcon style={{ color: "white", fontSize: 20 }} />
                    <p className="text-xs sm:text-sm whitespace-nowrap">
                        Plot no 34, Dwarka Mor Metro Station, Uttam Nagar, Delhi, Pincode – 110059
                    </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-3">
                    <FaFacebook className="icon-color text-xl cursor-pointer hover:opacity-80" />
                    <FaInstagramSquare className="icon-color text-xl cursor-pointer hover:opacity-80" />
                    <FaTwitter className="icon-color text-xl cursor-pointer hover:opacity-80" />
                    <FaLinkedin className="icon-color text-xl cursor-pointer hover:opacity-80" />
                </div>
            </div>

            {/* Logo & Buttons */}
            <div className="flex flex-wrap justify-between items-center px-1 sm:px-6 lg:px-12 py-2" style={{ border: "0px solid red" }}>

                {/* Logo Section */}
                <div className="cursor-pointer" onClick={() => navigate('/')}>
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-11 sm:h-12 md:h-[50px] w-auto max-w-[130px] sm:max-w-[200px]"
                    />

                </div>

                {/* Right Section */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2 md:mt-0">

                    {/* Get Counselling */}
                    <a
                        onClick={() => { navigate('/counseller') }}
                        rel="noopener noreferrer"
                        className="h-11 sm:h-12 md:h-[50px] w-auto max-w-[140px] sm:max-w-[200px] border-2 border-red-600 rounded-lg flex items-center px-2 hover:scale-105 transition-transform duration-500 hover:shadow-lg cursor-pointer group"
                    >
                        {/* Icon with shake effect on hover */}
                        <HeadsetMicOutlinedIcon className="shakable-icon text-red-600 text-xl sm:text-2xl" style={{ fontSize: "35px" }} />
                        <p className="ml-2 text-sm sm:text-base font-bold text-red-600">Get Counselling</p>
                    </a>


                    <div className="res h-10 w-[0.5px] bg-gray mx-4" style={{ backgroundColor: "#cccccc" }}></div>

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

                    <div className="res h-10 w-[0.5px] bg-gray mx-4" style={{ backgroundColor: "#cccccc" }}></div>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/8400770308?text=Hello%2C%20I%20am%20interested%20in%20your%20university%20admission%20services.%20Can%20you%20please%20provide%20more%20details%3F" target="_blank"

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

            <div className="border-t h-[40px] text-white px-[20px]   ">
                <div className="flex justify-between items-center">

                    {/* Hamburger Icon for Mobile */}
                    <div className="text-gray text-2xl md:hidden">
                        <IconButton onClick={() => setIsOpen(true)} color="inherit">
                            <Menu className="text-black text-2xl" />
                        </IconButton>
                    </div>

                        <ul className="hidden md:flex">
                            {menuLinks?.map((link, index) => (
                                <li
                                    key={link.name}
                                    className="relative flex items-center text-left md:cursor-pointer group px-4 border-l border-500 first:border-none"
                                >
                                    {link.path ? (
                                        <Link to={link.path}>
                                            <h1
                                                className="text-sm text-text-color flex justify-start items-center group"
                                                onClick={() => {
                                                    heading !== link.name ? setHeading(link.name) : setHeading("");
                                                    setSubHeading("");
                                                }}
                                            >
                                                {link.name}
                                            
                                            </h1>
                                        </Link>
                                    ) : (
                                        <h1
                                            className="py-2 text-sm text-text-color flex justify-start items-center group"
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

                                    {/* Submenu */}
                                    {link?.submenu && (
                                        <div className=" absolute top-7  mx-12  hidden w-[800px] z-[50] group-hover:md:block hover:md:block">
                                            <div className="py-3">
                                                <div className="w-4 h-4 left-7 absolute mt-1 bg-white rotate-45"></div>
                                            </div>
                                            <div className="  myshadow bg-white w-[500px] p-5
                                            grid grid-cols-3 gap-6">
                                                {link.sublinks?.map((sublink, index) => (
                                                    <div key={index}>
                                                        <li className="font-semibold text-x text-gray-600 my-2.5">
                                                            <Link
                                                                to={sublink.link}
                                                                className="hover:bg-blue-100 rounded-md p-2 space-x-2 flex flex-row"
                                                            >
                                                                <img
                                                                    className="object-contained h-[25px] w-[25px]"
                                                                    src={sublink?.flagURL}
                                                                />
                                                                <h5>{sublink?.name}</h5>
                                                            </Link>
                                                        </li>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Special MEDICAL STUDY submenu */}
                                    {link.name === "MEDICAL STUDY" && (
                                        <div style={{ border: "0px solid red" }} className="myshadow absolute top-12 my-1 mx-9 hidden w-[800px] z-[50] bg-white group-hover:md:block hover:md:block">
                                            <Tabs
                                                value={tabValue}
                                                onChange={handleTabChange}
                                                aria-label="medical tabs"
                                                className="p-5 space-between"
                                            >
                                                {link.tabs.map((tab, index) => (
                                                    <Tab className="text-xs font-bold" key={index} label={tab.name} />
                                                ))}
                                            </Tabs>
                                            <div className="p-5 grid grid-cols-4 gap-4">
                                                {link.tabs[tabValue]?.sublinks.map((sublink, index) => (
                                                    <div key={index}>
                                                        <li className="text-xs hover:bg-blue-100 p-2 rounded-md text-gray-600 my-2.5">
                                                            <Link to={sublink.link} className="flex space-x-2 flex-row">
                                                            <img
                                                                    className="object-contained h-[25px] w-[25px]"
                                                                    src={sublink?.flagURL}
                                                                />
                                                                <span>{sublink?.name}</span>
                                                            </Link>
                                                        </li>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>


                    {/* Login Button */}
                    <div className="">
                        <button onClick={() => navigate('/Signin')} className="px-3 py-1 text-sm text-white font-bold rounded-lg bg-blue-500 hover:bg-blue-600 transition">
                            LOGIN
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer Menu */}
               {/* Mobile Drawer Menu */}
               <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
  <div className="flex justify-end p-2">
    <IconButton onClick={() => setIsOpen(false)}>
      <Close />
    </IconButton>
  </div>

  <div className="p-4 w-[250px]">
    {menuLinks?.map((link, index) => (
      <Accordion
        key={index}
        expanded={expanded === index}
        onChange={handleAccordionToggle(index)}
      >
        <AccordionSummary
          expandIcon={expanded === index ? <ExpandLess /> : <ExpandMore />}
        >
          <Typography>{link.name}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          {/* MEDICAL STUDY with Tabs */}
          {link.name === "MEDICAL STUDY" ? (
            <>
              <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                {link.tabs.map((tab, i) => (
                  <Tab key={i} label={tab.name} />
                ))}
              </Tabs>

              <div className="mt-3">
                {link.tabs[tabValue]?.sublinks?.map((sublink, i) => (
                  <Link
                    key={i}
                    to={sublink.link}
                    className="flex items-center gap-2 py-1 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <img
                      src={sublink.flagURL || "https://i.imgur.com/0L7BLOw.png"}
                      alt="flag"
                      className="h-[20px] w-[20px] object-contain rounded"
                    />
                    <span>{sublink.name}</span>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            // Other Links with Submenu
            link.sublinks?.map((sublink, i) => (
              <Link
                key={i}
                to={sublink.link}
                className="flex items-center gap-2 py-1 text-sm"
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={sublink.flagURL || "https://i.imgur.com/0L7BLOw.png"}
                  alt="flag"
                  className="h-[20px] w-[20px] object-contain rounded"
                />
                <span>{sublink.name}</span>
              </Link>
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



