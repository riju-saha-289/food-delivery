const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
require('dotenv/config')
const Razorpay = require('razorpay');
const crypto=require("crypto")

//  

const placeOrder = async (req, res)=>{
  const {userId,items,amount,address}=req.body;
  
  const frontend_url="http://localhost:5173"
  try{
    const newOrder=new orderModel({
      userId,
      items,
      amount,
      address
    })
    await newOrder.save();
    const orderId=newOrder._id;
    const instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret:process.env.RAZORPAY_SECRET_KEY })

    const options = {
      amount: Number(req.body.amount),  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      receipt: "order_rcptid_11",
      
    };
    const order=await instance.orders.create(options);   
    res.status(200).json({success:true,order:order,orderId:orderId,userId:userId})
  
  }catch(err){
    console.log(err)
  }  
}

const getKey=async(req,res)=>{
  res.status(200).json({
    key:process.env.RAZORPAY_API_KEY
  })
}

const verifyOrder = async (req, res) => {
  console.log(req.body);
  const{razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;
  const { orderId, userId } = req.query;
  
  const body=razorpay_order_id + "|" +razorpay_payment_id;
  const expected_signature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET_KEY).update(body.toString()).digest("hex");
  
  const isAuthentic=razorpay_signature === expected_signature;
  if(isAuthentic){
     await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
     await userModel.findByIdAndUpdate(userId, { cartData: {} });
     return res.redirect(`http://localhost:5174/paymentSuccess?reference=${razorpay_payment_id}`)
  }
  else{
    res.status(404).json({
      success:false
    })
  }
};

// user orders for frontend
const userOrder=async(req,res)=>{
   try{
    const orders=await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})

   }catch(err){
    console.log(err);
    res.json({success:false,message:"error "})
   }
}

// listing orders for admin panel
const listOrders=async(req,res)=>{
  try{
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})

  }catch(err){
    console.log(err);
    res.json({success:true,message:"Error"})
  }
}
// api for updating order status

const updateStatus=async(req,res)=>{
 try{
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
  res.json({success:true,message:"status updated"})
 }catch(err){
  console.log(err);
  res.josn({success:false,message:"ERROR"})
 }
}
module.exports={
  placeOrder,
  getKey,
  verifyOrder,
  userOrder,
  listOrders,
  updateStatus
}

