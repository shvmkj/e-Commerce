import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
const orderItems = mongoose.Schema({
  name:    {type: String, required:true},
  qty :    {type: Number, required:true},
  image :  {type: String, required:true},
  price :  {type: Number, required:true},
  product : {type:ObjectId,ref : 'Product',required:true}
})
const orderSchema = mongoose.Schema({
  user : {
    type: ObjectId,
    required:true,
    ref:'User'
  },
  orderItems: [{
    name:    {type: String, required:true,unique:false},
    qty :    {type: Number, required:true,unique:false},
    image :  {type: String, required:true, unique:false},
    price :  {type: Number, required:true,unique:false},
    product : {type:ObjectId,ref : 'Product',required:true}
  }
],
  shippingAddress : {
    address : {type: String,required:true},
    city : {type: String,required:true},
    postalCode : {type: Number,required:true},
    country : {type: String,required:true},
  },
  paymentMethod : {
    type: String,
    required:true,
  },
  paymentResult : {
    id:{
      type:String
    },
    status:{
      type:String
    },
    update_time:{
      type:String
    },
    email:{
      type:String
    },
  },
  taxPrice : {
    type: Number,
    required:true,
    default:0.0
  },
  shippingPrice : {
    type: Number,
    required:true,
    default:0.0
  },
  totalPrice : {
    type: Number,
    required:true,
    default:0.0
  },
  isPaid : {
    type: Boolean,
    required:true,
    default:false
  },
  isDelivered : {
    type: Boolean,
    required:true,
    default:false
  },
  paidAt :{
      type:Date
  },
  deliveredAt :{
      type:Date
  },
  itemsPrice :{
    required:true,
    default : 0.00,
    type:Number
  }
},{timestamps : true})

const Order = mongoose.model('Order',orderSchema)
export default Order