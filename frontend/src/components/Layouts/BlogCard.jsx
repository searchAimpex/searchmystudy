import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/blog/${blog._id}`)} className="p-4 cursor-pointer border  shadow-lg rounded-lg flex flex-col">
            <div className="w-full rounded-lg overflow-hidden">
                <div className="w-full h-[250px] relative overflow-hidden rounded-lg">
                    <img
                        src={blog?.thumbnailURL}
                        alt={blog?.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-lg">
                        <div className="shine-bar"></div>
                    </div>
                </div>

            </div>
            <div className=" flex flex-col justify-between space-y-6 flex-grow">
                <div className="flex-grow">
                    <p >
                        {blog?.title?.split(" ").slice(0, 50).join(" ")}
                        {blog?.title?.split(" ").length > 50 && "..."}


                        {(blog?.title?.split(" ").length > 50 || blog?.content?.split(" ").length > 100) && (
                            <div className="font-semibold">
                                <button
                                    onClick={() => navigate(`/blog/${blog._id}`)}
                                    className='mx-[-18px]'
                                    style={{ backgroundColor: 'transparent', color: '#db7e19 ' }}
                                >
                                    Read More
                                </button>
                            </div>
                        )}
                    </p>


                </div>


            </div>

        </div>
    );
};

export default BlogCard;
