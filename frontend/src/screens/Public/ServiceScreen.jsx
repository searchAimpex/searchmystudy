import React, { useEffect, useRef, useState } from 'react';
import ServiceHero from '../../assets/service.webp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HowItWorks from '../../assets/HowItWorks.png';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from '@mui/material';
import { Padding, PlayCircle } from '@mui/icons-material';

import { motion, AnimatePresence } from 'framer-motion';
import { useFetchBlogMutation } from '../../slices/adminApiSlice';
import { Box } from 'lucide-react';
import { Link } from 'react-router-dom';

const conselling = [
    {
        title: "Admission Guidance",
        description: `Search My Study provides the best educational counseling for MBBS abroad, including guidance for college selection, 
        admission guarantees, documentation assistance for visas, embassy stamping, approval from the Ministry, translating documents, 
        notarization, and zero rejection assurance in VISA issuance.`,
        logo: <CheckBoxRoundedIcon />
    },
    {
        title: "Career Guidance",
        description: `Search My Study helps in further education counselling when you complete your Overseas MBBS Degree, like if you want to continue your Post-Graduation program in medicine. We make you understand the various PG program in Medicine offered by international medical universities Firstly, we select a foreign medical college that follows the guidelines of the MCI and also offers that a wide range of career options for the Indian medical students to shape their dreams as per their desire. Getting MBBS admission in Abroad, you have to find out every possibility of acquiring placements in the medical industry after completing MBBS in Abroad.`,
        logo: <CheckBoxRoundedIcon />
    },
    {
        title: "Course & Country Selection Guidance",
        description: `The first step in ascending the ladder of success through higher foreign degree is to choose the right subject of interest. It not only gives a direction towards career but also helps in providing the required exposure to the student. Education experts at Global Opportunities identify the career goals and relate it with the academic background of the student and counsel them to find the most suitable course available. Our counsellors along with the International Universities have restructured the course list to update the students with the latest information. 

The next important factor that partakes in one’s decision of going to foreign land for further studies is the Land itself! Children get confused in choosing a country owing to their (especially families) concerns over their safety, likeness, adjustment and wellbeing. We at Global Opportunities ease out their tensions regarding this by counselling on Course intended Schlorship, Visa availability, and many such aspects. Through in-person counselling and virtual information communication, we help the students in zeroing it down to their favourite destination of convenience.`,
        logo: <CheckBoxRoundedIcon />
    },
    {
        title: "Visa Assistance",
        description: `Applying for a visa to a foreign country involves several formalities and elaborate paperwork. All the information about the latest visa regulations and required documentation is available with Search My Study counsellors. We help students get their visa formalities completed with ease, by providing the right information and helping to compile all the requisite documents on time.
At SMS we offer extensive preparation for visa interviews for all education destinations. After all the paperwork is completed and submitted, students are given mock interviews and customized preparation for visa interviews. We provide information about the most common interview questions and situations that students encounter during a visa interview. We also guide you for better self-confidence, preparation, and presentation to help you succeed in the visa interview.`,
        logo: <CheckBoxRoundedIcon />
    },
    {
        title: "Interview Guidance",
        description: `Search My Study supports candidates for interview because clearing an interview is very important for your study abroad journey, whether it is for university admission or a student visa. The purpose of the interview questions for international students is to understand why you have chosen the specific university. They want to know how you will benefit from the course as well as to adapt to the university environment. Join In Campus Counsellors will help you prepare for this too.`,
        logo: <CheckBoxRoundedIcon />
    },
    {
        title: "Scholarship Assistance",
        description: ` Search My Study provides scholarship assistance so that students can have hassle-free and easy-go admission into the desired college and in the desired program or courses available. A lot of students are not aware that they can be eligible to get international scholarships from government institutes and other organizations. Sometimes it is cheaper to Study Abroad with Scholarships if you get one.
The scholarship is an award that can be used for travel, fees, and accommodation. There are different kinds of scholarships available which are helpful for students who want to pursue study abroad such as Merit Scholarships, Government Scholarships, University scholarships, Organization’s scholarships, etc.`,
        logo: <CheckBoxRoundedIcon />
    },
    {
        title: "Educational Loan Assistance",
        description: `Studying abroad requires a decent financial backup on the part of students and fortunately, education loan meet that particular deficit. We help our students with exclusive education loan support services to solve the financial equation in their study abroad journeys. However, applying for an education loan and carrying out the entire process.  We look after all the documentation process and formalities so you can devote your focus solely to your education abroad.
When it comes to education financing, we understand that the gravity of the situation varies with each student. Considering that, we offer assistance with both secured and unsecured loans to our students. With our education loan support services, our goal is to ensure that every deserving student gets a fair chance at realizing his/her study abroad dream.
`,
        logo: <CheckBoxRoundedIcon />
    },
    {
        title: "Accommodation Support",
        description: `After completing University applications and the Visa process, a student’s priority should be finding accommodations. Arranging accommodations is an important step in a student’s study abroad journey as it will ensure that your arrival in the new country is secure and without any hindrances.
For international students, moving to a new country can be an overwhelming and lonely experience, which is why finding the right residence is important. Student residences have the potential to become places with a sense of belonging and community.
`,
        logo: <CheckBoxRoundedIcon />
    },
    {
        title: "Pre-Departure Guidance",
        description: ` Search My Study organizes pre-departure orientation sessions for our students. These sessions offer an opportunity to meet other students who are also travelling abroad for studies. Interaction with other students going to the same country can help you sort out various aspects of moving abroad such as accommodation arrangement, local transportation, purchasing household items, getting a part-time job, etc.
Our pre-departure guidance also includes assistance for Forex, debit cards, and connecting our students with current students at the university you are going to study at.
`,
        logo: <CheckBoxRoundedIcon />
    },
    {
        title: "Travel Assistance",
        description: `We understand how important it is to be well-prepared when you are travelling abroad. This is why  Search My Study offers end-to-end travel assistance and support to all students. We help you to make all your bookings on time and find the most economic air tickets, hotel accommodations, and local travel assistance. Our counsellors provide useful information regarding special student discounts and schemes offered by airlines. Search My Study helps students to provide travels insurance also.`,
        logo: <CheckBoxRoundedIcon />
    },
    {
        title: "SOP Assistance",
        description: `Professional SOP assistance can help you articulate your goals, experiences, and motivations in a compelling and impactful manner, effectively showcasing your unique qualities to admissions committees or potential employers. Moreover, working with professionals experienced in crafting SOPs can provide valuable insights into what specific institutions or organizations are looking for, ensuring that your document aligns with their expectations.
Furthermore, seeking SOP assistance allows you to gain an outsider’s perspective on your writing, helping you refine and polish your content to maximize its effectiveness. It also provides an opportunity for constructive feedback that goes beyond mere proofreading. With the guidance of experts who understand the nuances of effective storytelling and persuasion, you can elevate your SOP from a standard piece of writing to a persuasive narrative that convincingly communicates your suitability for the program or role you’re applying for. Ultimately, investing in SOP assistance is an investment in your future success by giving yourself the best possible chance to achieve your academic or career aspirations.`,
        logo: <CheckBoxRoundedIcon />
    },
    {
        title: "Forex Services ",
        description: `To transfer money abroad either for your college fee or Guaranteed investment certificate (GIC) you will need to pay high forex exchange charges but with our forex services you can save large amount of money due low transaction fee.
Safe and secure
We provide most reliable forex services with reputed forex service providers in India, so you can rest assured about your transaction.
Transparent process with low exchange rates
You are provided regular updates and assistance about the transaction. Our forex services will assist you fetch the low rates for your transaction`,
        logo: <CheckBoxRoundedIcon />
    },
];


