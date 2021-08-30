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
export {
  addOrders,getOrderById
}