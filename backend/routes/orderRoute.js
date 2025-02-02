const express=require("express");
const authMiddleware=require('../middleware/auth')
const {placeOrder,getKey, verifyOrder, userOrder, listOrders, updateStatus}=require('../controller/orderController');

const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.get("/getkey",getKey)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrder)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)

module.exports=orderRouter;