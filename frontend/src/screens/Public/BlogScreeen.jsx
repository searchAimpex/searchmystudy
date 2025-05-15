import React, { useEffect, useState } from 'react';
import { useCountryAllFetchMutation, useFetchBlogMutation } from '../../slices/adminApiSlice';
import { FetchBlogs } from '../../slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BlogCard from '../../components/Layouts/BlogCard';
import EastIcon from '@mui/icons-material/East';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
export default function BlogScreen() {
  const [FetchBlog] = useFetchBlogMutation();
  const { blog } = useSelector((state) => state.blog);
  const [CountryFetch] = useCountryAllFetchMutation();
  const [country, setcountry] = useState()
  const dispatch = useDispatch();
  // const [pagination, setPagination] = useState({ start: 0, end: 8 })

const ITEMS_PER_PAGE = 8;
const TOTAL_ITEMS = blog?.length || 0; // Replace blog with your actual data
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

const [pagination, setPagination] = useState({ start: 0, end: ITEMS_PER_PAGE });
const [currentPage, setCurrentPage] = useState(1);

const handleNext = () => {
  if (pagination.end < TOTAL_ITEMS) {
    const newStart = pagination.start + ITEMS_PER_PAGE;
    const newEnd = pagination.end + ITEMS_PER_PAGE;
    setPagination({ start: newStart, end: newEnd });
    setCurrentPage((prev) => prev + 1);
  }
};

const handlePrev = () => {
  if (pagination.start > 0) {
    const newStart = pagination.start - ITEMS_PER_PAGE;
    const newEnd = pagination.end - ITEMS_PER_PAGE;
    setPagination({ start: newStart, end: newEnd });
    setCurrentPage((prev) => prev - 1);
  }
};
  const getTruncatedContent = (text, maxChars = 70) => {
    if (!text) return '';
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchBlog();
        dispatch(FetchBlogs(res.data));

        const result = await CountryFetch().unwrap();

        // Shuffle the countries randomly
        const shuffled = [...result].sort(() => 0.5 - Math.random());

        // Pick first 5 countries from the shuffled list
        const randomFive = shuffled.slice(0, 5);

        setcountry(randomFive);
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []); // Remove dependency on FetchBlog, run only on first mount
  const medicalStudyAbroadTags = [
    "Study MBBS Abroad",
    "MBBS Admission",
    "Medical Universities",
    "MBBS in Russia",
    "MBBS in Philippines",
    "NEET and MBBS",
    "FMGE Preparation",
    "MBBS Scholarships",
    "Visa Process",
    "Student Life Abroad"
  ];

  return (
    <div className='bg-gray-100'>
      {/* Header Section */}
      <div className='flex flex-col items-center justify-center space-y-6 bg-blue-200 px-4 py-10 md:py-16 text-center'>
        <div className='flex flex-wrap justify-center gap-2 sm:gap-4'>
          <span className='text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main'>Read</span>
          <span className='text-3xl md:text-4xl lg:text-5xl font-bold text-gold-main'>Our</span>
          <span className='text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main'>Blog</span>
        </div>
        <span className='text-lg md:text-2xl font-bold'>
          Stay Updated with the Latest Insights and Stories
        </span>
        <div className='space-y-1'>
          <p className='text-sm sm:text-base text-gray-600'>
            Stay informed with our curated articles on studying abroad,
          </p>
          <p className='text-sm sm:text-base text-gray-600'>
            medical courses, and university life.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className='flex flex-col lg:flex-row'>
        {/* Blog Cards */}
        <div className='w-full lg:w-3/4 p-4'>
          <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
            {blog && blog.length > 0 ? (
              blog.slice(pagination.start, pagination.end).map((item) => <BlogCard key={item?._id} blog={item} />)
            ) : (
              <p className='col-span-full text-center text-gray-500'>No blogs available</p>
            )}
          </div>

     <div className="flex items-center mx-auto justify-center gap-6 py-4">
  <button
    onClick={handlePrev}
    disabled={pagination.start === 0}
    className={`text-2xl px-3 py-2 flex justify-center items-center shadow-lg rounded-xl border transition ${
      pagination.start === 0
        ? 'bg-gray-300 text-white cursor-not-allowed'
        : 'bg-gold-main text-white hover:bg-res-100 hover:text-res-700 border-res-300'
    }`}
  >
    <ChevronLeftIcon />
  </button>

  <span className="text-res-500 text-lg font-medium">
    Page {currentPage} of {TOTAL_PAGES}
  </span>

  <button
    onClick={handleNext}
    disabled={pagination.end >= TOTAL_ITEMS}
    className={`text-2xl px-3 py-2 flex justify-center items-center shadow-lg rounded-xl border transition ${
      pagination.end >= TOTAL_ITEMS
        ? 'bg-gray-300 text-white cursor-not-allowed'
        : 'bg-gold-main text-white hover:bg-res-100 hover:text-res-700 border-res-300'
    }`}
  >
    <ChevronRightIcon />
  </button>
</div>



        </div>

        {/* Sidebar */}
        <div className='w-full lg:w-1/4 px-4 py-4'>
          <h1 className='text-gray-700 font-bold text-2xl mb-4'>
            <span className='text-gold-main'>—</span> Latest Blog
          </h1>
          {blog?.slice(0, 7).map((blog) => (
            <div key={blog._id} className='flex gap-3 pb-5'>
              <img
                src={blog.thumbnailURL}
                className='rounded-xl w-[90px] h-[85px] object-cover'
                alt={blog.title}
              />
              <div className='flex flex-col'>
                <p className='text-sm text-gold-main font-semibold'>Feb 28, 2025</p>
                {/* <p className=''>{getTruncatedContent(blog.content)}</p> */}
                <div
                  className="prose max-w-none text-sm pt-1 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: getTruncatedContent(blog?.content) }}
                />

              </div>
            </div>
          ))}




          <div className='w-full  bg-white shadow-lg p-2 rounded-lg mb-4'>
            <h1 className='text-gray-700  font-bold text-xl'>
              <span className='text-gold-main text-2xl'>—</span> Countries We Work With
            </h1>

            <div className='mt-3'>
              {
                country?.slice(0, 5).map((country) => {
                  return (
                    <div>
                      <p className='hover:cursor-pointer text-gold-main font-semibold mb-2  text-xl'> <span className='text-black mr-2'>	&rarr;</span> {country.name}</p>
                    </div>
                  )
                })
              }
            </div>
            {/* <h1 className='text-semibold'><span className='text-gold-main'>— </span>Countries We Work With</h1> */}
          </div>

          <div className="w-full bg-white shadow-lg p-4 rounded-lg mb-4">
            <h1 className="text-gray-700 font-bold text-xl mb-3">
              <span className="text-gold-main text-2xl">—</span> Tags
            </h1>

            <div className="flex flex-wrap gap-2">
              {medicalStudyAbroadTags?.slice(0, 5).map((country, index) => (
                <span
                  key={index}
                  className="hover:cursor-pointer text-gold-main font-medium text-sm px-1 py-[2px] rounded-full border border-gold-main transition-all duration-200 hover:bg-gold-main hover:text-white"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>


          <div className='w-full   p-2  mb-4'>
            <h1 className='text-gray-700  font-bold text-xl'>
              <span className='text-gold-main text-2xl'>—</span> Countries We Work With
            </h1>

            <div className='mt-3'>
              {
                blog?.slice(-7).map((blog) => {
                  return (
                    <div>
                      <img src={blog.thumbnailURL} alt="" />
                      {/* <p className='hover:cursor-pointer text-gold-main font-semibold mb-2  text-xl'> <span className='text-black mr-2'>	&rarr;</span> {country.name}</p> */}
                    </div>
                  )
                })
              }
            </div>
            {/* <h1 className='text-semibold'><span className='text-gold-main'>— </span>Countries We Work With</h1> */}
          </div>


        </div>
      </div>
    </div>
  );
}
