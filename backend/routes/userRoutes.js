import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile,getUsers, deleteUser } from '../controllers/userControllers.js'
import { protect,isAdmin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect,isAdmin,getUsers)
router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect,getUserProfile)
router.route('/profile').put(protect,updateUserProfile)
router.route('/:id').delete(protect,isAdmin,deleteUser)
export default router