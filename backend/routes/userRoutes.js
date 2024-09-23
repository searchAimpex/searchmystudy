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
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/auth/partner',authPartner);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.put('/block/:id',blockUser);
router.delete('/profile/delete/:id',deleteUserProfile)
router.get('/profile/all',getAllUserProfile)
router.get('/test',test);

export default router;
