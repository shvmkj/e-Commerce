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
//Create a Product
//@route POST /api/products/:id
//@access admin 
const createProduct = asyncHandler(async (req,res)=>{
  try{
  const product = new Product({
    name:'User On Sale',
    price:0,
    user: req.user._id,
    image : '/images/default.jpg',
    brand: 'Sample brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews : 0,
    description:'Person on Sale '
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
 
}catch(error){
  res.status(404)
  throw new Error(error)
}
})
//Update a Product
//@route PUT /api/products/:id
//@access admin 
const updateProduct = asyncHandler(async (req,res)=>{
  try{
  const {name,price,description,image,brand,category,countInStock} = req.body
  const product = await Product.findById(req.params.id)
  if(product){
  product.name = name || product.name
  product.price = price || product.price
  product.description = description || product.description
  product.image = image|| product.image
  product.brand = brand || product.brand
  product.category = category || product.category
  product.countInStock = countInStock || product.countInStock
  const updatedProduct = await product.save()
  res.status(201).json(updatedProduct)
 }else{
   res.status(404)
   throw new Error('product not found')
 }
}catch(error){
  res.status(404)
  throw new Error(error)
}
})

export {
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct
}