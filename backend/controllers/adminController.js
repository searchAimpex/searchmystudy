import asyncHandler from 'express-async-handler';
import Banner from "../models/bannerModel.js";
import Service from '../models/servicesModel.js';
import Testimonial from '../models/testimonialsModel.js';
import Counsellor from '../models/counsellorModel.js';
import Blog from '../models/blogModel.js';
import Country from '../models/countryModel.js';
import Province from '../models/provinceModel.js';
import University from '../models/universityModel.js';
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
// @desc    Admin user & 
// @route   POST /api/admin/CreateBanner
// @access  Admin 
const test = asyncHandler(async (req, res) => {
    try {
      
      res.json({ msg:"working fine" });
    } catch (error) {
      res.status(400);
      throw new Error('Please enter all required fields' );
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
    throw new Error('Please enter all required fields' );
  }
});
// @desc    Admin Get All Banner & 
// @route   POST /api/admin/FetchAllBanner
// @access  Admin 
const fetchAllBanner  =asyncHandler(async (req,res,next)=>{
    try {
        const banner = await Banner.find({});
        res.json(banner);

    }catch(error){
        res.status(400);
        throw new Error('Not Able to fetch give refresh' );
    }
})

// @desc    Admin Get All Banner & 
// @route   DELETE /api/admin/DeleteBanner/:id
// @access  Admin 
const deleteBanner =asyncHandler(async (req,res,next)=>{
    try {
        const  bannerId  = req.params.id;
        console.log("params",req.params)
        const banner = await Banner.findOneAndDelete({_id:bannerId})
        res.json(banner);

    }catch(error){
        res.status(400);
        throw new Error('Not Able to delete' );
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
  const service = await Service.findOneAndDelete(req.params.id);
  if (service) {
      console.log("service delete",service)
      res.json(service)
  } else {
      res.status(404);
      throw new Error('Service not found');
  }
});

// @desc    Create a new testimonial
// @route   POST /api/testimonials/create
// @access  Admin
const createTestimonial = asyncHandler(async (req, res) => {
  const { title, imageURL, description, rating } = req.body;

  if (!title || !imageURL || !rating) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }

  const testimonial = new Testimonial({
    title,
    imageURL,
    description,
    rating,
  });

  const createdTestimonial = await testimonial.save();
  res.status(201).json(createdTestimonial);
});

