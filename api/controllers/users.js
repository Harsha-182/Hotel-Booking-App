const User=require("../models/User.js");
const {createError}=require('../utils/error.js')

const update_User=async(req,res,next)=>{
    try{
      const updatedUser=await User.findByIdAndUpdate(req.params.id,
        {$set:req.body},
        {new:true})
      res.status(200).json(updatedUser)
    }catch(error){
        next(error)
    }
}

const delete_User=async(req,res,next)=>{
    try{
      const deletedUser=await User.findByIdAndDelete(req.params.id)
      res.status(200).json("User has been deleted.")
    }catch(error){
        next(error)
    }
}

const get_User=async(req,res,next)=>{
    try{
      const user=await User.findById(req.params.id)
      res.status(200).json(user)
    }catch(error){
        next(error)
    }
}

const get_allUsers=async(req,res,next)=>{
    try{
      const allUsers=await User.find(req.params.id)
      const {password,isAdmin, ...otherDetails}=allUsers
      res.status(200).json({...otherDetails})
    }catch(error){
        next(error)
    }
}
module.exports={
    update_User,
    delete_User,
    get_User,
    get_allUsers
}