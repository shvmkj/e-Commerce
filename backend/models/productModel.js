import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId()
const reviewSchema = mongoose.Schema({
  name: {
    required:true,
    type:String
  },
  rating: {
    required:true,
    type:Number
  },
  comment: {
    required:true,
    type:String
  }},
  {timestamps:true}
)
const productSchema = mongoose.Schema({
  user : {
    type: mongoose.Types.ObjectId,
    required:true,
    ref:"User"
  },
  name : {
    type: String,
    required:true,
    
  },
  image : {
    type: String,
    required:true,
  },
  brand : {
    type: String,
    required:true
  },
  category : {
    type: String,
    required:true,
  },
  description : {
    type: String,
    required:true,
  },
  rating : {
    type: Number,
    required:true,
    default :0
  },
  description : {
    type: String,
    required:true,
  },
  numberReviews:{
    type:Number,
    required:true,
    default:0
  },
  price:{
    type:Number,
    required:true,
    default:0
  },
  countInStock:{
    type:Number,
    required:true,
    default:0
  },
  reviews:[reviewSchema]
},{timestamps : true})
const Product = mongoose.model('Product',productSchema)
export default Product