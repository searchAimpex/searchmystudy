import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
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
      deleteQueryById,
      deleteCountries,
      updateVideo,
      updateCounsellor,
      getLeadsByCounsellor,
      createWebsiteDetail,
      getWebsiteDetails,
      deleteMultipleWebsiteDetails,
      updateWebsiteDetail,
      verifyToken

      } from '../controllers/adminController.js';
const router = express.Router();


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
router.route('/Blog').post(createBlog).get(getAllBlogs);
router.route('/Blog/:id').get(getBlogById).put(updateBlog);
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
router.delete('/deleteQueryById',deleteQueryById)
// *****************************************************************





/********************* Extra User Routes  ***********************/
router.post('/extrauser',extraUser)
router.get('/extrauser/:id',extraUserFetch)
/******************************************************************/




/********************* Notification User Routes  ***********************/
router.post('/notify-role', sendNotificationToRole);
router.get('/notify-me/:id',getNotifications)
router.get('/notfiy-all',getAllNotifications)
/******************************************************************/


/********************* student Routes  ***********************/
router.post('/student', createStudent);
router.get('/student/:id',fetchByUserStudent)
router.get('/student',fetchStudent)
router.put('/student/status/:id',UpdateStudentStatus)
router.put('/student/detail/:id',updateStudentdetails)
router.delete('/student',DeleteStudent)
router.get("/student/one/:id",GetOneStudent)
router.get('/student/track/:id',GetOneStudentByTracking)
/******************************************************************/


/********************* ticket Routes  ***********************/
router.post('/ticket', createTicket);
router.post('/ticket/reply/:id',replyToTicket)
router.get('/ticket/:id',getTicket)
router.get('/ticket',getAllTicket)
router.delete('/ticket/:id',deleteOneTicket)
router.put('/ticket/:id',updateTicketStatus)

/******************************************************************/


/*************************** Matrix  *****************************/
router.get('/matrix/:id',getStudentMetrics)
/*********************************** ****************************/



/***********Promotional ROUTES *********/
router.post('/createPromotional', createPromotional);
router.get('/FetchAllPromotional',fetchAllPromotional)
router.delete('/DeletePromotional/:id',deletePromotional)
/***********Promotional ROUTES *********/


/************************* Profile Assisment  **********************/
router.post('/profile',createProfile)
router.get('/profile/:id',fetchByUserProfile)
router.get('/profile',getAllProfiles)
router.put('/profile/status/:id',UpdateProfileStatus)
router.delete('/profile/:id',deleteProfile)
/**************************************************/

//////////////// PopUP Route ****************/
router.post('/popup',createPopup)
router.get('/popup',getAllPopups)
// router.delete('/popup/:id',deletePopup)
router.delete('/popup',deletePopup)
router.get('/popup/main',getAllMainPopups)
router.get('/popup/partner',getAllPartnerPopups)
///////////////////////////////////////////////

//////////////// UPLOAD ROUTE ****************/
router.post('/upload',createUpload)
router.get('/upload',getAllUploads)
router.delete('/upload/:id',deleteUpload)
router.get('/upload/partner',getPartnerUploads)
router.get('/upload/frenchise',getFrenchiseUploads)
///////////////////////////////////////////////


//////////////// COMMISSION ROUTE ****************/
router.post('/commission',createCommission)
router.get('/commission',getAllCommission)
router.delete('/commission/:id',deleteCommission)
router.get('/commission/partner',getPartnerCommission)
router.get('/commission/frenchise',getFrenchiseCommission)
///////////////////////////////////////////////


//////////////// LOAN ROUTE ****************/
router.post('/loan',createLoan)
router.get('/loan/:id',getLoansByUser)
router.get('/loan',getLoans)
router.put('/loan/status/:id',UpdateLoanStatus)
router.delete('/loan/:id',DeleteLoan)
///////////////////////////////////////////////



////////////////////TRANSACTION //////////////////
router.post('/transaction',createTransaction)
router.get('/transaction',getAllTransactions)
router.get('/transaction/:centerCode',getTransactionsByCenterCode)
router.delete('/transaction/:id',deleteTransactions)
////////////////////////////////////////////////////////


///////////////////////NAVLINKS ///////////////////
router.get('/nav',getAllNavItems)
router.post('/nav',createNavItem)
router.delete('/nav/:id',deleteNavItem)
//////////////////////////////////////////////////

router.get('/CenterCheck/:id',checkUser)

////////////////// FILE ////////////////////
router.post('/file',createFile)
router.get('/file', getAllFiles)
router.get('/file/:id',findOneFile)
router.delete('/file/:id',deleteFile)
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
