const Booking = require("../models/Booking")
const bookings=require("../models/Booking")
const Service = require("../models/Service")

// create booking api
const createBooking=async(req,res)=>{
         try{

            const {service,bookingDate}=req.body
            if (!service) {
    return res.status(400).json({
        success: false,
        message: "Service is required!"
    });
}

if (!bookingDate) {
    return res.status(400).json({
        success: false,
        message: "Booking date is required!"
    });
}
            const servicedata=await Service.findById(service)
            if(!servicedata){
                return res.status(404).
                json({
                    success: false,
                    message: "Service not found!"
                })
            }
            if(!servicedata.isAvailable){
                return res.status(409).
                json({
                    success: false,
                    message: "Service not Available!"
                })
            }

            if (!bookingDate || isNaN(Date.parse(bookingDate))) {
    return res.status(400).json({
        success: false,
        message: "Invalid booking date!"
    });
}
            const providerdata=servicedata.provider

            const booking=new Booking({
                user:req.user._id,
                service:servicedata._id,
                provider:providerdata,
                bookingDate:req.body.bookingDate
                
            })
        const saveBooking=    await booking.save();
        res.status(201).json({
            success:true,
            message:"Booking Created Successfully!",
            data:saveBooking
        })

         }

catch(err){
  console.log(err);
  res.status(500).json({
    success:false,
    message:"Something went wrong!"
  })

}

}

module.exports={createBooking}