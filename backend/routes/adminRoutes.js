import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { protect } from '../middleware/authMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { createBanner,test,fetchAllBanner,deleteBanner,
      createService, deleteService, updateService, getService, getServices, 
      createTestimonial, getTestimonials, deleteTestimonial, updateTestimonial, getTestimonialById,
      createCounsellor, getCounsellors, deleteCounsellor, 
      createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog,
      createCountry, getCountries, getCountryById, updateCountry,
      createProvince, getAllProvinces, getProvinceById, updateProvince, deleteProvince, 
      createUniversity, getAllUniversities, getUniversityById, updateUniversity, deleteUniversity, 
      getAllCourses, createCourse, getCourseById, updateCourse, deleteCourse, getCourses, 
      getWebinars, createWebinar, getWebinarById, updateWebinar, deleteWebinar, getMediaItems, createMediaItem, getMediaItemById,
      updateMediaItem, deleteMediaItem, getCoursesForIndiaMedical ,
      createLead,getLead,deleteLead,GetOneLead,
      createHomeLead,
      getLeads,
      deleteHomeLead,
      createContactLead,
      getContactLeads,
      deleteContactLead,
      extraUser,
      extraUserFetch,
      sendNotificationToRole,
      getNotifications,
      getAllNotifications,
      createStudent,
      fetchByUserStudent,
      fetchStudent,
      DeleteStudent,
      UpdateStudentStatus,
      GetOneStudent,
      GetOneStudentByTracking,
      updateStudentdetails,
      replyToTicket,
      getTicket,
      createTicket,
      getAllTicket,
      deleteOneTicket,
      updateTicketStatus,
      getStudentMetrics,
      createPromotional,
      fetchAllPromotional,
      deletePromotional,
      createProfile,
      fetchByUserProfile,
      getAllProfiles,
      UpdateProfileStatus,
      deleteProfile,
      createPopup,
      updatePopup,
      getAllPopups,
      deletePopup,
      getAllMainPopups,
      getAllPartnerPopups,
      deleteUpload,
      getAllUploads,
      createUpload,
      getPartnerUploads,
      getFrenchiseUploads,
      createCommission,
      getAllCommission,
      deleteCommission,
      getPartnerCommission,
      getFrenchiseCommission,
      createLoan,
      getLoansByUser,
      getLoans,
      UpdateLoanStatus,
      createTransaction,
      updateTransaction,
      getAllTransactions,
      getTransactionsByCenterCode,
      deleteTransactions,
      DeleteLoan,
      getAllNavItems,
      createNavItem,
      deleteNavItem,
      checkUser,
      createFile,
      getAllFiles,
      deleteFile,
      findOneFile,
      createVideo,
      getVideo,
      deleteVideo,
      getAllCountries,
      webinar_sendEmail,
      createQuery,
      getAllQueries,
      // deleteQueryById,
      deleteCountries,
      updateVideo,
      updateCounsellor,
      getLeadsByCounsellor,
      createWebsiteDetail,
      getWebsiteDetails,
      deleteMultipleWebsiteDetails,
      updateWebsiteDetail,
      verifyToken,
      profileUpdate,
      fetchByTrackingId,
      updateFile,
      allFiles,
      updateNav,
      getAllContact,
      createContact,
      deleteContact,
      updateContact,
      extraUserAll,
      deleteCounsellorCoursefinder,
      fetchwebinarleads,
      deleteQueryById,
      deleteWebinarLeads,
      validation,
      updateUpload,
      getAllFrenchisePopups,
      // deleteMultipleQueries

      } from '../controllers/adminController.js';
const router = express.Router();

// Upload directory: absolute path so it works regardless of process cwd
const profileUploadDir = path.join(__dirname, '..', 'upload');
if (!fs.existsSync(profileUploadDir)) {
  fs.mkdirSync(profileUploadDir, { recursive: true });
}

// Multer storage configuration for profile-related uploads
const profileStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, profileUploadDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalName = file.originalname || 'file';
    cb(null, `${uniqueSuffix}-${originalName}`);
  },
});

// Allow up to 20MB per file to avoid 413 Request Entity Too Large
const profileUpload = multer({
  storage: profileStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
});
const studentUpload = multer({
  storage: profileStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
});

// Run multer only for multipart/form-data requests.
// This prevents breaking existing JSON requests (e.g., firebase URLs as strings).
const maybeUploadFields = (fields) => (req, res, next) => {
  if (req.is('multipart/form-data')) {
    return profileUpload.fields(fields)(req, res, next);
  }
  return next();
};

