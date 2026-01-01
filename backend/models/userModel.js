import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordTracker: {
      type: String,
      default:''
    },
    role:{ type:String,default:"admin"},
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
    block: {type:Boolean,default:false},
    OwnerName: {
      type: String,
      default:""
    },
    OwnerFatherName: {
      type: String,
      default:""
    },
    InsitutionName: {
      type: String,
      default:""
    },
    ContactNumber:{
      type:String,
      default:""
    },
    status:{
      type:Boolean,
      defaut:false
    },
    WhatappNumber: {
      type:String,
      default:""
    },
    CenterCode: {
      type:String,
      default:""
    },
    DateOfBirth:{
      type:Date,
      default:""
    },
    city:{
      type:String,
      default:""
    },
    state:{
      type:String,
      default:""
    },
    zipCode:{
      type:Number,
      default:0

    },
    address:{
      type:String,
      default:""
    },
    FrontAdhar:{
      type:String,
      default:""
    },
    BackAdhar:{
      type:String,
      default:""
  },
  PanCard:{
      type:String,
      default:""
  },
  ProfilePhoto: {
      type:String,
      default:""
  },
  CounsellorCOde:{
    type: String,
    default:""
  },
  OwnerPhoto:{
      type: String,
      default:""
  },
  OfficePhoto:{
      type: String,
      default:""
  },
  mou:{
      type: String,
      default:""
  },
  registration:{
      type: String,
      default:""
  },
  VistOffice : {
      type:String,
      default:""
  }, CancelledCheck: {
    type: String,
    default: '',
  },
  Logo: {
    type: String,
    default: '',
  },
  accountedDetails : {
    type: String,
    default:''

  },
  IFSC: {
    type: String,
    default:''
  },
  bankName: {
    type: String,
    default:''
  },
  bio:{
    type:String
  }
  
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
