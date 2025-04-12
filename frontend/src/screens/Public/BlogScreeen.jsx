import React, { useEffect } from 'react';
import { useFetchBlogMutation } from '../../slices/adminApiSlice';
import { FetchBlogs } from '../../slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BlogCard from '../../components/Layouts/BlogCard';
import { Link } from 'react-router-dom';

export default function BlogScreen() {
  const [FetchBlog, { isSuccess }] = useFetchBlogMutation();
  const { blog } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchBlog();
        dispatch(FetchBlogs(res.data));
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, [FetchBlog]);

  return (
    <div>
      {/* Header Section */}
      <div className='flex flex-col items-center justify-center space-y-6 bg-blue-200 px-4 py-10 md:py-16'>
        <div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6'>
          <span className='text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-main'>
            Read
          </span>
          <span className='text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gold-main'>
            Our
          </span>
          <span className='text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-main'>
            Blog
          </span>
        </div>

        <div>
          <span className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center block'>
            Stay Updated with the Latest Insights and Stories
          </span>
        </div>

        <div className='flex flex-col items-center justify-center space-y-1 text-center'>
          <span className='text-sm sm:text-base font-medium text-gray-600'>
            Stay informed with our curated articles on studying abroad,
          </span>
          <span className='text-sm sm:text-base font-medium text-gray-600'>
            medical courses, and university life.
          </span>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className='p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {blog && blog?.length > 0 ? (
            blog.map((item) => <BlogCard key={item?._id} blog={item} />)
          ) : (
            <p className='col-span-full text-center text-gray-500'>No blogs available</p>
          )}
        </div>
      </div>
    </div>
  );
}
