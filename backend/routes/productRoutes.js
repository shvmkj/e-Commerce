import express from 'express'
import { deleteProduct, getProductById, getProducts } from '../controllers/productControllers.js'
const router = express.Router()
import {isAdmin, protect} from '../middleware/authMiddleware.js'
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)
router.route('/:id').delete(protect,isAdmin,deleteProduct)
export default router