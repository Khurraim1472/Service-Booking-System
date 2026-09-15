const express=require('express')
const router= express.Router()

const {createBooking}=require("../controller/bookingController") 
const {protectRoute}=require("../middleware/authMiddleware")
//create booking route
router.post("/",protectRoute,createBooking)

module.exports=router
