import mongoose from 'mongoose';

const generateTrackingId = () => {
    const randomFourDigit = Math.floor(1000 + Math.random() * 9000);
    return `STU${randomFourDigit}`;
};

const studentSchema = new mongoose.Schema({
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
    citizenship: {   // corrected spelling from "cititzenship"
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    photo: {
        type: String,
        default: ""
    },
    postCode: {
        type: String,
        default: ''
    },
    mobileNumber: {
        type: String,
        default: ''
    },
    emailID: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    Country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        default: null, // Set default to null
    },
    Province: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Province',
        default: null, // Set default to null

    },
    University: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        default: null, // Set default to null

    },
    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        default: null, // Set default to null

    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null, // Set default to null

    },
    // Required fields
    grade12Marksheet: { type: String},  // File path or URL
    grade10Marksheet: { type: String },
    passportFrontBack: { type: String },
    resume: { type: String},
    englishTestScorecard: { type: String },
  
    // Recommended fields
    grade10PassingCertificate: { type: String },
    verificationForm: { type: String },
    applicationFeeReceipt: { type: String },
    statementOfPurpose: { type: String },
    extracurricularCertificates: { type: String },
    gapJustification: { type: String },
    workExperience: { type: String },
    universityApplicationForm: { type: String },
    letterOfRecommendations: { type: String },
    masterTranscripts: { type: String },
    masterMarksheet: { type: String },
    masterDegree: { type: String },
    bachelorTranscripts: { type: String },
    bachelorMarksheet: { type: String },
    bachelorDegree: { type: String },
    grade12PassingCertificate: { type: String },
    powerOfAttorney: { type: String },
    registrationForm: { type: String },
    declarationForm: { type: String },
  
    // Optional fields
    passportPhoto: { type: String },
    portfolio: { type: String },
    visaDocument: { type: String },
    birthCertificate: { type: String },
    policeClearanceCertificate: { type: String },
    medicalCertificate: { type: String },

    // Additional fields
    status: { 
        type: String, 
        default: "Inquiry" ,
        enum: ['Inquiry','Assessment','Offer Letter','Fees Paid','Acceptance Letter','VFS date booked','File Submitted','Visa Approved'],

    }
}, 
{
    timestamps: true,
});


// Pre-save hook to generate a unique tracking ID
studentSchema.pre('save', function (next) {
    if (!this.trackingId) {
      this.trackingId = generateTrackingId();
    }
    next();
  });

const Student = mongoose.model('Student', studentSchema);

export default Student;
