import React from 'react';
import { Container, Typography, Grid, Card, CardHeader, CardContent, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import bvScImage from '../../assets/india-banners/BVSC.jpg';
import { useFetchBlogMutation } from '../../slices/adminApiSlice';
import { useSelector } from 'react-redux';
import poster from '../../assets/india-banners/content.jpg'
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const BvScIndia = () => {
  const documentsRequired = [
    "10th & 12th Marksheet",
    "NEET Scorecard",
    "Passport Size Photographs",
    "Aadhar Card",
    "Category Certificate (if applicable)"
  ];

  const admissionProcess = [
    "Appear for the NEET exam",
    "Apply to colleges through the centralized counseling process",
    "Participate in the counseling process and select your preferred college",
    "Complete the admission formalities at the allocated college",
  ];

  const bvscColleges = [
    { name: "Indian Veterinary Research Institute", location: "Bareilly, Uttar Pradesh" },
    { name: "College of Veterinary Science and Animal Husbandry", location: "Anand, Gujarat" },
    { name: "Rajiv Gandhi Institute of Veterinary Education and Research", location: "Puducherry" }
  ];

  const faqData = [
    { question: "What is the duration of the B.V.Sc & AH course?", answer: "The duration of the course is 5.5 years, including a compulsory internship." },
    { question: "What is the eligibility criteria for B.V.Sc & AH?", answer: "Students must have passed 10+2 with Physics, Chemistry, Biology, and English, and should have appeared for NEET." },
    { question: "What is the average salary after completing B.V.Sc & AH?", answer: "The average salary ranges from INR 5 LPA to INR 8 LPA." }
  ];

  const bvscSpecialisations = [
    "Animal Genetics and Breeding",
    "Veterinary Microbiology",
    "Veterinary Surgery & Radiology",
    "Animal Production & Management",
    "Animal Nutrition",
    "Livestock Production and Management",
    "Veterinary Medicine, Public Health & Hygiene",
    "Veterinary Pathology"
  ];
  const [FetchBlog] = useFetchBlogMutation();

  const getTruncatedContent = (text, maxChars = 95) => {
    if (!text) return '';
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  };
  const { blog } = useSelector((state) => state.blog);

  return (
    <div className=" mx-auto ">

      <motion.div

      >
        <div className="w-full h-[200px] sm:h-[100%] md:h-[100%] lg:h-[100%] overflow-hidden">
          <img
            src={bvScImage}
            alt="Country Banner"
            className="w-full h-full object-cover object-center"
          />
        </div>


      </motion.div>

      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="md:col-span-2 px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            transition={{ duration: 0.8 }}
          >
            <div className="mt-12 overflow-hidden">
              <img className="shadow-lg w-[1200px] h-[700px] scale-120  ml-2 " src={poster} alt="" />
            </div>
            <h2 className="text-3xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl font-bold drop-shadow-md mb-6 text-blue-main mt-4">
              About <span className='text-gold-main'>B.V.Sc & AH</span>
            </h2>
            <p className="text-base md:text-2xl mb-6 leading-relaxed">
              The Bachelor of Veterinary Sciences & Animal Husbandry (B.V.Sc. & A.H.) is a prestigious undergraduate degree in the field of veterinary medicine and animal care. The course spans 5.5 years, including 4.5 years of academic coursework and 1 year of compulsory rotating internship. It is designed for students who are passionate about animal health, welfare, livestock management, and public health.

              This program focuses on the diagnosis, treatment, and prevention of diseases in animals—ranging from pets and livestock to wild animals. It also equips students with the knowledge and skills to manage animal husbandry practices, breeding, and the nutritional well-being of animals.

              Veterinarians play a vital role in both human and animal health ecosystems, especially in controlling zoonotic diseases (infections that spread between animals and humans), ensuring food safety, and improving livestock productivity.
            </p>

          </motion.div>
        </div>
        <div className="hidden md:block">
          <h1 className='text-3xl font-bold text-blue-main mt-3'>-Latest <span className='text-gold-main'>Blog</span></h1>
          {blog?.slice(0, 3).map((blog) => (
            <div
              onClick={() => navigate(`/blog/${blog._id}`)} key={blog._id} className='hover:cursor-pointer flex text-2xl shadow-lg mt-2 gap-3 '>
              <img
                src={blog.thumbnailURL}
                className='rounded-xl w-[90px]  h-[85px] object-cover'
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

      </div>

      {/* Course Details Section */}
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-blue-main px-4">Course Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 px-4">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gold-main">Course Highlights</h3>
          <p className="mb-4   text-2xl">
            <strong className='text-blue-main'>Course Level:</strong> Bachelor in Veterinary Sciences & Animal Husbandry<br />
            <strong className='text-blue-main'>Duration:</strong> 5.5 Years<br />
            <strong className='text-blue-main'>Eligibility:</strong> Passed 10+2 with Physics, Biology, Chemistry, and English<br />
            <strong className='text-blue-main'>Examination Type:</strong> Entrance Exams or Merit<br />
            <strong className='text-blue-main'>Course Fee:</strong> Up to INR 15,000 to 1 Lakh per annum<br />
            <strong className='text-blue-main'>Average Salary:</strong> INR 5 LPA – INR 8 Lacs per annum<br />
            <strong className='text-blue-main'>Top Recruiting Companies:</strong> Government and Private sectors<br />
            <strong className='text-blue-main'>Course Mode:</strong> Full time
          </p>
        </div>
        <div>
          <h3 className=" text-2xl text-gold-main">Specializations</h3>
          <p className="mb-4 text-2xl  ">
            - Animal Genetics and Breeding<br />
            - Veterinary Microbiology<br />
            - Veterinary Surgery & Radiology<br />
            - Animal Production & Management<br />
            - Animal Nutrition<br />
            - Livestock Production and Management<br />
            - Veterinary Medicine, Public Health & Hygiene<br />
            - Veterinary Pathology
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold mb-4  px-4 bg-blue-main text-gold-main p-4"><span className='text-gold-main'>Bachelor in Veterinary Science & Animal</span>  Husbandry Course details Highlights</h3>
        <table class="w-full border border-gray-300 text-left text-sm sm:text-base text-2xl ">
          <tbody className='text-2xl '>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2 font-semibold">Course Level</th>
              <td class="border px-4 py-2">Bachelor in Veterinary Sciences &amp; Animal Husbandry</td>
            </tr>
            <tr>
              <th class="border px-4 py-2">Duration</th>
              <td class="border px-4 py-2">5.5 years</td>
            </tr>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2">Eligibility</th>
              <td class="border px-4 py-2">Passed 10+2 from a recognized board with Physics, Biology, Chemistry and English</td>
            </tr>
            <tr>
              <th class="border px-4 py-2">Examination Type</th>
              <td class="border px-4 py-2">Either by Entrance Exams or by Merit</td>
            </tr>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2">Job Roles</th>
              <td class="border px-4 py-2">
                Veterinary Doctor, Veterinary Research Scientist, Animal Breeders, Veterinary Officers, Veterinary Surgeon, Junior Veterinary Doctor, Food Safety and Inspection Veterinarian, Food Animal Veterinarians, Companion Animal Veterinarians etc.
              </td>
            </tr>
            <tr>
              <th class="border px-4 py-2">Course Fee</th>
              <td class="border px-4 py-2">Up to INR 15,000 to 1 lakh per annum</td>
            </tr>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2">Average Salary</th>
              <td class="border px-4 py-2">INR 5 LPA – INR 8 Lacs per annum</td>
            </tr>
            <tr>
              <th class="border px-4 py-2">Top Recruiting Companies</th>
              <td class="border px-4 py-2">Govt and Private sector</td>
            </tr>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2">Course Mode</th>
              <td class="border px-4 py-2">Full time</td>
            </tr>
          </tbody>
        </table>

      </div>





      {/* Documents Required Section */}
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-blue-main px-4 mt-10">Documents <span className='text-gold-main'>Required</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {documentsRequired.map((doc, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            transition={{ duration: 0.8 }}
          >
            <div className="p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all bg-white">
              <p className="text-sm sm:text-base text-blue-main font-semibold">{doc}</p>
            </div>
          </motion.div>
        ))}
      </div>


      <div>
        <h3 className="text-3xl font-bold mb-4 text-gold-main px-4"><span className='text-blue-main'>BVSc Veterinary Pathology: </span> Eligibility Criteria</h3>
        <p className="mb-4 text-2xl px-4">
          Aspiring Veterinary candidates are required to fulfill the minimum criteria listed below to be eligible to apply for the course.      </p>
      </div>

      <div className="mb-8 px-4">
        {/* <h3 className="text-lg font-semibold mb-4 text-gold-main">Eligibility Criteria</h3> */}
        <ul className="list-disc list-inside space-y-2 text-2xl ">
          <li>Candidates must complete their 10+2 level of education from the science stream from a recognized university or board.</li>
          <li>Candidates must score a minimum aggregate of 50% (45% for SC/ST candidates) in their board examinations.</li>
          <li>Candidates must appear for the necessary entrance examinations.</li>
          <li>Candidates must appear for the entrance admission of the B.V.Sc institute they are targeting.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-3xl font-bold mb-4 text-gold-main px-4"><span className='text-blue-main'>Bachelor of Veterinary Science </span>(BVSc) Specialisations</h3>
        <p className="mb-4 text-sm sm:text-base px-4">
          Here is the list of Bachelor of Veterinary Science (BVSc) Specialisations: </p>     </div>

      <div className="mb-8 px-4">
        {/* <h3 className="text-lg font-semibold mb-4 text-gold-main">Eligibility Criteria</h3> */}
        <ul className="list-disc list-inside space-y-2 text-2xl">
          <li>BVSc Animal Genetics and Breeding</li>
          <li>BVSc Veterinary Microbiology</li>
          <li>BVSc Veterinary Surgery & Radiology</li>
          <li>BVSc Veterinary Surgery and Radiology</li>
          <li>BVSc Animal Production & Management</li>
          <li>BVSc Animal Nutrition</li>
          <li>BVSc Livestock Production and Management</li>
          <li>BVSc Veterinary Medicine, Public Health & Hygiene</li>
          <li>BVSc Veterinary Pathology</li>
        </ul>
      </div>







      {/* Admission Process Section */}
      <h2 className="text-2xl md:text-4xl font-bold mb-6 px-4 text-blue-main">Admission <span className='text-gold-main'>Process</span></h2>
      <div className="space-y-4 mb-12 px-4">

        <ul className="list-disc   list-inside space-y-2 text-2xl">
          {admissionProcess.map((step, index) => (
            <motion.li
              key={index}
              className="text-2xl list-inside space-y-2 "
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              transition={{ duration: 0.8 }}
            >
              {step}
            </motion.li>
          ))}
        </ul>

      </div>

      {/* Top Colleges Section */}
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-blue-main">Top B.V.Sc <span className='text-gold-main'>Colleges in India</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {bvscColleges.map((college, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            transition={{ duration: 0.8 }}
          >
            <div className="p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all bg-white">
              <h3 className="font-semibold">{college.name}</h3>
              <p className="text-gray-600">{college.location}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-blue-main">Frequently Asked <span className='text-gold-main'>Questions  (FAQs)</span></h2>
      <div className="space-y-4 mb-12">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            transition={{ duration: 0.8 }}
          >
            <details className="bg-white p-4 rounded-lg shadow-md">
              <summary className="font-semibold cursor-pointer text-sm sm:text-base">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm sm:text-base">{faq.answer}</p>
            </details>
          </motion.div>
        ))}
      </div>
    </div>

  );

};

export default BvScIndia;
