const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success:true,
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
       message: "Something went wrong!" });
  }
};


//login

const loginUser=async(req,res)=>{
try{
    const {email,password}=req.body;
    //check email and password validation
    if(!email || !password){
        return res.status(400).json({message:"email and  password are  required"})
    }

    // find email in database
    const user=await User.findOne({email})
    //if user not found 
    if(!user){
        return res.status(401).json({message:"Invalid Email or password!"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
          return res.status(401).json({message:"Invalid Email or password!"})
    }
        const token = jwt.sign(
      { id: user._id },
        process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 5. success response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });


}
catch(err){
    return res.status(500).json({
        message:"Server error!",
        error:err.message

})


}


}
module.exports = { registerUser,loginUser };