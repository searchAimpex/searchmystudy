import mongoose from 'mongoose';

const generateTrackingId = () => {
    const randomFourDigit = Math.floor(1000 + Math.random() * 9000);
    return `STU${randomFourDigit}`;
};

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ""
    },
    trackingId: {
        type: String,
        unique: true
    },
    middleName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    passportNumber: {
        type: String,
        default: ""
    },
    dob: {
        type: String,
        default: ""
    },
    mobileNumber: {
        type: String,
        default: ''
    },
    emailID: {
        type: String,
        default: ''
    },
    Country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        default: null, // Set default to null
    },
    Course: {
        type: String, 
        default: '', // Set default to null

    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null, // Set default to null

    },
    lastEdu: {
        type: String, 
        default: "" ,
        enum: ['10th','12th','BACHELOR DEGREE', 'MASTER DEGREE','DIPLOMA 10+3','BACHELOR IN TECHNOLOGY','MASTER IN TECHNOLOGY','POST GRADUATE'],

    },
    yearOfPassing: {
        type: String,
        default: ""
    },
    gradesInLastYear: {
        type: String,
        default: ""
    },
    english12Grade: {
        type: String,
        default: ""
    },
    englishTest : {
        type: String,
        default: "",
        enum: ['WITH IELTS','WITHOUT IELTS'],
    },
    workExperience : {
        type: Boolean,
        default: false
    },
    remarks:{
        type: String,
        default: ""
    },
    // Required fields

    resume: { type: String},
    englishTestScorecard: { type: String },
    acadmics : { type: String},
    englishTestDoc : { type: String },
    workExperienceDoc : { type: String },

    // Additional fields
    status: { 
        type: String, 
        default: "pending" ,
        enum: ['pending','shared','eligible','ineligible'],

    }
}, 
{
    timestamps: true,
});


// Pre-save hook to generate a unique tracking ID
profileSchema.pre('save', function (next) {
    if (!this.trackingId) {
      this.trackingId = generateTrackingId();
    }
    next();
  });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
