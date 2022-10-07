const User=require("../models/User.js");
const bcrypt=require("bcrypt");
const { createError } = require("../utils/error.js");
const jwt =require("jsonwebtoken");

const register=async(req,res,next)=>{
    try{ 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
       const createUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:hash
       })
       await createUser.save()
       res.status(200).json({message:"User has been added successfully"})
    }catch(error){
        next(error)
    }
}

const login=async(req,res,next)=>{
    try{ 
      const user= await User.findOne({username:req.body.username})
      console.log(user._id);
      if(!user) next(createError(404,"User not found"))
      const isPasswordCorrect=await bcrypt.compareSync(req.body.password, user.password);
      if(!isPasswordCorrect) next(createError(400,"Wrong Password"));

      const token=jwt.sign(
        { id:user._id,isAdmin:user.isAdmin},
        process.env.JWT_SECRETKEY);

      const {password,isAdmin, ...otherDetails}=user._doc;

      res.cookie("access_token",token,{
        httpOnly:true
      }).status(200).json({token})

    }catch(error){
        next(error)
    }
}

module.exports={
    register,
    login
}