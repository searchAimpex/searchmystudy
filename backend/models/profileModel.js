import mongoose from 'mongoose';

const generateTrackingId = () => {
    const randomFourDigit = Math.floor(1000 + Math.random() * 9000);
    return `STU${randomFourDigit}`;
};

const profileSchema = new mongoose.Schema({
    // Tracking & user ref
    trackingId: { type: String, unique: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    // Personal
    firstName: { type: String, default: "" },
    middleName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    fatherName: { type: String, default: "" },
    motherName: { type: String, default: "" },
    gender: { type: String, default: "" },
    dob: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
    postCode: { type: String, default: "" },
    country: { type: String, default: "" },
    citizenship: { type: String, default: "" },
    Province: { type: String, default: "" },
    // Identity & passport
    adhaar: { type: String, default: "" },
    aadharPhoto: { type: String, default: "" },
    passportNumber: { type: String, default: "" },
    passportPhoto: { type: String, default: "" },
    passportFrontBack: { type: String, default: "" },
    birthCertificate: { type: String, default: "" },
    // Contact
    mobileNumber: { type: String, default: "" },
    parentMobileNumber: { type: String, default: "" },
    emailID: { type: String, default: "" },
    // Course & program
    Country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', default: null },
    Course: { type: String, default: "" },
    courselevel: { type: String, default: "" },
    programLevel: { type: String, default: "" },
    University: { type: String, default: "" },
    specialization: { type: String, default: "" },
    grade: { type: String, default: "" },
    category: { type: String, default: "" },
    // Qualified test
    qualifiedTestName: { type: String, default: "" },
    qualifiedTestYear: { type: String, default: "" },
    qualifiedTestResultType: { type: String, default: "" },
    qualifiedTestGrade: { type: String, default: "" },
    qualifiedTestScore: { type: String, default: "" },
    qualifiedTestImage: { type: String, default: "" },
    // Latest qualification / education
    lastEdu: {
        type: String,
        default: "",
        enum: ['10th', '12th', 'BACHELOR DEGREE', 'MASTER DEGREE', 'DIPLOMA 10+3', 'BACHELOR IN TECHNOLOGY', 'MASTER IN TECHNOLOGY', 'POST GRADUATE']
    },
    lastQualificationCourseName: { type: String, default: "" },
    lastQualificationSpecialization: { type: String, default: "" },
    lastQualificationResultType: { type: String, default: "" },
    yearOfPassing: { type: String, default: "" },
    gradesInLastYear: { type: String, default: "" },
    // School / secondary
    secondarySchoolPassingGrade: { type: String, default: "" },
    secondarySchoolPassingPercent: { type: String, default: "" },
    secondarySchoolPassingYear: { type: String, default: "" },
    higherSchoolPassingDivision: { type: String, default: "" },
    higherSchoolPassingPercent: { type: String, default: "" },
    higherSchoolPassingYear: { type: String, default: "" },
    // UG / PG
    ugPassingGrade: { type: String, default: "" },
    ugPassingPercent: { type: String, default: "" },
    ugPassingYear: { type: String, default: "" },
    pgPassingGrade: { type: String, default: "" },
    pgPassingPercent: { type: String, default: "" },
    pgPassingYear: { type: String, default: "" },
    // English test
    english12Grade: { type: String, default: "" },
    english12Cgpa: { type: String, default: "" },
    english12Score: { type: String, default: "" },
    english12ResultType: { type: String, default: "" },
    english12Year: { type: String, default: "" },
    englishTest: { type: String, default: "", enum: ['WITH IELTS', 'WITHOUT IELTS'] },
    englishTestYear: { type: String, default: "" },
    englishTestScore: { type: String, default: "" },
    englishtestimage: { type: String, default: "" },
    remarks: { type: String, default: "" },
    // Documents – general
    resume: { type: String, default: "" },
    acadmics: { type: String, default: "" },
    englishTestScorecard: { type: String, default: "" },
    englishTestDoc: { type: String, default: "" },
    workExperience: { type: String, default: "" },
    workExperienceDoc: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    statementOfPurpose: { type: String, default: "" },
    letterOfRecommendations: { type: String, default: "" },
    gapJustification: { type: String, default: "" },
    // Documents – academic
    grade10Marksheet: { type: String, default: "" },
    grade10PassingCertificate: { type: String, default: "" },
    grade12Marksheet: { type: String, default: "" },
    grade12PassingCertificate: { type: String, default: "" },
    bachelorDegree: { type: String, default: "" },
    bachelorMarksheet: { type: String, default: "" },
    bachelorTranscripts: { type: String, default: "" },
    masterDegree: { type: String, default: "" },
    masterMarksheet: { type: String, default: "" },
    masterTranscripts: { type: String, default: "" },
    // Documents – application & legal
    applicationFeeReceipt: { type: String, default: "" },
    registrationForm: { type: String, default: "" },
    declarationForm: { type: String, default: "" },
    verificationForm: { type: String, default: "" },
    universityApplicationForm: { type: String, default: "" },
    powerOfAttorney: { type: String, default: "" },
    policeClearanceCertificate: { type: String, default: "" },
    medicalCertificate: { type: String, default: "" },
    visaDocument: { type: String, default: "" },
    extracurricularCertificates: { type: String, default: "" },
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
