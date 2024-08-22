import React, { useRef, useState } from 'react';
import ServiceHero from '../../assets/ServiceHero.png';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HowItWorks from '../../assets/HowItWorks.png';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

const conselling = [
    {
        title: "Visa Guide",
        description: "Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        description: "Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        description: "Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        description: "Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    // Add more entries as needed
];

const recentBlogs = [
    {
        title: "How to Apply for a Student Visa",
        excerpt: "Learn the step-by-step process for applying for a student visa. This guide covers all the essential details you need to know.",
        date: "August 20, 2024",
        icon: "" // Replace with a suitable icon
    },
    {
        title: "Top Scholarships for International Students",
        excerpt: "Explore the best scholarships available for international students. This article provides valuable information on how to secure funding for your studies.",
        date: "August 15, 2024",
        icon: "" // Replace with a suitable icon
    },
    // Add more blog entries as needed
];

export default function ServiceScreen() {
    const cardRefs = useRef([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  
    const scrollToCard = (index) => {
        cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
        setSelectedCardIndex(index);
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex flex-col md:flex-row px-8 py-12 md:px-24 md:py-16 bg-blue-200'>
                <div className='md:w-1/2 flex flex-col justify-center space-y-6'>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-4xl md:text-5xl font-extrabold text-blue-main'>Discover</span>
                        <span className='text-4xl md:text-5xl font-extrabold text-gold-main'>Our</span>
                        <span className='text-4xl md:text-5xl font-extrabold text-blue-main'>Service</span>
                    </div>
                    <div>
                        <span className='text-lg md:text-xl'>Explore the range of professional services we offer to support your educational and career goals.</span>
                    </div>
                    <div>
                        <button className='px-6 py-3 bg-blue-main rounded-lg text-white font-bold hover:bg-blue-700 transition duration-300'>Get Counselling</button>
                    </div>
                </div>
                <div className='md:w-1/2 mt-8 md:mt-0'>
                    <img className='w-full h-auto object-cover rounded-lg shadow-lg' src={ServiceHero} alt="Service Hero" />
                </div>
            </div>
            
            <div className='mt-12 md:mt-16 px-8 md:px-24 flex flex-col md:flex-row'>
                <div className='md:w-2/3'>
                    {/* Quick Links Section */}
                    <div className='flex flex-wrap space-x-4 mb-8'>
                        {conselling.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToCard(index)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 ${selectedCardIndex === index ? 'bg-blue-main text-white' : 'bg-white text-blue-main border border-blue-main'} hover:bg-blue-100`}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
    
                    {/* Card Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        {conselling.map((item, index) => (
                            <div
                                key={index}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className={`flex flex-col p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${selectedCardIndex === index ? 'bg-blue-600 text-white' : 'bg-white text-blue-main border border-blue-main'} hover:shadow-xl hover:border hover:border-blue-500`}
                            >
                                <div className='flex flex-row items-center space-x-4 mb-4'>
                                    <div className='text-2xl text-blue-main'>{item.logo}</div>
                                    <div className='text-xl font-semibold'>{item.title}</div>
                                </div>
                                <div>
                                    <span className='text-base'>{item.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:w-1/3 md:pl-10 mt-8 md:mt-0'>
                    {/* Recent Blogs Section */}
                    <div className='flex flex-col space-y-8'>
                        <div className='flex flex-row space-x-4 items-center mb-6'>
                            <span className='text-4xl md:text-5xl font-extrabold text-blue-main'>Recent</span>
                            <span className='text-4xl md:text-5xl font-extrabold text-gold-main'>Blogs</span>
                        </div>
                        {recentBlogs.map((blog, index) => (
                            <div key={index} className='flex flex-row space-x-4 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-300'>
                                <div className='text-2xl text-blue-main'>
                                    {/* {blog.icon || <BlogIcon />} Use a default icon if none is provided */}
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lg font-semibold'>{blog.title}</div>
                                    <div className='text-sm text-gray-600'>{blog.excerpt}</div>
                                    <div className='text-xs text-gray-400'>{blog.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex flex-col md:flex-row items-center px-8 md:px-24 mt-12'>
                <div className='md:w-1/2 flex flex-col space-y-6 md:space-y-8'>
                    <div className='flex flex-row space-x-2'>
                        <span className='text-4xl md:text-5xl font-extrabold text-blue-main'>How</span>
                        <span className='text-4xl md:text-5xl font-extrabold text-gold-main'>It</span>
                        <span className='text-4xl md:text-5xl font-extrabold text-blue-main'>Works</span>
                    </div>
                    <span className='text-lg md:text-xl'>Discover the range of professional services we offer to support your educational and career goals.</span>
                    <div className='flex flex-col space-y-4'>
                        <div className='flex flex-row items-center space-x-4'>
                            <span className='text-xl text-blue-main'>
                                <CheckBoxRoundedIcon />
                            </span>
                            <div>
                                <span className='text-lg font-semibold'>Initial Consultation: Discuss your needs and goals with our expert team.</span>
                            </div>
                        </div>
                        <div className='flex flex-row items-center space-x-4'>
                            <span className='text-xl text-blue-main'>
                                <CheckBoxRoundedIcon />
                            </span>
                            <div>
                                <span className='text-lg font-semibold'>Personalized Plan: Receive a tailored action plan and recommendations.</span>
                            </div>
                        </div>
                        <div className='flex flex-row items-center space-x-4'>
                            <span className='text-xl text-blue-main'>
                                <CheckBoxRoundedIcon />
                            </span>
                            <div>
                                <span className='text-lg font-semibold'>Implementation Support: Get ongoing assistance throughout the process.</span>
                            </div>
                        </div>
                        <div className='flex flex-row items-center space-x-4'>
                            <span className='text-xl text-blue-main'>
                                <CheckBoxRoundedIcon />
                            </span>
                            <div>
                                <span className='text-lg font-semibold'>Feedback & Improvement: Share your experience and get further enhancements.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:w-1/2 mt-8 md:mt-0'>
                    <img className='w-full h-auto object-cover rounded-lg shadow-lg' src={HowItWorks} alt="How It Works" />
                </div>
            </div>
        </div>
    );
}
