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
        <div className='px-[100px] mt-[100px] flex flex-row w-full justify-between items-center space-x-10'>
            <div className='h-[10px] w-full bg-custom-color rounded-xl' >

            </div>
            <div>
                <span className='text-4xl'>BLOGS</span>
            </div>
            <div className='h-[10px] w-full bg-custom-color  rounded-xl'>

            </div>
        </div>
        <div className='px-[150px] my-[10px] flex flex-row w-full justify-between space-x-5'>
            <div className='w-2/3 flex flex-col p-4'>
                
                    {blog && blog?.length > 0 ? (
                        blog?.map((item) => <BlogCard key={item?._id} blog={item} />)
                    ) : (
                        <p>No blogs available</p>
                    )}
                
            </div>
            <div className='w-1/3 flex flex-col w-full space-y-4 justify-start p-4'>
                <div>
                    <input className='w-full rounded-xl p-2 border border-custom-color' placeholder='Search' />
                </div>
                <div className='border border-custom-color p-4 rounded-xl'>
                    <div className='flex flex-row  items-center space-x-8'>
                        <div className='h-[10px] w-full bg-custom-color  rounded-xl'>

                        </div>
                        <div>
                            <span className='text-md font-bold inline'>Recent</span>
                        </div>
                        <div className='h-[10px] w-full bg-custom-color  rounded-xl'>
                    
                        </div>
                    </div>
                    <div>
                    {blog && blog?.length > 0 ? (
                                blog?.map((item) =>(
                                     <div key={item?._id} className='border-b border-custom-color px-4 py-2'>
                                        <Link to={`/blog/${item._id}`}>{item?.title}</Link>
                                    </div>
                                ))
                            ) : (
                                <p>No blogs available</p>
                            )}

                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
