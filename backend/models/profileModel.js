import mongoose from 'mongoose';

const generateTrackingId = () => {
    const randomFourDigit = Math.floor(1000 + Math.random() * 9000);
    return `STU${randomFourDigit}`;
};

const profileSchema = new mongoose.Schema({
    // Tracking & user ref
    trackingId: {
        type: String,
        unique: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    // Personal
    firstName: { type: String, default: "" },
    middleName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    city: { type: String, default: "" },
    gender: { type: String, default: "" },
    adhaar: { type: String, default: "" },
    passportNumber: { type: String, default: "" },
    dob: { type: String, default: "" },
    address: { type: String, default: "" },
    pincode: { type: String, default: "" },
    // Contact
    mobileNumber: { type: String, default: "" },
    emailID: { type: String, default: "" },
    // Course level & grade
    courselevel: { type: String, default: "" },
    grade: { type: String, default: "" },
    // Qualified test
    qualifiedTestName: { type: String, default: "" },
    qualifiedTestYear: { type: String, default: "" },
    qualifiedTestResultType: { type: String, default: "" }, // 'grade' | 'score'
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
    lastQualificationResultType: { type: String, default: "" }, // 'grade' | 'score'
    englishtestimage: { type: String, default: "" },
    yearOfPassing: { type: String, default: "" },
    gradesInLastYear: { type: String, default: "" },
    // English test
    english12Grade: { type: String, default: "" },
    english12ResultType: { type: String, default: "" }, // 'grade' | 'cgpa'
    englishTest: {
        type: String,
        default: "",
        enum: ['WITH IELTS', 'WITHOUT IELTS']
    },
    englishTestYear: { type: String, default: "" },
    remarks: { type: String, default: "" },
    // Course
    Country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        default: null
    },
    Course: { type: String, default: "" },
    specialization: { type: String, default: "" },
    // Documents
    resume: { type: String, default: "" },
    englishTestScorecard: { type: String, default: "" },
    acadmics: { type: String, default: "" },
    englishTestDoc: { type: String, default: "" },
    workExperienceDoc: { type: String, default: "" },
    workExperience: {
        type: Boolean,
        default: false
    },
    // Status
    status: {
        type: String,
        default: "pending",
        enum: ['pending', 'shared', 'eligible', 'ineligible']
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
