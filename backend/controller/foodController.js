
const foodModel=require('../models/foodModel') 
const fs=require('fs')
// add food item
const addFood=async (req,res)=>{
  let image_filename=`${req.file.filename}`;

  const food =new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    image:image_filename,
    category:req.body.category
  })
  try{
    await food.save();
    res.json({success:true,message:'food added'})
  }catch(error){
    console.log(error);
    res.json({success:false,message:error});
  }

}

// fetch all food list
const foodList=async (req,res)=>{
    try{
      const foods=await foodModel.find({});
      res.json({'success':true,'data':foods});
    }catch(err){
      res.json({'success':false,'error':err});
    }
}

// remove food item
const removeFood=async(req,res)=>{
  try{
    const food=foodModel.findById(req.body.id);
    fs.unlink(`uplodes/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"food removed"})
  }catch(err){
    res.json({success:false,message:err})
  }

}
module.exports={
  addFood,
  foodList,
  removeFood
}

