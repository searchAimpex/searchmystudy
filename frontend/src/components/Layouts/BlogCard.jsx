import React from "react";
import { useNavigate } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EditIcon from "@mui/icons-material/Edit";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  // const getTruncatedContent = (text, maxChars = 400) => {
  //   if (!text) return "";
  //   return text.length > maxChars ? text.substring(0, maxChars) + "..." : text;
  // };

  return (
    <div
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="cursor-pointer shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row bg-white hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Thumbnail */}
      <div className="w-full md:w-[600px] relative">
        <img
          src={blog.thumbnailURL}
          alt="Loading..."
          className="w-full h-auto md:h-[377px] object-contain"
        />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="shine-bar"></div>
        </div>
      </div>



      {/* Content */}
      <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h1 className="font-semibold text-lg md:text-xl text-black hover:text-red-500 transition-colors duration-200 mb-2 line-clamp-2">
            {blog?.title}
          </h1>

          <div className="text-gray-700 mb-3 prose max-w-none overflow-hidden">
            <div
              dangerouslySetInnerHTML={{ __html: blog?.content }}
              className="line-clamp-5"
            />
          </div>

          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blog/${blog._id}`);
            }}
            className="font-semibold text-gold-main hover:underline cursor-pointer"
          >
            Know more
          </span>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between mt-4 md:mt-8 gap-4 md:gap-20">
          <div className="flex items-center gap-1 text-gold-main">
            
            {/* <span className="text-sm">{blog.date}</span> */}
          </div>

          <div className="flex items-center gap-1 text-gold-main">
            <DateRangeIcon />
           <span className="text-sm">{blog.date}</span>
          </div>
        </div>
      </div>
    </div>


  );
};

export default BlogCard;
