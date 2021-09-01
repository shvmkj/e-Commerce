import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js' 

//Fetch All Products
//@route GET /api/products
//@access public 
const getProducts = asyncHandler(async (req,res)=>{
  const pageSize = 3
  const page = Number(req.query.pageNumber) || 1
  const keyword=req.query.keyword ? {
    name : {
      $regex :req.query.keyword,
      $options : 'i'
    }
  } : {}
  const count = await Product.countDocuments({...keyword})
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
  res.json({products,page,pages: Math.ceil(count/pageSize)}) 
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
//@desc Create new review
//@route POST /api/products/:id/reviews
//@access private
const createProductReview = asyncHandler(async (req,res)=>{
  try{
  const {rating,comment} = req.body
  const product = await Product.findById(req.params.id)
  if(product){
    const alreadyReviewed = product.reviews.find(r=>r.user.toString()===req.user._id.toString())
    if(alreadyReviewed){
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review = {name:req.user.name,rating:Number(rating),comment,user:req.user._id}
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.numReviews
    await product.save()
    res.status(201).json({message : 'review added'})
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
  createProduct,
  createProductReview
}