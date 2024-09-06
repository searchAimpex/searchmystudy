import React, { useRef, useState } from 'react';
import ServiceHero from '../../assets/ServiceHero.png';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HowItWorks from '../../assets/HowItWorks.png';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { PlayCircle } from '@mui/icons-material';


const conselling  = [
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
                    <div className='flex flex-wrap gap-4 mb-8'>
                        {conselling.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToCard(index)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 ${selectedCardIndex === index ? 'bg-blue-main text-white' : 'bg-white text-blue-main border border-gold-main'} hover:bg-blue-100`}
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
                                className={`flex flex-col p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${selectedCardIndex === index ? 'bg-blue-600 text-white' : 'bg-white text-blue-main border border-gold-main'} hover:shadow-xl hover:border hover:border-blue-500`}
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
                 {/* FAQ Section */}
                 <div className="px-8 md:px-24 py-12">
            <h2 className="text-3xl font-bold text-center text-blue-main mb-8">Frequently Asked Questions (FAQ)</h2>
            {faqs.map((faq, index) => (
                <Accordion key={index} className="mb-4">
                    <AccordionSummary
                        expandIcon={<PlayCircle style={{ color: '#0b3d91' }} />} // Adjust the expand icon color to match blue-main
                        aria-controls={`faq-content-${index}`}
                        id={`faq-header-${index}`}
                        sx={{
                            backgroundColor: '#E58013',
                            color: '#264790',
                            '& .MuiTypography-root': {
                                fontWeight: 'bold',
                            }
                        }}
                    >
                        <Typography>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            backgroundColor: 'gold-main',
                        }}
                    >
                        <Typography className="text-gray-600">{faq.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
        </div>
    );
}
