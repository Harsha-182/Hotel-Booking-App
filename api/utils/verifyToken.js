const jwt=require("jsonwebtoken");
const {createError}=require("./error.js");

const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token) return next(createError(400,"You are not authenticated!"))

    var decoded = jwt.verify(token,process.env.JWT_SECRETKEY,(err,user)=>{
        if(err) return next(createError(400,"Token is not valid!"))
        req.user=user
        next()
    });
     
}
module.exports={verifyToken}