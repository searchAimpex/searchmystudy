import asyncHandler from 'express-async-handler';
import Banner from "../models/bannerModel.js";
import Service from '../models/servicesModel.js';
import Testimonial from '../models/testimonialsModel.js';
import Counsellor from '../models/counsellorModel.js';
import Blog from '../models/blogModel.js';
import Country from '../models/countryModel.js';
import Province from '../models/provinceModel.js';
import University from '../models/universityModel.js';
import mongoose from 'mongoose'; // ✅ ES module-compatible
import Brevo from '@getbrevo/brevo';

import Course from '../models/courseModel.js';
import Webinar from '../models/webinarsModel.js';
import Media from '../models/mediaModel.js';
import CounsellerLead from '../models/counsellerLeadModel.js';
import HomeLead from '../models/homeLeadModel.js';
import ContactLead from '../models/contactLeadModel.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import Notification from '../models/notificationModel.js';
import Student from '../models/studentModel.js';
import { Ticket, TicketResponse } from '../models/ticketModel.js';
import Promotional from '../models/promotional.js';
import Profile from '../models/profileModel.js';
import Popup from '../models/popupModel.js';
import Upload from '../models/uploadModel.js';
import Commission from '../models/commissionModel.js';
import Loan from '../models/loanModel.js';
import Transaction from '../models/transactionModel.js';
import Nav from '../models/navModel.js';
import Files from '../models/fileModel.js';
import Video from '../models/videoModel.js';
import nodemailer from 'nodemailer';
import query from '../models/query.js';
import websiteDetail from '../models/websiteDetails.js';
import websiteProfile from '../models/webProfile.js';
import webinarleads from '../models/webinarLead.js';
import jwt from 'jsonwebtoken';
import contacts from '../models/contactModel.js';

// import jwt from 'jsonwebtoken';

// Controller to verify JWT token
export const verifyToken = (req, res) => {
  const token = req.params.token;

  //console.log(token, "::::::::::::::::::::::::::::::::::::::")
  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Token is required',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      message: 'Token is valid',
      userId: decoded.id,
      decoded,
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
        expiredAt: error.expiredAt,
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};



const test = asyncHandler(async (req, res) => {
  try {

    res.json({ msg: "working fine" });
  } catch (error) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }
});

// @desc    Admin Get All Banner & 
// @route   POST /api/admin/CreateBanner
// @access  Admin 
const createBanner = asyncHandler(async (req, res) => {
  try {
    const { title, imageURL, altName } = req.body;
    // Create new banner
    const banner = new Banner({ title, imageURL, altName });
    // Save to database
    await banner.save();
    res.json(banner);
  } catch (error) {
    res.status(401);
    throw new Error('Please enter all required fields');
  }
});
// @desc    Admin Get All Banner & 
// @route   POST /api/admin/FetchAllBanner
// @access  Admin 
const fetchAllBanner = asyncHandler(async (req, res, next) => {
  try {
    const banner = await Banner.find({});
    res.json(banner);

  } catch (error) {
    res.status(400);
    throw new Error('Not Able to fetch give refresh');
  }
})

// @desc    Admin Get All Banner & 
// @route   DELETE /api/admin/DeleteBanner/:id
// @access  Admin 
const deleteBanner = asyncHandler(async (req, res, next) => {
  try {
    const bannerId = req.params.id;
    //console.log("params", req.params)
    const banner = await Banner.findOneAndDelete({ _id: bannerId })
    res.json(banner);

  } catch (error) {
    res.status(400);
    throw new Error('Not Able to delete');
  }
})


// @desc    Create a new service
// @route   POST /api/admin/CreateService
// @access  Admin
const createService = asyncHandler(async (req, res) => {
  const { title, banner, heading, card, sectionOne, sectionTwo, sectionThree, elegiblity } = req.body;

  const service = new Service({
    title,
    banner,
    heading,
    card,
    sectionOne,
    sectionTwo,
    sectionThree,
    elegiblity
  });

  const createdService = await service.save();
  res.status(201).json(createdService);
});

// @desc    Get all services
// @route   GET /api/admin/Services/all
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({});
  res.json(services);
});

// @desc    Get a service by ID
// @route   GET /api/admin/Service/:id
// @access  Public
const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    res.json(service);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Update a service
// @route   PUT /api/admin/UpdateServices/:id
// @access  Admin
const updateService = asyncHandler(async (req, res) => {
  const { title, banner, heading, card, sectionOne, sectionTwo, sectionThree, elegiblity } = req.body;

  const service = await Service.findById(req.params.id);

  if (service) {
    service.title = title;
    service.banner = banner;
    service.heading = heading;
    service.card = card;
    service.sectionOne = sectionOne;
    service.sectionTwo = sectionTwo;
    service.sectionThree = sectionThree;
    service.elegiblity = elegiblity;

    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Delete a service
// @route   DELETE /api/admin/DeleteService/:id
// @access  Admin
const deleteService = asyncHandler(async (req, res) => {
  // Expect an array of IDs in req.body.ids
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    res.status(400);
    throw new Error("Please provide an array of service IDs to delete");
  }

  // Delete all services with IDs in the array
  const result = await Service.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount > 0) {
    //console.log("Services deleted:", result.deletedCount);
    res.json({ message: `${result.deletedCount} service(s) deleted successfully` });
  } else {
    res.status(404);
    throw new Error("No services found with the given IDs");
  }
});


// @desc    Create a new testimonial
// @route   POST /api/testimonials/create
// @access  Admin
const createTestimonial = asyncHandler(async (req, res) => {

  // //console.log(req.body, "-------------------------------");
  const testimonial = new Testimonial(req.body);
  const createdTestimonial = await testimonial.save();
  // //console.log(testimonial, "-----------------------------------");
  res.status(201).json(createdTestimonial);
});

// @desc    Get all testimonials
// @route   GET /api/testimonials/all
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({});
  //console.log(testimonials, "------------------------------------------------------");

  res.json(testimonials);
});

// @desc    Get a single testimonial by ID
// @route   GET /api/testimonials/get/:id
// @access  Public
const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});

// @desc    Update a testimonial
// @route   PUT /api/testimonials/update/:id
// @access  Admin

const updateTestimonial = asyncHandler(async (req, res) => {
  const updatedTestimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    { ...req.body }, // update everything from req.body
    { new: true, runValidators: true } // return updated doc & run schema validations
  );

  if (!updatedTestimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  res.json(updatedTestimonial);
});

export default updateTestimonial;


// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/delete/:id
// @access  Admin
const deleteTestimonial = asyncHandler(async (req, res) => {
  // Expect an array of IDs in req.body.ids
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    res.status(400);
    throw new Error("Please provide an array of testimonial IDs to delete");
  }

  // Delete all testimonials with IDs in the array
  const result = await Testimonial.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount > 0) {
    //console.log("Testimonials deleted:", result.deletedCount);
    res.json({ message: `${result.deletedCount} testimonial(s) deleted successfully` });
  } else {
    res.status(404);
    throw new Error("No testimonials found with the given IDs");
  }
});





