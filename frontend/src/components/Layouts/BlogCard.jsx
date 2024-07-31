import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const navigate = useNavigate()
  return (
    <div className="p-4 border shadow-xl flex flex-row my-2">
      <div className="w-1/3">
        <img src={blog?.thumbnailURL} alt={blog?.title} className="w-full h-auto" />
      </div>
      <div className="w-2/3 pl-4 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-xl text-custom-color mb-2">{blog?.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: blog?.content?.slice(0, 522) }} className="text-gray-700"></div>
        </div>
        <div className="flex flex-row justify-between font-bold mt-4">
          <span className='text-custom-color'>Posted At - {blog?.createdAt?.split('T')[0]}</span>
          <button onClick={()=>navigate(`/blog/${blog._id}`)} className="text-custom-color border border-custom-color p-2 rounded-sm">Read</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
