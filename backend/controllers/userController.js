import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import Counsellor from '../models/counsellorModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

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


// @desc    Auth partner & get token
// @route   POST /api/users/auth
// @access  Public
const authPartner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
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
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
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
  const user = await User.find({role:'frenchise'});

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
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  authPartner,
  test,
  blockUser,
  getAllUserProfile,
  deleteUserProfile,
  getAllFrenchiseProfile
};

