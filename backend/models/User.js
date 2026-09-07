const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,  "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    phone:{
      type:String,
      required:[true, "Phone is required"],
  
      unique:true,
      trim:true  ,
       minlength: [11, "Phone number must be 11 digits"],
  maxlength: [11, "Phone number must be 11 digits"],
  match: [/^03\d{9}$/, "Please enter a valid  phone number"]
    },
    email: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
      trim: true,
      lowercase: true,
       match: [
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email"
  ]
    },
    password: {
      type: String,
      required: [true, "Phone is required"],
      minlength: 6,
      trim: true,
    },
    role: {
      type: String,
    
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);