import express from 'express'
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from '../controllers/productControllers.js'
const router = express.Router()
import {isAdmin, protect} from '../middleware/authMiddleware.js'
router.route('/:id/reviews').post(protect,createProductReview)
router.route('/').get(getProducts)
router.route('/top').get(getTopProducts)
router.route('/').post(protect,isAdmin,createProduct)
router.route('/:id').get(getProductById)
router.route('/:id').delete(protect,isAdmin,deleteProduct)
router.route('/:id').put(protect,isAdmin,updateProduct)

export default router