const maybeUploadSingle = (fieldName) => (req, res, next) => {
  if (req.is('multipart/form-data')) {
    return profileUpload.single(fieldName)(req, res, next);
  }
  return next();
};

/***********BANNER ROUTES *********/
router.post('/createBanner', createBanner);
router.get('/FetchAllBanner',fetchAllBanner)
router.delete('/DeleteBanner/:id',deleteBanner)
router.get('/test',test)
/***********BANNER ROUTES *********/


router.put('/verifyToken/:token',verifyToken)



/***********SERVICES ROUTES *********/
router.get('/Services/all',getServices)
router.get('/Service/:id',getService)
router.post('/CreateService',createService)
router.put('/UpdateServices/:id',updateService)
router.delete('/DeleteService',deleteService)
/***********SERVICES ROUTES *********/


/****************TESTIMONIAL ROUTES *****************/
router.get('/Testimonials/all',getTestimonials)
router.get('/Testimonials/:id',getTestimonialById)
router.post('/CreateTestimonials',createTestimonial)
router.put('/UpdateTestimonials/:id',updateTestimonial)
router.delete('/DeleteTestimonials',deleteTestimonial)
/****************TESTIMONIAL ROUTES *****************/


/****************COUNSELLOR ROUTES ******************/
router.post('/CreateCounsellor',createCounsellor)
router.get('/Counsellor/all',getCounsellors)
router.delete('/DeleteCounsellors',deleteCounsellor)
router.put('/UpdateCounsellors/:id',updateCounsellor)
/****************COUNSELLOR ROUTES ******************/


/*************** BLOGS ROUTES **********************/
router.route('/Blog').post(
  profileUpload.fields([
    { name: 'bannerURL', maxCount: 1 },
    { name: 'thumbnailURL', maxCount: 1 },
  ]),
  createBlog
).get(getAllBlogs);
router.route('/Blog/:id').get(getBlogById).put(
  profileUpload.fields([
    { name: 'bannerURL', maxCount: 1 },
    { name: 'thumbnailURL', maxCount: 1 },
  ]),
  updateBlog
);
router.delete('/blogs', deleteBlog); // Endpoint: DELETE /blogs
/*************** BLOGS ROUTES **********************/


/*************** COUNTRY ROUTES **********************/
router.route('/countries')
  .post(createCountry)
  .get(getCountries);
router.route('/countries/:id')
  .get(getCountryById)
  .put(updateCountry)
  // .delete(deleteCountry);


router.route('/countries')
  .delete(deleteCountries); // body: { ids: ["id1", "id2"] }


router.route('/allcountries').get(getAllCountries);
/*************** COUNTRY ROUTES **********************/

/*************** PROVINCE ROUTES **********************/
router.route('/province')
  .post(createProvince)
  .get(getAllProvinces);
router.route('/province/:id')
  .get(getProvinceById)
  .put(updateProvince)


router.route('/province')
  .delete(deleteProvince);
/*************** PROVINCE ROUTES **********************/


/*************** UNIVERSITY ROUTES **********************/
router.route('/university')
  .post(createUniversity)
  .get(getAllUniversities);
router.route('/university/:id')
  .get(getUniversityById)
  .put(updateUniversity)

router.route('/university')
  .delete(deleteUniversity);
/*************** UNIVERSITY ROUTES **********************/

/*************** WEBINAR ROUTES **********************/

router.route('/webinar')
  .get(getWebinars)
  .post(createWebinar);

router.route('/webinar/register')
  .post(webinar_sendEmail);
router.get('/fetchAll',fetchwebinarleads)

router.route('/webinar/:id')
  .get(getWebinarById)
  .put(updateWebinar)
  // .delete(deleteWebinar);

router.delete('/webinar',deleteWebinar)

// router.route.('',webinar_sendEmail)

/*************** WEBINAR ROUTES **********************/



/*************** MEDIA ROUTES **********************/

router.route('/media')
  .get(getMediaItems)
  .post(createMediaItem);

router.route('/media/:id')
  .get(getMediaItemById)
  .put(updateMediaItem);
  
router.route('/media')
  .delete(deleteMediaItem);

/*************** MEDIA ROUTES **********************/



/***************** COURSE ROUTES *********************/


router.get('/course/All',getCourses)
router.get('/course/medical',getCoursesForIndiaMedical)

router.route('/course')
  .get(getAllCourses)
  .post(createCourse);


router.route('/course/:id')
  .get(getCourseById)
  .put(updateCourse);

