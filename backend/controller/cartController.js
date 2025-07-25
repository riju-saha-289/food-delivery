const userModel=require("../models/userModel")
//add items to user cart
const addToCart=async(req,res)=>{
    try{
      let userData=await userModel.findById(req.body.userId);
      let cartData= userData.cartData;
      if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1;
      }
      else{
        cartData[req.body.itemId] += 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId,{cartData});
      res.json({success:true,message:"Added To Cart"})
    }catch(err){
      console.log(err)
      res.json({success:false,message:"ERROR"})

    }
}
//remove items from user cart
const removeFromCart=async(req,res)=>{
  try{
    let userData=await userModel.findById(req.body.userId);
    let cartData=await userData.cartData;
    if(cartData[req.body.itemId]>0){
      cartData[req.body.itemId] -= 1;
    } 
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Removed From Cart"})
  }catch(err){
    console.log(err)
    res.json({success:false,message:"ERROR"})

  }

}

// fetch user cart data

const getCart=async(req,res)=>{
  try{
    let userData=await userModel.findById(req.body.userId);
    let cartData= userData.cartData;
    res.json({success:true,cartData})
  }catch(err){
    console.log(err)
    res.json({success:false,message:"ERROR"})

  }

}
module.exports={
  addToCart,
  removeFromCart,
  getCart
}