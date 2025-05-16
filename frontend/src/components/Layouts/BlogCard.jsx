import React from 'react';
import { useNavigate } from 'react-router-dom';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EditIcon from '@mui/icons-material/Edit';
const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    // console.log(blog.content,"???????????????????????????????????");

    const getTruncatedContent = (text, maxChars = 400) => {
        if (!text) return '';
        return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
    };
    return (
        <div
            onClick={() => navigate(`/blog/${blog._id}`)}
            className="cursor-pointer shadow-lg rounded-xl h-[300px] overflow-hidden flex flex-col  md:flex-row bg-white hover:shadow-2xl transition-shadow duration-300 "
        // className=''
        >
            {/* Thumbnail */}
            <div className=" h-64 md:h-auto relative">
                <img
                    src={blog?.thumbnailURL}
                    alt="Loading..."
                    className="w-[500px] h-[100%] "
                />
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="shine-bar"></div>
                </div>
            </div>

            {/* Content */}
            <div className=" md:w-[100%] pl-5 pr-1  mt-3 ">
                <h1 className="font-semibold text-xl md:text-xl text-black hover:text-red-500  transition-colors duration-200 mb-2 line-clamp-2">
                    {blog?.title}
                </h1>
                <p className="text-l  text-gray-700 mb-3">
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: getTruncatedContent(blog?.content) }}
                    />

                    <span onClick={() => navigate(`/blog/${blog._id}`)} className='font-semibold hover:text-gold-main'> konw more</span>
                </p>

                <div className='flex gap-20 mt-8'>
                    <div className='flex'>
                        <DateRangeIcon className='text-gold-main ' />
                        <p className='text-sm mt-[2px] ml-1 text-gold-main'>{blog.date}</p>
                    </div>

                    <div className='flex'>
                        <EditIcon className='text-gold-main ' />
                        <p className='text-sm mt-[2px] ml-1 text-gold-main'>Feb 5,2025</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BlogCard;
