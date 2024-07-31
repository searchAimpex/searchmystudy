import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetOneBlogMutation } from '../../slices/adminApiSlice';
import {  SingleBlogs } from '../../slices/blogSlice';
import { toast } from 'react-toastify';

export default function BlogDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {SingleBlog} = useSelector(state=>state.blog)
    const [GetOneBlog,{isSuccess}] = useGetOneBlogMutation()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetOneBlog(id).unwrap();
                dispatch(SingleBlogs(result));
            } catch (error) {
                toast.error(`Error getting Blogs: ${error.message}`);
            }
        };
        fetchData();
    }, [id, dispatch, GetOneBlog]);
    console.log("fix")
  return (
    <div className='w-full'>
        <div className='w-full'>
            <img className='object-cover h-[600px] w-full'  src={SingleBlog.bannerURL} />
        </div>
        <div className='p-8 mx-[150px]'>
            <h1 className='text-4xl font-bold justify-center text-custom-color'>{SingleBlog.title}</h1>
        </div>
        <div className='p-8 mx-[200px]'>
            <div dangerouslySetInnerHTML={{ __html: SingleBlog?.content }} ></div>
        </div>
    </div>
  )
}
