import React, { useEffect } from 'react'
import { useFetchBlogMutation } from '../../slices/adminApiSlice';
import { FetchBlogs } from '../../slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BlogCard from '../../components/Layouts/BlogCard';
import { Link } from 'react-router-dom';

export default function BlogScreeen() {
    const [FetchBlog,{isSuccess}] = useFetchBlogMutation()
    const { blog } = useSelector((state) => state.blog);

    const dispatch = useDispatch()     
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
      console.log('blog',blog)
  return (
    <div>
        <div className='flex flex-col items-center justify-center space-y-10 bg-blue-200 p-10'>
            <div className='flex flex-row space-x-6'>
                <span className='text-6xl font-bold text-blue-main'>Read</span>
                <span className='text-6xl font-bold text-gold-main'>Our</span>
                <span className='text-6xl font-bold text-blue-main'>Blog</span>


            </div>
            <div>
            <span className='text-3xl font-bold'>Stay Updated with the Latest Insights and Stories</span>

            </div>
            <div className='flex flex-col items-center justify-center'>
                <span className='text-sm font-bold text-gray-600'>Stay informed with our curated articles on studying abroad,</span>
                <span  className='text-sm font-bold text-gray-600'>edical courses, and university life.</span>
            </div>

        </div>
        
        <div className='px-[150px] my-[10px] flex flex-row w-full justify-between space-x-5'>
            <div className='w-full grid grid-cols-3 p-4 gap-6'>
                
                    {blog && blog?.length > 0 ? (
                        blog?.map((item) => <BlogCard key={item?._id} blog={item} />)
                    ) : (
                        <p>No blogs available</p>
                    )}
                
            </div>
           

        </div>
    </div>
  )
}
