const Service = require("../models/Service");
const { findById } = require("../models/Service");
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const protectRoute = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        //check if header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401)
                .json({
                    message: "Unauthorized Access!"
                })
        }
        // extract token
        const token = authHeader.split(" ")[1]
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //find user
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        req.user = user
        next()

    }
    catch (err) {
        return res.status(500).json({
            message: "Server error!",
            error: err.message

        })
    }
}

// role based authorizaation for services 
const authorizeRole = (role) => {
    return (req, res, next) => {

        if (req.user.role !== role) {
            return res.status(403).json({
                message: "Access denied!"
            });
        }

        next();
    };
};
// check ownership middleware
const ownershipCheck = async (req, res, next) => {

    try {
        const service = await Service.findById(req.params.id)
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found!"
            })
        }
        if (!service.provider.equals(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: "Access Denied!"
            })

        }
        next()

    }
    
    catch (err) {
    return res.status(500).json({
        message: "Server error!",
        error: err.message
    })



}
}

module.exports = { protectRoute, authorizeRole,ownershipCheck }