const indiaCourses = [
    { name: "MBBS", link: "/mbbsindia", path: "/mbbsindia", flagURL: "https://imgur.com/0L7BLOw.png" },
    { name: "MD", link: "/mdindia", path: "/mdindia", flagURL: "https://imgur.com/0L7BLOw.png" },
    { name: "BAMS", link: "/bamsindia", path: "/bamsindia", flagURL: "https://imgur.com/0L7BLOw.png" },
    { name: "BHMS", link: "/bhmsindia", path: "/bhmsindia", flagURL: "https://imgur.com/0L7BLOw.png" },
    { name: "BDS", link: "/bdsindia", path: "/bdsindia", flagURL: "https://imgur.com/0L7BLOw.png" },
    { name: "NURSING", link: "/nursingindia", path: "/nursingindia", flagURL: "https://imgur.com/0L7BLOw.png" },
    { name: "PHARMACY", link: "/pharmacyindia", path: "/pharmacyindia", flagURL: "https://imgur.com/0L7BLOw.png" },
    { name: "Bv Sc", link: "/bvScindia", path: "/bvScindia", flagURL: "https://imgur.com/0L7BLOw.png" }
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
    {
        title: "Forex Services",
        excerpt: "Explore the best scholarships available for international students. This article provides valuable information on how to secure funding for your studies.",
        date: "August 15, 2024",
        icon: "" // Replace with a suitable icon
    },
    // Add more blog entries as needed
];
const faqs = [
    {
        question: "What is a study visa?",
        answer: `A study visa allows international students to enter a country for the purpose of studying at an accredited educational institution. The requirements and conditions vary by country.`
    },
    {
        question: "How can your service help with obtaining a study visa?",
        answer: `We provide comprehensive assistance with the study visa application process, including evaluating eligibility, preparing necessary documents, filling out forms, and providing guidance throughout the application process.`
    },
    {
        question: "What documents are required for the visa?",
        answer: `The required documents vary by country, but generally include a valid passport, acceptance letter from a school, proof of financial means, medical insurance, and completed visa application forms.`
    },
    {
        question: "What documents are typically required for a study visa application?",
        answer: `Common documents include: 
        - A valid passport
        - Proof of acceptance into an accredited educational institution
        - Evidence of sufficient financial resources
        - Academic transcripts and certificates
        - Proof of language proficiency (e.g., TOEFL, IELTS scores)
        - Health and police clearance certificates (depending on the country)`
    },
    {
        question: "How long does the study visa application process take?",
        answer: `The processing time varies by country and individual circumstances. On average, it can take anywhere from a few weeks to several months. We can provide an estimated timeline based on your specific situation.`
    },
    {
        question: "Do you guarantee visa approval?",
        answer: `While we strive to provide the best possible assistance and improve your chances of approval, we cannot guarantee visa approval. The final decision rests with the immigration authorities of the host country.`
    },
    {
        question: "What should I do if my study visa application is denied?",
        answer: `If your application is denied, we can help you understand the reasons for the denial and assist with the appeals process or reapplication. We will review your application and provide advice on how to address any issues.`
    },
    {
        question: "Are your services available for all countries?",
        answer: `We offer assistance for a wide range of countries. Please contact us to check if we provide services for the specific country you are interested in studying in.`
    },
    {
        question: "How much do your services cost?",
        answer: `Our fees vary depending on the complexity of your case and the services required. We offer a transparent pricing structure and will provide a detailed quote after an initial consultation.`
    },
    {
        question: "How can I get started with your service?",
        answer: `To get started, please contact us via phone, email, or through our website. We will schedule an initial consultation to discuss your needs and begin the process.`
    },
    {
        question: "What happens during the initial consultation?",
        answer: `During the initial consultation, we will assess your eligibility for a study visa, discuss your study plans, and outline the steps involved in the application process. This is also an opportunity for you to ask any questions you may have.`
    },
    {
        question: "Can you help with accommodation and travel arrangements?",
        answer: `While our primary focus is on the visa application process, we can provide general advice on accommodation and travel arrangements. We can also recommend trusted partners who specialize in these services.`
    },
    {
        question: "Do you provide post-arrival support?",
        answer: `We offer some post-arrival support, including guidance on visa regulations, maintaining your status, and connecting with local resources. Please inquire about the specifics of our post-arrival services.`
    },
    {
        question: "How can I contact your team?",
        answer: `You can reach us via our contact form on the website, by phone, or by email. Our contact details are available on the "Contact Us" page of our website.`
    },
    {
        question: "What if I need urgent assistance with my visa application?",
        answer: `If you have an urgent request, please let us know as soon as possible. We will do our best to accommodate your needs and expedite the process where feasible.`
    },
    {
        question: "How can I stay updated on my visa application status?",
        answer: `We will keep you informed throughout the application process and provide updates as we receive them. You can also contact us anytime for a status update.`
    }
];



