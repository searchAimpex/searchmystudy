import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

import generateToken from '../utils/generateToken.js';
import Counsellor from '../models/counsellorModel.js';
import SecondCountry from '../models/secondCountryModel.js';
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { log } from 'console';
import Country from '../models/countryModel.js';

// import asyncHandler from "express-async-handler";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js"; // adjust path

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(password, "++++++++++++++++++++++++");

  // Find user by email
  const user = await User.findOne({ email });

  // const user = await User.findOne({ email });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword, '-----------------------------');




  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true, // not accessible via JS
      secure: process.env.NODE_ENV === "production", // true only in production
      sameSite: "lax", // adjust for cross-site cookies
      maxAge: 1 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});



export const passwordReset = asyncHandler(async (req, res) => {
  const email = req.params.email;
  console.log(email,"::::::::::::::::::::::::::::::::::::::;")
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate JWT token valid for 5 minutes

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );
  const resetLink = `https://admin.coursefinder.co.in/change-password/${email}/${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password
    },
  });

  // Email options
  const mailOptions = {
    from: `"SearchMyStudy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset",
    html: `
      <p>Hello ${user.name},</p>
      <p>Click the link below to reset your password. This link is valid for 5 minutes:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you did not request this, ignore this email.</p>
    `,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Email could not be sent");
  }
});
export const changePwd = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔐 hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔎 find user by email and update password
    const user = await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
        passwordTracker: password, // ⚠️ for testing only, don’t store plain text in prod
      },
      { new: true } // return updated user
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Password updated successfully",
      user
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});





const authPartner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate('createdBy');


  



  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  if (user.role === 'admin') {
    res.status(401);
    throw new Error('Acess Denied');
  }
  if (user.block) {
    res.status(401);
    throw new Error('User Blocked');
  }
  if(user?.createdBy?.block){
    res.status(401);
    throw new Error('User Blocked');
  }
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

       res.json(user);
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});



// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const 
registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body, "|||||||||||||||||||||||||||");

  // Check if user with the same email or other identifiers already exists
  const userExists = await User.findOne({ email: req.body.email });
  const whatsappNumber = await User.findOne({ WhatappNumber: req.body.WhatsAppNumber });
  const phoneNumber = await User.findOne({ ContactNumber: req.body.ContactNumber });
  const centerCode = await User.findOne({ CenterCode: req.body.CenterCode });

  if (userExists) {
    res.status(400);
    throw new Error('Email already exists!');
  }
  if (whatsappNumber) {
    res.status(400);
    throw new Error('WhatsApp number already exists!');
  }
  if (centerCode) {
    res.status(400);
    throw new Error('Center code is unavailable!');
  }
  if (phoneNumber) {
    res.status(400);
    throw new Error('Phone number already exists!');
  }

  
  // Create a new user
  const user = await User.create({
    ...req.body,
    passwordTracker: req.body.password,
  });
  


  console.log(user,"-++++++++++++++++++++++++++++++++++++++++")



  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password
    },
  });
  if (user) {
    // Generate token (if you have a generateToken function)
    generateToken(res, user._id);

    // Send registration success email
    try {
   const mailOptions = {
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: 'WELCOME TO THE WORLD OF SEARCH MY STUDY!',
  text: `Dear ${user?.OwnerName || user?.InsitutionName},

${user?.InsitutionName}

WELCOME TO THE WORLD OF SEARCH MY STUDY!

Congratulations! You are now a Registered Business Associate of Search My Study.

Now you can experience our specialized admission Portal for MBBS Abroad and Study Abroad programs.

Through Search My Study, you can assist students in applying to 500+ universities across multiple countries for programs including:

• MBBS / MD Abroad
• Undergraduate Programs Abroad
• Postgraduate Programs Abroad
• Foundation & Pathway Programs
• Study Abroad Programs in Medical & Non-Medical Fields


Login Credentials

You can now log in to your Business Associate Dashboard using the details below:

Url: https://searchmystudy.com/
Email ID: ${user?.email}
Password: ${user?.passwordTracker}


You are now ready to enter the world of online admission & application management, which will change the way you process MBBS and Study Abroad admissions.


Key Advantages of Associating with Search My Study:

• Absolute privacy of your student data
• Only document-based processing – no physical hassle
• No mediators for your student applications
• High commissions on every successful admission
• Transparent payout system
• Offer letter support from selected universities
• Dedicated backend & visa support team


We look forward to a strong and successful association with you.

Warm regards,  
Team Search My Study  
Official Email: support@searchmystudy.com  
Support Number: +91-8400770308  
Website: https://searchmystudy.com/
`,
};

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending registration email:', error);
    }

    // Respond with user data
    res.status(201).json({ user });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const statusUpdate = asyncHandler(async (req, res) => {
  // console.log(req.params,"++++++++++++++++++++++++++++++")
  const {status} = req.body;
  const {id} = req.params   
  const data = await User.findByIdAndUpdate(
    id,
    { block: status },     
    { new: true }           
  );

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Status updated successfully",
    data,
  });
});