// @desc    Get all testimonials
// @route   GET /api/testimonials/all
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({});
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
  const { title, imageURL, description, rating } = req.body;

  const testimonial = await Testimonial.findById(req.params.id);

  if (testimonial) {
    testimonial.title = title || testimonial.title;
    testimonial.imageURL = imageURL || testimonial.imageURL;
    testimonial.description = description || testimonial.description;
    testimonial.rating = rating || testimonial.rating;

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/delete/:id
// @access  Admin
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findOneAndDelete(req.params.id);

  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
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
const  getCounsellors = async (req, res) => {
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
const deleteCounsellor = async (req, res) => {
  try {
    const counsellor = await Counsellor.findOneAndDelete({_id:req.params.id});

    if (counsellor) {
      res.json(counsellor);
    } else {
      res.status(404).json({ message: 'Counsellor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Public
const createBlog = asyncHandler(async (req, res) => {
  const { title, bannerURL, content, thumbnailURL } = req.body;

  const blog = new Blog({
    title,
    bannerURL,
    content,
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
  const blog = await Blog.findOneAndDelete(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Create a new country
// @route   POST /countries
// @access  Public
const createCountry = asyncHandler(async (req, res) => {
  const { name, bannerURL, description, sections, flagURL,elegiblity,bullet ,faq} = req.body;

  const country = new Country({
    name,
    bannerURL,
    description,
    sections,
    flagURL,
    elegiblity,
    bullet,
    faq
    
  });

  const createdCountry = await country.save();
  res.status(201).json(createdCountry);
});

// @desc    Get all countries
// @route   GET /countries
// @access  Public
const getCountries = asyncHandler(async (req, res) => {
  const countries = await Country.find({})
  res.json(countries);
});

// @desc    Get single country
// @route   GET /countries/:id
// @access  Public
const getCountryById = asyncHandler(async (req, res) => {
  const country = await Country.findById(req.params.id).populate('Province')
  console.log("country",country)
  if (country) {
    res.json(country);
  } else {
    res.status(404);
    throw new Error('Country not found');
  }
});

// @desc    Update a country
// @route   PUT /countries/:id
// @access  Public
const updateCountry = asyncHandler(async (req, res) => {
  const { name, bannerURL, description, sections, provinces,status } = req.body;

  const country = await Country.findById(req.params.id);
  console.log("req.body===>",req.body)
  // console.log("counbtry",country,status)
  if (country) {
    country.name = name || country.name;
    country.bannerURL = bannerURL || country.bannerURL;
    country.description = description || country.description;
    country.sections = sections || country.sections;
    country.provinces = provinces || country.provinces;
    country.mbbsAbroad = status || false;

    const updatedCountry = await country.save();
    res.json(updatedCountry);
  } else {
    res.status(404);
    throw new Error('Country not found');
  }
});

// @desc    Delete a country
// @route   DELETE /countries/:id
// @access  Public
const deleteCountry = asyncHandler(async (req, res) => {
  const country = await Country.findByIdAndDelete(req.params.id);

  if (country) {
    res.json(country);
  } else {
    res.status(404);
    throw new Error('Country not found');
  }
});



// @desc    Create a new province
// @route   POST /provinces
// @access  Public
const createProvince = asyncHandler(async (req, res) => {

  const country = await Country.findOne({_id:req.body.Country})
  if (!country) {
    return res.status(404).json({ message: 'Country not found' });
  }
 
  const province = new Province(req.body);
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
  console.log("----->",req.body)
  if (province) {
    res.status(200).json(province);
  } else {
    res.status(404).json({ message: 'Province not found' });
  }
});

// @desc    Delete a province by ID
// @route   DELETE /provinces/:id
// @access  Public
const deleteProvince = asyncHandler(async (req, res) => {
  const province = await Province.findByIdAndDelete(req.params.id);
  if (province) {
    res.status(200).json({ message: 'Province deleted successfully', province });
  } else {
    res.status(404).json({ message: 'Province not found' });
  }
});

// @desc    Get all universities
// @route   GET /universities
// @access  Public
const getAllUniversities = asyncHandler(async (req, res) => {
  const universities = await University.find().populate('Province');
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

// @desc    Create a new university
// @route   POST /universities
// @access  Private/Admin
const createUniversity = asyncHandler(async (req, res) => {
    const university = new University({
    name:req.body.name,
    bannerURL:req.body.bannerURL,
    heroURL:req.body.heroURL,
    description:req.body.description,
    sections:req.body.sections,
    eligiblity:req.body.eligiblity,
    Province:req.body.Province,
    logo:req.body.logo,
    campusLife:req.body.campusLife ,
    hostel:req.body.hostel,
    rank:req.body.rank,
    UniLink:req.body.UniLink
  });

  const createdUniversity = await university.save();
  const province = await Province.findById(createdUniversity.Province)
  console.log("province", province)
  province.University.push(createdUniversity._id)
  await province.save();
  res.status(201).json(createdUniversity);
});

// @desc    Update a university
// @route   PUT /universities/:id
// @access  Private/Admin
const updateUniversity = asyncHandler(async (req, res) => {
  const { name, bannerURL, heroURL, description, sections, eligiblity, Province ,logo,campusLife ,hostel,rank,UniLink,type} = req.body;

  const university = await University.findById(req.params.id);

  if (university) {
    university.name = name || university.name;
    university.bannerURL = bannerURL || university.bannerURL;
    university.heroURL = heroURL || university.heroURL;
    university.description = description || university.description;
    university.sections = sections || university.sections;
    university.eligiblity = eligiblity || university.eligiblity;
    university.Province = Province || university.Province;
    university.logo = logo || university.logo;
    university.campusLife = campusLife || university.campusLife;
    university.hostel = hostel  || university.hostel;
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
const deleteUniversity = asyncHandler(async (req, res) => {
  const university = await University.findOneAndDelete(req.params.id);
  if (university) {
    res.status(200).json(university);
  } else {
    res.status(404);
    throw new Error('University not found');
  }
});

// @desc    Get all courses
// @route   GET /courses
// @access  Public
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().populate('University');
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

// @desc    Create a course
// @route   POST /courses
// @access  Public
const createCourse = asyncHandler(async (req, res) => {

  const course = new Course({
    ProgramName :req.body.ProgramName,
    University:req.body.University,
    WebsiteURL:req.body.WebsiteURL,
    Location:req.body.Location,
    Duration:req.body.Duration,
    Intake:req.body.Intake,
    Scholarships:req.body.Scholarships,
    ProgramLevel:req.body.ProgramLevel,
    LanguageRequirements:req.body.LanguageRequirements,
    StandardizeRequirement:req.body.StandardizeRequirement,
    Category:req.body.Category,
    Fees:req.body.Fees,
  });

  const createdCourse = await course.save();
  const university = await University.findById(createdCourse.University)
  university.Course.push(createdCourse._id)
  await university.save()

  res.status(201).json(createdCourse);
});

// @desc    Update a course
// @route   PUT /courses/:id
// @access  Public
const updateCourse = asyncHandler(async (req, res) => {
  const { ProgramName, University, WebsiteURL, Location, Duration, Intake, Scholarships, ProgramLevel, LanguageRequirements, StandardizeRequirement,Category } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    course.ProgramName = ProgramName;
    course.University = University;
    course.WebsiteURL = WebsiteURL;
    course.Location = Location;
    course.Duration = Duration;
    course.Intake = Intake;
    course.Scholarships = Scholarships;
    course.ProgramLevel = ProgramLevel;
    course.LanguageRequirements = LanguageRequirements;
    course.StandardizeRequirement = StandardizeRequirement;
    course.Category = Category;

    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Delete a course
// @route   DELETE /courses/:id
// @access  Public
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOneAndDelete(req.params.id);

  if (course) {
    res.status(200).json(course);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    GET FILTER DATA
// @route   GET /course/All
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  try {
    const {
      country,
      province,
      university,
      programLevel,
      category,
      scholarships,
      languageRequirement,
      standardizeRequirement,
    } = req.query;

    let filter = {};

    // Filter by Country
    if (country) {
      // Fetch provinces related to the country
      const provinces = await Province.find({ Country: country }).select('_id');
      const provinceIds = provinces.map(province => province._id);

      // Fetch universities related to the provinces
      const universities = await University.find({ Province: { $in: provinceIds } }).select('_id');
      const universityIds = universities.map(university => university._id);

      // Filter courses by the universities in the country
      filter.University = { $in: universityIds };
    }

    // Filter by Province
    if (province) {
      // Fetch universities related to the province
      const universities = await University.find({ Province: province }).select('_id');
      const universityIds = universities.map(university => university._id);

      // Filter courses by the universities in the province
      filter.University = { $in: universityIds };
    }

    // Filter by University
    if (university) {
      filter.University = university;
    }

    // Filter by Program Level
    if (programLevel) {
      filter.ProgramLevel = programLevel;
    }

    // Filter by Category
    if (category) {
      filter.Category = category;
    }

    // Filter by Scholarships
    if (scholarships) {
      filter.Scholarships = scholarships === 'true';
    }

    // Filter by Language Requirements
    if (languageRequirement) {
      const languageReqArray = languageRequirement.split(',');
      const languageReqFilter = {};
      languageReqArray.forEach((lang) => {
        languageReqFilter[`LanguageRequirements.${lang}.status`] = true;
      });
      filter = { ...filter, ...languageReqFilter };
    }

    // Filter by Standardized Requirements
    if (standardizeRequirement) {
      const standardizeReqArray = standardizeRequirement.split(',');
      const standardizeReqFilter = {};
      standardizeReqArray.forEach((test) => {
        standardizeReqFilter[`StandardizeRequirement.${test}.status`] = true;
      });
      filter = { ...filter, ...standardizeReqFilter };
    }

    console.log("Constructed Filter:", filter);

    // Fetch courses based on the constructed filter
    const courses = await Course.find(filter)
      .populate({
        path: 'University',
        populate: {
          path: 'Province',
          populate: {
            path: 'Country',
          },
        },
      })
      .exec();

    res.status(200).json(courses);
    console.log("Courses Found:", courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: error.message });
  }
});

const updateOnCourse = asyncHandler(async (req, res) => {

  const province = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  console.log("----->",req.body)
  if (province) {
    res.status(200).json(province);
  } else {
    res.status(404).json({ message: 'Province not found' });
  }
});


const getCoursesForIndiaMedical = async (req, res) => {
  try {
      // Find courses where the category is 'Medical'
      const medicalCourses = await Country.find({mbbsAbroad:true})
    
      

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
const createWebinar = asyncHandler(async (req, res) => {
  const { title, imageURL, date, day, time } = req.body;

  const webinar = new Webinar({
    title,
    imageURL,
    date,
    day,
    time,
  });

  const createdWebinar = await webinar.save();
  res.status(201).json(createdWebinar);
});




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
  const { title, imageURL, date, day, time } = req.body;

  const webinar = await Webinar.findById(req.params.id);

  if (webinar) {
    webinar.title = title || webinar.title;
    webinar.imageURL = imageURL || webinar.imageURL;
    webinar.date = date || webinar.date;
    webinar.day = day || webinar.day;
    webinar.time = time || webinar.time;

    const updatedWebinar = await webinar.save();
    res.json(updatedWebinar);
  } else {
    res.status(404);
    throw new Error('Webinar not found');
  }
});

// @desc    Delete a webinar
// @route   DELETE /api/webinars/:id
// @access  Public
const deleteWebinar = asyncHandler(async (req, res) => {
  const webinar = await Webinar.findOneAndDelete(req.params.id);

  if (webinar) {
    res.json(webinar);
  } else {
    res.status(404);
    throw new Error('Webinar not found');
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
  const mediaItem = await Media.findOneAndDelete(req.params.id);

  if (mediaItem) {
 
    res.json(mediaItem);
  } else {
    res.status(404);
    throw new Error('Media item not found');
  }
});


// @desc    Create a lead item
// @route   GET /api/lead
// @access  Public
const GetOneLead =  asyncHandler(async (req, res) => {
  const lead = await CounsellerLead.findById(req.params.id);
  if (lead) {
      res.status(200).json(lead);
  } else {
      res.status(404).json({ message: 'Lead not found' });
  }
})

// @desc    Create a lead item
// @route   POST /api/lead
// @access  Public
const createLead = asyncHandler(async (req, res) => {
    const lead = new CounsellerLead(req.body);
    const savedLead = await lead.save();
    res.status(201).json(savedLead);
});


// @desc    Create a lead item
// @route   GET /api/lead
// @access  Public
const getLead = asyncHandler(async (req, res) => {
  const leads = await CounsellerLead.find();
  res.status(200).json(leads);
});


// @desc    Create a lead item
// @route   DELETE /api/lead
// @access  Public
const deleteLead  =asyncHandler(async (req, res) => {
  const lead = await CounsellerLead.findByIdAndDelete(req.params.id);
  if (lead) {
      res.status(200).json({ message: 'Lead deleted successfully', lead });
  } else {
      res.status(404).json({ message: 'Lead not found' });
  }
})

// @desc    Create a lead item
// @route   POST /api/lead
// @access  Public
const createHomeLead = asyncHandler(async (req, res) => {
  const { name, phoneNo, email } = req.body;

  const lead = new HomeLead({
      name,
      phoneNo,
      email,
  });

  const createdLead = await lead.save();
  res.status(201).json(createdLead);
});
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
  const lead = await HomeLead.findByIdAndDelete(req.params.id);

  if (lead) {
      res.status(200).json({ message: 'Lead deleted successfully', lead });
  } else {
      res.status(404).json({ message: 'Lead not found' });
  }
});


// @desc    Create a new contact lead
// @route   POST /api/contact-leads
// @access  Public
const createContactLead = asyncHandler(async (req, res) => {
  const { name, phoneNo, email, occupation, comment } = req.body;

  if (!name || !phoneNo) {
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
  const contactLead = await ContactLead.findById(req.params.id);
  if (contactLead) {
    await contactLead.remove();
    res.json({ message: 'Contact lead removed' });
  } else {
    res.status(404);
    throw new Error('Contact lead not found');
  }
});



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
      role:user.role,
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
  const { name, email, password ,role,createdBy,CounsellorCode,ProfilePhoto,WhatsAppNumber} = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    passwordTracker:password,
    password,
    role,
    createdBy,
    CounsellorCode,
    ProfilePhoto,
    WhatsAppNumber
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role:user.role,
      createdBy:user.createdBy
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc    GET EXTRA user
// @route   GET /api/extraUser
// @access  Public
const extraUserFetch = asyncHandler(async (req, res) => {
  const createdBy = req.params.id;

  const userExists = await User.find({ createdBy:createdBy }).populate('createdBy');



  if (userExists) {
  

    res.status(201).json(userExists);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});



// Function to send notifications to users with a specific role
const sendNotificationToRole = async (req, res) => {
  try {
    const { message, role } = req.body;  // The notification message and target role (e.g., "partner")
    console.log("fix",message,role)
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
    console.log("Notifcation",notif)
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
    console.log("fix")
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
      medicalCertificate,User
      
    } = req.body;

    // Check for required fields
     // Check for empty ObjectId values


    // Create the new student
    const student = await Student.create({
      firstName, middleName, lastName, passportNumber, dob, citizenship, gender,
      photo, postCode, mobileNumber, emailID, address, country, state, city,
      grade12Marksheet, grade10Marksheet, passportFrontBack, resume, englishTestScorecard,
      grade10PassingCertificate, verificationForm, applicationFeeReceipt, statementOfPurpose,
      extracurricularCertificates, gapJustification, workExperience, universityApplicationForm,
      letterOfRecommendations, masterTranscripts, masterMarksheet, masterDegree, bachelorTranscripts,
      bachelorMarksheet, bachelorDegree, grade12PassingCertificate, powerOfAttorney, registrationForm,
      declarationForm, passportPhoto, portfolio, visaDocument, birthCertificate, policeClearanceCertificate,
      medicalCertificate,
      Country: Country ? Country : null, // Use null if Country is not provided
            Province: Province ? Province : null, // Use null if Province is not provided
            University: University ? University : null, // Use null if University is not provided
            Course: Course ? Course : null, // Use null if Course is not provided
            User: User ? User : null // Use null if User is not provided
    });
    console.log("fiix",student)
    // Send a response
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.',error });
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
    const students = await Student.find({ User: { $in: userIds } }).populate('User'); // Populate with 'name' for easier identification

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
      .populate('Province')
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
    console.log("fix",req.body,req.params.id)
    const student = await Student.findOneAndUpdate({_id:req.params.id},{status:req.body.status});
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);

  }catch(error){
    res.status(500).json({ message: 'Server error, please try again later.',error });
  }
}
// @desc    Create a new student
// @route   DELETE /api/students/:id
// @access  Public (or Private, depending on your setup)
const DeleteStudent = async (req, res) => { 
  try {
    const student = await Student.findOneAndDelete({_id:req.params.id});
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);

  }catch(error){
    res.status(500).json({ message: 'Server error, please try again later.',error });
  }
}

// @desc    Create a new student
// @route   DELETE /api/students/:id
// @access  Public (or Private, depending on your setup)
const GetOneStudent = async (req, res) => { 
  try {
    const student = await Student.findOne({_id:req.params.id}).populate('University');
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);

  }catch(error){
    res.status(500).json({ message: 'Server error, please try again later.',error });
  }
}
const GetOneStudentByTracking = async (req, res) => { 
  try {
    const student = await Student.findOne({trackingId:req.params.id}).populate('University').populate('Course');
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);

  }catch(error){
    res.status(500).json({ message: 'Server error, please try again later.',error });
  }
}



// POST /api/tickets
const createTicket = async (req, res) => {
  const { title, description, priority, category, attachments,userId } = req.body;
  try {
    const newTicket = new Ticket({
      title,
      description,
      priority,
      category,
      attachments,
      createdBy: userId,
    });
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /tickets/reply:id/reply
const replyToTicket = async (req, res) => {
  const { id } = req.params;
  const { content,userId } = req.body;

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
    const ticket = await Ticket.find({createdBy:id}).populate({ path:'responses', populate: {
      path: 'respondedBy',
      select: 'name email',
    },}).populate('createdBy', 'name email role');

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/tickets/:id
const getAllTicket = async (req, res) => {

  try {
    const ticket = await Ticket.find().populate({ path:'responses', populate: {
      path: 'respondedBy',
      select: 'name email',
    },}).populate('createdBy', 'name email role');

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOneTicket = async (req,res) =>{
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
} 

const updateTicketStatus = async (req,res) =>{
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id,{status:req.body.status}).populate({ path:'responses', populate: {
      path: 'respondedBy',
      select: 'name email',
    },}).populate('createdBy', 'name email role');
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    ticket.save()
    console.log("my ricket",ticket)
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////


// Controller function to get student metrics based on userId
const getStudentMetrics = async (req, res) => {
  try {
    const  userId  = req.params.id; // Get the userId from the request params
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
    const totalFeesPaidProfile= await Profile.countDocuments({ User: userId, status: 'eligible' });
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
    throw new Error('Please enter all required fields' );
  }
});
// @desc    Admin Get All Banner & 
// @route   POST /api/admin/FetchAllPromotional
// @access  Admin 
const fetchAllPromotional  =asyncHandler(async (req,res,next)=>{
    try {
        const banner = await Promotional.find({});
        res.json(banner);

    }catch(error){
        res.status(400);
        throw new Error('Not Able to fetch give refresh' );
    }
})

// @desc    Admin Get All Banner & 
// @route   DELETE /api/admin/DeletePromotional/:id
// @access  Admin 
const deletePromotional =asyncHandler(async (req,res,next)=>{
    try {
        const  bannerId  = req.params.id;
        console.log("params",req.params)
        const banner = await Promotional.findOneAndDelete({_id:bannerId})
        res.json(banner);

    }catch(error){
        res.status(400);
        throw new Error('Not Able to delete' );
    }
})


// @desc    Create a new profile
// @route   POST /api/profiles
// @access  Private
const createProfile = async (req, res) => {
  try {
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
    const profile = await Profile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
 // or use `findByIdAndDelete(req.params.id)`
    res.status(200).json({ message: 'Profile deleted successfully', deletedProfile: profile });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete profile', error: error.message });
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
    console.log("fix",req.body,req.params.id)
    const student = await Profile.findOneAndUpdate({_id:req.params.id},{status:req.body.status});
    if (!student) {
      return res.status(404).json({ message: 'Profile not found.' });
    }
    res.json(student);

  }catch(error){
    res.status(500).json({ message: 'Server error, please try again later.',error });
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @desc    Create a new popup
// @route   POST /api/popups
// @access  Private
const createPopup = async (req, res) => {
  const { title,target , imageURL  } = req.body;

  try {
    const newPopup = new Popup({ title, imageURL,target });
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
// @desc    Get all popups
// @route   GET /api/popups/main
// @access  Private
const getAllMainPopups = async (req, res) => {
  try {
    console.log(" this was triggered")
    const popups = await Popup.find({target:'main'});
    console.log(popups)
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
    console.log(" this was triggered")
    const popups = await Popup.find({target:'partner'});
    console.log(popups)
    res.status(200).json(popups);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch popups', error: error.message });
  }
};

// @desc    Delete a popup
// @route   DELETE /api/popups/:id
// @access  Private
const deletePopup = async (req, res) => {
  const { id } = req.params;

  try {
    const popup = await Popup.findByIdAndDelete(id);
    
    if (!popup) {
      return res.status(404).json({ message: 'Popup not found' });
    }
    
    res.status(200).json(popup);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete popup', error: error.message });
  }
};


// @desc    Create a new upload
// @route   POST /api/uploads
// @access  Public
 const createUpload = async (req, res) => {
  try {
    console.log("Creating a new upload...");
    const { title, imageURL, iconURL ,target} = req.body;

    const newUpload = new Upload({
      title,
      imageURL,
      iconURL: iconURL || '',
      target // Use default if not provided
    });

    const savedUpload = await newUpload.save();
    console.log("Upload created:", savedUpload);
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
    const uploads = await Upload.find({target:'partner'});
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
    const uploads = await Upload.find({target:'frenchise'});
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
    console.log(`Deleting upload with ID: ${req.params.id}`);
    const upload = await Upload.findByIdAndDelete(req.params.id);
    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }

    console.log("Upload deleted:", upload);
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
    console.log("Creating a new upload...");
    const { SecondCountry, fileURL, target,title } = req.body;

    const newUpload = new Commission({
      SecondCountry,
      fileURL,
      target,
      title // Use default if not provided
    });
6
    const savedUpload = await newUpload.save();
    console.log("Upload created:", savedUpload);
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
    const uploads = await Commission.find({}).populate('SecondCountry');
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
    const uploads = await Commission.find({target:'partner'}).populate('SecondCountry');
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
    const uploads = await Commission.find({target:'frenchise'});
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
    console.log(`Deleting upload with ID: ${req.params.id}`);
    const upload = await Commission.findByIdAndDelete(req.params.id);
    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }
    console.log("Upload deleted:", upload);
    res.status(200).json({ message: 'Upload deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete upload', error: error.message });
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
    if (!loans.length) return res.status(404).json({ message: 'No loans found for this user' }); // If no loans are found

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
    const loans = await Loan.find({}); // Find loans by User ID
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
    console.log("fix",req.body,req.params.id)
    const student = await Loan.findOneAndUpdate({_id:req.params.id},{status:req.body.status});
    if (!student) {
      return res.status(404).json({ message: 'Profile not found.' });
    }
    res.json(student);

  }catch(error){
    res.status(500).json({ message: 'Server error, please try again later.',error });
  }
}

// @desc    Create a new student
// @route   PUT /api/loan/:id
// @access  Public (or Private, depending on your setup)
const DeleteLoan = async (req, res) => { 
  try {
    console.log("fix",req.body,req.params.id)
    const student = await Loan.findOneAndDelete({_id:req.params.id});
    if (!student) {
      return res.status(404).json({ message: 'Profile not found.' });
    }
    res.json(student);

  }catch(error){
    res.status(500).json({ message: 'Server error, please try again later.',error });
  }
}



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


const deleteTransactions= async (req, res) => {
  try {
    const transactions = await Transaction.findOneAndDelete({ _id: req.params.id }); // Find by centerCode
    if (!transactions.length) return res.status(404).json({ message: 'No transactions found for this center code' }); // If none found

    res.status(200).json(transactions); // Return transactions
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};




// Create a new navigation item
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

// Delete a navigation item by ID
 const deleteNavItem = async (req, res) => {
  try {
    const navItem = await Nav.findByIdAndDelete(req.params.id);

    if (!navItem) {
      return res.status(404).json({ message: 'Navigation item not found' });
    }

    res.status(200).json({ message: 'Navigation item deleted successfully', navItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkUser = async (req, res) => {
  try {
    console.log("req", req.params.id);
    const user = await User.findOne({ CenterCode: req.params.id });
    
    if (!user) {
      return res.status(200).json({ message: 'Center not found.' });
    }
    
    res.status(200).json({ message:  `Center found ${user.OwnerName}.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createFile = async (req, res) => {
  try {
    const { SecondCountry, name, template, broucher, type } = req.body;

    // Check if all required fields are provided
    if (!SecondCountry || !type || (!template && !broucher)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newFile = new Files({
      SecondCountry,
      name,
      template,
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
    const files = await Files.find().populate('SecondCountry');
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a file by ID
 const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findByIdAndDelete(id);

    if (!file) {
      return res.status(404).json({ message: 'File not found.' });
    }

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a file by ID
const findOneFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await Files.find({SecondCountry:id});

    if (!file) {
      return res.status(404).json({ message: 'File not found.' });
    }

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
    createBanner,test,fetchAllBanner,deleteBanner,
    deleteService,updateService,getService,getServices,createService,
    deleteTestimonial,updateTestimonial,getTestimonialById,getTestimonials,createTestimonial,
    deleteCounsellor,updateCounsellor,getCounsellorById,getCounsellors,createCounsellor,
    deleteBlog,updateBlog,getBlogById,getAllBlogs,createBlog,
    createCountry, getCountries, getCountryById, updateCountry, deleteCountry ,
    createProvince, getAllProvinces, getProvinceById, updateProvince, deleteProvince ,
    getAllUniversities,deleteUniversity,updateUniversity,createUniversity,getUniversityById,
    getAllCourses,getCourseById,createCourse,updateCourse,deleteCourse,getCourses,
    getWebinars,createWebinar,getWebinarById,updateWebinar,deleteWebinar,
    getMediaItems,createMediaItem,getMediaItemById,updateMediaItem,deleteMediaItem,getCoursesForIndiaMedical,
    createLead,getLead,deleteLead,GetOneLead,
    createHomeLead, getLeads, deleteHomeLead,
    deleteContactLead,getContactLeads,createContactLead,
    extraUser,extraUserFetch,sendNotificationToRole,getNotifications,getAllNotifications,
    fetchStudent,UpdateStudentStatus,DeleteStudent,GetOneStudent,GetOneStudentByTracking,updateStudentdetails,
    createTicket,replyToTicket,getTicket,getAllTicket,deleteOneTicket,updateTicketStatus,getStudentMetrics,
    createPromotional,fetchAllPromotional,deletePromotional,
    createProfile, getAllProfiles, deleteProfile,fetchByUserProfile,UpdateProfileStatus,
    createPopup,getAllPopups,deletePopup,getAllMainPopups,getAllPartnerPopups,
    createUpload,getAllUploads,deleteUpload,getFrenchiseUploads,getPartnerUploads,
    createCommission,getAllCommission,deleteCommission,getFrenchiseCommission,getPartnerCommission,
    createLoan,getLoansByUser,getLoans,UpdateLoanStatus,DeleteLoan,
    createTransaction,getAllTransactions,getTransactionsByCenterCode,deleteTransactions,
    createNavItem, getAllNavItems, deleteNavItem,checkUser,
    createFile,getAllFiles,deleteFile,findOneFile
  };