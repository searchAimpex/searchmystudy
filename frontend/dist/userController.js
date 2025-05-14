import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import Counsellor from '../models/counsellorModel.js';
import SecondCountry from '../models/secondCountryModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json(user);
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


// @desc    Auth partner & get token
// @route   POST /api/users/auth
// @access  Public
const authPartner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate('createdBy');
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  if(user.role === 'admin'){
    res.status(401);
    throw new Error('Acess Denied');
  }
  if(user.block){
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
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    createdBy,
    block,
    OwnerName,
    OwnerFatherName,
    InsitutionName,
    ContactNumber,
    WhatappNumber,
    CenterCode,
    DateOfBirth,
    city,
    state,
    zipCode,
    address,
    FrontAdhar,
    BackAdhar,
    PanCard,
    ProfilePhoto,
    VistOffice,
    CancelledCheck,
    Logo,
    accountedDetails,
    IFSC,
    bankName
  } = req.body;

  // Check if user with the same email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create a new user with all the provided fields
  const user = await User.create({
    name,
    email,
    password,
    passwordTracker:password,
    role,
    createdBy,
    block,
    OwnerName,
    OwnerFatherName,
    InsitutionName,
    ContactNumber,
    WhatappNumber,
    CenterCode,
    DateOfBirth,
    city,
    state,
    zipCode,
    address,
    FrontAdhar,
    BackAdhar,
    PanCard,
    ProfilePhoto,
    VistOffice,
    CancelledCheck,
    Logo,
    accountedDetails,
    IFSC,
    bankName
  });

  // If user creation is successful
  if (user) {
    // Generate token (assuming a generateToken function exists)
    generateToken(res, user._id);

    // Send the created user data in response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdBy: user.createdBy,
      block: user.block,
      OwnerName: user.OwnerName,
      OwnerFatherName: user.OwnerFatherName,
      InsitutionName: user.InsitutionName,
      ContactNumber: user.ContactNumber,
      WhatappNumber: user.WhatappNumber,
      CenterCode: user.CenterCode,
      DateOfBirth: user.DateOfBirth,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      address: user.address,
      FrontAdhar: user.FrontAdhar,
      BackAdhar: user.BackAdhar,
      PanCard: user.PanCard,
      ProfilePhoto: user.ProfilePhoto,
      VistOffice: user.VistOffice,
      CancelledCheck: user.CancelledCheck,
      Logo: user.Logo,
      accountedDetails:user.accountedDetails,
      IFSC:user.IFSC,
      bankName:user.bankName
    });

  } else {
    res.status(400);
    throw new Error('Invalid user data');
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
    console.log("fix",user)
    console.log("updatte",req.body)
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
    console.log("update user",updatedUser);
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
    console.log("fix",user)
    console.log("updatte",req.body)
    // Update general fields
 
    user.Logo = req.body.Logo || user.Logo;
   

  
    const updatedUser = await user.save();
    console.log("update user",updatedUser);
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

const blockUser = asyncHandler(async (req,res)=>{
  const user = await User.findByIdAndUpdate(req.params.id,{block:req.body.block},{new:true});
  if(user) {
    res.json(user).status(200)
  }else {
    res.status(401);
    throw new Error('User not found');
  }
})

const test = async (req, res) => {
  try {
    res.json({ msg:"working fine" });
  } catch (error) {
    res.status(401);
    throw new Error('Please enter all required fields' );
  }
};
const getAllUserProfile = asyncHandler(async (req, res) => {
  const user = await User.find({role:'partner'});

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
const getAllFrenchiseProfile = asyncHandler(async (req, res) => {
  const user = await User.find({role:'franchise'});
  console.log("user ",user)
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete({_id:req.params.id});
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @desc    Get all countries
// @route   GET /api/secondCountries
// @access  Public
const getAllCountries = async (req, res) => {
  try {
    const countries = await SecondCountry.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve countries' });
  }
};

// @desc    Get single country by ID
// @route   GET /api/secondCountries/:id
// @access  Public
const getCountryById = async (req, res) => {
  try {
    const country = await SecondCountry.findById(req.params.id);
    
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving country' });
  }
};

// @desc    Create a new country
// @route   POST /api/secondCountries
// @access  Private
const createCountry = async (req, res) => {
  const { name, flagURL, currency, code, vfs, step, whyThisCountry, faq } = req.body;

  if (!name || !flagURL || !currency || !code) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const country = new SecondCountry({
      name,
      flagURL,
      currency,
      code,
      vfs,
      step,
      whyThisCountry,
      faq,
    });

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
    console.log("fix",req.params.id)
    const country = await SecondCountry.findByIdAndDelete(req.params.id);

    if (country) {
      
      res.json(country);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete country' });
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

