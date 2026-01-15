import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { useCountryFetchMutation, useLinkFetchMutation, useServiceFetchAllMutation } from "../../slices/adminApiSlice";
import { useDispatch, useSelector } from "react-redux";
import CallIcon from '@mui/icons-material/Call';
import { FetchAllServices } from "../../slices/serviceSlice";
import { FetchCountry } from "../../slices/countrySlice";
import Logo from "../../assets/SearchMyStudy.png";
import contact from "../../assets/contact.png";
import about from "../../assets/about.png";
import india_flag from "../../assets/india_flag.png";
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
import { m } from "framer-motion";

const initialLinks = [
    {
        name: "MEDICAL STUDY IN INDIA",
        submenu: true,
        sublinks: [
            { name: "MBBS", link: "/mbbsindia", path: "/mbbsindia", flagURL: india_flag },
            { name: "MD", link: "/mdindia", path: "/mdindia", flagURL: india_flag },

            { name: "BAMS", link: "/bamsindia", path: "/bamsindia", flagURL: india_flag },

            { name: "BHMS", link: "/bhmsindia", path: "/bhmsindia", flagURL: india_flag },

            { name: "BDS", link: "/bdsindia", path: "/bdsindia", flagURL: india_flag },

            { name: "NURSING", link: "/nursingindia", path: "/nursingindia", flagURL: india_flag },

            { name: "PHARMACY", link: "/pharmacyindia", path: "/pharmacyindia", flagURL: india_flag },

            { name: "Bv Sc", link: "/bvScindia", path: "/bvScindia", flagURL: india_flag }

        ]
    },
   
    {
        name: "MEDICAL STUDY IN ABROAD",
        submenu: true,
        sublinks: [

        ]
    },
    , {
        name: "OVERSEASE STUDY",
        submenu: true,
        sublinks: [],
        path: '/country'
    },
    , { name: "OUR SERVICE", link: "/services", path: "/services" },

    {
        name: "OUR RESOURCES",
        submenu: true,
        sublinks: [
            { name: "ABOUT US", link: "/aboutus", path: "/aboutus", flagURL: about },
            { name: "BLOG", link: "/blog", path: "/blog", flagURL: blog },
            { name: "CONTACT US", link: "/contactus", path: "/contactus", flagURL: contact },
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
    const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    //   console.log("Fetched countries:", countryResult);

      const filteredCountries = countryResult.filter(item => item.mbbsAbroad !== true);

      const linkResult = await LinkFetch().unwrap();
      dispatch(FetchedLinked(linkResult));

      const updatedLinks = initialLinks.map(link => {
        switch (link.name) {
          case "OUR SERVICE":
            return {
              ...link,
              sublinks: serviceResult.map(service => ({
                name: service.title,
                link: `/service/${service._id}`,
                flagURL: service.card?.cardImage || ""
              }))
            };

          case "OVERSEASE STUDY":
            return {
              ...link,
              sublinks: filteredCountries.map(country => ({
                name: country.name,
                link: `/country/${country._id}`,
                flagURL: country.flagURL
              }))
            };

          case "MEDICAL STUDY IN ABROAD":
            return {
              ...link,
              sublinks: linkResult.map(item => ({
                name: item.name,
                link: `/MbbsCountryDetailed/${item._id}`,
                flagURL: item.flagURL || "https://i.imgur.com/0L7BLOw.png"
              }))
            };

          default:
            return link;
        }
      });

      setMenuLinks(updatedLinks);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  fetchData();
}, [ServiceFetchAll, CountryFetch, LinkFetch, dispatch]);
    // console.log("fix", menuLinks)

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

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
    
  console.log(data[0],"+++++++++++++++++++++   ")
    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            {/* Social Media Icons */}
            <div className="w-full h-[30px] flex justify-between items-center text-white px-4 space-x-4 bg-orange-910">
                {/* Address Section */}
                <div className="res flex items-center space-x-2">
                    <RoomIcon style={{ color: "white", fontSize: 20 }} />
                    <p className="text-xs sm:text-sm whitespace-nowrap">
{data?.map((ele) => {
    return <span key={ele._id}>{ele?.address}</span>;
})}

                    </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-3">
                    <a target="blank" href="https://www.facebook.com/profile.php?id=61578705533772">                    <FaFacebook className="icon-color text-xl cursor-pointer hover:opacity-80" />
                    </a>
                    <a target="blank" href="https://www.instagram.com/searchmystudy/">
                        <FaInstagramSquare className="icon-color text-xl cursor-pointer hover:opacity-80" />
                    </a>
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
                <div className=" flex flex-wrap items-center gap-3 md:gap-4 ">
                    <div className="">
                        <a href="https://coursefinder.co.in/">
                            <button
                                // onClick={() => navigate('/Signin')}
                                style={{ backgroundColor: '#264790' }} className="res px-4 mr-6 py-3 text-lg text-white font-bold rounded-lg hover:bg-blue-600 transition">
                                Partner Login
                            </button>
                        </a>
                    </div>
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
                        href="tel:+919266952233"
                        className="res flex items-center p-2 transition-transform duration-500 cursor-pointer group"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <CallOutlinedIcon className="text-red-600 text-2xl sm:text-3xl ring-bell" style={{ fontSize: "30px" }} />
                        <div className="ml-2">
                            <p className="text-sm sm:text-base font-semibold text-red-600">Contact Us</p>
                            <p className="text-lg font-bold text-red-600">
                                {data?.map((ele) => {
    return <span key={ele._id}>{ele?.counselling_no}</span>;
})}

                                </p>
                        </div>
                    </a>

                    <div className="res h-10 w-[0.5px] bg-gray mx-4" style={{ backgroundColor: "#cccccc" }}></div>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/9266952233?text=Hello%2C%20I%20am%20interested%20in%20your%20university%20admission%20services.%20Can%20you%20please%20provide%20more%20details%3F" target="_blank"

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
                            <p className="text-lg font-bold text-[#09953e]">
                                {data?.map((ele) => {
    return <span key={ele._id}>{ele?.whatsapp_no}</span>;
})}

                                </p>
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
                        <li>  <Link to="/" className="font-semibold text-gold-main relative flex items-center text-left md:cursor-pointer group px-4  first:border-none  mt-2">HOME</Link> </li>

                        {menuLinks?.map((link, index) => (
                            <li
                                key={link.name}
                                className="relative text-text-color flex items-center text-left md:cursor-pointer group px-4 border-l border-500 first:border-none">
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
                                            <span className="text-sm md:hidden inline flex items-center">
                                                {heading === link.name ? <ExpandMore /> : <ExpandLess />}
                                            </span>
                                            <span className="text-sm md:block hidden group-hover:rotate-180">
                                                {link?.submenu && <ExpandLess />}
                                            </span>

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
                                            {heading === link.name ? <ExpandMore /> : <ExpandLess />}
                                        </span>
                                        <span className="text-sm md:block hidden group-hover:rotate-180">
                                            {link?.submenu && <ExpandLess />}
                                        </span>
                                    </h1>
                                )}

                                {/* Submenu */}
                                {link?.submenu && (
                                    <div className=" absolute top-7  mx-12  hidden  z-[50] group-hover:md:block hover:md:block">
                                        <div className="py-3">
                                            <div className="w-4 h-4 left-7 absolute mt-1 bg-white rotate-45"></div>
                                        </div>
                                        <div className="  myshadow bg-white w-[700px] p-5
                                            grid grid-cols-3 ">
                                            {link.sublinks?.map((sublink, index) => (
                                                <div key={index}>
                                                    <li className="font-semibold text-x text-gray-600 ">
                                                        <Link
                                                            to={sublink.link}
                                                            className="hover:bg-blue-100  border-b p-2 m-1   space-x-2 flex flex-row"
                                                        >
                                                            <img
                                                                className="object-contained h-[25px] w-[25px]"
                                                                src={sublink?.flagURL}
                                                            />
                                                            <h5>
                                                                {["MBBS", "ABOUT US", "BLOG", "CONTACT US", "MD", "BAMS", "BHMS", "BDS", "NURSING", "PHARMACY", "Bv Sc"].includes(sublink?.name) ? (
                                                                    <p>{sublink?.name}</p>
                                                                ) : (
                                                                    <div>{link?.path === "/country"? "Study in ": "Mbbs in "}{sublink?.mbbsAbroad}{sublink?.name}</div>
                                                                )}
                                                            </h5>



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
                                                            <span>{sublink?.name}asdcasdc</span>

                                                        </Link>
                                                    </li>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                        {/* <li>  <Link to="/services" className="relative flex items-center text-left text-gray-600 md:cursor-pointer group px-4  border-l  border-gray-200 h-[100%] ">OUR SERVICE</Link> </li> */}

                    </ul>


                    {/* Login Button */}
                    {/* <div className="">
                        <button onClick={() => navigate('/Signin')} className="px-3 py-1 text-sm text-white font-bold rounded-lg bg-blue-500 hover:bg-blue-600 transition">
                            LOGIN
                        </button>
                    </div> */}
                </div>

                {/* Mobile Drawer Menu */}
                {/* Mobile Drawer Menu */}
                <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="flex justify-between items-center px-4 py-3">
                        <h2 className="text-lg font-semibold">Menu</h2>
                        <IconButton onClick={() => setIsOpen(false)}>
                            <Close />
                        </IconButton>
                    </div>

                    <div className="p-4 w-[280px] space-y-2">
                        <div><Link onClick={() => setIsOpen(false)} to="/" className="pl-4 font-semibold">HOME</Link></div>
                        {menuLinks?.map((link, index) => (
                            link.submenu ? (
                                <Accordion
                                    key={index}
                                    expanded={expanded === index}
                                    onChange={handleAccordionToggle(index)}
                                    disableGutters
                                    elevation={0}
                                    square
                                    sx={{
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                        '&::before': { display: 'none' },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={expanded === index ? <ExpandLess /> : <ExpandMore />}
                                        className="text-sm font-medium px-1"
                                    >
                                        {link.name}
                                    </AccordionSummary>

                                    <AccordionDetails className="space-y-1 pl-2">
                                        {link.sublinks?.map((sublink, i) => (
                                            <Link
                                                key={i}
                                                to={sublink.link}
                                                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md text-sm transition"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <img
                                                    src={sublink.flagURL || "https://i.imgur.com/0L7BLOw.png"}
                                                    alt="flag"
                                                    className="h-5 w-5 object-cover rounded-full"
                                                />
                                                <span>{sublink.name}</span>
                                            </Link>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            ) : (
                                <Link
                                    key={index}
                                    to={link.link || link.path || "/"}
                                    className="block px-2 py-2 text-sm font-medium hover:bg-gray-100 rounded-md transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {/* {link.name} */}
                                </Link>
                            )
                        ))}
                        <div><Link to="/services" onClick={() => setIsOpen(false)} className="pl-4 font-semibold">SERVICE</Link></div>
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



