import React from 'react';
import { motion } from 'framer-motion';
import AboutUs from '../../assets/AboutUsHero.png';
import Vision from '../../assets/Vision.png';
import Mission from '../../assets/Mission.png';
import About from '../../assets/About1.png';
import Excellence from '../../assets/excellence.png';
import Intregity from '../../assets/integrity.png';
import Innovation from '../../assets/innovation.png';
import ScrollToTop from '../../components/Public/ScrollToTop';

export default function AboutDetailed() {
  return (
    <div>
      <ScrollToTop />
      <div className="flex flex-col">
        {/* About Us Hero Section */}
        <div className="bg-[#C4C4C4]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={AboutUs} className="w-full object-cover" alt="About Us" />
          </motion.div>
        </div>

        {/* Who We Are Section */}
        <motion.div
          className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-blue-main">Who We Are</h2>
          <p className="text-base md:text-lg text-gray-400 mt-4">
            We are a team of highly experienced medical and other education consultants, career counsellors, and industry experts committed to helping students achieve their goals in the medical field. Whether you are looking to pursue MBBS, MD, or other specialized programs, we guide you through the intricate processes of admission, course selection, and overseas transition. With a strong network of partner institutions, we are connected to leading medical colleges in India, as well as reputable universities in countries such as Russia, Ukraine, Philippines, USA, UK, USA, Canada, Australia, Europe and more.
          </p>
          <p className="text-base md:text-lg text-gray-400 mt-4">
            With years of experience, we have built strong partnerships with top universities and colleges, ensuring that our students receive accurate, up-to-date information and personalized advice.
          </p>
        </motion.div>

        {/* Mission and Vision */}
        <div className="flex flex-col lg:flex-row gap-8 mt-10 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
          {[{ title: 'Mission', img: Mission, desc: 'Our mission is to empower students by providing comprehensive, tailored guidance...' }, { title: 'Vision', img: Vision, desc: 'To be the leading education consultancy in medical studies...' }].map((item, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col p-6 space-y-4 shadow-lg bg-white rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <img src={item.img} className="w-[80px] md:w-[100px]" alt={item.title} />
              <div className="flex flex-row space-x-2 md:space-x-3">
                <span className="font-bold text-blue-main text-2xl md:text-4xl">Our</span>
                <span className="font-bold text-gold-main text-2xl md:text-4xl">{item.title}</span>
              </div>
              <p className="text-base md:text-lg text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* What We Do Section */}
        <motion.div
          className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-blue-main">What We Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
         {[
  { 'Admission Guidance': "Search My Study offers the most comprehensive and personalized educational counseling services for students aspiring to pursue MBBS abroad. Our expert counselors provide end-to-end guidance starting from understanding your career goals to selecting the most suitable international medical colleges that align with your academic background, financial capabilities, and future aspirations. We assist in shortlisting universities that are globally recognized, accredited by major medical councils like MCI/NMC (India), WHO, and others, and have a proven track record of producing highly qualified medical professionals. Our guidance ensures students get access to institutions with modern infrastructure, English-medium instruction, affordable tuition, and global exposure." },
  { 'Medical College Selection': "Search My Study helps in further education counselling when you complete your Overseas MBBS Degree, like if you want to continue your Post-Graduation program in medicine. We make you understand the various PG program in Medicine offered by international medical universities Firstly, we select a foreign medical college that follows the guidelines of the MCI and also offers that a wide range of career options for the Indian medical students to shape their dreams as per their desire. Getting MBBS admission in Abroad, you have to find out every possibility of acquiring placements in the medical industry after completing MBBS in Abroad." },
  { 'Admission Process Guidance': "The first step in ascending the ladder of success through higher foreign degree is to choose the right subject of interest. It not only gives a direction towards career but also helps in providing the required exposure to the student. Education experts at Global Opportunities identify the career goals and relate it with the academic background of the student and counsel them to find the most suitable course available. Our counsellors along with the International Universities have restructured the course list to update the students with the latest information.  The next important factor that partakes in one’s decision of going to foreign land for further studies is the Land itself! Children get confused in choosing a country owing to their (especially families) concerns over their safety, likeness, adjustment and wellbeing. " },
  { 'Scholarship and Financial Assistance': "Applying for a visa to a foreign country involves several formalities and elaborate paperwork. All the information about the latest visa regulations and required documentation is available with Search My Study counsellors. We help students get their visa formalities completed with ease, by providing the right information and helping to compile all the requisite documents on time. At SMS we offer extensive preparation for visa interviews for all education destinations. After all the paperwork is completed and submitted, students are given mock interviews and customized preparation for visa interviews. We provide information about the most common interview questions and situations that students encounter during a visa interview. We also guide you for better self-confidence, preparation, and presentation to help you succeed in the visa interview." },
  { 'Study Abroad Guidance': "Search My Study supports candidates for interview because clearing an interview is very important for your study abroad journey, whether it is for university admission or a student visa. The purpose of the interview questions for international students is to understand why you have chosen the specific university. They want to know how you will benefit from the course as well as to adapt to the university environment. Join In Campus Counsellors will help you prepare for this too." },
  { 'Exam Preparation': "Search My Study provides scholarship assistance so that students can have hassle-free and easy-go admission into the desired college and in the desired program or courses available. A lot of students are not aware that they can be eligible to get international scholarships from government institutes and other organizations. Sometimes it is cheaper to Study Abroad with Scholarships if you get one. The scholarship is an award that can be used for travel, fees, and accommodation. There are different kinds of scholarships available which are helpful for students who want to pursue study abroad such as Merit Scholarships, Government Scholarships, University scholarships, Organization’s scholarships, etc." },
  { 'Test Preparation': "Studying abroad requires a decent financial backup on the part of students and fortunately, education loan meet that particular deficit. We help our students with exclusive education loan support services to solve the financial equation in their study abroad journeys. However, applying for an education loan and carrying out the entire process. We look after all the documentation process and formalities so you can devote your focus solely to your education abroad. When it comes to education financing, we understand that the gravity of the situation varies with each student. Considering that, we offer assistance with both secured and unsecured loans to our students. With our education loan support services, our goal is to ensure that every deserving student gets a fair chance at realizing his/her study abroad dream." },
  { 'Visa & Travel Assistance': "Search My Study provides expert Visa and Travel Assistance to ensure a smooth, stress-free experience for students heading abroad for their education. Navigating the visa process can be overwhelming due to the strict documentation requirements, country-specific regulations, and procedural formalities — but we’re here to simplify it all for you. Our specialized visa support team guides students step-by-step through every aspect of the visa application, ensuring that nothing is left to chance. From compiling and verifying necessary documents to preparing for interviews, we equip students with the knowledge and confidence they need for successful visa approval. " },
  { 'Pre-Departure & Post-Arrival Support': "Search My Study provides complete Pre-Departure and Post-Arrival Support to ensure that students experience a smooth transition from their home country to their study destination. Before departure, we offer personalized guidance through orientation sessions that cover everything from travel preparation, cultural adaptation, and safety tips to essential documentation like visa verification, flight planning, and international health insurance. We also assist with currency exchange, international SIM cards, and packing checklists so students are fully prepared for their journey. After arrival, our support continues with airport pickup coordination, temporary and permanent accommodation guidance, local registration assistance (such as FRRO or visa extension), and help with opening a bank account, obtaining a student ID, and navigating local transportation." }
].map((item, index) => {
  const [title, description] = Object.entries(item)[0]; // Destructure key-value pair
  return (
    <motion.div
      key={index}
      className="flex flex-col p-6 shadow-lg rounded-lg bg-white"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg md:text-xl font-bold text-blue-main">{title}</h3>
      <p className="text-gray-400 mt-2 text-sm md:text-base">
        {description || "No description available."}
      </p>
    </motion.div>
  );
})}

          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          className="bg-blue-100 flex flex-col space-y-10 w-full justify-center items-center px-4 sm:px-8 md:px-16 py-10 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-row space-x-2 md:space-x-4">
            <span className="font-bold text-2xl md:text-4xl text-blue-main">Our</span>
            <span className="font-bold text-2xl md:text-4xl text-gold-main">Values</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ title: 'Excellence', img: Excellence }, { title: 'Integrity', img: Intregity }, { title: 'Innovation', img: Innovation }].map((value, idx) => (
              <motion.div
                key={idx}
                className="bg-white flex flex-col p-4 items-start rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={value.img} alt={value.title} />
                <h4 className="font-bold text-blue-main text-lg md:text-xl mt-2">{value.title}</h4>
                <p className="text-gray-400 text-sm md:text-base">We value {value.title.toLowerCase()} in all our practices.</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}