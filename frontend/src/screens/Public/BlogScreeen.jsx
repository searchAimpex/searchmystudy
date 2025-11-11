import React, { useEffect, useState } from 'react';
import { useCountryAllFetchMutation, useFetchBlogMutation } from '../../slices/adminApiSlice';
import { FetchBlogs } from '../../slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BlogCard from '../../components/Layouts/BlogCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ServiceHero from '../../assets/blog-banner.webp';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';

export default function BlogScreen() {
  const [FetchBlog] = useFetchBlogMutation();
  const [CountryFetch] = useCountryAllFetchMutation();
  const { blog } = useSelector((state) => state.blog);
  const countries = useSelector((state) => state?.country?.countries);
  console.log(countries, "++++++++++++++++++++++++");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [country, setcountry] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Filtered blog based on search
  const filteredBlogs = blog?.filter(b =>
    b?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b?.content?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const TOTAL_ITEMS = filteredBlogs.length;
  const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const getTruncatedContent = (text, maxChars = 95) => {
    if (!text) return '';
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchBlog();
        dispatch(FetchBlogs(res.data));

        const result = await CountryFetch().unwrap();
        const shuffled = [...result].sort(() => 0.5 - Math.random());
        setcountry(shuffled.slice(0, 5));
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const medicalStudyAbroadTags = [
    "Study MBBS Abroad", "MBBS Admission", "Medical Universities", "MBBS in Russia",
    "MBBS in Philippines", "NEET and MBBS", "FMGE Preparation", "MBBS Scholarships",
    "Visa Process", "Student Life Abroad"
  ];

  return (
    <div className='bg-gray-100'>
      {/* Header Section */}
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
                                  Read Our Blog 
                                </span>
                            </div>
    
                            {/* Subtext */}
                            <div>
                                <span className="block text-base sm:text-lg md:text-2xl lg:text-4xl  leading-relaxed">
                                   Stay updated with the latest update insights and stories stay informed with our curated articles on studying abroad, medical courses, and university life.
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

      {/* Content Section */}
      <div className='flex flex-col lg:flex-row'>
        {/* Blog Cards */}
        <div className='w-full lg:w-3/4 p-4'>
          <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.slice(startIdx, endIdx).map((item) => (
                <BlogCard key={item?._id} blog={item} />
              ))
            ) : (
              <p className='col-span-full text-center text-gray-500'>No blogs found</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center mx-auto justify-center gap-6 py-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`text-2xl px-3 py-2 flex justify-center items-center shadow-lg rounded-xl border transition ${currentPage === 1
                ? 'bg-gray-300 text-white cursor-not-allowed'
                : 'bg-gold-main text-white hover:bg-res-100 hover:text-res-700 border-res-300'}`}
            >
              <ChevronLeftIcon />
            </button>

            <span className="text-res-500 text-lg font-medium">
              Page {currentPage} of {TOTAL_PAGES}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === TOTAL_PAGES}
              className={`text-2xl px-3 py-2 flex justify-center items-center shadow-lg rounded-xl border transition ${currentPage === TOTAL_PAGES
                ? 'bg-gray-300 text-white cursor-not-allowed'
                : 'bg-gold-main text-white hover:bg-res-100 hover:text-res-700 border-res-300'}`}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className='w-full lg:w-1/4 px-4 py-4'>
          {/* Search */}
          <div className="w-full max-w-md mx-auto mb-5">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                placeholder="Search blog posts..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
            </div>
          </div>

          {/* Latest Blog List */}
          <h1 className='text-gray-700 font-bold text-2xl mb-4'>
            <span className='text-gold-main'>—</span> Latest Blog
          </h1>
          {blog?.slice(0, 7).map((blog) => (
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

          {/* Countries Section */}
          <div className='w-full bg-white shadow-lg p-2 rounded-lg mb-4'>
            <h1 className='text-gray-700 font-bold text-xl'>
              <span className='text-gold-main text-2xl'>—</span> Countries We Work With
            </h1>
            <div className='mt-3'>
              {country?.map((country) => (
                <p
                  key={country._id}
                  onClick={() => navigate(`/MbbsCountryDetailed/${country._id}`)}
                  className='cursor-pointer text-gold-main font-semibold mb-2 text-xl hover:text-black transition-colors'
                >
                  <span className='text-black mr-2'>&rarr;</span> {country.name}
                </p>
              ))}
            </div>

          </div>

          {/* Tags */}
          <div className="w-full bg-white shadow-lg p-4 rounded-lg mb-4">
            <h1 className="text-gray-700 font-bold text-xl mb-3">
              <span className="text-gold-main text-2xl">—</span> Tags
            </h1>
            <div className="flex flex-wrap gap-2">
              {medicalStudyAbroadTags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="hover:cursor-pointer text-gold-main font-medium text-sm px-2 py-[2px] rounded-full border border-gold-main transition-all duration-200 hover:bg-gold-main hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>



          {/* <div className='w-full   p-2  mb-4'>
            <h1 className='text-gray-700  font-bold text-xl'>
              <span className='text-gold-main text-2xl'>—</span>  Countries we work with
            </h1>

            <div className='mt-3'>
              {
                blog?.slice(-3).map((blog) => {
                  return (
                    <div
                      className='hover:cursor-pointer'
                      onClick={() => navigate(`/blog/${blog._id}`)}
                    >
                      <img src={blog.thumbnailURL} className='mt-5' />
                    </div>
                  )
                })
              }
            </div>
          </div> */}
          <div>
            <p className=" font-semibold text-2xl ">Top countries for MBBS</p>
            <div className="rounded-xl my-4 space-y-4 px-2">
              {countries.slice(0,13)?.map((country) => (
                <Link
                  to={`/MbbsCountryDetailed/${country._id}`}
                  key={country._id}
                  className="flex items-center gap-4 p-2 py-5 bg-white rounded-xl shadow-md border hover:border-gold-main hover:bg-gold-main-100 group"
                >
                  <img
                    src={country.flagURL}
                    className="w-20 h-20 rounded-full border-2 border-red-200 shadow-sm group-hover:scale-105 transition-transform"
                    alt={country.name}
                  />
                  <p className="text-xl font-semibold text-gray-800 group-hover:text-gold-main">
                    {country.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
