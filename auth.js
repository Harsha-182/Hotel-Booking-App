const express=require('express');
const router=express.Router();

router.get("/1",(req,res)=>{
    res.status(200).json({message:"Hello Future Trillionare"})
})

module.exports=router
