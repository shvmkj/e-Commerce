import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
//Auth user & get token
//@route POST /api/users/login
//@access public 
const authUser = asyncHandler(async (req,res)=>{
  const {email,password} = req.body
  const user = await User.findOne({email })
  if(user && (await user.matchPassword(password))){
      return res.json({
      _id : user._id,
      name: user.name,
      email : user.email,
      isAdmin : user.isAdmin,
      token:generateToken(user._id)
    })
  }else{
    res.status(401)
    throw new Error('invalid email or password ')
  }
})
//get logged in user's profile 
//@route POST /api/users/profile
//@access private 
const getUserProfile = asyncHandler(async (req,res)=>{
  const user =  await User.findById({_id:req.user._id})
  if(user){
    return res.json({
    _id : user._id,
    name: user.name,
    email : user.email,
    isAdmin : user.isAdmin,
    token:generateToken(user._id)
    })
  }else{
    res.status(404)
    throw new Error("user not found")
  }
})
//create User
//@route POST /api/users/
//@access public
const registerUser = asyncHandler(async (req,res)=>{
  const {name,email,password} = req.body
  const userExists = await User.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,email,password
  })
  if(user){
    res.status(201).json({
      _id : user._id,
      name: user.name,
      email : user.email,
      isAdmin : user.isAdmin,
      token : generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error ('User not Found')
  }
})
//update User
//@route PUT /api/users/
//@access private
const updateUserProfile = asyncHandler(async (req,res)=>{
  const user =  await User.findById({_id:req.user._id})
  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password){
      user.password = req.body.password}
      const updatedUser = await user.save()
      return res.json({
        _id : updatedUser._id,
      name: updatedUser.name,
      email : updatedUser.email,
      isAdmin : updatedUser.isAdmin,
      token:generateToken(updatedUser._id)
      })
    }else{
      res.status(404)
      throw new Error("user not found")
    }
  })
  //get Get all users
  //@route POST /api/users/
  //@access admin
  const getUsers = asyncHandler(async (req,res)=>{
    try{
    const users =  await User.find()
    res.json(users)
    }catch(error){
      res.status(401)
      throw new Error(error)
    }
  })
  //delete a user
  //@route DELETE /api/users/:id
  //@access admin
const deleteUser = asyncHandler(async (req,res)=>{
  try{
    const user =  await User.findById({_id:req.params.id})
    if(user){
      await user.remove()
      res.json({message:"User removed"})
    }else{
      res.status(404)
      throw new Error('User not Found')
    }
    }catch(error){
      res.status(401)
      throw new Error (error)
    }
})
  export {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,deleteUser}