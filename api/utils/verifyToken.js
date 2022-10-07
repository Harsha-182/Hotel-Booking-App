const jwt=require("jsonwebtoken");
const {createError}=require("./error.js");

const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token) return next(createError(400,"You are not authenticated!"))

        jwt.verify(token,process.env.JWT_SECRETKEY,(err,user)=>{
        if(err) return next(createError(400,"Token is not valid!"))
        req.user=user
        console.log("req.user ");
        console.log(req.user);
        next()
    });
}

const verifyUser=(req,res,next)=>{
        verifyToken(req,res,next,()=>{
            console.log("req.user.id "+req.user.id);
            console.log("req.params.id "+req.params.id);
            console.log("req.user.isAdmin "+req.user.isAdmin);

            if(req.user.id === req.params.id || req.user.isAdmin)
            next()
            else
            return next (createError(403,"You are not Authorized "));
        })
    }

const verifyAdmin=(req,res,next)=>{
        verifyToken(req,res,next,()=>{
            if(req.user.isAdmin)
            next()
            else
            return next (createError(403,"You are not Authorized"));
        })
    }



module.exports={
    verifyToken,
    verifyUser,
    verifyAdmin
}