const mongoose=require('mongoose');
const {Schema}=mongoose;

const Roomschema=new  Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    roomNumbers:[
        {
            number:Number,
            unavailableDates:{type:[Date]}
        }
    ]
   
},
{timestamps:true}
)
const RoomModel=mongoose.model("Room",Roomschema)
module.exports=RoomModel