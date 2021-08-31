import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js' 

//Fetch All Products
//@route GET /api/products
//@access public 
const getProducts = asyncHandler(async (req,res)=>{
  const products = await Product.find({})
  res.json(products)
})

//Fetch Single Product
//@route GET /api/products/:id
//@access public 
const getProductById = asyncHandler(async (req,res)=>{
  try{
  const product = await Product.findById(req.params.id)
  if(product){
    res.json(product)
  }else{
    res.status(404)
    throw new Error('Product Not Found')
  }}
  catch(error){
    res.status(404)
    throw new Error(error)
  }
})
//Delte Single Product
//@route DELETE /api/products/:id
//@access admin 
const deleteProduct = asyncHandler(async (req,res)=>{
  try{
  const product = await Product.findById(req.params.id)
  if(product){
    try{await product.remove()
      res.json({message : "Product removed"})
    }catch(error){
      res.status(404)
      throw new Error(error)
    }
  }else{
    res.status(404)
    throw new Error('Product Not Found')
  }
}catch(error){
  res.status(404)
  throw new Error(error)
}
})

export {
  getProductById,
  getProducts,
  deleteProduct
}