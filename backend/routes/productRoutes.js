import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'
//Fetch All Products
//@route GET /api/products
//@access public 
router.get('/',asyncHandler ( async (req,res)=>{
  const pageSize = 3
  const page = Number(req.query.pageNumber) || 1
  const count = await Product.countDocuments({})
  const products = await Product.find({}).limit(pageSize).skip(pageSize*(page-1))
  res.json({products,page,pages: Math.ceil(count/pageSize)})
}))
//Fetch Single Product
//@route GET /api/products/:id
//@access public 
router.get('/:id',asyncHandler ( async(req,res)=>{
  const product = await Product.findById(req.params.id)
  if(product){
    res.json(product)
  }else{
    res.status(404)
    throw new Error('Product Not Found')
  }
}))
export default router