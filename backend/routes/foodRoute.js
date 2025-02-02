const express=require('express');
const {addFood,foodList, removeFood}=require('../controller/foodController')
const multer=require('multer')


const foodRouter=express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix  +'-' +file.originalname)
  }
})

const upload = multer({ storage: storage })


foodRouter.post('/add',upload.single('image'),addFood);
foodRouter.get('/list',foodList)
foodRouter.post('/remove',removeFood);

module.exports =foodRouter;