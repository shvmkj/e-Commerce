import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connectDB = async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,{
      useUnifiedTopology: true,
      useNewUrlParser : true,
    })
    console.log("MongoDB Connected:")
  }catch(error){
    console.log("MongoDB Error:",error)
  }
}
export default connectDB  