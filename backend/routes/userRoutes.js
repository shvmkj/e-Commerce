import express from 'express'
import asyncHandler from 'express-async-handler'
import { authUser, getUserProfile, registerUser } from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect,getUserProfile)
export default router