export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const updateData = { ...req.body }; 

  const user = await User.findById(userId);


  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // if (updateData.password && updateData.password.trim() !== "") {
  //   // generate salt and hash password
 
  //   const hashedPassword = await bcrypt.hash(updateData.password, salt);

  //   updateData.password = hashedPassword;
  //   updateData.passwordTracker = req.body.passwordTracker; // keep plain password if you’re tracking it
  // } else {
  //   // keep existing password if not provided
  //   updateData.password = user.password;
  //   updateData.passwordTracker = user.passwordTracker;
  // }


const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    createdBy: updatedUser.createdBy,
    bio: updatedUser?.bio,
    block: updatedUser.block,
    OwnerName: updatedUser.OwnerName,
    OwnerFatherName: updatedUser.OwnerFatherName,
    InsitutionName: updatedUser.InsitutionName,
    ContactNumber: updatedUser.ContactNumber,
    WhatappNumber: updatedUser.WhatappNumber,
    CenterCode: updatedUser.CenterCode,
    DateOfBirth: updatedUser.DateOfBirth,
    city: updatedUser.city,
    state: updatedUser.state,
    zipCode: updatedUser.zipCode,
    address: updatedUser.address,
    FrontAdhar: updatedUser.FrontAdhar,
    BackAdhar: updatedUser.BackAdhar,
    PanCard: updatedUser.PanCard,
    ProfilePhoto: updatedUser.ProfilePhoto,
    VistOffice: updatedUser.VistOffice,
    CancelledCheck: updatedUser.CancelledCheck,
    Logo: updatedUser.Logo,
    accountedDetails: updatedUser.accountedDetails,
    IFSC: updatedUser.IFSC,
    bankName: updatedUser.bankName,
  });
});


