const mongoose=require("mongoose")

const serviceSchema=new mongoose.Schema({

    title:{
        type:String,
        required:[true,"Service title is required"],
        trim:true,
        minlength:5,
        maxlength:60
    },
    description:{
        type:String,
        required:[true,"Description is required"],
        trim:true,
          minlength:15,
        maxlength:500
    },
    category:{
        type:String,
        required:true,
        trim:true,
        enum: [
    "Home Services",
    "Cleaning Services",
    "Vehicle Services",
    "Tech Services"
]


    },
    price:{
        type:Number,
        required:[true,"Price is required"],
       min:1
    },
   
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
       
    },
    location:{
        type:String,
        required:true,
        trim:true

    },
    isAvailable:{
        type:Boolean,
        default:true

    }
})
module.exports=mongoose.model("Service",serviceSchema)