const express=require('express');
const cors=require('cors')
const connectDB=require('./config/db');
const foodRouter = require('./routes/foodRoute');
const  userRouter  = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
require('dotenv').config()
// app config
const app=express();
const port= process.env.PORT || 4000;

// middleware
// whenever we get req from the frontend to backend that will be parsed in json
app.use(express.json());
// using this we can access backend from any frontend
app.use(cors());
app.use(express.urlencoded({extended:true}));

// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res,next)=>{
  res.send("api working")
})

app.listen(port,()=>{  
  console.log(`server started on http://localhost:${port}`);
})

