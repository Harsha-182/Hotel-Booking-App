const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config()
const authRoute=require("./api/routes/auth.js");
const hotelsRoute=require("./api/routes/hotels.js");
const roomsRoute=require("./api/routes/rooms.js");
const usersRoute=require("./api/routes/users.js");
const bodyParser=require('body-parser');
const cookieParser=require("cookie-parser");

const PORT=process.env.PORT || 3333
const connect= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO)
      }
      catch(error){
        throw error
      }
}
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected");
})

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser())

app.get("/",async(req,res)=>{
    res.status(400).send("Hai Harsha")
})

app.use("/auth",authRoute);
app.use("/hotels",hotelsRoute);
app.use("/rooms",roomsRoute);
app.use("/users",usersRoute);

app.use(async(err,req,res,next)=>{
   errStatus=err.status||400;
   errMessage=err.message||"Something went wrong"
   return res.status(errStatus).json({
    success:false,
    status:errStatus,
    message:errMessage,
    stack:err.stack
   })
})

app.listen(PORT,()=>{
    connect()
    console.log(`Serving is running on port ${PORT}`);
})