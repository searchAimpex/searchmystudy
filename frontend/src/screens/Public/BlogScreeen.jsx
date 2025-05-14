import React, { useEffect, useState } from 'react';
import { useCountryAllFetchMutation, useFetchBlogMutation } from '../../slices/adminApiSlice';
import { FetchBlogs } from '../../slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BlogCard from '../../components/Layouts/BlogCard';

export default function BlogScreen() {
  const [FetchBlog] = useFetchBlogMutation();
  const { blog } = useSelector((state) => state.blog);
  const [CountryFetch] = useCountryAllFetchMutation();
  const [country,setcountry] = useState()
  const dispatch = useDispatch();

  const getTruncatedContent = (text, maxChars = 70) => {
    if (!text) return '';
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchBlog();
        dispatch(FetchBlogs(res.data));


        const result = await CountryFetch().unwrap()
        console.dir(result,"/////////////////////////////////////") 
        setcountry(result)
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, [FetchBlog]);

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
              blog.map((item) => <BlogCard key={item?._id} blog={item} />)
            ) : (
              <p className='col-span-full text-center text-gray-500'>No blogs available</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className='w-full lg:w-1/4 px-4 py-4'>
          <h1 className='text-gray-700 font-bold text-2xl mb-4'>
            <span className='text-gold-main'>—</span> Latest Blog
          </h1>
          {blog?.slice(0, 5).map((blog) => (
            <div key={blog._id} className='flex gap-3 pb-5'>
              <img
                src={blog.thumbnailURL}
                className='rounded-xl w-[90px] h-[85px] object-cover'
                alt={blog.title}
              />
              <div className='flex flex-col'>
                <p className='text-sm text-gold-main font-semibold'>Feb 28, 2025</p>
                <p className='text-sm pt-1 text-gray-700'>{getTruncatedContent(blog.content)}</p>
              </div>
            </div>
          ))}



          <div className='w-full '>
          <h1 className='text-gray-700 font-bold text-xl bg-white mb-4'>
            <span className='text-gold-main'>—</span> Countries We Work With
          </h1>

          <div>
            {
              // country?.slice(0,5).map
            }
          </div>
            {/* <h1 className='text-semibold'><span className='text-gold-main'>— </span>Countries We Work With</h1> */}
          </div>
        </div>


        do
      </div>
    </div>
  );
}
