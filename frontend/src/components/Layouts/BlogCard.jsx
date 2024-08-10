import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();

    return (
        <div className="p-8 border shadow-lg rounded-lg flex flex-col">
            <div className="w-full rounded-lg overflow-hidden">
                <img
                    src={blog?.thumbnailURL}
                    alt={blog?.title}
                    className="w-full h-[250px] object-cover rounded-lg"
                />
            </div>
            <div className="p-5 flex flex-col justify-between space-y-6 flex-grow">
                <div className="flex-grow">
                    <h2 className="font-bold text-xl">{blog?.title}</h2>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: blog?.content?.slice(0, 200) + (blog?.content?.length > 200 ? "..." : "")
                        }}
                        className="text-gray-500"
                    ></div>
                </div>
                <div className="flex flex-row justify-between items-center font-bold">
                    <button
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className="text-white font-bold bg-blue-main p-2 rounded-md"
                    >
                        Read More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
