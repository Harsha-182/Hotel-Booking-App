const express=require('express');
const router=express.Router();
const Hotel=require("../models/Hotel.js")

//CREATE
router.get("/create_hotel",async(req,res)=>{
    console.log("Hai");

    const newHotel=new Hotel(req.body)

    try{
      const savedHotel=await newHotel.save();
      res.status.json(savedHotel)
    }catch(error){
      res.status.json(error)
    }
})

//UPDATE
//DELETE
//GET
//GET ALL

module.exports=router
