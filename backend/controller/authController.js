const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex=/^03\d{9}$/;

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name,phone, email, password ,confirmPassword} = req.body;
    
    // checkinG FORM validations 
    if (!name) {
  return res.status(400).json({
    success: false,
    field:"name",
    message: "Name is required"
  });
}

if (!email) {
  return res.status(400).json({
    success: false,
    field:"email",
    message: "Email is required"
  });
}

if (!phone) {
  return res.status(400).json({
    success: false,
    field:"phone",
    message: "Phone is required"
  });
}

if (!password) {
  return res.status(400).json({
    success: false,
    field:"password",
    message: "Password is required"
  });
}

if (!confirmPassword) {
  return res.status(400).json({
    success: false,
    field:"confirmPassword",
    message: "Confirm password is required"
  });
}
//checks email validation 
if (!emailRegex.test(email)) {
  return res.status(401).json({
  success:false,
  field:"email",
  message:"Enter the correct email!",
  })
}
//checks phone number validation

if (!phoneRegex.test(phone)) {
  return res.status(400).json({
  success:false,
  field:"phone",
  message:"Enter the correct phone number!",
  })
}

    // check user already exists
    const userExists = await User.findOne({ email,phone  });
    if (userExists) {
      return res.status(400).json({
        success:false,
        field:"email",
         message: "Email already exists!"
         });
    }
  //  check the password and confirm password fields
  if(password!== confirmPassword){
    return res.status(400).json({
      success:false,
      field:"password",
      message:"Password and Confirm password do not match!",
    })

  }

if (
  password.length < 8 ||
  !/[A-Z]/.test(password) ||
  !/[a-z]/.test(password) ||
  !/[0-9]/.test(password) ||
  !/[^A-Za-z0-9]/.test(password)
) {
  return res.status(400).json({
    success: false,
    field:"password",
    message:"Password must be at least 8 characters and contain uppercase, lowercase, number, and special character!"
  });
}
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      success:true,
      message: "User registered successfully!",
      user,
    });
  } catch (error) {


    console.log(error)
   if (error.code === 11000) {

        if (error.keyPattern.email) {
            return res.status(409).json({
                success: false,
                field:"email",
                message: "Email already exists!"
            });
        }

        if (error.keyPattern.phone) {
            return res.status(409).json({
                success: false,
                field:"phone",
                message: "Phone number already exists!"
            });
        }
    }


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