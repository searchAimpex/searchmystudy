import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import business  from "../../assets/icon/business.png"
import worker  from "../../assets/icon/worker.png"
import information  from "../../assets/icon/settings.png"
import law  from "../../assets/icon/paper.png"
import computer_science  from "../../assets/icon/computer-science.png"
import autism  from "../../assets/icon/autism.png"
import book  from "../../assets/icon/book.png"
import ai from "../../assets/icon/cloud.png"
import communication  from "../../assets/icon/communication.png"
import design  from "../../assets/icon/design.png"
import hospitality  from "../../assets/icon/cooperation.png"
import medical  from "../../assets/icon/medical.png"
import  evs from "../../assets/icon/science.png"
import  architect from "../../assets/icon/architect.png"
import  eco from "../../assets/icon/economy.png"
import  nurse from "../../assets/icon/nurse.png"
const popularCategories = [
  { title: "Medical", imageSrc: medical },
  { title: "Nursing", imageSrc: nurse },
  { title: "Pharmacy", imageSrc: design },
  { title: "Engineering", imageSrc: worker },
  { title: "Business Administration", imageSrc: business},
  { title: "Hospitality Management", imageSrc: hospitality },
  { title: "Information Technology", imageSrc:information },
  { title: "Computer Science", imageSrc:computer_science },
  { title: "Artificial Intelligence", imageSrc: ai },
  { title: "Media and Communication", imageSrc:communication},
  { title: "Economics", imageSrc: eco},
  { title: "Psychology", imageSrc: autism},
  { title: "Architecture", imageSrc: architect},
  { title: "Arts", imageSrc: book },
  { title: "Law", imageSrc: law },
  { title: "Environmental Science", imageSrc:evs  },

];

const PopularCategories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate('/course/all', { state: { filters: {level: category } } });
  };

  return (
    <div className=" grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {popularCategories.map((category) => (
        <div
          key={category.title}
          className="bg-white rounded-lg flex items-center  border-blue-main p-2 border cursor-pointer transform transition duration-300 hover:scale-105 "
          onClick={() => handleClick(category.title)}
        >
          <img
            src={category.imageSrc}
            alt={category.title}
            className="w-[70px]  object-cover rounded-l-lg"
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