import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../../assets/BannerService.png';
import dPharmaImage from '../../assets/LoginHero.png';
import bPharmaImage from '../../assets/LoginHero.png';
import bPharmaLateralImage from '../../assets/LoginHero.png';
import bPharmaHonsImage from '../../assets/LoginHero.png';
import bPharmaAyurvedaImage from '../../assets/LoginHero.png';
import mPharmaImage from '../../assets/LoginHero.png';
import { useFetchBlogMutation } from '../../slices/adminApiSlice';
import { FetchBlogs } from '../../slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const courses = [
  {
    title: 'D.Pharma (Diploma in Pharmacy)',
    image: dPharmaImage,
    description: ` D.Pharm is a foundation course in pharmacy, with a duration of 2 years divided into four semesters. The course deals with the fundamentals of pharmaceutical studies and provides a basic understanding of common medicines. The course is designed in such a way as to prepare the students to work under the supervision of a licensed pharmacist in hospitals and other related pharmaceutical fields. There are numerous job scopes for D.Pharm graduates in the pharmaceutical business and hospitals. Graduates can also obtain pharmacy licenses to start their stores and delve into entrepreneurship.`,
  },
  {
    title: 'B.Pharma (Bachelor of Pharmacy)',
    image: bPharmaImage,
    description: `B.Pharm degree is a foundational program...`,
  },
  {
    title: 'B.Pharma (Lateral)',
    image: bPharmaLateralImage,
    description: `Lateral entry to the B.Pharma course...`,
  },
  {
    title: 'B. Pharma (Hons.)',
    image: bPharmaHonsImage,
    description: `B.Pharm (Hons.) is an advanced program...`,
  },
  {
    title: 'B. Pharma (Ayurveda)',
    image: bPharmaAyurvedaImage,
    description: `B.Pharm (Ayurveda) is a specialized course...`,
  },
  {
    title: 'M. Pharma (Master of Pharmacy)',
    image: mPharmaImage,
    description: `M.Pharm is a postgraduate degree...`,
  },
];

