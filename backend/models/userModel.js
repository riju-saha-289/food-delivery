const mongoose=require('mongoose')

const userScema=new mongoose.Schema({
  name:{type:String,reuired:true},
  email:{type:String,reuired:true,unique:true},
  password:{type:String,reuired:true},
  cartData:{type:Object,default:{}},
},{minimize:false})

const userModel =mongoose.models.user ||mongoose.model("user",userScema)

module.exports= userModel;