router.route('/course')
  .delete(deleteCourse);

/***************** COURSE ROUTES *********************/




/****************** Counselling Lead Routes     ***********************/

router.post('/lead',createLead)
router.get('/lead',getLead)
router.delete('/lead',deleteLead)
router.get('/lead/:id',GetOneLead)
router.get('/leadByCounsellor/:id',getLeadsByCounsellor)
/****************** Lead Routes     ***********************/


/********************* Home Lead Routes  ***********************/
router.post('/homelead',createHomeLead)
router.get('/homelead',getLeads)
router.delete('/homelead',deleteHomeLead)
/**************************************************************/




/********************* Contact Lead Routes  ***********************/
router.post('/contactlead',createContactLead)
router.get('/contactlead',getContactLeads)

router.delete('/contactlead',deleteContactLead)
/******************************************************************/



// *****************************************************************
router.post('/createQuery',createQuery)
router.get('/getAllQuery',getAllQueries)
router.delete("/delete",deleteWebinarLeads)
router.delete('/deleteQueries',deleteQueryById)

// *****************************************************************





/********************* Extra User Routes  ***********************/
router.post('/extrauser', profileUpload.single('ProfilePhoto'), extraUser)
router.get('/extrauserall',extraUserAll)
router.get('/extrauser/:id',extraUserFetch)
router.delete('/deleteExtrauser',deleteCounsellorCoursefinder)
/******************************************************************/




/********************* Notification User Routes  ***********************/
router.post('/notify-role', sendNotificationToRole);
router.get('/notify-me/:id',getNotifications)
router.get('/notfiy-all',getAllNotifications)
/******************************************************************/


/********************* student Routes  ***********************/
router.post(
  '/student',
  studentUpload.fields([
    { name: 'aadharPhoto', maxCount: 1 },
    { name: 'grade12Marksheet', maxCount: 1 },
    { name: 'grade10Marksheet', maxCount: 1 },
    { name: 'passportFrontBack', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'englishTestScorecard', maxCount: 1 },
    { name: 'grade10PassingCertificate', maxCount: 1 },
    { name: 'verificationForm', maxCount: 1 },
    { name: 'applicationFeeReceipt', maxCount: 1 },
    { name: 'workExperience', maxCount: 1 },
    { name: 'universityApplicationForm', maxCount: 1 },
    { name: 'grade12PassingCertificate', maxCount: 1 },
    { name: 'registrationForm', maxCount: 1 },
    { name: 'visaDocument', maxCount: 1 },
    { name: 'birthCertificate', maxCount: 1 },
  ]),
  createStudent
);
router.get('/student/:id',fetchByUserStudent)
router.get('/student/track/:id',fetchByTrackingId)
router.get('/student',fetchStudent)
router.put('/student/status/:id',UpdateStudentStatus)
router.put('/student/detail/:id',updateStudentdetails)
router.delete('/student',DeleteStudent)
router.get("/student/one/:id",GetOneStudent)
router.get('/track/:id',GetOneStudentByTracking)
/******************************************************************/


/********************* ticket Routes  ***********************/
router.post('/ticket', profileUpload.array('attachments', 10), createTicket);
router.post('/ticket/reply/:id',replyToTicket)
router.get('/ticket/:id',getTicket)
router.get('/ticket',getAllTicket)
router.delete('/ticket',deleteOneTicket)
router.put('/ticket/:id',updateTicketStatus)

/******************************************************************/


/*************************** Matrix  *****************************/
router.get('/matrix/:id',getStudentMetrics)
/*********************************** ****************************/



/***********Promotional ROUTES *********/
router.post('/createPromotional', createPromotional);
router.get('/FetchAllPromotional',fetchAllPromotional)
router.delete('/DeletePromotional',deletePromotional)
/***********Promotional ROUTES *********/


