import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const popularCategories = [
  { title: "Business Administration", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/22562256bab4e8a3e196a46e55bc978a84d8c3ea49eaae6058e531bab66723bb?" },
  { title: "Engineering", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d5a7f0a6c131af2a914d95d712e4a88f01cddae4962dd5826e9a32f2888f91b9?" },
  { title: "Information Technology", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7f5470e156043bce717236277c07723ee9b9347c0346bb6652548bf79aae82b?" },
  { title: "Nursing", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f931f1dfa327ec049882988d5aff68b67d878d9455911f861df653589189a4cb?" },
  { title: "Economics", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f5cf435b24ba1b9500109159ed90d4b419036fa9e5cec3fc5e708334c22fcee?" },
  { title: "Law", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c41d41aa1aede2e20138e665bab6bcb7a30b5c74dc5d96dbfbcd0f5ea37540ab?" },
  { title: "Computer Science", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7f5470e156043bce717236277c07723ee9b9347c0346bb6652548bf79aae82b?" },
  { title: "Psychology", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d52d08cf2c689d48eba62f8634863623fb367a7637e083003d75d0983edc42ea?" },
  { title: "Arts", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7f5470e156043bce717236277c07723ee9b9347c0346bb6652548bf79aae82b?" },
  { title: "Artificial Intelligence", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7f5470e156043bce717236277c07723ee9b9347c0346bb6652548bf79aae82b?" },
  { title: "Architecture", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/777e7ebf25b35998257dbdd230b2b52adaba1e758aeedaeb9147561ee517223c?" },
  { title: "Media and Communication", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f5cf435b24ba1b9500109159ed90d4b419036fa9e5cec3fc5e708334c22fcee?" },
  { title: "Environmental Science", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d5a7f0a6c131af2a914d95d712e4a88f01cddae4962dd5826e9a32f2888f91b9?" },
  { title: "Design", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d52d08cf2c689d48eba62f8634863623fb367a7637e083003d75d0983edc42ea?" },
  { title: "Hospitality Management", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/22562256bab4e8a3e196a46e55bc978a84d8c3ea49eaae6058e531bab66723bb?" },
  { title: "Medical", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7f5470e156043bce717236277c07723ee9b9347c0346bb6652548bf79aae82b?" },
];

const PopularCategories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate('/course/all', { state: { filters: {level: category } } });
  };

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {popularCategories.map((category) => (
        <div
          key={category.title}
          className="bg-white rounded-lg flex items-center  border-gold-main border cursor-pointer transform transition duration-300 hover:scale-105 "
          onClick={() => handleClick(category.title)}
        >
          <img
            src={category.imageSrc}
            alt={category.title}
            className="w-20 h-20 object-cover rounded-l-lg"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-blue-main">{category.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PopularCategories;