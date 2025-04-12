import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetOneBlogMutation } from '../../slices/adminApiSlice';
import { SingleBlogs } from '../../slices/blogSlice';
import { toast } from 'react-toastify';
import styled, { keyframes } from 'styled-components';


export default function BlogDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { SingleBlog } = useSelector(state => state.blog);
    const [GetOneBlog, { isSuccess }] = useGetOneBlogMutation();

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

    return (
        <div className="w-full">
            {/* Banner Image */}
            <div className="w-full relative overflow-hidden">
  <img
    className="object-cover h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full"
    src={SingleBlog.bannerURL}
    alt="Blog Banner"
  />
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
    <div className="shine-bar"></div>
  </div>
</div>



            {/* Blog Title (p tag) */}
            <div className="p-4">
                <h6 className=" font-semibold ">
                    {SingleBlog.title}
                </h6>
            </div>

            {/* Blog Content */}
            <div className="p-4 sm:p-6 md:p-8 mx-4 sm:mx-8 md:mx-12 lg:mx-[200px]  shadow-xl">
                <div className="prose sm:prose-lg lg:prose-xl" dangerouslySetInnerHTML={{ __html: SingleBlog?.content }} ></div>
            </div>
        </div>
    )
}
