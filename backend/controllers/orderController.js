import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js' 

//@desc Create New Order
//@route GET /api/order
//@access public 
const addOrders = asyncHandler(async (req,res)=>{
  const {
    orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,totalPrice,shippingPrice
  } = req.body
  if(orderItems && orderItems.length===0){
    res.status(400)
    throw new Error('No order items')
    return
  }else{
    const order = new Order({
      orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,totalPrice,shippingPrice,user:req.user._id
    }
    )
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})
//@desc get order by id
//@route GET /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req,res)=>{
  try{
  const order = await Order.findById({_id:req.params.id}).
  populate('user','name email')
  console.log(JSON.stringify(order.user._id),JSON.stringify(req.user._id))
  if(JSON.stringify(order.user._id)===JSON.stringify(req.user._id)){
    res.json(order)
  }else{
    res.status(404)
    throw new Error ('Order Not Found')
  }}catch(error){
    res.status(404)
    throw new Error (error)
  }
})
//@desc update order to paid
//@route put /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req,res)=>{
  try{
  const order = await Order.findById({_id:req.params.id})
  console.log("id->",req.body.id)
  console.log("status->",req.body.status)
  console.log("email->",req.body.email_address)
  if(order){
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id:req.body.id,
      status:req.body.status,
      update_time : req.body.update_time,
      email_address : req.body.payer.email_address
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder)
  }else{
    res.status(404)
    throw new Error ('Order Not Found')
  }}catch(error){
    res.status(404)
    throw new Error (error)
  }
})
//@desc update order to delivered
//@route put /api/orders/:id/deliver
//@access private
const updateOrderToDeliver = asyncHandler(async (req,res)=>{
  try{
  const order = await Order.findById({_id:req.params.id})
  console.log("id->",req.body.id)
  console.log("status->",req.body.status)
  console.log("email->",req.body.email_address)
  if(order){
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const updatedOrder = await order.save();
    res.json(updatedOrder)
  }else{
    res.status(404)
    throw new Error ('Order Not Found')
  }}catch(error){
    res.status(404)
    throw new Error (error)
  }
})
//@desc get logged in users orders
//@route GET /api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async (req,res)=>{
  try{
  const order = await Order.find({user:req.user._id})
  res.json(order)
}catch(error){
    res.status(404)
    throw new Error (error)
  }
})
//@desc get all orders
//@route GET /api/orders/
//@access private/admin
const getAllOrders = asyncHandler(async (req,res)=>{
  try{
  const orders = await Order.find({}).populate('user','id name')
  
  res.json(orders)
}catch(error){
    res.status(404)
    throw new Error (error)
  }
})


export {
  addOrders,getOrderById,updateOrderToPaid,getMyOrders,getAllOrders,updateOrderToDeliver
}