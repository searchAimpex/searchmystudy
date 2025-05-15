import React, { useEffect, useState } from 'react';
import { useCountryAllFetchMutation, useFetchBlogMutation } from '../../slices/adminApiSlice';
import { FetchBlogs } from '../../slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BlogCard from '../../components/Layouts/BlogCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function BlogScreen() {
  const [FetchBlog] = useFetchBlogMutation();
  const [CountryFetch] = useCountryAllFetchMutation();
  const { blog } = useSelector((state) => state.blog);
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
      <div className='flex flex-col items-center justify-center space-y-6 bg-blue-200 px-4 py-10 md:py-16 text-center'>
        <div className='flex flex-wrap justify-center gap-2 sm:gap-4'>
          <span className='text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main'>Read</span>
          <span className='text-3xl md:text-4xl lg:text-5xl font-bold text-gold-main'>Our</span>
          <span className='text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main'>Blog</span>
        </div>
        <span className='text-lg md:text-2xl font-bold'>Stay Updated with the Latest Insights and Stories</span>
        <p className='text-sm sm:text-base text-gray-600'>Stay informed with our curated articles on studying abroad, medical courses, and university life.</p>
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
              {country.map((country) => (
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



          <div className='w-full   p-2  mb-4'>
            <h1 className='text-gray-700  font-bold text-xl'>
              {/* <span className='text-gold-main text-2xl'>—</span>  With */}
            </h1>

            <div className='mt-3'>
              {
                blog?.slice(-6).map((blog) => {
                  return (
                    <div
                      className='hover:cursor-pointer'
                      onClick={() => navigate(`/blog/${blog._id}`)}
                    >
                      <img src={blog.thumbnailURL} className='mt-5' />
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
