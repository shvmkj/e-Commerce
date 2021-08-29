import express from 'express'
import asyncHandler from 'express-async-handler'
import { getProductById, getProducts } from '../controllers/productControllers.js'
const router = express.Router()
import Product from '../models/productModel.js'

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router