export default function ServiceScreen() {
    const [FetchBlog] = useFetchBlogMutation();
    const [blog, setblog] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchBlog().unwrap();
                setblog(res)
                console.dir(blog);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    const cardRefs = useRef([]);
    const [selectedIndex, setSelectedIndex] = useState(null); // Define the state
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const scrollToCard = (index) => {
        cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
        setSelectedCardIndex(index);
    };
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);

    const truncateWords = (text, wordLimit) => {
        if (!text) return '';
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };
    const getTruncatedContent = (text, maxChars = 95) => {
        if (!text) return '';
        return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
    };
    return (
        <div className='bg-gray-100  '>
            <div className="relative w-full h-[500px] overflow-hidden">
                {/* Responsive Fullscreen Image */}
                <img
                    src={ServiceHero}
                    alt="Service Hero"
                    className="absolute inset-0 w-full h-full object-cover object-right" />

                {/* Text overlay */}
                <div className="absolute  inset-0 flex items-center justify-ceeenter md:justify-end px-4 sm:px-6 md:px-12 lg:px-24">
                    <div className="w-[100%] sm:w-5/6  md:w-2/3 lg:w-2/3 text-center md:text-center space-y-4 sm:space-y-6 text-white">
                        {/* Heading */}
                        <div className="flex flex-col space-y-2">
                            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[70px] font-bold leading-tight">
                                EXPLORE OUR SERVICES
                            </span>
                        </div>

                        {/* Subtext */}
                        <div>
                            <span className="block text-base sm:text-lg md:text-2xl lg:text-4xl leading-relaxed">
                                Explore the range of professional services we offer to support your educational and career goals.
                            </span>
                        </div>

                        {/* Button */}
                        <div>
                            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-main rounded-lg text-sm sm:text-base md:text-lg text-white font-bold hover:bg-blue-700 transition duration-300">
                                Get Counselling
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <div className='mt-12 md:mt-16 px-8 md:px-6 flex flex-col md:flex-row w-[100%]'>
                <div className='mr-5 w-[100%] border'>
                    {/* Quick Links Section */}
                    <div className='flex flex-wrap gap-4 mb-8'>
                        {conselling.map((item, index) => (
                            <button
                                key={index}
                                style={{ border: "1px solid #264790" }}
                                onClick={() => scrollToCard(index)}
                                className={` relative z-0 inline-block px-6 py-2 font-semibold text-sm bg-transparent  rounded-full overflow-hidden
    transform transition-all duration-500 hover:scale-105 group`}
                            >
                                <span
                                    className="absolute inset-0 w-full h-full bg-blue-main transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0 z-[-1]"
                                ></span>
                                <span className="relative z-10 text-blue-main group-hover:text-white transition duration-500">
                                    {item.title}
                                </span>
                            </button>

                        ))}
                    </div>

                    {/* Card Grid */}
                    <div >
                        {conselling.slice(0, 7).map((item, index) => {
                            const isExpanded = selectedCardIndex === index;
                            const words = item.description.split(' ');
                            const shouldTruncate = words.length > 50;
                            const displayText = words.slice(0, 50).join(' ') + '...';

                            return (
                                <div
                                    key={index}
                                    ref={(el) => (cardRefs.current[index] = el)}
                                    className={`flex flex-col p-6 rounded-lg  transform mb-4 transition-transform duration-300 ${isExpanded ? 'bg-blue-main text-white' : 'bg-white text-blue-main shadow-lg'
                                        }  hover:border hover:border-blue-500`}
                                >
                                    <div className='flex flex-row items-center space-x-4 mb-4'>
                                        <div className='text-2xl text-blue-main'>{item.logo}</div>
                                        <div className='text-xl font-semibold'>{item.title}</div>
                                    </div>

                                    <div className='text-base'>
                                        {!isExpanded && shouldTruncate ? displayText : null}
                                        <AnimatePresence initial={false}>
                                            {isExpanded && (
                                                <motion.div
                                                    key="content"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div>{item.description}</div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {shouldTruncate && (
                                            <button
                                                // style={{ backgroundColor: 'transparent' }}
                                                onClick={() =>
                                                    setSelectedCardIndex(isExpanded ? null : index)
                                                }
                                                className='font-semibold  bg-gold-main mt-2  text-sm transition-colors duration-300'
                                            >
                                                {isExpanded ? 'Show Less' : 'Know More'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>




                <div className=' md:w-[35%]'>



                    {/* Recent Blogs Section */}
                    <div className='flex flex-col space-y-4 '>
                        {/* <div className='flex flex-row space-x-4 items-center mb-6'>
                            <span className='text-4xl md:text-5xl font-extrabold text-blue-main'>Recent</span>
                            <span className='text-4xl md:text-5xl font-extrabold text-gold-main'>Blogs</span>
                        </div> */}

                        <h1 className='font-bold text-2xl'><span className='text-blue-main'>Contact</span> <span className='text-gold-main'>Us Form</span></h1>
                        <form className="bg-white  rounded-lg border-gold-main shadow-xl p-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input id="name" type="text" placeholder="Enter your name"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input id="email" type="email" placeholder="Enter your email"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
                                <input id="phone" type="tel" placeholder="Enter your phone number"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-main text-white font-bold py-2 px-4 rounded-md hover:bg-blue-dark transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>


                    {/* Recent Blogs Section */}
                    <div className='flex flex-col space-y-4 mt-7'>
                        {/* <div className='flex flex-row space-x-4 items-center mb-6'>
                            <span className='text-4xl md:text-5xl font-extrabold text-blue-main'>Recent</span>
                            <span className='text-4xl md:text-5xl font-extrabold text-gold-main'>Blogs</span>
                        </div> */}

                        <h1 className='font-bold text-2xl'><span className='text-blue-main'>Recent</span> <span className='text-gold-main'>Blog</span></h1>
                        {blog?.slice(0, 5).map((blog) => (
                            <div
                                onClick={() => navigate(`/blog/${blog._id}`)} key={blog._id} className='hover:cursor-pointer flex gap-3 pb-5'>
                                <img
                                    src={blog.thumbnailURL}
                                    className='rounded-xl w-[90px] h-[85px] object-cover'
                                    alt={blog.title}
                                />
                                <div className='flex flex-col'>
                                    <p className='text-sm text-gold-main font-semibold'>Feb 28, 2025</p>
                                    <div
                                        className="prose max-w-none text-sm pt-1 text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: getTruncatedContent(blog?.content) }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <h1 className='font-bold text-2xl mb-2' > <span className='text-blue-main '>Medical Study In</span><span className='text-gold-main'> India</span></h1>
                    <div className='bg-white p-3 shadow-lg rounded-lg'>
                        {indiaCourses.map((course, index) => (
                            <Link to={course.link} underline="hover" key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
                                {/* <Avatar src={course.flagURL} alt="India Flag" sx={{ width: 24, height: 24 }} /> */}
                                <Typography
                                    variant="body1"
                                    className="pt-2 text-gold-main  hover:text-blue-main transition-colors duration-200"
                                >
                                    {course.name}
                                </Typography>
                            </Link>
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
                    <img className='w-full h-auto object-cover rounded-lg' src={HowItWorks} alt="How It Works" />
                </div>
            </div>

            <div className=" px-12 py-12 bg-white">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-main mb-8">Frequently Asked Questions (FAQ)</h2>
                {faqs.map((faq, index) => (
                    <Accordion
                        key={index}
                        className="mb-6 rounded-lg border-2 border-gold-main shadow-lg"
                        expanded={selectedIndex === index} // Control whether the accordion is expanded
                        onChange={() => setSelectedIndex(selectedIndex === index ? null : index)} // Toggle the selected FAQ
                    >
                        <AccordionSummary
                            expandIcon={
                                <span style={{ color: "#db7e19 " }} className="text-2xl font-semibold">
                                    {selectedIndex === index ? '+' : '-'}
                                </span>
                            }
                            aria-controls={`faq-content-${index}`}
                            id={`faq-header-${index}`}
                            className="transition duration-300"
                        >
                            <Typography style={{ color: "black" }} className="text-white font-bold">{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="bg-gray-100 p-5">
                            <Typography className="text-sm md:text-base text-gray-700">{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>

    );
}
