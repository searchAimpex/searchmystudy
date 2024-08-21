import React, { useRef, useState } from 'react'
import ServiceHero from '../../assets/ServiceHero.png'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HowItWorks from '../../assets/HowItWorks.png'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
const conselling = [
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
    {
        title: "Visa Guide",
        desciption:"Step-by-step guidance for the visa application process. The F-1 visa is the most common type of visa for international students planning to pursue academic studies in the United States. Whether you're enrolling in a bachelor's, master's, or Ph.D. program, this visa allows you to stay in the U.S. for the duration of your studies.",
        logo: <MenuBookIcon />
    },
]


export default function ServiceScreen() {
    const cardRefs = useRef([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  
    const scrollToCard = (index) => {
      cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
      setSelectedCardIndex(index);
    };

    return (
        <div>
            <div className='flex flex-row px-[100px] py-5 h-[500px] space-x-4 bg-blue-200'>
                <div className='w-1/2 flex flex-col py-10 space-y-6'>
                    <div className='flex flex-row space-x-4 items-center justify-start'>
                        <span className='text-5xl font-bold text-blue-main'>Discover</span>
                        <span className='text-5xl font-bold text-gold-main'>Our</span>
                        <span className='text-5xl font-bold text-blue-main'>Service</span>
                    </div>
                    <div>
                        <span className='text-4xl'>Explore the range of professional services we offer to support your educational and career goals.</span>
                    </div>
                    <div>
                        <span className='text-xl'>Explore the range of professional services we offer to support your educational and career goals.</span>
                    </div>
                    <div>
                        <button className='px-4 py-2 bg-blue-main rounded-xl text-white font-bold'>Get Counselling</button>
                    </div>
                </div>
                <div className='w-1/2'>
                    <img className='h-auto object-cover' src={ServiceHero} alt="Service Hero" />
                </div>
            </div>
            
            <div className='mt-10 mx-[200px]'>
                {/* Quick Links Section */}
                <div className='flex space-x-4 mb-6'>
                    {conselling.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToCard(index)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold ${selectedCardIndex === index ? 'bg-blue-main text-white' : 'bg-white text-blue-main border border-blue-main'}`}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
    
                {/* Card Grid */}
                <div className='grid grid-cols-1 gap-10'>
                    {conselling.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            className={`flex flex-col p-6 rounded-xl shadow-lg transform transition-transform duration-300 ${selectedCardIndex === index ? 'bg-blue-600 text-white' : 'bg-white text-blue-main border border-blue-main'} hover:shadow-xl hover:border hover:border-white`}
                        >
                            <div className='flex flex-row items-center space-x-6'>
                                <div className='text-2xl'>{item.logo}</div>
                                <div className='text-xl font-bold'>{item.title}</div>
                            </div>
                            <div className='mt-4'>
                                <span className='text-base'>{item.desciption}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col space-y-6 items-center mt-10'>
                    <div className='flex flex-row space-x-4 items-center justify-start'>
                        <span className='text-5xl font-bold text-blue-main'>How</span>
                        <span className='text-5xl font-bold text-gold-main'>It</span>
                        <span className='text-5xl font-bold text-blue-main'>Works</span>
                    </div>
                    <div>
                        <span className='text-md'>Discover the range of professional services we offer to support your educational and career goals.</span>
                    </div>
                    <div className='flex flex-row space-x-4 w-full'>
                        <div className='flex flex-col space-y-6'>
                            <div className='flex flex-row shadow-xl p-4 space-x-2 items-center rounded-xl'>
                                    <span className='text-blue-main text-md'>
                                        <CheckBoxRoundedIcon />
                                    </span>
                                    <div>
                                        <span className='text-md font-bold'>Initial Consultation :  Discuss your needs and goals with our expert team.</span>
                                    </div>
                            </div>
                            <div className='flex flex-row shadow-xl p-4 space-x-2 items-center rounded-xl'>
                                    <span className='text-blue-main'>
                                        <CheckBoxRoundedIcon />
                                    </span>
                                    <div>
                                        <span className='text-md font-bold'>Personalized Plan :  Receive a tailored action plan and recommendations.</span>
                                    </div>
                            </div>
                            <div className='flex flex-row shadow-xl p-4 space-x-2 items-center rounded-xl'>
                                    <span className='text-blue-main'>
                                        <CheckBoxRoundedIcon />
                                    </span>
                                    <div>
                                        <span className='text-md font-bold'>Implementation Support :  Get ongoing assistance throughout the  process.</span>
                                    </div>
                            </div>
                            <div className='flex flex-row shadow-xl p-4 space-x-2 items-center rounded-xl'>
                                    <span className='text-blue-main'>
                                        <CheckBoxRoundedIcon />
                                    </span>
                                    <div>
                                        <span className='text-md font-bold'>Follow-Up :  Enjoy continuous support and follow-up to ensure your success.</span>
                                    </div>
                            </div>

                        </div>
                        <div>
                            <img className='h-auto w-full' src={HowItWorks} alt="How It Works" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}