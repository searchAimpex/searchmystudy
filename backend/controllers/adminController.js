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
    country.mbbsAbroad = status || mbbsAbroad;

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
  const { name, bannerURL, heroURL, description, sections, eligiblity, Province ,logo,campusLife ,hostel,rank,UniLink} = req.body;

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
  const { name, email, password ,role,createdBy} = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    createdBy
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

// @desc    Create a new student
// @route   GET /api/students/:id
// @access  Public (or Private, depending on your setup)
export const fetchByUserStudent = async (req, res) => { 
  try {
    const student = await Student.find({User:req.params.id});
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);

  }catch(error){
    res.status(500).json({ message: 'Server error, please try again later.',error });
  }
}
// @desc    Create a new student
// @route   GET /api/students
// @access  Public (or Private, depending on your setup)
const fetchStudent = async (req, res) => { 
  try {
    const student = await Student.find();
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);

  }catch(error){
    res.status(500).json({ message: 'Server error, please try again later.',error });
  }
}
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
    const student = await Student.findOneAndDelete({id:req.params.id});
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);

  }catch(error){
    res.status(500).json({ message: 'Server error, please try again later.',error });
  }
}



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
    fetchStudent,UpdateStudentStatus,DeleteStudent
  };