/************************* Profile Assisment  **********************/
router.post(
  '/profile',
  profileUpload.fields([
    { name: 'acadmics', maxCount: 1 },
    { name: 'englishTestScorecard', maxCount: 1 },
    { name: 'qualifiedTestImage', maxCount: 1 },
    { name: 'englishTestDoc', maxCount: 1 },
    { name: 'workExperienceDoc', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]),
  createProfile
)
router.post('/validation',validation)
router.get('/profile/:id',fetchByUserProfile)
router.get('/profile',getAllProfiles)
router.put('/profile/status/:id',UpdateProfileStatus)
router.delete('/profile',deleteProfile)
router.put('/profile/update/:id',profileUpdate)
/**************************************************/

//////////////// PopUP Route ****************/
router.post('/popup', profileUpload.single('imageURL'), createPopup)
router.get('/popup',getAllPopups)
// router.delete('/popup/:id',deletePopup)
router.delete('/popup',deletePopup)
router.put('/popup/:id', profileUpload.single('imageURL'), updatePopup)
router.get('/popup/main',getAllMainPopups)
router.get('/popup/partner',getAllPartnerPopups)
router.get('/popup/frenchise',getAllFrenchisePopups)
///////////////////////////////////////////////

//////////////// UPLOAD ROUTE ****************/
router.post(
  '/upload',
  maybeUploadFields([
    { name: 'imageURL', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 },
    { name: 'iconURL', maxCount: 1 },
    { name: 'iconFile', maxCount: 1 },
  ]),
  createUpload
)
router.put('/upload/:id',updateUpload)        
router.get('/upload',getAllUploads)
router.delete('/upload',deleteUpload)
router.get('/upload/partner',getPartnerUploads)
router.get('/upload/frenchise',getFrenchiseUploads)
///////////////////////////////////////////////


//////////////// COMMISSION ROUTE ****************/
router.post('/commission', profileUpload.single('fileURL'), createCommission)
router.get('/commission',getAllCommission)
router.delete('/commission',deleteCommission)
router.get('/commission/partner',getPartnerCommission)
router.get('/commission/frenchise',getFrenchiseCommission)
///////////////////////////////////////////////


//////////////// LOAN ROUTE ****************/
router.post(
  '/loan',
  profileUpload.fields([
    { name: 'offerLetter', maxCount: 1 },
    { name: 'passportDoc', maxCount: 1 },
  ]),
  createLoan
)
router.get('/loan/:id',getLoansByUser)
router.get('/loan',getLoans)
router.put('/loan/status/:id',UpdateLoanStatus)
router.delete('/loan',DeleteLoan)
///////////////////////////////////////////////



////////////////////TRANSACTION //////////////////
router.post(
  '/transaction',
  profileUpload.fields([
    { name: 'invoice', maxCount: 1 },
    { name: 'receipt', maxCount: 1 },
    { name: 'other', maxCount: 1 },
  ]),
  createTransaction
)
router.put(
  '/transaction/:id',
  profileUpload.fields([
    { name: 'invoice', maxCount: 1 },
    { name: 'receipt', maxCount: 1 },
    { name: 'other', maxCount: 1 },
  ]),
  updateTransaction
)
router.get('/transaction',getAllTransactions)
router.get('/transaction/:id',getTransactionsByCenterCode)
router.delete('/transaction',deleteTransactions)
// router.put('/')
////////////////////////////////////////////////////////


///////////////////////NAVLINKS ///////////////////
router.get('/nav',getAllNavItems)
router.post('/nav',createNavItem)
router.delete('/nav',deleteNavItem)
router.put('/nav/:id',updateNav)
//////////////////////////////////////////////////
/////////////////////////contact
router.get('/contact/all',getAllContact)
router.post('/contact', maybeUploadSingle('profileImg'), createContact)
router.delete('/contact',deleteContact)
router.put('/contact/:id', maybeUploadSingle('profileImg'), updateContact)
router.get('/CenterCheck/:id',checkUser)

////////////////// FILE ////////////////////
router.post(
  '/file',
  profileUpload.fields([
    { name: 'template', maxCount: 1 },
    { name: 'broucher', maxCount: 1 },
  ]),
  createFile
)
router.get('/file', getAllFiles)
router.get('/files',allFiles)
router.put(
  '/file/:id',
  profileUpload.fields([
    { name: 'template', maxCount: 1 },
    { name: 'broucher', maxCount: 1 },
  ]),
  updateFile
)
router.get('/file/:id',findOneFile)
router.delete('/file',deleteFile)
////////////////////////////////////////////


/****************VIDEO ROUTES *****************/
router.post('/CreateVideo',createVideo)
router.get('/Video/all',getVideo)
router.put('/UpdateVideo/:id',updateVideo)
router.delete('/DeleteVideo',deleteVideo)
/****************VIDEO ROUTES *****************/

// websitedetails
router.post('/createWebsiteDetail',createWebsiteDetail)
router.get('/getWebsiteDetails',getWebsiteDetails)
router.put('/updateWebsiteDetail/:id',updateWebsiteDetail)
router.delete('/deleteMultipleWebsiteDetails',deleteMultipleWebsiteDetails)

router.get("/getProfileWeb",)
export default router;