export const getUserById = asyncHandler(async (req, res) => {
  try {
    console.log(req.params, "+++++++++++++++++++++++++++++++++");

    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error('Server error');
  }
});
// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile/:id
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);

  if (user) {
    console.log("fix", user)
    console.log("updatte", req.body)
    // Update general fields
    user.name = req.body.data.name || user.name;
    user.email = req.body.data.email || user.email;

    // Update additional fields
    user.role = req.body.data.role || user.role;
    user.OwnerName = req.body.data.OwnerName || user.OwnerName;
    user.OwnerFatherName = req.body.data.OwnerFatherName || user.OwnerFatherName;
    user.InsitutionName = req.body.data.InsitutionName || user.InsitutionName;
    user.ContactNumber = req.body.data.ContactNumber || user.ContactNumber;
    user.WhatappNumber = req.body.data.WhatappNumber || user.WhatappNumber;
    user.CenterCode = req.body.data.CenterCode || user.CenterCode;
    user.DateOfBirth = req.body.data.DateOfBirth || user.DateOfBirth;
    user.city = req.body.data.city || user.city;
    user.state = req.body.data.state || user.state;
    user.zipCode = req.body.data.zipCode || user.zipCode;
    user.address = req.body.data.address || user.address;
    user.FrontAdhar = req.body.data.FrontAdhar || user.FrontAdhar;
    user.BackAdhar = req.body.data.BackAdhar || user.BackAdhar;
    user.PanCard = req.body.data.PanCard || user.PanCard;
    user.ProfilePhoto = req.body.data.ProfilePhoto || user.ProfilePhoto;
    user.VistOffice = req.body.data.VistOffice || user.VistOffice;
    user.CancelledCheck = req.body.data.CancelledCheck || user.CancelledCheck;
    user.Logo = req.body.data.Logo || user.Logo;
    user.accountedDetails = req.body.data.accountedDetails || user.accountedDetails;
    user.IFSC = req.body.data.IFSC || user.IFSC;
    user.bankName = req.body.data.bankName || user.bankName;
    user.block = req.body.data.block || user.block;
    user.createdBy = req.body.data.createdBy || user.createdBy;

    // Update password if provided
    if (req.body.password) {
      user.password = req.body.data.password;
    }

    const updatedUser = await user.save();
    console.log("update user", updatedUser);
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      OwnerName: updatedUser.OwnerName,
      OwnerFatherName: updatedUser.OwnerFatherName,
      InsitutionName: updatedUser.InsitutionName,
      ContactNumber: updatedUser.ContactNumber,
      WhatappNumber: updatedUser.WhatappNumber,
      CenterCode: updatedUser.CenterCode,
      DateOfBirth: updatedUser.DateOfBirth,
      city: updatedUser.city,
      state: updatedUser.state,
      zipCode: updatedUser.zipCode,
      address: updatedUser.address,
      FrontAdhar: updatedUser.FrontAdhar,
      BackAdhar: updatedUser.BackAdhar,
      PanCard: updatedUser.PanCard,
      ProfilePhoto: updatedUser.ProfilePhoto,
      VistOffice: updatedUser.VistOffice,
      CancelledCheck: updatedUser.CancelledCheck,
      Logo: updatedUser.Logo,
      accountedDetails: updatedUser.accountedDetails,
      IFSC: updatedUser.IFSC,
      bankName: updatedUser.bankName,
      block: updatedUser.block,
      createdBy: updatedUser.createdBy,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});



// @desc    Update user profile
// @route   PUT /api/users/profile/:id
// @access  Private
const updateUserOneProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    console.log("fix", user)
    console.log("updatte", req.body)
    // Update general fields

    user.Logo = req.body.Logo || user.Logo;



    const updatedUser = await user.save();
    console.log("update user", updatedUser);
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      OwnerName: updatedUser.OwnerName,
      OwnerFatherName: updatedUser.OwnerFatherName,
      InsitutionName: updatedUser.InsitutionName,
      ContactNumber: updatedUser.ContactNumber,
      WhatappNumber: updatedUser.WhatappNumber,
      CenterCode: updatedUser.CenterCode,
      DateOfBirth: updatedUser.DateOfBirth,
      city: updatedUser.city,
      state: updatedUser.state,
      zipCode: updatedUser.zipCode,
      address: updatedUser.address,
      FrontAdhar: updatedUser.FrontAdhar,
      BackAdhar: updatedUser.BackAdhar,
      PanCard: updatedUser.PanCard,
      ProfilePhoto: updatedUser.ProfilePhoto,
      VistOffice: updatedUser.VistOffice,
      CancelledCheck: updatedUser.CancelledCheck,
      Logo: updatedUser.Logo,
      accountedDetails: updatedUser.accountedDetails,
      IFSC: updatedUser.IFSC,
      bankName: updatedUser.bankName,
      block: updatedUser.block,
      createdBy: updatedUser.createdBy,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { block: req.body.block }, { new: true });
    // const userExists = await User.find({ createdBy: createdBy }).populate('createdBy');
  
  
  if (user) {
    res.json(user).status(200)
  } else {
    res.status(401);
    throw new Error('User not found');
  }
})



