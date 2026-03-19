import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

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
  statusUpdate,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getAllPopups } from '../controllers/adminController.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'upload');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalName = file.originalname || 'file';
    cb(null, `${uniqueSuffix}-${originalName}`);
  },
});

const upload = multer({ storage });

const partnerUploadFields = [
  'FrontAdhar',
  'BackAdhar',
  'PanCard',
  'ProfilePhoto',
  'CounsellorCode',
  'OwnerPhoto',
  'OfficePhoto',
  'mou',
  'registration',
  'VisitOffice',
  'CancelledCheck',
  'Logo',
  'accountedDetails',
].map((name) => ({ name, maxCount: 1 }));

router.post('/', upload.fields(partnerUploadFields), registerUser);
router.put('/statusUpdate/:id', statusUpdate);
router.put('/updateUser/:id', upload.fields(partnerUploadFields), updateUser);
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
