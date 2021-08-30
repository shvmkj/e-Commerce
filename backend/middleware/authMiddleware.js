import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import AsyncHandler from 'express-async-handler'
const protect = AsyncHandler( async (req,res,next)=>{
  let token = ''
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try{
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
    //  console.log(decoded.id,token)
      req.user = await User.findById({_id:decoded.id}).select("-password")
      //console.log(JSON.stringify(req.user))
      next()
    }
    catch(error){
      console.log(error)
      
        res.status(401)
        throw new Error('Not authorized ,Token Failed')
    }
  }else{
    if(!token){
      res.status(401)
      throw new Error('Not authorized to perform this task')
    }
  }
})

export {protect}