const test = async (req, res) => {
  try {
    res.json({ msg: "working fine" });
  } catch (error) {
    res.status(401);
    throw new Error('Please enter all required fields');
  }
};
const getAllUserProfile = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "partner" })
    .sort({ createdAt: -1 }); // ✅ newest first

  if (users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});



const getAllFrenchiseProfile = asyncHandler(async (req, res) => {
  const user = await User.find({ role: 'franchise' })
    .sort({ createdAt: -1 }); ;
  console.log("user ", user)
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  const { ids } = req.body;   // Array of user IDs

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ message: "IDs array is required" });
  }

  const result = await User.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount > 0) {
    res.json({
      message: "Users deleted successfully",
      deletedCount: result.deletedCount
    });
  } else {
    res.status(404);
    throw new Error("No users found to delete");
  }
});

// @desc    Get all countries
// @route   GET /api/secondCountries
// @access  Public
const getAllCountries = async (req, res) => {
  try {
    const countries = await SecondCountry
      .find()
      .populate('country'); // populate reference

    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve countries',
      error: error.message,
    });
  }
};


// @desc    Get single country by ID
// @route   GET /api/secondCountries/:id
// @access  Public
const getCountryById = async (req, res) => {
  try {
    const countries = await SecondCountry.findById(req.params.id);
    if (!countries) {
      return res.status(404).json({ message: 'Country not found' });
    }

    const countryData = await Country.findOne({ name: countries.name });

    res.json({
      secondCountry: countries,
      mainCountry: countryData
    });

    console.log(countryData, "countryData++++++++++++++++++++++");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving country' });
  }
};


// @desc    Create a new country
// @route   POST /api/secondCountries
// @access  Private
const createCountry = async (req, res) => {
  const { name, flagURL, currency, code, vfs, step, whyThisCountry, faq ,country } = req.body;
  // if (!name || !flagURL || !currency || !code || !country) {
  //   return res.status(400).json({ message: 'Please provide all required fields' });
  // }
  // console.log(req.body,"|||||||||||||||||||||||||||")
  
  try {
    const country = new SecondCountry(req.body);
    
    const createdCountry = await country.save();
    res.status(201).json(createdCountry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create country' });
  }
};

// @desc    Update country by ID
// @route   PUT /api/secondCountries/:id
// @access  Private
const updateCountry = async (req, res) => {
  const { name, flagURL, currency, code, vfs, step, whyThisCountry, faq } = req.body;

  try {
    const country = await SecondCountry.findById(req.params.id);

    if (country) {
      country.name = name || country.name;
      country.flagURL = flagURL || country.flagURL;
      country.currency = currency || country.currency;
      country.code = code || country.code;
      country.vfs = vfs || country.vfs;
      country.step = step || country.step;
      country.whyThisCountry = whyThisCountry || country.whyThisCountry;
      country.faq = faq || country.faq;

      const updatedCountry = await country.save();
      res.json(updatedCountry);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update country' });
  }
};

// @desc    Delete country by ID
// @route   DELETE /api/secondCountries/:id
// @access  Private
const deleteCountrys = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    const result = await SecondCountry.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      return res.status(200).json({
        message: "Countries deleted successfully",
        deletedCount: result.deletedCount
      });
    } else {
      return res.status(404).json({ message: "No countries found for given IDs" });
    }

  } catch (error) {
    res.status(500).json({ message: "Failed to delete multiple countries", error });
  }
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  authPartner,
  updateUserOneProfile,
  test,
  blockUser,
  getAllUserProfile,
  deleteUserProfile,
  getAllFrenchiseProfile,
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountrys
};

