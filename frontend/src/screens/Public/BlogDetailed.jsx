import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchBlogMutation, useGetOneBlogMutation, useCountryAllFetchMutation } from '../../slices/adminApiSlice';
import { SingleBlogs } from '../../slices/blogSlice';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import styled, { keyframes } from 'styled-components';
import blog1 from '../../assets/blog1.jpg';
import DateRangeIcon from '@mui/icons-material/DateRange';
// import poland from '../assets/poland.png';
export default function BlogDetailed() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { SingleBlog } = useSelector(state => state.blog);
    const [searchQuery, setSearchQuery] = useState('');
    const [GetOneBlog, { isSuccess }] = useGetOneBlogMutation();
    // const { blog } = useSelector((state) => state.blog);
    const [blog, setBlog] = useState()
    const [country, setcountry] = useState([]);
    const [CountryFetch] = useCountryAllFetchMutation();
    // console.log(blog,"))))))))))))))))))))))))))))))))))))))))))))))))))");

    const [fetchblog, { isLoading }] = useFetchBlogMutation();
    const getTruncatedContent = (text, maxChars = 95) => {
        if (!text) return '';
        return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetOneBlog(id).unwrap();
                dispatch(SingleBlogs(result));

                const result1 = await fetchblog().unwrap();
                setBlog(result1)
                // console.log(result1,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

                const res = await CountryFetch().unwrap();
                const shuffled = [...res].sort(() => 0.5 - Math.random());
                setcountry(shuffled.slice(0, 5));
            } catch (error) {
                toast.error(`Error getting Blogs: ${error.message}`);
            }
        };
        fetchData();
    }, [id, dispatch, GetOneBlog]);


    const medicalStudyAbroadTags = [
        "Study MBBS Abroad", "MBBS Admission", "Medical Universities", "MBBS in Russia",
        "MBBS in Philippines", "NEET and MBBS", "FMGE Preparation", "MBBS Scholarships",
        "Visa Process", "Student Life Abroad"
    ];



    return (
        <div className="w-full">
            <div className="w-full relative overflow-hidden">
                <img
                    className="object-cover w-full h-[300px] sm:h-[200px] md:h-[200px] lg:h-[250px] w-full"
                    src={SingleBlog.bannerURL}
                    alt="Blog Banner"
                />

                {/* Overlay div with red background */}
                <div className="absolute top-0 bg-gray-300 left-0 w-full h-full  bg-opacity-50 flex items-center justify-center">
                    <p className="text-white text-5xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold">
                        {SingleBlog.title}
                    </p>
                </div>
            </div>


            <div className='w-[100%] bg-gray-100 mt-5 flex' >

                <div className='w-[75%]'>
                    {/* Banner Image */}
                    <div className="w-full relative p-6  overflow-hidden">
                        <div className='flex'>
                            <DateRangeIcon className='text-gold-main mb-5' />
                            <p className='text-lg  ml-1 text-gold-main font-bold'>Feb 5,2025</p>
                        </div>
                        <img
                            className=" rounded-lg w-[1200px] h-[600px]"
                            src={SingleBlog.bannerURL}
                            alt="Blog Banner"
                        />
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                            <div className="shine-bar"></div>
                        </div>
                    </div>



                    {/* Blog Title (p tag) */}
                    <div className="p-4">
                        <h6 className=" font-bold ml-2 text-4xl ">
                            {SingleBlog.title}
                        </h6>
                    </div>

                    {/* Blog Content */}
                    <div className=" p-4">
                        <div className="prose sm:prose-lg lg:prose-xl" dangerouslySetInnerHTML={{ __html: SingleBlog?.content }} ></div>
                    </div>
                </div>

                <div className=' w-[25%] '>
                    {/* <div className="w-full  mt-5 max-w-md mx-auto mb-5">
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
                    </div> */}

                    {/* Latest Blog List */}
                    <h1 className='text-gray-700 font-bold mt-4 text-2xl mb-4'>
                        <span className='text-gold-main '>—</span> Latest Blog
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
                </div>


            </div>


        </div>
    )
}
