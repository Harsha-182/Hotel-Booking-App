const Hotel=require("../models/Hotel.js");
const {createError}=require('../utils/error.js')

const create_hotel=async(req,res,next)=>{
    const newHotel=new Hotel(req.body)
    try{
      const savedHotel=await newHotel.save();
      res.status(200).json(savedHotel)
    }catch(error){
        next(error)
    }
}

const update_hotel=async(req,res,next)=>{
    try{
      const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,
        {$set:req.body},
        {new:true})
      res.status(200).json(updatedHotel)
    }catch(error){
        next(error)
    }
}

const delete_hotel=async(req,res,next)=>{
    try{
      const deletedHotel=await Hotel.findByIdAndDelete(req.params.id)
      res.status(200).json("Hotel has been deleted.")
    }catch(error){
        next(error)
    }
}

const get_hotel=async(req,res,next)=>{
    try{
      const hotel=await Hotel.findById(req.params.id)
      res.status(200).json(hotel)
    }catch(error){
        next(error)
    }
}

const get_allHotels=async(req,res,next)=>{
    try{
      const allHotels=await Hotel.find(req.params.id)
      res.status(200).json(allHotels)
    }catch(error){
        next(error)
    }
}
module.exports={
    create_hotel,
    update_hotel,
    delete_hotel,
    get_hotel,
    get_allHotels
}