// @desc    Create a new counsellor
// @route   POST /CreateCounsellor
// @access  Public
const createCounsellor = async (req, res) => {
  const { name, imageURL, experience, course } = req.body;

  if (!name || !imageURL || !course || !experience) {
    res.status(400).json({ message: 'Please provide all required fields' });
    return;
  }

  const counsellor = new Counsellor({
    name,
    imageURL,
    experience,
    course,
  });

  try {
    const createdCounsellor = await counsellor.save();
    res.status(201).json(createdCounsellor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get all counsellors
// @route   GET /GetCounsellors/all
// @access  Public
const getCounsellors = async (req, res) => {
  try {
    const counsellors = await Counsellor.find({});
    res.json(counsellors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a counsellor by ID
// @route   GET /GetCounsellor/:id
// @access  Public
const getCounsellorById = async (req, res) => {
  try {
    const counsellor = await Counsellor.findById(req.params.id);

    if (counsellor) {
      res.json(counsellor);
    } else {
      res.status(404).json({ message: 'Counsellor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a counsellor
// @route   PUT /UpdateCounsellors/:id
// @access  Public
const updateCounsellor = async (req, res) => {
  const { name, imageURL, experience, course } = req.body;
  //console.log(req.body, "--------------------------------------");

  try {
    const counsellor = await Counsellor.findById(req.params.id);

    if (counsellor) {
      counsellor.name = name || counsellor.name;
      counsellor.imageURL = imageURL || counsellor.imageURL;
      counsellor.experience = experience || counsellor.experience;
      counsellor.course = course || counsellor.course;

      const updatedCounsellor = await counsellor.save();
      res.json(updatedCounsellor);
    } else {
      res.status(404).json({ message: 'Counsellor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc    Delete a counsellor
// @route   DELETE /DeleteCounsellors/:id
// @access  Public
//const deleteCounsellor = async (req, res) => {
// try {
//    const counsellor = await Counsellor.findOneAndDelete({_id:req.params.id});

//   if (counsellor) {
//     res.json(counsellor);
//   } else {
//     res.status(404).json({ message: 'Counsellor not found' });
//   }
// } catch (error) {
//   res.status(500).json({ message: error.message });
// }
//};


const deleteCounsellor = async (req, res) => {
  try {
    // expecting req.body.ids = [id1, id2, id3...]
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No counsellor IDs provided" });
    }

    const result = await Counsellor.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      res.json({ message: `${result.deletedCount} counsellor(s) deleted successfully` });
    } else {
      res.status(404).json({ message: "No counsellors found for given IDs" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Public
const createBlog = asyncHandler(async (req, res) => {
  const { title, bannerURL, content, thumbnailURL, date } = req.body;

  // Field-wise validation
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required." });
  }

  if (!bannerURL || bannerURL.trim() === "") {
    return res.status(400).json({ message: "Banner URL is required." });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Content is required." });
  }

  if (!thumbnailURL || thumbnailURL.trim() === "") {
    return res.status(400).json({ message: "Thumbnail URL is required." });
  }

  if (!date || date.trim() === "") {
    return res.status(400).json({ message: "Date is required." });
  }

  // Create new blog
  const blog = new Blog({
    title,
    bannerURL,
    content,
    date,
    thumbnailURL,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// @desc    Get a blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Public
const updateBlog = asyncHandler(async (req, res) => {
  const { title, bannerURL, content, thumbnailURL } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title || blog.title;
    blog.bannerURL = bannerURL || blog.bannerURL;
    blog.content = content || blog.content;
    blog.thumbnailURL = thumbnailURL || blog.thumbnailURL;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Public
const deleteBlog = asyncHandler(async (req, res) => {
  const { ids } = req.body; // Expecting an array of IDs in the request body
  //console.log(ids, "-------------------------------------------------")
  if (!Array.isArray(ids) || ids.length === 0) {
    res.status(400);
    throw new Error('No blog IDs provided');
  }

  const result = await Blog.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount > 0) {
    res.json({ message: `${result.deletedCount} blogs deleted successfully.` });
  } else {
    res.status(404);
    throw new Error('No blogs found with the provided IDs');
  }
});

// @desc    Create a new country
// @route   POST /countries
// @access  Public
const createCountry = asyncHandler(async (req, res) => {
  const { name, bannerURL, description, sections, mbbsAbroad, flagURL, elegiblity, bullet, faq, MbbsSections } = req.body;

  // Check if country with the same name already exists
  const existingCountry = await Country.findOne({ name });

  if (existingCountry) {
    // If country already exists, return an error message
    return res.status(400).json({ message: 'Country with this name already exists.' });
  }

  // If no existing country, create a new one
  const country = new Country({
    name,
    bannerURL,
    description,
    sections,
    mbbsAbroad,
    flagURL,
    elegiblity,
    bullet,
    faq,
    MbbsSections,
  });

  // Save the new country to the database
  const createdCountry = await country.save();

  // Send back the created country
  res.status(201).json(createdCountry);
});

// @desc    Get all countries
// @route   GET /countries
// @access  Public
const getCountries = asyncHandler(async (req, res) => {
  const countries = await Country.find()
  res.json(countries);
});

// @desc    Get all countries
// @route   GET /countries
// @access  Public
const getAllCountries = asyncHandler(async (req, res) => {
  const countries = await Country.find({})
  res.json(countries);
});


// @desc    Get single country
// @route   GET /countries/:id
// @access  Public
// const getCountryById = asyncHandler(async (req, res) => {
//   const country = await Country.findById(req.params.id).populate('Province')
//   //console.log("country",country)
//   if (country) {
//     res.json(country);
//   } else {
//     res.status(404);
//     throw new Error('Country not found');
//   }
// });
const getCountryById = asyncHandler(async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);

    // Check if the Province field exists, and only then populate it
    if (country) {
      if (country.Province) {
        await country.populate('Province'); // Populate Province if it exists
      }
      //console.log("country", country);
      res.json(country);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update a country
// @route   PUT /countries/:id
// @access  Public
// const updateCountry = asyncHandler(async (req, res) => {
//   const { name, bannerURL, description, sections, provinces,mbbsAbroad,faq ,MbbsSections} = req.body;

//   const country = await Country.findById(req.params.id);

//   // //console.log("counbtry",country,status)
//   if (country) {
//     country.name = name || country.name;
//     country.bannerURL = bannerURL || country.bannerURL;
//     country.description = description || country.description;
//     country.sections = sections || country.sections;
//     country.provinces = provinces || country.provinces;
//     country.mbbsAbroad = mbbsAbroad;
//     country.faq = faq || country.faq;
//     country.MbbsSections = MbbsSections || country.MbbsSections;

//     const updatedCountry = await country.save();
//     res.json(updatedCountry);
//   } else {
//     res.status(404);
//     throw new Error('Country not found');
//   }
// });

const updateCountry = asyncHandler(async (req, res) => {
  const { name, bannerURL, description, sections, provinces, mbbsAbroad, faq, MbbsSections } = req.body;

  // Ensure that we find the country by ID
  const country = await Country.findById(req.params.id);

  if (country) {
    // Log the existing country data to compare with the incoming data
    //console.log("Existing country data:", country);

    // Only update the fields that are provided, else keep existing values
    country.name = name || country.name;
    country.bannerURL = bannerURL || country.bannerURL;
    country.description = description || country.description;
    country.sections = sections || country.sections;
    country.provinces = provinces || country.provinces;
    country.mbbsAbroad = mbbsAbroad !== undefined ? mbbsAbroad : country.mbbsAbroad;  // Avoid overwriting with undefined
    country.faq = faq || country.faq;
    country.MbbsSections = MbbsSections || country.MbbsSections;

    // Log the updated country data to verify the changes
    //console.log("Updated country data:", country);

    // Save the updated country to the database
    const updatedCountry = await country.save();
    res.json(updatedCountry);
  } else {
    // If the country is not found
    res.status(404);
    throw new Error('Country not found');
  }
});


// @desc    Delete a country
// @route   DELETE /countries/:id
// @access  Public
// const deleteCountry = asyncHandler(async (req, res) => {
//   //console.log("fix-->",req.params.id)
//   const country = await Country.findByIdAndDelete({_id:req.params.id});

//   if (country) {
//     res.json(country);
//   } else {
//     res.status(404);
//     throw new Error('Country not found');
//   }
// });


export const deleteCountries = asyncHandler(async (req, res) => {
  const { ids } = req.body; // <-- destructure here
  //console.log("Deleting IDs:", ids);

  if (!Array.isArray(ids) || ids.length === 0) {
    res.status(400);
    throw new Error("No country IDs provided");
  }

  const result = await Country.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount > 0) {
    res.json({
      message: `${result.deletedCount} countries deleted successfully`,
      deletedCount: result.deletedCount
    });
  } else {
    res.status(404);
    throw new Error("No countries found for the provided IDs");
  }
});





// @desc    Create a new province
// @route   POST /provinces
// @access  Public
const createProvince = asyncHandler(async (req, res) => {

  const country = await Country.findById(req.body.Country)

  // const province = await Province.findById(req.body.Province)
  //console.log("country", country)
  // province.University.push(createdUniversity._id)
  // await province.save();
  // if (!country) {
  //   return res.status(404).json({ message: 'Country not found' });
  // }
  // //console.log("++++++++++++++++++++++++++++++++++++++++++++++++")
  // //console.log(req.body);
  const province = new Province({ ...req.body, Country: country });
  // //console.log(province,"+++++++++++++++++++++++++++++++++++++++++++++++++++++");

  await province.save();

  country.Province.push(province._id)
  country.save();

  res.status(201).json(province);
});

























// @desc    Get all provinces
// @route   GET /provinces
// @access  Public
const getAllProvinces = asyncHandler(async (req, res) => {
  const provinces = await Province.find().populate('Country');
  //console.log(provinces, "+*+*+*+*+*+*+*+*+*+*+***+*+**+*+*+***+*+*+*+*+*+");

  res.status(200).json(provinces);
});

// @desc    Get a single province by ID
// @route   GET /provinces/:id
// @access  Public
const getProvinceById = asyncHandler(async (req, res) => {
  const province = await Province.findById(req.params.id).populate('Country University');
  if (province) {
    res.status(200).json(province);
  } else {
    res.status(404).json({ message: 'Province not found' });
  }
});

// @desc    Update a province by ID
// @route   PUT /provinces/:id
// @access  Public
const updateProvince = asyncHandler(async (req, res) => {

  const province = await Province.findByIdAndUpdate(req.params.id, req.body, { new: true });
  //console.log("----->", req.body)
  if (province) {
    res.status(200).json(province);
  } else {
    res.status(404).json({ message: 'Province not found' });
  }
});

// @desc    Delete a province by ID
// @route   DELETE /provinces/:id
// @access  Public
// const deleteProvince = asyncHandler(async (req, res) => {
//   const province = await Province.findByIdAndDelete(req.params.id);
//   if (province) {
//     res.status(200).json({ message: 'Province deleted successfully', province });
//   } else {
//     res.status(404).json({ message: 'Province not found' });
//   }
// });

const deleteProvince = asyncHandler(async (req, res) => {
  const { ids } = req.body; // expecting array of IDs in body

  if (ids && Array.isArray(ids) && ids.length > 0) {
    // 🔥 Multiple delete
    const result = await Province.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      return res
        .status(200)
        .json({ message: `${result.deletedCount} provinces deleted successfully` });
    } else {
      return res.status(404).json({ message: "No provinces found with given IDs" });
    }
  } else if (req.params.id) {
    // 🔥 Single delete
    const province = await Province.findByIdAndDelete(req.params.id);
    if (province) {
      return res
        .status(200)
        .json({ message: "Province deleted successfully", province });
    } else {
      return res.status(404).json({ message: "Province not found" });
    }
  } else {
    res.status(400).json({ message: "No province ID(s) provided" });
  }
});

// @desc    Get all universities
// @route   GET /universities
// @access  Public
const getAllUniversities = asyncHandler(async (req, res) => {
  const universities = await University.find().populate('Province').populate('Country');
  res.status(200).json(universities);
});

// @desc    Get a single university
// @route   GET /universities/:id
// @access  Public
const getUniversityById = asyncHandler(async (req, res) => {
  const university = await University.findById(req.params.id)
    .populate({
      path: 'Province',
      populate: {
        path: 'Country', // Populate the Country field inside Province
      },
    })
    .populate('Course'); // Populate the Course field


  if (university) {
    res.status(200).json(university);
  } else {
    res.status(404);
    throw new Error('University not found');
  }
});




const createUniversity = asyncHandler(async (req, res) => {
  try {
    //console.log("Incoming body:", req.body);
    const mci = req.body.MCI === 'true' || req.body.MCI === true;
    const ecfmg = req.body.ECFMG === 'true' || req.body.ECFMG === true;
    const WHO = req.body.WHO === 'true' || req.body.WHO === true;
    const NMC = req.body.NMC === 'true' || req.body.NMC === true;

    Object.keys(req.body).forEach(key => {
      const trimmedKey = key.trim();
      if (trimmedKey !== key) {
        req.body[trimmedKey] = req.body[key];
        delete req.body[key];
      }

      if (typeof req.body[trimmedKey] === 'string') {
        req.body[trimmedKey] = req.body[trimmedKey].trim();
      }
    });

    const name = req.body.name;
    const countryId = req.body.Country;

    //console.log("Processed name:", name);
    //console.log("Country ID:", countryId);

    if (!name) {
      return res.status(400).json({ message: 'University name is required' });
    }

    if (!countryId) {
      return res.status(400).json({ message: 'Country ID is required' });
    }

    const existingUniversity = await University.findOne({ name: new RegExp(`^${name}$`, 'i') });
    //console.log("Existing University:", existingUniversity);
    if (existingUniversity) {
      return res.status(400).json({ message: 'University with this name already exists.' });
    }

    // Validate country
    const country = await Country.findById(countryId);
    //console.log("Found Country:", country);
    if (!country) {
      return res.status(400).json({ message: 'Invalid country ID' });
    }

    // Handle Province array if provided
    let provinceIds = [];
    if (req.body.Province) {
      provinceIds = Array.isArray(req.body.Province)
        ? req.body.Province
        : [req.body.Province];
    }
    //console.log("Province IDs:", provinceIds);

    // Random grade assignment
    const grades = ["A+", "A", "A++"];
    const randomGrade = grades[Math.floor(Math.random() * grades.length)];
    //console.log("Assigned Grade:", randomGrade);

    // Create the university document 
    const university = new University({
      name,
      Country: country._id,
      Province: provinceIds,
      bannerURL: req.body.bannerURL,
      heroURL: req.body.heroURL,
      description: req.body.description,
      sections: req.body.sections,
      grade: randomGrade,
      logo: req.body.logo,
      campusLife: req.body.campusLife,
      MCI: req.body.MCI !== undefined ? mci : undefined,
      ECFMG: req.body.ECFMG !== undefined ? ecfmg : undefined,
      WHO: req.body.WHO !== undefined ? WHO : undefined,
      NMC: req.body.NMC !== undefined ? NMC : undefined,
      hostel: req.body.hostel,
      rank: req.body.rank,
      UniLink: req.body.UniLink,
    });

    //console.log("University object before save:", university);

    // Save to DB
    const createdUniversity = await university.save();
    //console.log("Created University:", createdUniversity);

    // Return created object
    res.status(201).json(createdUniversity);
  } catch (error) {
    console.error("Error creating university:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});









// @desc    Update a university
// @route   PUT /universities/:id
// @access  Private/Admin
const updateUniversity = asyncHandler(async (req, res) => {
  const { name, bannerURL, Country, heroURL, description, sections, eligiblity, Province, logo, campusLife, hostel, rank, UniLink, type } = req.body;

  const university = await University.findById(req.params.id);

  if (university) {
    university.name = name || university.name;
    university.bannerURL = bannerURL || university.bannerURL;
    university.heroURL = heroURL || university.heroURL;
    university.description = description || university.description;
    university.Country = Country || university.Country
    university.sections = sections || university.sections;
    university.eligiblity = eligiblity || university.eligiblity;
    university.Province = Province || university.Province;
    university.logo = logo || university.logo;
    university.campusLife = campusLife || university.campusLife;
    university.hostel = hostel || university.hostel;
    university.type = type || university.type;
    university.rank = rank || university.rank;
    university.UniLink = UniLink || university.UniLink

    const updatedUniversity = await university.save();
    res.status(200).json(updatedUniversity);
  } else {
    res.status(404);
    throw new Error('University not found');
  }
});

// @desc    Delete a university
// @route   DELETE /universities/:id
// @access  Private/Admin
// const deleteUniversity = asyncHandler(async (req, res) => {
//   const university = await University.findByIdAndDelete(req.params.id);
//   if (university) {
//     res.status(200).json(university);
//   } else {
//     res.status(404);
//     throw new Error('University not found');
//   }
// });



const deleteUniversity = asyncHandler(async (req, res) => {
  const { ids } = req.body; // Expect an array of IDs in the body
  //console.log(ids);

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    res.status(400);
    throw new Error("No university IDs provided for deletion");
  }

  // Delete all universities whose _id is in the ids array
  const result = await University.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount > 0) {
    res.status(200).json({ message: `${result.deletedCount} university(s) deleted successfully` });
  } else {
    res.status(404);
    throw new Error("No universities found with the provided IDs");
  }
});


// @desc    Get all courses
// @route   GET /courses
// @access  Public
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find()
    .populate({
      path: 'University',
      populate: { path: 'Country' }   // populate Country inside University
    })
    .populate('Province');

  res.status(200).json(courses);
});


// @desc    Get one course by ID
// @route   GET /courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('University');
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  res.status(200).json(course);
});


const createCourse = asyncHandler(async (req, res) => {
  if (!req.body.Province || req.body.Province === "") {
    req.body.Province = null;
  }

  if (req.body.Fees) {
    const { mode, breakdown, totalAmount } = req.body.Fees;

    if (mode === "semester" || mode === "year") {
      if (!breakdown || !Array.isArray(breakdown) || breakdown.length === 0) {
        return res.status(400).json({
          message: `For ${mode}-wise fees, you must provide a breakdown array`
        });
      }

      req.body.Fees.breakdown = breakdown.map((item, index) => ({
        label:
          item.label ||
          (mode === "semester"
            ? `Semester ${index + 1}`
            : `Year ${index + 1}`),
        amount: item.amount
      }));

      req.body.Fees.totalAmount =
        Number(totalAmount) ||
        breakdown.reduce((acc, item) => acc + Number(item.amount || 0), 0);
    } else if (mode === "total") {
      if (!totalAmount) {
        return res
          .status(400)
          .json({ message: "For total mode, totalAmount is required" });
      }
      req.body.Fees.breakdown = [];
    }
  }

  const course = new Course(req.body);
  const createdCourse = await course.save();

  res.status(201).json(createdCourse);
});


const updateCourse = async (req, res) => {
  try {
    const { id } = req.params; // courseId from URL
    let updates = { ...req.body }; // copy body

    // Handle Province (empty string → null)
    if (updates.Province === "" || updates.Province === undefined) {
      updates.Province = null;
    }

    if (updates.Fees) {
      const { mode, breakdown, totalAmount } = updates.Fees;

      if (mode === "semester" || mode === "year") {
        if (!breakdown || !Array.isArray(breakdown) || breakdown.length === 0) {
          return res.status(400).json({
            message: `For ${mode}-wise fees, you must provide a breakdown array`,
          });
        }

        // ✅ Clean invalid breakdown items (remove null/undefined/NaN amounts)
        const cleanedBreakdown = breakdown
          .filter(item => item.amount !== null && item.amount !== undefined && item.amount !== "")
          .map((item, index) => ({
            label: item.label || (mode === "semester"
              ? `Semester ${index + 1}`
              : `Year ${index + 1}`),
            amount: Number(item.amount) || 0,
          }));

        if (cleanedBreakdown.length === 0) {
          return res.status(400).json({
            message: "Breakdown must contain at least one valid amount",
          });
        }

        updates.Fees.breakdown = cleanedBreakdown;

        // Auto-calc totalAmount if missing
        updates.Fees.totalAmount =
          totalAmount ||
          cleanedBreakdown.reduce((acc, item) => acc + (item.amount || 0), 0);
      } else if (mode === "total") {
        if (!totalAmount) {
          return res
            .status(400)
            .json({ message: "For total mode, totalAmount is required" });
        }
        updates.Fees.breakdown = []; // no breakdown needed for total mode
      }
    }

    // find and update
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    )
      .populate("University", "name") // only bring 'name' of university
      .populate("Province", "name"); // only bring 'name' of province

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// const updateCourse = async (req, res) => {
//   try {
//     const { id } = req.params; // courseId from URL
//     let updates = { ...req.body }; // copy body

//     // Handle Province (empty string → null)
//     if (updates.Province === "" || updates.Province === undefined) {
//       updates.Province = null;
//     }


//     if (updates.Fees) {
//       const { mode, breakdown, totalAmount } = updates.Fees;

//       if (mode === "semester" || mode === "year") {
//         if (!breakdown || !Array.isArray(breakdown) || breakdown.length === 0) {
//           return res.status(400).json({
//             message: `For ${mode}-wise fees, you must provide a breakdown array`
//           });
//         }


//         updates.Fees.breakdown = breakdown.map((item, index) => ({
//           label:
//             item.label ||
//             (mode === "semester"
//               ? `Semester ${index + 1}`
//               : `Year ${index + 1}`),
//           amount: item.amount
//         }));

//         // Auto-calc totalAmount if missing
//         updates.Fees.totalAmount =
//           totalAmount ||
//           breakdown.reduce((acc, item) => acc + (item.amount || 0), 0);
//       } else if (mode === "total") {
//         if (!totalAmount) {
//           return res.status(400).json({
//             message: "For total mode, totalAmount is required"
//           });
//         }
//         updates.Fees.breakdown = []; // no breakdown needed for total mode
//       }
//     }

//     // find and update
//     const updatedCourse = await Course.findByIdAndUpdate(
//       id,
//       { $set: updates },
//       { new: true, runValidators: true }
//     )
//       .populate("University", "name") // only bring 'name' of university
//       .populate("Province", "name");  // only bring 'name' of province

//     if (!updatedCourse) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.status(200).json({
//       message: "Course updated successfully",
//       course: updatedCourse,
//     });
//   } catch (error) {
//     console.error("Error updating course:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// @desc    Delete a course
// @route   DELETE /courses/:id
// @access  Public
// const deleteCourse = asyncHandler(async (req, res) => {
//   const course = await Course.findOneAndDelete(req.params.id);

//   if (course) {
//     res.status(200).json(course);
//   } else {
//     res.status(404);
//     throw new Error('Course not found');
//   }
// });

const deleteCourse = asyncHandler(async (req, res) => {
  const { ids } = req.body; // Expecting array of course IDs from request body

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "No course IDs provided" });
  }

  const result = await Course.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount > 0) {
    res.status(200).json({ message: "Courses deleted successfully", deletedCount: result.deletedCount });
  } else {
    res.status(404).json({ message: "No courses found with given IDs" });
  }
});
// import asyncHandler from 'express-async-handler';
// import Course from '../models/courseModel.js'; // adjust path as needed

// @desc    Fetch courses by University ID
// @route   GET /api/courses/university/:universityId
// @access  Public

// import mongoose from "mongoose";

const getCourses = async (req, res) => {
  try {
    const {
      country,
      university,
      programLevel,
      category,
      intakeDate,
      universityName,
      mciApproval,
      ecfmgApproval,
      nmcApproval,
      whoApproval,
      minFees,
      maxFees
    } = req.query;

    //console.log(req.query, "REQ QUERY ========== ");

    const filters = {};

    // ------------------------------------------
    // Course Filters
    // ------------------------------------------
    if (university && mongoose.Types.ObjectId.isValid(university)) {
      filters.University = university;
    }

    if (programLevel) filters.ProgramLevel = programLevel;
    if (category) filters.Category = category;

    // Intake inside array
    if (intakeDate) filters["Intake.date"] = intakeDate;

    // ------------------------------------------
    // University Filters (Filters based on populated fields)
    // ------------------------------------------
    const uniFilters = {};

    if (country) uniFilters.Country = country;
    if (universityName) uniFilters.name = new RegExp(universityName, "i");

    if (mciApproval === "true") uniFilters.mciApproval = true;
    if (ecfmgApproval === "true") uniFilters.ecfmgApproval = true;
    if (nmcApproval === "true") uniFilters.nmcApproval = true;
    if (whoApproval === "true") uniFilters.whoApproval = true;

    let allowedUniversityIds = [];

    // Only run if any university filter exists
    if (Object.keys(uniFilters).length > 0) {
      const uniList = await University.find(uniFilters).select("_id");
      allowedUniversityIds = uniList.map((u) => u._id);

      if (allowedUniversityIds.length === 0) {
        return res.json({ courses: [] });
      }

      filters.University = { $in: allowedUniversityIds };
    }

    // ------------------------------------------
    // Fees Filter (minFees / maxFees)
    // ------------------------------------------
    if (minFees || maxFees) {
      filters.$or = [];

      const feeRange = {};

      if (minFees) feeRange.$gte = Number(minFees);
      if (maxFees) feeRange.$lte = Number(maxFees);

      // Fees.totalAmount
      filters.$or.push({ "Fees.totalAmount": feeRange });

      // completeFees.amount
      filters.$or.push({ "completeFees.amount": feeRange });
    }

    // ------------------------------------------
    // Pagination
    // ------------------------------------------
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    //console.log(filters, "FINAL FILTERS ================");

    // ------------------------------------------
    // Final Query
    // ------------------------------------------
    const courses = await Course.find(filters)
      // .skip(skip)
      // .limit(limit)
      .populate("University");

    res.json({ filters, courses });

  } catch (error) {
    //console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




// export { getCoursesByUniversity };

const updateOnCourse = asyncHandler(async (req, res) => {

  const province = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (province) {
    res.status(200).json(province);
  } else {
    res.status(404).json({ message: 'Province not found' });
  }
});


const getCoursesForIndiaMedical = async (req, res) => {
  try {
    // Find courses where the category is 'Medical'
    const medicalCourses = await Country.find({ mbbsAbroad: true })



    res.status(200).json(medicalCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all webinars
// @route   GET /api/webinars
// @access  Public
const getWebinars = asyncHandler(async (req, res) => {
  const webinars = await Webinar.find({});
  res.json(webinars);
});

// @desc    Create a new webinar
// @route   POST /api/webinars
// @access  Public


// const createWebinar = asyncHandler (async (req,res)=>{
//   try {
//     //console.log(req.body,"//ssss///////////////////////////////")
//   } catch (error) {
//     res.send(error)
//   }
// })

const createWebinar = asyncHandler(async (req, res) => {
  // //console.log();  // Log to check incoming request data

  const { trainer_name, trainer_profession, title, imageURL, date, weekday, timeStart, timeEnd } = req.body;

  if (!trainer_name || !trainer_profession || !title || !imageURL || !date || !weekday || !timeStart || !timeEnd) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const webinar = new Webinar({
    trainer_name,
    trainer_profession,
    title,
    imageURL,
    date,
    weekday,
    timeStart,
    timeEnd,
  });


  try {
    const createdWebinar = await webinar.save();
    res.status(201).json(createdWebinar);
  } catch (error) {
    console.error("Error saving webinar:", error);
    res.status(500).json({ message: "Failed to create webinar", error: error.message });
  }
});
const fetchwebinarleads = asyncHandler( async (req,res)=>{
  try {
    const data = await webinarleads.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({message:"Server error!"})
  }
})


const webinar_sendEmail = asyncHandler(async (req, res) => {
  const { name, email, number, state, country } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const apiInstance = new Brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

  const verifiedSenderEmail = 'support@searchmystudy.com'; // Your verified sender email in Brevo

  // Email to the user who registered
  const sendUserEmail = {
    to: [{ email, name }],
    sender: { name: 'SearchMyStudy', email: verifiedSenderEmail },
    subject: 'Webinar Registration Confirmation',
    htmlContent: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f2f2f2; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e0e0e0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #003366; font-size: 24px;">Search<span style="color: #DAA520;">My</span>Study</h1>
          </div>
  
          <h2 style="color: #003366;">Hello ${name},</h2>
          <p style="font-size: 16px; color: #444444; line-height: 1.6;">
            Thank you for registering for our <strong>exclusive webinar</strong>! We're excited to have you with us.
          </p>
  
          <div style="background-color: #fdf7e3; border-left: 5px solid #DAA520; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p style="margin: 0; font-size: 15px; color: #333;">
              <strong>Webinar Topic:</strong> Study Abroad Guidance<br>
              <strong>Date:</strong> May 25, 2025<br>
              <strong>Time:</strong> 5:00 PM IST<br>
            </p>
            <a href="https://zoom.us/your-meeting-link" target="_blank" style="display: inline-block; margin-top: 15px; padding: 12px 25px; background-color: #003366; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Join Webinar
            </a>
          </div>
  
          <p style="font-size: 15px; color: #555555;">Need help? Just reply to this email—we’re here for you.</p>
  
          <p style="margin-top: 40px; color: #666666; font-size: 14px;">
            Best regards,<br>
            <strong style="color: #003366;">Webinar Team</strong><br>
            <span style="color: #DAA520;">SearchMyStudy</span>
          </p>
  
          <hr style="margin: 40px 0; border: none; border-top: 1px solid #e0e0e0;">
  
          <p style="text-align: center; font-size: 12px; color: #999999;">
            © 2025 SearchMyStudy. All rights reserved.<br>
            <a href="https://searchmystudy.com" target="_blank" style="color: #999999; text-decoration: none;">Visit our website</a>
          </p>
        </div>
      </div>
    `
  };


  // Email to the admin to notify about new registration
  const sendAdminEmail = {
    to: [{ email: 'searchmystudy@gmail.com', name: 'Admin' }],
    sender: { name: 'SearchMyStudy', email: verifiedSenderEmail },
    subject: `New Webinar Registration - ${name}`,
    htmlContent: `
      <p><strong>New webinar registration:</strong></p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email Address:</strong> ${email}</p>
      <p><strong>Phone number:</strong> ${number}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p>Registration received at: ${new Date().toLocaleString()}</p>
    `
  };

  try {
    // Send emails
    const data = new webinarleads(req.body)
    await apiInstance.sendTransacEmail(sendUserEmail);
    await apiInstance.sendTransacEmail(sendAdminEmail);
    await data.save()
    res.status(200).json({ message: 'Emails sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email.y' });
  }
});


// const webinar_sendEmail = asyncHandler(async (req, res) => {
//   const { name, email,number,state,country } = req.body;
//   //console.log(req.body,"//////////////////////////////////////////////////////////////////////////////////////");


//   if (!email || !name) {
//     return res.status(400).json({ message: 'Name and email are required' });
//   }

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,



//     }
//   });

//   // Email for the registered user
//   const userMailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     replyTo: 'support@searchmystudy.com',
//     subject: 'Webinar Registration Confirmation',
//     html: `
//       <p>Hello ${name},</p>
//       <p>Thank you for registering for our webinar. We're excited to have you join us.</p>
//       <p><strong>Zoom Link:</strong> <a href="https://zoom.us/your-meeting-link">Join Webinar</a></p>
//       <p>Best regards,<br>Webinar Team</p>
//     `
//   };

//   // Email for internal admin/staff
//   const adminMailOptions = {
//     from: process.env.EMAIL_USER,
//     to: 'searchmystudy@gmail.com',
//     subject: `New Webinar Registration - ${name}`,
//     html: `
//       <p><strong>New webinar registration:</strong></p>
//       <p><strong>Name:<strong/> ${name}</p>
//       <p><strong>Email Address:<strong/> ${email}</p>
//       <p><strong>Phone number:<strong/> ${number}</p>
//       <p><strong>State:<strong/> ${state}</p>
//       <p><strong>Country:<strong/> ${country}</p>
//       <p>Registration received at: ${new Date().toLocaleString()}</p>
//     `
//   };

//   try {
//     // Send both emails
//     await transporter.sendMail(userMailOptions);
//     await transporter.sendMail(adminMailOptions);

//     res.status(200).json({ message: 'Emails sent successfully' });
//   } catch (error) {
//     console.error('Error sending emails:', error);
//     res.status(500).json({ message: 'Failed to send emails' });
//   }
// });


// @desc    Get a single webinar by ID
// @route   GET /api/webinars/:id
// @access  Public
const getWebinarById = asyncHandler(async (req, res) => {
  const webinar = await Webinar.findById(req.params.id);

  if (webinar) {
    res.json(webinar);
  } else {
    res.status(404);
    throw new Error('Webinar not found');
  }
});

// @desc    Update a webinar
// @route   PUT /api/webinars/:id
// @access  Public
const updateWebinar = asyncHandler(async (req, res) => {
  const {
    title,
    imageURL,
    date,
    weekday,
    timeStart,
    timeEnd,
    trainer_name,
    trainer_profession
  } = req.body;

  const webinar = await Webinar.findById(req.params.id);

  if (webinar) {
    webinar.title = title || webinar.title;
    webinar.imageURL = imageURL || webinar.imageURL;
    webinar.date = date || webinar.date;
    webinar.weekday = weekday || webinar.weekday;
    webinar.timeStart = timeStart || webinar.timeStart;
    webinar.timeEnd = timeEnd || webinar.timeEnd;
    webinar.trainer_name = trainer_name || webinar.trainer_name;
    webinar.trainer_profession = trainer_profession || webinar.trainer_profession;

    const updatedWebinar = await webinar.save();
    res.json(updatedWebinar);
  } else {
    res.status(404);
    throw new Error("Webinar not found");
  }
});


// @desc    Delete a webinar
// @route   DELETE /api/webinars/:id
// @access  Public
const deleteWebinar = asyncHandler(async (req, res) => {
  // Expect an array of IDs in req.body.ids
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    res.status(400);
    throw new Error("Please provide an array of webinar IDs to delete");
  }

  // Delete all webinars with IDs in the array
  const result = await Webinar.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount > 0) {
    res.json({ message: `${result.deletedCount} webinar(s) deleted successfully` });
  } else {
    res.status(404);
    throw new Error("No webinars found with the given IDs");
  }
});



// @desc    Get all media items
// @route   GET /api/media
// @access  Public
const getMediaItems = asyncHandler(async (req, res) => {
  const mediaItems = await Media.find({});
  res.json(mediaItems);
});

// @desc    Create a new media item
// @route   POST /api/media
// @access  Public
const createMediaItem = asyncHandler(async (req, res) => {
  const { title, imageURL, articalURL, description } = req.body;

  const mediaItem = new Media({
    title,
    imageURL,
    articalURL,
    description,
  });

  const createdMediaItem = await mediaItem.save();
  res.status(201).json(createdMediaItem);
});

// @desc    Get a single media item by ID
// @route   GET /api/media/:id
// @access  Public
const getMediaItemById = asyncHandler(async (req, res) => {
  const mediaItem = await Media.findById(req.params.id);

  if (mediaItem) {
    res.json(mediaItem);
  } else {
    res.status(404);
    throw new Error('Media item not found');
  }
});

// @desc    Update a media item
// @route   PUT /api/media/:id
// @access  Public
const updateMediaItem = asyncHandler(async (req, res) => {
  const { title, imageURL, articalURL, description } = req.body;

  const mediaItem = await Media.findById(req.params.id);

  if (mediaItem) {
    mediaItem.title = title || mediaItem.title;
    mediaItem.imageURL = imageURL || mediaItem.imageURL;
    mediaItem.articalURL = articalURL || mediaItem.articalURL;
    mediaItem.description = description || mediaItem.description;

    const updatedMediaItem = await mediaItem.save();
    res.json(updatedMediaItem);
  } else {
    res.status(404);
    throw new Error('Media item not found');
  }
});

// @desc    Delete a media item
// @route   DELETE /api/media/:id
// @access  Public
const deleteMediaItem = asyncHandler(async (req, res) => {
  // Expecting an array of IDs in request body
  const { ids } = req.body; // e.g., { ids: ["id1", "id2", "id3"] }

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    res.status(400);
    throw new Error("Please provide an array of IDs to delete");
  }

  const result = await Media.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount > 0) {
    res.json({ message: `${result.deletedCount} media items deleted` });
  } else {
    res.status(404);
    throw new Error("No media items found to delete");
  }
});



// @desc    Create a lead item
// @route   GET /api/lead
// @access  Public
const GetOneLead = asyncHandler(async (req, res) => {
  const lead = await CounsellerLead.findById(req.params.id);
  if (lead) {
    res.status(200).json(lead);
  } else {
    res.status(404).json({ message: 'Lead not found' });
  }
})


const createLead = asyncHandler(async (req, res) => {
  const lead = new CounsellerLead(req.body);
  const savedLead = await lead.save();
  res.status(201).json(savedLead);
});

// @access  Private (depends on your auth)
export const getLeadsByCounsellor = asyncHandler(async (req, res) => {
  try {
    const counsellorId = req.params.id;

    const leads = await CounsellerLead.find({ Counsellors: counsellorId })
      .populate("Counsellors") // if you want full counsellor data
      .exec();

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const getLead = asyncHandler(async (req, res) => {
  try {
    const leads = await CounsellerLead.find()
    //console.log(leads[0].Counsellors);

    res.status(200).json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Error fetching leads", error });
  }
});




// @desc    Create a lead item
// @route   DELETE /api/lead
// @access  Public
// const deleteLead = asyncHandler(async (req, res) => {
//   const { ids } = req.body; // expecting an array of IDs

//   if (!ids || !Array.isArray(ids) || ids.length === 0) {
//     return res.status(400).json({ message: "Please provide an array of IDs" });
//   }

//   const result = await CounsellerLead.deleteMany({ _id: { $in: ids } });

//   if (result.deletedCount > 0) {
//     res.status(200).json({ 
//       message: `${result.deletedCount} lead(s) deleted successfully`, 
//       deletedCount: result.deletedCount 
//     });
//   } else {
//     res.status(404).json({ message: "No leads found for the provided IDs" });
//   }
// });
const deleteLead = asyncHandler(async (req, res) => {
  const { ids } = req.body; // expecting an array of IDs

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Please provide an array of IDs" });
  }

  const result = await CounsellerLead.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount > 0) {
    res.status(200).json({
      message: `${result.deletedCount} lead(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } else {
    res.status(404).json({ message: "No leads found for the provided IDs" });
  }
});

// @desc    Create a lead item
// @route   POST /api/lead
// @access  Public
const createHomeLead = asyncHandler(async (req, res) => {
  const { name, phoneNo, email, country, message, countryCode } = req.body;

  const lead = new HomeLead({
    name,
    phoneNo,
    countryCode,
    email,
    country,
    message
  });

  const createdLead = await lead.save();
  res.status(201).json(createdLead);
});


// const createHomeLead = asyncHandler(async (req, res) => {
//   const { name, phoneNo, email, country, message } = req.body;

//   const lead = new HomeLead({
//     name,
//     phoneNo,
//     email,
//     country,
//     message,
//   });

// const createdLead = await lead.save();

// // Set up nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,



//   }
// });

// const mailOptions = {
//   from: `"New Lead" <${process.env.EMAIL_USER}>`,
//   to: 'yourdestination@example.com', // recipient's email
//   subject: 'New Lead Submitted',
//   html: `
//     <h2>New Lead Details</h2>
//     <p><strong>Name:</strong> ${name}</p>
//     <p><strong>Phone:</strong> ${phoneNo}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Country:</strong> ${country}</p>
//     <p><strong>Message:</strong> ${message}</p>
//   `,
// };

// Send the email
//   try {
//     await transporter.sendMail(mailOptions);
//     //console.log('Email sent successfully');
//   } catch (err) {
//     console.error('Email error:', err);
//   }

//   res.status(201).json(createdLead);
// });
// @desc    Get all leads
// @route   GET /api/lead
// @access  Public
const getLeads = asyncHandler(async (req, res) => {
  const leads = await HomeLead.find({});
  res.status(200).json(leads);
});

// @desc    Delete a lead
// @route   DELETE /api/lead/:id
// @access  Public
const deleteHomeLead = asyncHandler(async (req, res) => {
  const { ids } = req.body; // expecting an array of IDs

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "No lead IDs provided" });
  }

  const result = await HomeLead.deleteMany({ _id: { $in: ids } });

  res.status(200).json({
    message: `${result.deletedCount} leads deleted successfully`,
  });
});


// @desc    Create a new contact lead
// @route   POST /api/contact-leads
// @access  Public
const createContactLead = asyncHandler(async (req, res) => {
  const { name, phoneNo, email, occupation, comment } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Name and phone number are required');
  }

  const contactLead = new ContactLead({
    name,
    phoneNo,
    email,
    occupation,
    comment,
  });

  const createdContactLead = await contactLead.save();
  res.status(201).json(createdContactLead);
});

// @desc    Get all contact leads
// @route   GET /api/contact-leads
// @access  Public
const getContactLeads = asyncHandler(async (req, res) => {
  const contactLeads = await ContactLead.find({});
  res.json(contactLeads);
});

// @desc    Delete a contact lead
// @route   DELETE /api/contact-leads/:id
// @access  Public
const deleteContactLead = asyncHandler(async (req, res) => {
  const { ids } = req.body; // expecting array of lead IDs

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    res.status(400);
    throw new Error("Invalid request: 'ids' array required");
  }

  const result = await ContactLead.deleteMany({ _id: { $in: ids } });

  res.json({
    message: "Contact leads deleted successfully",
    deletedCount: result.deletedCount,
    deletedIds: ids,
  });
});




export const createQuery = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const newQuery = await query.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      message: 'Query submitted successfully.',
      data: newQuery,
      success: true
    });
  } catch (error) {
    console.error('Error in createQuery:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllQueries = async (req, res) => {
  try {
    const queries = await query.find().sort({ createdAt: -1 }); // newest first
    const leads = await HomeLead.find({});
    const contactLeads = await ContactLead.find({});
    res.status(200).json({
      message: 'Queries fetched successfully',
      query: queries,
      contact: contactLeads,
      leads: leads
    });
  } catch (error) {
    console.error('Error in getAllQueries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteWebinarLeads = async (req, res) => {
  try {
    const { ids } = req.body;

    // validation
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of IDs",
      });
    }

    const result = await webinarleads.deleteMany({
      _id: { $in: ids },
    });

    return res.status(200).json({
      success: true,
      message: "Webinar leads deleted successfully",
      deletedCount: result.deletedCount,
    });

  } catch (error) {
    console.error("Error deleting webinar leads:", error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};


const deleteQueryById = async (req, res) => {
  try {
    const { leads = [], contact = [], query = [] } = req.body.ids;

    const results = { 
      leadsDeleted: 0,
      contactDeleted: 0,
      queryDeleted: 0,
    };
    //console.log(leads,"||||||||||||||||||+++|")
    // 🔴 Delete Leads
    if (Array.isArray(leads) && leads.length > 0) {
      const response = await HomeLead.deleteMany({
        _id: { $in: leads},
      });
      results.leadsDeleted = response.deletedCount;
      //console.log(response,"+++++++++++++++++++++++")
    }

    // 🔴 Delete Contact Leads
    if (Array.isArray(contact) && contact.length > 0) {
      const response = await ContactLead.deleteMany({
        _id: { $in: contact },
      });
      results.contactDeleted = response.deletedCount;
    }

    // 🔴 Delete Queries
    if (Array.isArray(query) && query.length > 0) {
      const response = await Query.deleteMany({
        _id: { $in: query },
      });
      results.queryDeleted = response.deletedCount;
    }

    return res.status(200).json({
      message: "Deleted successfully",
      results,
    });
  } catch (error) {
    console.error("Error in deleteQueries:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};







// @desc    CREATE USER 
// @route   DELETE /api/createUser
// @access  Public
// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authPartner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  if (user.role === 'admin') {
    res.status(401);
    throw new Error('Access Denied (Role -Admin');
  }
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});



// @desc    Register a new user
// @route   POST /api/extraUser
// @access  Public

const extraUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, createdBy, ProfilePhoto, WhatappNumber } = req.body;
  //console.log(name, email, password, role, createdBy, ProfilePhoto, WhatappNumber )
  const userExists = await User.findOne({ email });
  // const userByCode = await User.findOne({CounsellorCode:CounsellorCode})
  const userByWhatsAppNumber = await User.findOne({WhatappNumber:WhatappNumber})

  const random = Math.floor(100 + Math.random() * 900);
  const time = Date.now().toString().slice(-3);
  


  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  // if(userByCode){
  //   res.status(400);
  //   throw new Error("Counsellor code is unavailable!")
  // }
  if(userByWhatsAppNumber){
    res.status(400);
    throw new Error("Number already exist!")
  }

  const user = await User.create({
    name,
    email,
    passwordTracker: password,
    password,
    role,
    createdBy,
    CounsellorCOde:`CL-${time}${random}`,
    ProfilePhoto,
    WhatappNumber
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdBy: user.createdBy
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
export const extraUserAll = asyncHandler(async (req, res) => {
  const userExists = await User.find().populate("createdBy");
  // //console.log(userExists,":::::::::::::::::::::::::::::::::::::::")
  res.status(200).json(userExists);
});

// @desc    GET EXTRA user
// @route   GET /api/extraUser
// @access  Public
const extraUserFetch = asyncHandler(async (req, res) => {
  const createdBy = req.params.id;

  const userExists = await User.find({ createdBy: createdBy }).populate('createdBy');



  if (userExists) {


    res.status(201).json(userExists);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const deleteCounsellorCoursefinder = async (req,res)=>{
  try {
    const {ids} = req.body
    const deleteData = await User.deleteMany({_id:{$in:ids}})
    res.json({deleteData})
  } catch (error) {
  //console.log(error)    
  }
}

// Function to send notifications to users with a specific role
const sendNotificationToRole = async (req, res) => {
  try {
    const { message, role } = req.body;  // The notification message and target role (e.g., "partner")
    if (!message || !role) {
      return res.status(400).json({ message: 'Message and role are required.' });
    }

    // Find users with the specified role
    const users = await User.find({ role });
    if (users.length === 0) {
      return res.status(404).json({ message: `No users found with role: ${role}` });
    }

    // Loop through each user and create a notification for them
    const notifications = users.map(user => ({
      user: user._id,
      message,
    }));

    // Insert all notifications at once using insertMany
    await Notification.insertMany(notifications);
    res.status(200).json({ message: `Notification sent to all users with role: ${role}` });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notifications', error });
  }
};


// Get notifications for the logged-in user
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.id }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

// Get All notifications 
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};



// @desc    Create a new student
// @route   POST /api/students
// @access  Public (or Private, depending on your setup)
export const createStudent = async (req, res) => {
  try {

    const student = await Student.create(req.body);
    // Send a response
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
};
// @desc    Update an existing student
// @route   PUT /api/students/:id
// @access  Public (or Private, depending on your setup)
const updateStudentdetails = async (req, res) => {
  try {
    const { id } = req.params; // Get the student ID from the request parameters
    const {
      firstName, middleName, lastName, passportNumber, dob, citizenship, gender,
      photo, postCode, mobileNumber, emailID, address, country, state, city,
      Country, Province, University, Course,
      grade12Marksheet, grade10Marksheet, passportFrontBack, resume, englishTestScorecard,
      grade10PassingCertificate, verificationForm, applicationFeeReceipt, statementOfPurpose,
      extracurricularCertificates, gapJustification, workExperience, universityApplicationForm,
      letterOfRecommendations, masterTranscripts, masterMarksheet, masterDegree, bachelorTranscripts,
      bachelorMarksheet, bachelorDegree, grade12PassingCertificate, powerOfAttorney, registrationForm,
      declarationForm, passportPhoto, portfolio, visaDocument, birthCertificate, policeClearanceCertificate,
      medicalCertificate, User
    } = req.body;

    // Find the student by ID and update their information
    const student = await Student.findByIdAndUpdate(
      id,
      {
        firstName, middleName, lastName, passportNumber, dob, citizenship, gender,
        photo, postCode, mobileNumber, emailID, address, country, state, city,
        grade12Marksheet, grade10Marksheet, passportFrontBack, resume, englishTestScorecard,
        grade10PassingCertificate, verificationForm, applicationFeeReceipt, statementOfPurpose,
        extracurricularCertificates, gapJustification, workExperience, universityApplicationForm,
        letterOfRecommendations, masterTranscripts, masterMarksheet, masterDegree, bachelorTranscripts,
        bachelorMarksheet, bachelorDegree, grade12PassingCertificate, powerOfAttorney, registrationForm,
        declarationForm, passportPhoto, portfolio, visaDocument, birthCertificate, policeClearanceCertificate,
        medicalCertificate,
        Country: Country ? Country : null,
        Province: Province ? Province : null,
        University: University ? University : null,
        Course: Course ? Course : null,
        User: User ? User : null
      },
      { new: true } // Return the updated document
    );

    // If student not found, return 404
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Send a response with the updated student data
    res.status(200).json(student);
  } catch (error) {
    // Log the error and return a server error response
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
};

// Helper function to recursively fetch all sub-users
const getAllSubUsers = async (userId) => {
  const subUsers = await User.find({ createdBy: userId }).select('_id');

  // If no sub-users, return empty array
  if (subUsers.length === 0) return [];

  // Recursively fetch sub-users of these sub-users
  let allSubUsers = [...subUsers];
  for (let subUser of subUsers) {
    const nestedSubUsers = await getAllSubUsers(subUser._id);
    allSubUsers = [...allSubUsers, ...nestedSubUsers];
  }

  return allSubUsers;
};


export const fetchByUserStudent = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch all sub-users recursively
    const subUsers = await getAllSubUsers(userId);

    // Include the main user ID and all sub-user IDs in the query
    const userIds = [userId, ...subUsers.map(user => user._id)];

    // Fetch students created by the main user and their sub-user hierarchy
    const students = await Student.find({ User: { $in: userIds } }).populate({
        path: 'User',
        populate: {
          path: 'createdBy', // Populate 'createdBy' from User
          model: 'User', // Make sure it refers to the correct model
        }
      })
      .populate('Country')
      // .populate('Province')
      .populate('University')
      .populate('Course');// Populate with 'name' for easier identification

    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found for this user and sub-users.' });
    }

    res.json(students);

  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
};



export const fetchByTrackingId = async (req, res) => {
  try {
    
    const trackingID = req.params.id;
    const students = await Profile.find({trackingId:trackingID}).populate('User'); // Populate with 'name' for easier identification
    //console.log("trackingID++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",students);

    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found for this user and sub-users.' });
    }

    res.json(students);   

  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
};
const fetchStudent = async (req, res) => {
  try {
    // Fetch students and populate all related fields
    const student = await Student.find()
      .populate({
        path: 'User',
        populate: {
          path: 'createdBy', // Populate 'createdBy' from User
          model: 'User', // Make sure it refers to the correct model
        }
      })
      .populate('Country')
      // .populate('Province')
      .populate('University')
      .populate('Course');

    if (!student || student.length === 0) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json(student);

  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
};

// @desc    Create a new student
// @route   PUT /api/students/status
// @access  Public (or Private, depending on your setup)
const UpdateStudentStatus = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate({ _id: req.params.id }, { status: req.body.status });
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);

  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
}
// @desc    Create a new student
// @route   DELETE /api/students/:id
// @access  Public (or Private, depending on your setup)
const DeleteStudent = async (req, res) => {
  try {
    const { ids } = req.body;
    //console.log(ids, "????????????????????????????");


    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Please provide an array of student IDs." });
    }

    const result = await Student.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No students found to delete." });
    }

    res.json({
      message: "Students deleted successfully.",
      deletedCount: result.deletedCount
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error, please try again later.",
      error
    });
  }
};


// @desc    Create a new student
// @route   DELETE /api/students/:id
// @access  Public (or Private, depending on your setup)
const GetOneStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id }).populate('University');
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);

  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
}
const GetOneStudentByTracking = async (req, res) => {
  try {
    //console.log("trackingID++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",req.params.id);
    const student = await Student.findOne({ trackingId: req.params.id }).populate('University').populate('Course');
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);

  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
}



// POST /api/tickets
const createTicket = async (req, res) => {
  const { title, description, priority, category, attachments, userId,remark } = req.body;
  // //console.log(remark,"************************************")
  try {
    const newTicket = new Ticket({
      title,
      remark,
      description,
      priority,
      category,
      attachments,
      createdBy: userId,
    });
    // //console.log(newTicket,"********************")
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /tickets/reply:id/reply
const replyToTicket = async (req, res) => {
  const { id } = req.params;
  const { content, userId } = req.body;

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    const newResponse = new TicketResponse({
      ticket: id,
      content,
      respondedBy: userId,
    });

    const savedResponse = await newResponse.save();

    // Push the response to the ticket's responses array
    ticket.responses.push(savedResponse._id);
    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /api/tickets/:id
const getTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.find({ createdBy: id }).populate({
      path: 'responses', populate: {
        path: 'respondedBy',
        select: 'name email',
      },
    }).populate('createdBy', 'name email role');

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/tickets/:id
const getAllTicket = async (req, res) => {

  try {
  const tickets = await Ticket.find().populate("createdBy");


    if (!tickets) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOneTicket = async (req, res) => {
  try {
    const {ids} = req.body;
    const ticket = await Ticket.deleteMany({_id:{$in:ids}});
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, remark: req.body.remark },
      {
        new: true, // <- important to return the updated document
      }
    )
      .populate({
        path: 'responses',
        populate: {
          path: 'respondedBy',
          select: 'name email',
        },
      })
      .populate('createdBy', 'name email role');

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////


// Controller function to get student metrics based on userId
const getStudentMetrics = async (req, res) => {
  try {
    const userId = req.params.id; // Get the userId from the request params
    // Count all students related to the given userId (assuming there's a field like `User` in Student schema)
    const totalStudents = await Student.countDocuments({ User: userId });
    // Count students with specific statuses
    const totalAssessments = await Student.countDocuments({ User: userId, status: 'Assessment' });
    const totalOffers = await Student.countDocuments({ User: userId, status: 'Offer Letter' });
    const totalFeesPaid = await Student.countDocuments({ User: userId, status: 'Fees Paid' });
    const totalAcceptanceLetters = await Student.countDocuments({ User: userId, status: 'Acceptance Letter' });
    const totalVisaApproved = await Student.countDocuments({ User: userId, status: 'Visa Approved' });

    const totalAssessmentsProfile = await Profile.countDocuments({ User: userId, status: 'pending' });
    const totalOffersProfile = await Profile.countDocuments({ User: userId, status: 'shared' });
    const totalFeesPaidProfile = await Profile.countDocuments({ User: userId, status: 'eligible' });
    const totalAcceptanceLettersProfile = await Profile.countDocuments({ User: userId, status: 'ineligible' });
    // Combine all metrics into a response object
    const metrics = {
      totalStudents,
      totalAssessments,
      totalOffers,
      totalFeesPaid,
      totalAcceptanceLetters,
      totalVisaApproved,
      totalAssessmentsProfile,
      totalOffersProfile,
      totalFeesPaidProfile,
      totalAcceptanceLettersProfile,
    };
    // Send the metrics as a JSON response
    res.status(200).json(metrics);
  } catch (error) {
    // Handle any errors
    console.error("Error fetching student metrics:", error.message);
    res.status(500).json({ message: error.message });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////// 

///
///////////////////////////////////////Promotional Images /////////////////////////////////////////////////
// @desc    Admin Get All Banner & 
// @route   POST /api/admin/CreatePromotional
// @access  Admin 
const createPromotional = asyncHandler(async (req, res) => {
  try {
    const { title, imageURL, altName } = req.body;
    // Create new banner
    const banner = new Promotional({ title, imageURL, altName });
    // Save to database
    await banner.save();
    res.json(banner);
  } catch (error) {
    res.status(401);
    throw new Error('Please enter all required fields');
  }
});
// @desc    Admin Get All Banner & 
// @route   POST /api/admin/FetchAllPromotional
// @access  Admin 
const fetchAllPromotional = asyncHandler(async (req, res, next) => {
  try {
    const banner = await Promotional.find({});
    res.json(banner);

  } catch (error) {
    res.status(400);
    throw new Error('Not Able to fetch give refresh');
  }
})

// @desc    Admin Get All Banner & 
// @route   DELETE /api/admin/DeletePromotional/:id
// @access  Admin 
const deletePromotional = asyncHandler(async (req, res, next) => {
  try {
    const { ids } = req.body; // array of banner IDs

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      res.status(400);
      throw new Error("Please provide an array of IDs");
    }

    const result = await Promotional.deleteMany({
      _id: { $in: ids }
    });

    res.status(200).json({
      message: "Promotional banners deleted successfully",
      deletedCount: result.deletedCount
    });

  } catch (error) {
    res.status(400);
    throw new Error("Not able to delete promotional banners");
  }
});


// @desc    Create a new profile
// @route   POST /api/profiles
// @access  Private
const createProfile = async (req, res) => {
  try {
    console.log(req.body, "????????????????????????????");
    const profile = new Profile(req.body); // Assuming the body contains the profile data
    const createdProfile = await profile.save();
    res.status(201).json(createdProfile);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create profile', error: error.message });
  }
};

// @desc    Get all profiles
// @route   GET /api/profiles
// @access  Private
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate({
      path: 'User',
      populate: {
        path: 'createdBy', // Populate 'createdBy' from User
        model: 'User', // Make sure it refers to the correct model
      }
    }).populate('Country'); // Populating references
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profiles', error: error.message });
  }
};

// @desc    Delete profile by ID
// @route   DELETE /api/profiles/:id
// @access  Private
const deleteProfile = async (req, res) => {
  try {
    const { ids } = req.body; // array of profile IDs

    //console.log(ids, "||||||||||||||||||||||||||||||||||||||||");


    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No profile IDs provided' });
    }

    // Find profiles first (to return after delete)
    const profiles = await Profile.find({ _id: { $in: ids } });

    if (profiles.length === 0) {
      return res.status(404).json({ message: 'No profiles found' });
    }

    // Delete all profiles
    await Profile.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: 'Profiles deleted successfully',
      deletedProfiles: profiles,
    });

  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete profiles',
      error: error.message,
    });
  }
};

const fetchByUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch all sub-users recursively
    const subUsers = await getAllSubUsers(userId);

    // Include the main user ID and all sub-user IDs in the query
    const userIds = [userId, ...subUsers.map(user => user._id)];

    // Fetch students created by the main user and their sub-user hierarchy
    const students = await Profile.find({ User: { $in: userIds } }).populate('User').populate('Country'); // Populate with 'name' for easier identification

    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found for this user and sub-users.' });
    }

    res.json(students);

  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
};

// @desc    Create a new student
// @route   PUT /api/profile/status
// @access  Public (or Private, depending on your setup)
const UpdateProfileStatus = async (req, res) => {
  try {
    //console.log(req.body,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    
    const student = await Profile.findOneAndUpdate({ _id: req.params.id }, { status: req.body.status });
    if (!student) {
      return res.status(404).json({ message: 'Profile not found.' });
    }
    res.json(student);

  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
}

export const profileUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @desc    Create a new popup
// @route   POST /api/popups
// @access  Private
const createPopup = async (req, res) => {
  const { title, target, imageURL } = req.body;

  try {
    const newPopup = new Popup({ title, imageURL, target });
    await newPopup.save();
    res.status(201).json(newPopup);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create popup', error: error.message });
  }
};

// @desc    Get all popups
// @route   GET /api/popups
// @access  Private
const getAllPopups = async (req, res) => {
  try {
    const popups = await Popup.find();
    res.status(200).json(popups);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch popups', error: error.message });
  }
};

const getAllMainPopups = async (req, res) => {
  try {
    const popups = await Popup.find({ target: 'main' });
    res.status(200).json(popups);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch popups', error: error.message });
  }
};
// @desc    Get all popups
// @route   GET /api/popups/partner
// @access  Private
const getAllPartnerPopups = async (req, res) => {
  try {
    const popups = await Popup.find({ target: 'partner' });
    res.status(200).json(popups);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch popups', error: error.message });
  }
};

// @desc    Delete a popup
// @route   DELETE /api/popups/:id
// @access  Private
const deletePopup = async (req, res) => {
  const { ids } = req.body;

  try {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No popup IDs provided' });
    }

    const result = await Popup.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No popups found to delete' });
    }

    res.status(200).json({
      message: `${result.deletedCount} popups deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete popups',
      error: error.message
    });
  }
};



// @desc    Create a new upload
// @route   POST /api/uploads
// @access  Public
const createUpload = async (req, res) => {
  try {
    const { title, imageURL, iconURL, target } = req.body;

    const newUpload = new Upload({
      title,
      imageURL,
      iconURL: iconURL || '',
      target // Use default if not provided
    });

    const savedUpload = await newUpload.save();
    res.status(201).json(savedUpload);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create upload', error: error.message });
  }
};

// @desc    Get all uploads
// @route   GET /api/uploads
// @access  Public
const getAllUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({});
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch uploads', error: error.message });
  }
};
// @desc    Get all uploads
// @route   GET /api/uploads/partner
// @access  Public
const getPartnerUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ target: 'partner' });
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch uploads', error: error.message });
  }
};
// @desc    Get all uploads
// @route   GET /api/uploads/frenchise
// @access  Public
const getFrenchiseUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ target: 'frenchise' });
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch uploads', error: error.message });
  }
};
// @desc    Delete an upload
// @route   DELETE /api/uploads/:id
// @access  Public
const deleteUpload = async (req, res) => {
  try {
    const upload = await Upload.findByIdAndDelete(req.params.id);
    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }

    res.status(200).json({ message: 'Upload deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete upload', error: error.message });
  }
};


// @desc    Create a new upload
// @route   POST /api/commission
// @access  Public
const createCommission = async (req, res) => {
  try {
    const { SecondCountry, fileURL, target, title } = req.body;

    const newUpload = new Commission({
      SecondCountry,
      fileURL,
      target,
      title // Use default if not provided
    });
    6
    const savedUpload = await newUpload.save();
    res.status(201).json(savedUpload);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create upload', error: error.message });
  }
};

// @desc    Get all uploads
// @route   GET /api/commission
// @access  Public
const getAllCommission = async (req, res) => {
  try {
    const uploads = await Commission.find().populate('SecondCountry');
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch uploads', error: error.message });
  }
};
// @desc    Get all uploads
// @route   GET /api/commission/partner
// @access  Public
const getPartnerCommission = async (req, res) => {
  try {
    const uploads = await Commission.find({ target: 'partner' }).populate('SecondCountry');
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch uploads', error: error.message })
  }
};
// @desc    Get all uploads
// @route   GET /api/commission/frenchise
// @access  Public
const getFrenchiseCommission = async (req, res) => {
  try {
    const uploads = await Commission.find({ target: 'frenchise' });
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch uploads', error: error.message });
  }
};
// @desc    Delete an upload
// @route   DELETE /api/commission/:id
// @access  Public
const deleteCommission = async (req, res) => {
  try {
    const { ids } = req.body;

    // validation
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No commission IDs provided" });
    }

    const result = await Commission.deleteMany({
      _id: { $in: ids }
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No commissions found to delete" });
    }

    res.status(200).json({
      message: "Commissions deleted successfully",
      deletedCount: result.deletedCount
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete commissions",
      error: error.message
    });
  }
};

// @desc    Create Loan Lead
// @route   POST /api/loan
// @access  Public

const createLoan = async (req, res) => {
  try {
    const newLoan = new Loan(req.body); // Create a new loan from request body
    const savedLoan = await newLoan.save(); // Save the loan to the database
    res.status(201).json(savedLoan); // Return the saved loan with a 201 status
  } catch (error) {
    res.status(500).json({ message: error.message }); // Return 500 for server errors
  }
};
// @desc    Create Loan Lead
// @route   POST /api/loan/id
// @access  Public
const getLoansByUser = async (req, res) => {
  try {
    const loans = await Loan.find({ User: req.params.id }); // Find loans by User ID
    // if (!loans.length) return res.status(404).json({ message: 'No loans found for this user' }); // If no loans are found

    res.status(200).json(loans); // Return loans with a 200 status
  } catch (error) {
    res.status(500).json({ message: error.message }); // Return 500 for server errors
  }
};

// @desc    Create Loan Lead
// @route   GET /api/loan
// @access  Public
const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('User'); // Find loans by User ID
    if (!loans.length) return res.status(404).json({ message: 'No loans found for this user' }); // If no loans are found

    res.status(200).json(loans); // Return loans with a 200 status
  } catch (error) {
    res.status(500).json({ message: error.message }); // Return 500 for server errors
  }
};
// @desc    Create a new student
// @route   PUT /api/loan/status
// @access  Public (or Private, depending on your setup)
const UpdateLoanStatus = async (req, res) => {
  try {
    const student = await Loan.findOneAndUpdate({ _id: req.params.id }, { status: req.body.status });
    if (!student) {
      return res.status(404).json({ message: 'Profile not found.' });
    }
    res.json(student);

  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
}

// @desc    Create a new student
// @route   DELETE /api/loan/:id
// @access  Public (or Private, depending on your setup)
const DeleteLoan = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided." });
    }

    const result = await Loan.deleteMany({ _id: { $in: ids } });

    return res.json({
      message: "Loans deleted successfully.",
      deletedCount: result.deletedCount
    });

  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};



//////////////Tranasction z///////////////////
const createTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body); // Create a new transaction from request body
    const savedTransaction = await newTransaction.save(); // Save to database
    res.status(201).json(savedTransaction); // Return the saved transaction with a 201 status
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find(); // Fetch all transactions from the database
    res.status(200).json(transactions); // Return transactions with a 200 status
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

const getTransactionsByCenterCode = async (req, res) => {
  try {
    const transactions = await Transaction.find({ centerCode: req.params.centerCode }); // Find by centerCode
    if (!transactions.length) return res.status(404).json({ message: 'No transactions found for this center code' }); // If none found

    res.status(200).json(transactions); // Return transactions
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};


const deleteTransactions = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No transaction IDs provided" });
    }

    const deleteData = await Transaction.deleteMany({
      _id: { $in: ids }
    });

    res.json({
      message: `${deleteData.deletedCount} transactions deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Create a new contact
export const createContact = async (req, res) => {
  try {
    const contact = new contacts(req.body);
    await contact.save();

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const createNavItem = async (req, res) => {
  try {
    const { name, url } = req.body;

    const newNavItem = new Nav({ name, url });
    await newNavItem.save();

    res.status(201).json({ message: 'Navigation item created successfully', navItem: newNavItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllContact = async (req, res) => {
  try {
    const navItems = await contacts.find();

    if (navItems.length === 0) {
      return res.status(404).json({ message: 'No contnacts items found' });
    }

    res.status(200).json({ navItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all navigation items
const getAllNavItems = async (req, res) => {
  try {
    const navItems = await Nav.find();

    if (navItems.length === 0) {
      return res.status(404).json({ message: 'No navigation items found' });
    }

    res.status(200).json({ navItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateNav = async (req, res) => {
  try {
    //console.log(req.body)
    const detail = await Nav.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!detail) {
      return res.status(404).json({ message: "Files detail not found" });
    }

    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: "Failed to update detail", error: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    // //console.log(req.body)
    const detail = await contacts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!detail) {
      return res.status(404).json({ message: "Files detail not found" });
    }

    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: "Failed to update detail", error: error.message });
  }
};


export const deleteContact = async (req, res) => {
  try {
    const { ids } = req.body; // expect array of ids

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of IDs' });
    }

    const result = await contacts.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No contacts found to delete' });
    }

    res.status(200).json({
      message: `${result.deletedCount} contacts deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete a navigation item by ID
const deleteNavItem = async (req, res) => {
  try {
    const { ids } = req.body; // expect array of ids

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of IDs' });
    }

    const result = await Nav.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No navigation items found to delete' });
    }

    res.status(200).json({
      message: `${result.deletedCount} navigation items deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkUser = async (req, res) => {
  try {
    //console.log("req", req.params.id);
    const user = await User.findOne({ CenterCode: req.params.id });

    if (!user) {
      return res.status(200).json({ message: 'Center not found.' });
    }

    res.status(200).json({ message: `Center found ${user.OwnerName}.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createFile = async (req, res) => {
  try {
    const { SecondCountry, name, template, broucher, type,university } = req.body;

    // Check if all required fields are provided
    if (!SecondCountry || !type || (!template && !broucher)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newFile = new Files({
      SecondCountry,
      name,
      template,
      university,
      broucher,
      type,
    });

    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all files
const getAllFiles = async (req, res) => {
  try {
    const files = await Files.aggregate([
      // 1️⃣ SecondCountry lookup
      {
        $lookup: {
          from: "secondcountries",
          localField: "SecondCountry",
          foreignField: "_id",
          as: "SecondCountry"
        }
      },
      { $unwind: "$SecondCountry" },
    
      // 2️⃣ University lookup (FIXED)
      {
        $lookup: {
          from: "universities",
          localField: "university",   // ✅ correct field name
          foreignField: "_id",
          as: "university"
        }
      },
      {
        $unwind: {
          path: "$university",
          preserveNullAndEmptyArrays: true
        }
      },
    
      // 3️⃣ Group by country
      {
        $group: {
          _id: "$SecondCountry.name",
          SecondCountry: { $first: "$SecondCountry" },
          items: { $push: "$$ROOT" }
        }
      },
    
      // 4️⃣ Final shape
      {
        $project: {
          _id: 0,
          name: "$_id",
          SecondCountry: 1,
          items: 1
        }
      }
    ]);
  
    res.status(200).json(files);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const allFiles = async (req,res)=>{
  try {
    const data = await Files.find().populate("SecondCountry").populate("university")
    res.json({success:true,data})
  } catch (error) {
    //console.log(error)
  }
}
// ✅ Update Website Detail
export const updateFile = async (req, res) => {
  try {
    //console.log(req.body)
    const detail = await Files.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!detail) {
      return res.status(404).json({ message: "Files detail not found" });
    }

    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: "Failed to update detail", error: error.message });
  }
};



// Delete a file by ID
// Delete multiple files by IDs
const deleteFile = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array of IDs

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'IDs array is required.' });
    }

    const result = await Files.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No files found to delete.' });
    }

    res.status(200).json({
      message: 'Files deleted successfully.',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Delete a file by ID
const findOneFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await Files.find({ SecondCountry: id });

    if (!file) {
      return res.status(404).json({ message: 'File not found.' });
    }

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new counsellor
// @route   POST /VideoCounsellor
// @access  Public
const createVideo = async (req, res) => {
  const { name, videoURL, thumbnailURL } = req.body;

  if (!name || !videoURL || !thumbnailURL) {
    res.status(400).json({ message: 'Please all required fields' });
    return;
  }

  const counsellor = new Video({
    name,
    videoURL,
    thumbnailURL
  });

  try {
    const createdCounsellor = await counsellor.save();
    res.status(201).json(createdCounsellor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all counsellors
// @route   GET /GetVideo/all
// @access  Public
const getVideo = async (req, res) => {
  try {

    const counsellors = await Video.find({});
    res.json(counsellors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc    Delete a counsellor
// @route   DELETE /DeleteCounsellors/:id
// @access  Public
// const deleteVideo = async (req, res) => {
//   try {
//     const counsellor = await Video.findOneAndDelete({_id:req.params.id});

//     if (counsellor) {
//       res.json(counsellor);
//     } else {
//       res.status(404).json({ message: 'Counsellor not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const deleteVideo = async (req, res) => {
  try {
    // Expect an array of IDs in req.body.ids
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Please provide an array of IDs" });
    }

    const result = await Video.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      res.json({ message: `${result.deletedCount} videos deleted successfully` });
    } else {
      res.status(404).json({ message: "No videos found to delete" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update video by ID
const updateVideo = async (req, res) => {
  try {
    const { name, videoURL, thumbnailURL } = req.body;

    if (!name && !videoURL && !thumbnailURL) {
      return res.status(400).json({ message: 'Please provide at least one field to update' });
    }

    // Find video by ID
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Update only provided fields
    if (name) video.name = name;
    if (videoURL) video.videoURL = videoURL;
    if (thumbnailURL) video.thumbnailURL = thumbnailURL;

    const updatedVideo = await video.save();

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Create Website Detail
export const createWebsiteDetail = async (req, res) => {
  try {
    const detail = await websiteDetail.create(req.body);
    res.status(201).json(detail);
  } catch (error) {
    res.status(500).json({ message: "Failed to create detail", error: error.message });
  }
};

// ✅ Get All Website Details
export const getWebsiteDetails = async (req, res) => {
  try {
    const details = await websiteDetail.find();
    console.log(details,"******************************")
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch details", error: error.message });
  }
};



// ✅ Update Website Detail
export const updateWebsiteDetail = async (req, res) => {
  try {
    const detail = await websiteDetail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!detail) {
      return res.status(404).json({ message: "Website detail not found" });
    }

    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: "Failed to update detail", error: error.message });
  }
};



export const deleteMultipleWebsiteDetails = async (req, res) => {
  try {
    const { ids } = req.body; // expecting { ids: ["id1", "id2", "id3"] }
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Please provide an array of IDs" });
    }

    const result = await websiteDetail.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: `${result.deletedCount} records deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete multiple details", error: error.message });
  }
};


export const fetchWebProfile = async (req, res) => {
  try {
    const data = await websiteProfile()
    res.send(data)
  } catch (error) {
    //console.log(error)
  }
}


export {
  fetchwebinarleads,deleteQueryById,deleteWebinarLeads,
  createBanner, test, fetchAllBanner, deleteBanner,
  deleteService, updateService, getService, getServices, createService,
  deleteTestimonial, updateTestimonial, getTestimonialById, getTestimonials, createTestimonial,
  deleteCounsellor, updateCounsellor, getCounsellorById, getCounsellors, createCounsellor,
  deleteBlog, updateBlog, getBlogById, getAllBlogs, createBlog,
  createCountry, getCountries, getCountryById, updateCountry, getAllCountries,
  createProvince, getAllProvinces, getProvinceById, updateProvince, deleteProvince,
  getAllUniversities, deleteUniversity, updateUniversity, createUniversity, getUniversityById,
  getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, getCourses,
  getWebinars, createWebinar, getWebinarById, webinar_sendEmail, updateWebinar, deleteWebinar,
  getMediaItems, createMediaItem, getMediaItemById, updateMediaItem, deleteMediaItem, getCoursesForIndiaMedical,
  createLead, getLead, deleteLead, GetOneLead,
  createHomeLead, getLeads, deleteHomeLead,
  deleteContactLead, getContactLeads, createContactLead,
  extraUser, extraUserFetch, sendNotificationToRole, getNotifications, getAllNotifications,
  fetchStudent, UpdateStudentStatus, DeleteStudent, GetOneStudent, GetOneStudentByTracking, updateStudentdetails,
  createTicket, replyToTicket, getTicket, getAllTicket, deleteOneTicket, updateTicketStatus, getStudentMetrics,
  createPromotional, fetchAllPromotional, deletePromotional,
  createProfile, getAllProfiles, deleteProfile, fetchByUserProfile, UpdateProfileStatus,
  createPopup, getAllPopups, deletePopup, getAllMainPopups, getAllPartnerPopups,
  createUpload, getAllUploads, deleteUpload, getFrenchiseUploads, getPartnerUploads,
  createCommission, getAllCommission, deleteCommission, getFrenchiseCommission, getPartnerCommission,
  createLoan, getLoansByUser, getLoans, UpdateLoanStatus, DeleteLoan,
  createTransaction, getAllTransactions, getTransactionsByCenterCode, deleteTransactions,
  createNavItem, getAllNavItems, deleteNavItem, checkUser,
  createFile, getAllFiles, deleteFile, findOneFile,
  createVideo, getVideo, deleteVideo, updateVideo

};
