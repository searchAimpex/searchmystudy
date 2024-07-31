import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import ServiceBanner from '../../assets/BannerService.png';
import './ServiceScreen.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useServiceFetchAllMutation } from '../../slices/adminApiSlice';
import { FetchAllServices } from '../../slices/serviceSlice';
import { useNavigate } from 'react-router-dom';

const colorArray = [
    '#FFEB3B', // Yellow
    '#FF8A65', // Orange
    '#81C784', // Green
    '#64B5F6', // Blue
    '#BA68C8', // Purple
    '#FFD54F', // Amber
    '#4DD0E1', // Cyan
    '#AED581', // Light Green
];

function ServiceScreen() {
    const [expandedIndices, setExpandedIndices] = useState([]);
    const cardRefs = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ServiceFetchAll, { isSuccess }] = useServiceFetchAllMutation();
    const { services } = useSelector((state) => state.service);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ServiceFetchAll().unwrap();
                dispatch(FetchAllServices(result));
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchData();
    }, [ServiceFetchAll, dispatch]);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            lastScrollY = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const visibleCards = getVisibleCards();
                    updateExpandedIndices(visibleCards);
                    ticking = false;
                });

                ticking = true;
            }
        };

        const getVisibleCards = () => {
            return cardRefs.current.map((ref, index) => {
                const cardTop = ref.offsetTop;
                const cardBottom = cardTop + ref.offsetHeight;

                return {
                    index,
                    isVisible: lastScrollY + window.innerHeight > cardTop && lastScrollY < cardBottom,
                };
            });
        };

        const updateExpandedIndices = (visibleCards) => {
            const newExpandedIndices = visibleCards
                .filter((card) => card.isVisible)
                .map((card) => card.index);

            setExpandedIndices(newExpandedIndices);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="service-screen">
            <div className="service-header">
                <img className="service-banner" src={ServiceBanner} alt="Service Banner" />
                <div className='service-title'>
                    <span className='whitespace-pre'>
                        <div className='flex justify-center'> Empowering the World’s Top 5%,</div>
                       <div className='text-color-1' > Highly-Skilled, 21st Century Student.</div>
                    </span>
                </div>
            </div>
            <div className='service-description'>
                <div className='p-5'>
                    <Typography sx={{ fontSize: '20px' }}> 
                    Embark on your educational journey with confidence through our holistic student services. Whether you're seeking guidance on student visas, expert advice on university selection, or personalized career counseling, we're here to empower you every step of the way. Our services extend beyond academics, offering support for spouse visas, air ticket arrangements, and comprehensive student counseling.<br></br> At [Your Company Name], we are committed to shaping your future by providing the resources and expertise you need to succeed in today's competitive academic landscape.
                    </Typography>
                </div>
            </div>
            <div>
                <div className='service-cards'>
                    {services?.map((content, index) => (
                        <div
                            key={index}
                            id={`panel${index}`}
                            className={`card ${expandedIndices.includes(index) ? 'expanded' : ''}`}
                            ref={(el) => (cardRefs.current[index] = el)}
                        >
                            <div className="card-header" style={{ backgroundColor: colorArray[index % colorArray.length] }}>
                                <Typography>{content?.title}</Typography>
                            </div>
                            {expandedIndices.includes(index) && (
                                <div className="card-body">
                                    <div className="flex flex-col items-center justify-center md:flex-row justify-between items-center">
                                        <img src={content?.sectionOne?.heroOne} alt={content?.title} className="w-64 h-64 rounded-md object-cover mr-4" />
                                        <Typography>
                                            {content?.sectionOne?.content}
                                        </Typography>
                                        <button onClick={() => navigate(`/service/${content?._id}`)} 
                                  
                                        className={`font-bold border border-${colorArray[index % colorArray.length]} p-2 rounded-sm text-${colorArray[index % colorArray.length]}`}
                                        style={{ borderColor: colorArray[index % colorArray.length],color :colorArray[index % colorArray.length]}}
                                    
                                        >View</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ServiceScreen;
