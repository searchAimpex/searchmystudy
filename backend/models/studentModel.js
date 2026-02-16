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
    adhaar: { type: String, default: "" },
    pincode: { type: String, default: "" },
    // Course level & grade
    courselevel: { type: String, default: "" },
    grade: { type: String, default: "" },
    // Qualified test
    qualifiedTestName: { type: String, default: "" },
    qualifiedTestYear: { type: String, default: "" },
    qualifiedTestResultType: { type: String, default: "" },
    qualifiedTestImage: { type: String, default: "" },
    qualifiedTestGrade: { type: String, default: "" },
    // Latest qualification
    lastEdu: {
        type: String,
        default: "",
        enum: ['10th', '12th', 'BACHELOR DEGREE', 'MASTER DEGREE', 'DIPLOMA 10+3', 'BACHELOR IN TECHNOLOGY', 'MASTER IN TECHNOLOGY', 'POST GRADUATE']
    },
    lastQualificationCourseName: { type: String, default: "" },
    lastQualificationSpecialization: { type: String, default: "" },
    category: { type: String, default: "" },
    lastQualificationResultType: { type: String, default: "" },
    aadharPhoto:{type:String,default:""},
    
    englishtestimage: { type: String, default: "" },
    yearOfPassing: { type: String, default: "" },
    gradesInLastYear: { type: String, default: "" },
    // English test
    english12Grade: { type: String, default: "" },
    english12ResultType: { type: String, default: "" },
    englishTest: { type: String, default: "" },
    englishTestYear: { type: String, default: "" },
    remarks: { type: String, default: "" },
    Country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        default: null, // Set default to null
    },
    // Province: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Province',
    //     default: null, // Set default to null

    // },
    University: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        default: null, // Set default to null

    },
    // Course: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Course',
    //     default: null, // Set default to null

    // },
        Course: { type: String, default: "" },

    specialization: { type: String, default: "" },
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
    acadmics: { type: String, default: "" },
    englishTestDoc: { type: String, default: "" },
    workExperienceDoc: { type: String, default: "" },

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
