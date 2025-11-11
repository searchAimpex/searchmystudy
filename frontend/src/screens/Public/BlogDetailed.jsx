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
    console.log(SingleBlog);

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
        <div className="w-full ">
            <div className="w-full  relative overflow-hidden">
                {/* Banner Image */}
                <img
                    className="object-cover h-full"
                    src={SingleBlog.bannerURL}
                    alt="Blog Banner"
                />

                {/* Overlay with title */}
                {/* <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center px-4">
                    <p className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center">
                        {SingleBlog.title}
                    </p>
                </div> */}
            </div>


            <div className="w-full bg-gray-100 border-2  flex justify-center">
                <div className="w-full   mt-10 flex flex-col lg:flex-row gap-6">
                    {/* Left Content (Blog) */}
                    <div className="w-full lg:w-[75%] ">
                        {/* Banner Image */}
                        <div className="w-full relative p-4 lg:p-6 overflow-hidden">
                            <div className="flex items-center">
                                <DateRangeIcon className="text-gold-main mb-1 lg:mb-2" />
                                <p className="text-sm lg:text-lg ml-1 text-gold-main font-bold">Feb 5, 2025</p>
                                
                            </div>
                            <img
                                className="rounded-lg shadow"
                                src={SingleBlog.thumbnailURL}
                                alt="Blog Banner"
                            />
                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                                <div className="shine-bar"></div>
                            </div>
                        </div>

                        {/* Blog Title */}
                       <h6 className="font-bold ml-2 text-2xl md:text-3xl lg:text-4xl">
  {(() => {
    const title = SingleBlog.title || "";
    const middle = Math.ceil(title.length / 2);
    const firstHalf = title.slice(0, middle);
    const secondHalf = title.slice(middle);
    return (
      <>
        <span className="text-blue-main">{firstHalf}</span>
        <span className="text-gold-main">{secondHalf}</span>
      </>
    );
  })()}
</h6>


                        {/* Blog Content */}
                        <div className="p-4">
                            <div
                                className="prose prose-sm sm:prose lg:prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: SingleBlog?.content }}
                            ></div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-[25%] p-4">
                        {/* Latest Blog List */}
                        <h1 className="text-gray-700 font-bold mt-4 text-xl lg:text-2xl mb-4">
                            <span className="text-gold-main">—</span> Latest Blog
                        </h1>
                        {blog?.slice(0, 7).map((blog) => (
                            <div
                                onClick={() => navigate(`/blog/${blog._id}`)}
                                key={blog._id}
                                className="hover:cursor-pointer flex gap-3 pb-5"
                            >
                                <img
                                    src={blog.thumbnailURL}
                                    className="rounded-xl w-[80px] h-[70px] sm:w-[90px] sm:h-[85px] object-cover"
                                    alt={blog.title}
                                />
                                <div className="flex flex-col">
                                    <p className="text-xs sm:text-sm text-gold-main font-semibold">Feb 28, 2025</p>
                                    <div
                                        className="prose max-w-none text-xs sm:text-sm pt-1 text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: getTruncatedContent(blog?.content) }}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Countries */}
                        <div className="w-full bg-white shadow-lg p-3 sm:p-4 rounded-lg mb-4">
                            <h1 className="text-gray-700 font-bold text-lg sm:text-xl">
                                <span className="text-gold-main text-2xl">—</span> Countries We Work With
                            </h1>
                            <div className="mt-3">
                                {country.map((country) => (
                                    <p
                                        key={country._id}
                                        onClick={() => navigate(`/MbbsCountryDetailed/${country._id}`)}
                                        className="cursor-pointer text-gold-main font-semibold mb-2 text-base sm:text-lg hover:text-black transition-colors"
                                    >
                                        <span className="text-black mr-2">&rarr;</span> {country.name}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="w-full bg-white shadow-lg p-3 sm:p-4 rounded-lg mb-4">
                            <h1 className="text-gray-700 font-bold text-lg sm:text-xl mb-3">
                                <span className="text-gold-main text-2xl">—</span> Tags
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                {medicalStudyAbroadTags.slice(0, 5).map((tag, index) => (
                                    <span
                                        key={index}
                                        className="hover:cursor-pointer text-gold-main font-medium text-xs sm:text-sm px-2 py-[2px] rounded-full border border-gold-main transition-all duration-200 hover:bg-gold-main hover:text-white"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
