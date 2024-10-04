import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createBanner,test,fetchAllBanner,deleteBanner,
      createService, deleteService, updateService, getService, getServices, 
      createTestimonial, getTestimonials, deleteTestimonial, updateTestimonial, getTestimonialById,
      createCounsellor, getCounsellors, deleteCounsellor, 
      createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog,
      createCountry, getCountries, getCountryById, updateCountry, deleteCountry,
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
      updateStudentdetails

      } from '../controllers/adminController.js';
const router = express.Router();


/***********BANNER ROUTES *********/
router.post('/createBanner', createBanner);
router.get('/FetchAllBanner',fetchAllBanner)
router.delete('/DeleteBanner/:id',deleteBanner)
router.get('/test',test)
/***********BANNER ROUTES *********/

/***********SERVICES ROUTES *********/
router.get('/Services/all',getServices)
router.get('/Service/:id',getService)
router.post('/CreateService',createService)
router.put('/UpdateServices/:id',updateService)
router.delete('/DeleteService/:id',deleteService)
/***********SERVICES ROUTES *********/


/****************COUNSELLOR ROUTES ******************/
router.get('/Testimonials/all',getTestimonials)
router.get('/Testimonials/:id',getTestimonialById)
router.post('/CreateTestimonials',createTestimonial)
router.put('/UpdateTestimonials/:id',updateTestimonial)
router.delete('/DeleteTestimonials/:id',deleteTestimonial)
/****************COUNSELLOR ROUTES ******************/


/****************TESTIMONIAL ROUTES *****************/
router.post('/CreateCounsellor',createCounsellor)
router.get('/Counsellor/all',getCounsellors)
router.delete('/DeleteCounsellors/:id',deleteCounsellor)
/****************TESTIMONIAL ROUTES *****************/


/*************** BLOGS ROUTES **********************/
router.route('/Blog').post(createBlog).get(getAllBlogs);
router.route('/Blog/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);
/*************** BLOGS ROUTES **********************/


/*************** COUNTRY ROUTES **********************/
router.route('/countries')
  .post(createCountry)
  .get(getCountries);
router.route('/countries/:id')
  .get(getCountryById)
  .put(updateCountry)
  .delete(deleteCountry);
/*************** COUNTRY ROUTES **********************/

/*************** PROVINCE ROUTES **********************/
router.route('/province')
  .post(createProvince)
  .get(getAllProvinces);
router.route('/province/:id')
  .get(getProvinceById)
  .put(updateProvince)
  .delete(deleteProvince);
/*************** PROVINCE ROUTES **********************/


/*************** UNIVERSITY ROUTES **********************/
router.route('/university')
  .post(createUniversity)
  .get(getAllUniversities);
router.route('/university/:id')
  .get(getUniversityById)
  .put(updateUniversity)
  .delete(deleteUniversity);
/*************** UNIVERSITY ROUTES **********************/

/*************** WEBINAR ROUTES **********************/

router.route('/webinar')
  .get(getWebinars)
  .post(createWebinar);

router.route('/webinar/:id')
  .get(getWebinarById)
  .put(updateWebinar)
  .delete(deleteWebinar);

/*************** WEBINAR ROUTES **********************/



/*************** MEDIA ROUTES **********************/

router.route('/media')
  .get(getMediaItems)
  .post(createMediaItem);

router.route('/media/:id')
  .get(getMediaItemById)
  .put(updateMediaItem)
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
  .put(updateCourse)
  .delete(deleteCourse);

/***************** COURSE ROUTES *********************/




/****************** Counselling Lead Routes     ***********************/

router.post('/lead',createLead)
router.get('/lead',getLead)
router.delete('/lead/:id',deleteLead)
router.get('/lead/:id',GetOneLead)
/****************** Lead Routes     ***********************/


/********************* Home Lead Routes  ***********************/
router.post('/homelead',createHomeLead)
router.get('/homelead',getLeads)
router.delete('/homelead/:id',deleteHomeLead)
/**************************************************************/




/********************* Contact Lead Routes  ***********************/
router.post('/contactlead',createContactLead)
router.get('/contactlead',getContactLeads)
router.delete('/contactlead/:id',deleteContactLead)
/******************************************************************/



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
router.delete('/student/:id',DeleteStudent)
router.get("/student/one/:id",GetOneStudent)
router.get('/student/track/:id',GetOneStudentByTracking)
/******************************************************************/



export default router;