const PharmacyPage = () => {
  // const [FetchBlog] = useFetchBlogMutation();

  
    const [FetchBlog] = useFetchBlogMutation();
    const [blog, setblog] = useState()
  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await FetchBlog();
          // dispatch(FetchBlogs(res.data));
          console.log(res.data,"---------------------------");
          setblog(res.data)
        } catch (error) {
          toast.error('Failed to fetch data');
        }
      };
  
      fetchData();
    }, []);
  
  

  const getTruncatedContent = (text, maxChars = 95) => {
    if (!text) return '';
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  };

  return (
    <div className="">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.8 }}
        className="relative "
      >
        <img
          src={heroImage}
          alt="Hero Banner"
          className="object-cover h-[170px] w-full "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 opacity-70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8 space-y-6">
          <p className="text-4xl md:text-5xl font-bold text-shadow-lg">Pharmacy Courses</p>
          <p className="text-lg md:text-xl font-light text-shadow-lg">
            Explore our comprehensive pharmacy programs and career paths.
          </p>
          <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2 rounded shadow">
            Explore Programs
          </button>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Content */}
        <div className="w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={pageVariants}
            transition={{ duration: 0.8 }}
          >
            <div className=" p-2 bg-gradient-to-r from-blue-100 via-blue-300 to-green-200 mt-6 ">
              <h2 className="text-2xl md:text-4xl font-bold text-blue-600 h-[20] text-white  text-center ">About Pharmacy</h2>
            </div>
            <p className='pt-3'>
              Pharmacy courses are a demanding career stream for a lot of science students. It is inherently a simple combination of health sciences and chemical sciences. The main objective of pursuing a degree in pharmacy is to understand the process behind drug manufacturing and pharmaceutical drugs for the welfare and benefit of humankind.
              Pharmacy courses are a demanding career stream for a lot of science students. It is inherently a simple combination of health sciences and chemical sciences. The main objective of pursuing a degree in pharmacy is to understand the process behind drug manufacturing and pharmaceutical drugs for the welfare and benefit of humankind.
            </p>


            <div>
              <div className="flex mt-10">
                <img src={dPharmaImage} alt="" className="w-[400px] shadow-lg" />

                <div className=" ml-4">
                  <div className=" bg-gradient-to-r from-blue-100 via-blue-300 to-green-200 ">
                    <h2 className="text-2xl md:text-2xl rounded font-bold text-blue-600 h-[20] text-white  text-center ">D.Pharma (Diploma in Pharmacy)</h2>
                  </div>
                  <p>
                    D.Pharm is a foundation course in pharmacy, with a duration of 2 years divided into four semesters.
                    The course deals with the fundamentals of pharmaceutical studies and provides a basic understanding
                    of common medicines. The course is designed in such a way as to prepare the students to work under
                    the supervision of a licensed pharmacist in hospitals and other related pharmaceutical fields.
                    There are numerous job scopes for D.Pharm graduates in the pharmaceutical business and hospitals.
                    Graduates can also obtain pharmacy licenses to start their stores and delve into entrepreneurship.
                  </p>

                  <ul className="list-disc mt-4 ml-4">
                    <li><strong>Course Duration:</strong> 2 Years</li>
                    <li><strong>Eligibility Criteria:</strong> Candidates must have completed 10+2 with Biology and secured a minimum of 50% aggregate marks.</li>
                    <li><strong>Subjects:</strong> Human Anatomy, Biochemistry, Pharmaceutical Studies, Drug Store and Business Management, Pharmacology, and Toxicology.</li>
                    <li><strong>Course Fee:</strong> INR 9,000 to INR 2 Lakhs</li>
                    <li><strong>Areas of Recruitment:</strong> Pharma Stores, Logistics Management, Drug Testing, and more.</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row mt-10 gap-6">
                <img
                  src={bPharmaAyurvedaImage}
                  alt="B.Pharm Ayurveda"
                  className="w-full md:w-[400px] rounded shadow"
                />

                <div>
                  <div className=" bg-gradient-to-r from-blue-100 via-blue-300 to-green-200 ">
                    <h2 className="text-2xl md:text-2xl rounded font-bold text-blue-600 h-[20] text-white  text-center ">B.Pharma (Bechelors in Pharmacy)</h2>
                  </div>
                  <p>
                    B.Pharm degree is a foundational program that equips a student with the relevant knowledge
                    required to practice pharmacy. It is one of the most popular pharmacy courses in the country,
                    which aims to provide extensive knowledge on fundamental applications of biochemistry in pharmacology.
                  </p>
                  <p className="mt-2">
                    It is an intensive program that has been successful at employing in prescription, manufacture, and
                    provision of medicines. A student could pursue his or her master’s after completing this course or opt
                    for employment as there is an increasing demand for pharma professionals each year. B.Pharm is one of the
                    most common pharmacy courses after 12th Science.
                  </p>

                  <ul className="list-disc mt-4 ml-4 text-sm">
                    <li><strong>Course Duration:</strong> 4 Years</li>
                    <li><strong>Eligibility Criteria:</strong> 10+2 with at least 50% aggregate in Biology and Chemistry</li>
                    <li><strong>Subjects:</strong> Anatomy &amp; Physiology, Biochemistry, Biostatistics, and Pharmaceutical Biotechnology</li>
                    <li><strong>Course Fee:</strong> ₹40,000 – ₹1 Lakh</li>
                    <li><strong>Areas of Recruitment:</strong> Biotech, Biomedical Research, Medicine Tech, Hospitals, Testing Labs</li>
                    <li><strong>Entrance Exams:</strong> WBJEE, OJEE, GCET, HPCET, and more</li>
                  </ul>
                </div>
              </div>


              <div className="flex flex-col md:flex-row mt-10 gap-6">
                <img
                  src={bPharmaHonsImage}
                  alt="B.Pharm Lateral Entry"
                  className="w-full md:w-[400px] rounded shadow"
                />

                <div>
                  <div className=" bg-gradient-to-r from-blue-100 via-blue-300 to-green-200 ">
                    <h2 className="text-2xl md:text-2xl rounded font-bold text-blue-600 h-[20] text-white  text-center ">B.Pharma (Lateral)</h2>
                  </div>
                  <p>
                    Lateral entry to the B.Pharm course is given to students who have completed a pharmacy diploma and
                    want to pursue higher learning in pharmacy. The coursework is similar to the regular B.Pharm program,
                    but the eligibility criteria vary. Admission is granted via direct entry into the second year of the course.
                  </p>

                  <ul className="list-disc mt-4 ml-4 text-sm">
                    <li><strong>Course Duration:</strong> 3 Years</li>
                    <li>
                      <strong>Eligibility Criteria:</strong> Diploma in Pharmacy or Biochemistry with a minimum of 50% aggregate
                    </li>
                    <li><strong>Course Fees:</strong> ₹40,000 – ₹90,000</li>
                    <li>
                      <strong>Areas of Recruitment:</strong> Biotechnology, Biomedical Research, Medicine Technology, Hospitals,
                      Pharmacology, Testing Labs, etc.
                    </li>
                  </ul>
                </div>
              </div>

              <div>

                <div className="flex flex-col md:flex-row mt-10 gap-6">
                  <img
                    src={bPharmaImage}
                    alt="B.Pharm Honours"
                    className="w-full md:w-[400px] rounded shadow"
                  />
                  <div>
                    <div className=" bg-gradient-to-r from-blue-100 via-blue-300 to-green-200 ">
                      <h2 className="text-2xl md:text-2xl rounded font-bold text-blue-600 h-[20] text-white  text-center ">B.Pharma (Hons.)</h2>
                    </div>
                    <p>
                      An Honours Degree generally comprises a larger course volume and syllabus and a higher standard of education than a normal bachelor’s degree.
                      B. Pharm (Hons.) degree has been structured to match and exceed the current pharmacy research industry’s standards and requirements.
                    </p>
                    <p className="mt-2">
                      The coursework essentially prepares students for higher education and offers more research-oriented concepts for dissertation purposes.
                      B.Pharm (Hons) usually offers students additional foundational courses related to pharmacy, which provides them with an extra edge in terms of job scopes and opportunities.
                    </p>
                    <ul className="list-disc mt-4 ml-5 space-y-1 text-sm">
                      <li><strong>Course Duration:</strong> 4 Years</li>
                      <li><strong>Eligibility Criteria:</strong> The basic eligibility to pursue a Bachelor of Pharmacy Honours is to complete 10+2 with a minimum of 50% aggregate in biology and chemistry.</li>
                      <li><strong>Subjects:</strong> Human Anatomy, Advanced Physiology, Biochemistry, Chemical Processing, Analytical Chemistry, and Pharmaceutical Biotechnology.</li>
                      <li><strong>Course Fee:</strong> INR 40,000 to INR 1 LPA</li>
                      <li><strong>Areas of Recruitment:</strong> Biotechnology Research, Virology and Pathology Department, Medicine Lab Technology, Healthcare Centers, Pharmacology Manufacturing, Testing Labs, etc.</li>
                    </ul>
                  </div>
                </div>

              </div>

              <div className="flex flex-col md:flex-row mt-10 gap-6">
                <img
                  src={bPharmaAyurvedaImage}
                  alt="B.Pharm Ayurveda"
                  className="w-full md:w-[400px] rounded shadow"
                />
                <div>
                  <div className=" bg-gradient-to-r from-blue-100 via-blue-300 to-green-200 ">
                    <h2 className="text-2xl md:text-2xl rounded font-bold text-blue-600 h-[20] text-white  text-center ">B. Pharma in Ayurveda</h2>
                  </div>
                  <p>
                    Pharmacy is not only for allopathic medicines but also applies to ayurvedic medicines. Ayurveda or Ayurvedic Science has immense potential in India as it is being practiced for over 5000 years and is native to our motherland. B.Pharm Ayurveda is a 4-year full-time undergraduate pharma science program that deals with the fundamentals of Ayurvedic healing and the production of various Ayurvedic medicines.
                  </p>
                  <p className="mt-2">
                    Ever since the establishment of AAYUSH by the government of India, there has been substantial growth in the usage of Ayurvedic medicines across the country. The development of Ayurvedic science has established numerous job scopes for graduates in both the public and private sectors.
                  </p>
                  <ul className="list-disc mt-4 ml-5 space-y-1 text-sm">
                    <li><strong>Course Duration:</strong> 4 Years</li>
                    <li>
                      <strong>Eligibility Criteria:</strong> The basic eligibility to pursue a Bachelor of Pharmacy in Ayurveda is to complete 10+2 with a minimum of 50% aggregate in biology. Students should have completed a Diploma in Naturopathy or Ayurvedic Pharmacy with a minimum of 50% aggregate marks for lateral entry.
                    </li>
                    <li><strong>Subjects:</strong> Human Anatomy, Advanced Physiology, Biochemistry, Chemical Processing, Analytical Chemistry, and Pharmaceutical Biotechnology.</li>
                    <li><strong>Course Fee:</strong> INR 20,000 to INR 1.5 LPA</li>
                    <li><strong>Areas of Recruitment:</strong> Siddha Centers, Ayurveda Centers, Medicine Manufacturing, Therapy Centers, etc.</li>
                  </ul>
                </div>


              </div>

              <div>
                <div className='flex mt-10 gap-6'>
                  <img src={dPharmaImage} className='w-[400px]' alt="Masters in Pharmacy" />
                  <div>
                    <div className=" bg-gradient-to-r from-blue-100 via-blue-300 to-green-200 ">
                      <h2 className="text-2xl md:text-2xl rounded font-bold text-blue-600 h-[20] text-white  text-center "> <div className=" bg-gradient-to-r from-blue-100 via-blue-300 to-green-200 ">
                        <h2 className="text-2xl md:text-2xl rounded font-bold text-blue-600 h-[20] text-white  text-center ">M.Pharma (Masters in Pharmacy)</h2>
                      </div></h2>
                    </div>
                    <p>
                      Another course among the best pharmacy courses after 12th Science is Masters in Pharmacy. M.Pharm Course is a postgraduate pharmacology studies degree that offers advanced pharmacology manufacturing and biochemical processing. The course offers more advanced research-based subjects in pharma science.
                      The course provides a basic understanding of salts’ chemical processing into medicines that can be used for commercial medicinal purposes. The course offers more scope for research and often provides greater job opportunities in the pharmaceutical sciences.
                    </p>
                    <ul className="list-disc mt-4 ml-5 space-y-1 text-sm">
                      <li><strong>Course Duration:</strong> 2 Years</li>
                      <li><strong>Eligibility Criteria:</strong> The basic eligibility to pursue M.Pharm is to pass the Bachelor of Pharmacy program with not less than 50%.</li>
                      <li><strong>Subjects:</strong> Modern Pharmaceutics, Advanced Biopharmaceutics, Pharmaceutical Analysis, Pharmaceutical Formulation Development, and Pharmacokinetics.</li>
                      <li><strong>Course Fee:</strong> INR 2 Lakhs to 5 Lakhs</li>
                      <li><strong>Areas of Recruitment:</strong> Biotechnology Research, Virology and Pathology Department, Medicine Lab Technology, Healthcare Centers, Pharmacology Manufacturing, Testing Labs, etc.</li>
                    </ul>
                  </div>
                </div>
              </div>


            </div>

          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden md:block w-[30%]">

          <div className="hidden md:block w-full mt-5">
            <h1 className='text-3xl font-bold text-blue-main mb-5'>-Latest <span className='text-gold-main'>Blog</span></h1>
            {blog?.slice(0, 7).map((blog) => (
              <div
                onClick={() => navigate(`/blog/${blog._id}`)} key={blog._id} className='hover:cursor-pointer flex shadow-lg mt-7 p-1 gap-3 '>
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

          <div className="bg-white p-6 mt-10 shadow-lg rounded-lg">
            <h4 className="text-lg font-semibold mb-4">Interested in Our Courses?</h4>
            <p className="mb-4">

              Get in touch with us to learn more about our pharmacy programs and how they can
              benefit your career.
            </p>
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 w-full rounded">
              Contact Us
            </button>
          </div>

        </div>




      </div>
    </div>
  );
};

export default PharmacyPage;
