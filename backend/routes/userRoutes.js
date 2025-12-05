import express from 'express';

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  test,
  authPartner,
  blockUser,
  getAllUserProfile,
  deleteUserProfile,
  getAllFrenchiseProfile,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountrys,
  createCountry,
  updateUserOneProfile,
  updateUser,
  getUserById,
  passwordReset,
  changePwd,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getAllPopups } from '../controllers/adminController.js';

const router = express.Router();

router.post('/', registerUser);
router.put('/updateUser/:id', updateUser);
router.get('/getDataById/:id',getUserById)
router.post('/auth', authUser);
router.put('/resetPwd/:email', passwordReset);
router.put('/changePwd',changePwd)
router.post('/auth/partner',authPartner);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.put('/block/:id',blockUser);
router.delete('/profile/delete/:id',deleteUserProfile)
router.delete('/profile/delete',deleteUserProfile)

router.get('/profile/all',getAllUserProfile)
router.get('/profile/frenchise',getAllFrenchiseProfile)
router.get('/test',test);
router.put('/profile/:id',updateUserOneProfile)

/********************* Second Country Routes  ***********************/
router.post('/secondcountry', createCountry);
router.get('/secondcountry/:id',getCountryById);
router.get('/secondcountry',getAllCountries);
router.put('/secondcountry/:id',updateCountry);
router.delete('/secondcountry',deleteCountrys);
/**********************************************************************/


router.get('/fetchPopp',getAllPopups)
export default router;
