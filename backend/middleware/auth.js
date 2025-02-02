const jwt=require('jsonwebtoken');
require('dotenv').config()
const authMiddleware=async(req,res,next)=>{
  const {token}=req.headers;
  if(!token){
    return res.json({success:false,message: "Not authorized Login Again"})
  }
  try{
    const token_decode=jwt.verify(token,process.env.JWT_SECRET)
    req.body.userId=token_decode.id;
    next();
  }catch(err){
    console.log(err);
    return res.json({success:false,message: "ERROR"})
  }
}
module.exports=authMiddleware;