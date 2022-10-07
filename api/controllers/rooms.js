const Room=require("../models/Room.js");
const {createError}=require("../utils/error.js");
const Hotel=require('../models/Room.js')

const create_room= async (req,res,next)=>{
      const hotelId=rea.params.id
      const newRoom=new Room(req.body)

      try{
         const savedRoom=await newRoom.save();
         try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms:savedRoom._id}
                })
         }catch(error){
           next(error)
         }
      }catch(error){
        next(error)
      }
}
const update_room=async(req,res,next)=>{
    try{
      const updatedRoom=await Room.findByIdAndUpdate(req.params.id,
        {$set:req.body},
        {new:true})
      res.status(200).json(updatedRoom)
    }catch(error){
        next(error)
    }
}

const delete_room=async(req,res,next)=>{
    try{
      const deletedRoom=await Room.findByIdAndDelete(req.params.id)
      res.status(200).json(`Room ${deletedRoom._id} has been deleted.`)
    }catch(error){
        next(error)
    }
}

const get_room=async(req,res,next)=>{
    try{
      const room=await Room.findById(req.params.id)
      res.status(200).json(room)
    }catch(error){
        next(error)
    }
}

const get_allrooms=async(req,res,next)=>{
    try{
      const allRooms=await Room.find(req.params.id)
      res.status(200).json(allRooms)
    }catch(error){
        next(error)
    }
}
module.exports={
    create_room,
    update_room,
    delete_room,
    get_room,
    get_allrooms
}