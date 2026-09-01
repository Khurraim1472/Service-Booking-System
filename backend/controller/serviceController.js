const Service = require("../models/Service")

// create Service api
const createService = async (req, res) => {
    try {
        const { title, description, category, price, location } = req.body
        const provider = req.user._id;

        const service = await Service.create({
            title,
            description,
            category,
            price,
            location,
            provider
        })
        res.status(201).json(
            {
                success: true,
                message: "Service created Successfully!",
                service

            }
        )
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });

    }

}

// get service api
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find()
        res.status(200).
            json({
                success: true,
                message: "All services fetced successfully!",
                data: services
            })
    }
    catch (err) {
        console.log(err)
        res.status(500).
            json({
                success: false,
                message: "Something went wrong!"
            })
    }
}

// for specific service api
const getServicebyId = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        if (!service) {
            return res.status(404).
                json({
                    success: false,
                    message: "Service not found!"
                })
        }

        res.status(200).json({
            success: true,
            message: "Service Information ",
            data: service
        })

    }
    catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).
                json({
                    success: false,
                    message: "Invalid ID Format!",
                })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}
//for updating service api
const updateService = async (req, res) => {
    try {
        const { title, description, category, price, location, isAvailable } = req.body
        const updateData = {}
        if (title !== undefined) {
            updateData.title = title

        }
        if (description !== undefined) {
            updateData.description = description

        }
        if (category !== undefined) {
            updateData.category = category

        }
        if (price !== undefined) {
            updateData.price = price

        }
        if (location !== undefined) {
            updateData.location = location

        }
        if (isAvailable !== undefined) {
            updateData.isAvailable = isAvailable

        }
        const update = await Service.findByIdAndUpdate(
            req.params.id, updateData, { new: true, runValidators: true }
        )
        //if service not found
        if (!update) {
            return res.status(404).json({
                success: false,
                message: "Service not found!"
            })
        }
        // check the service ownership
        if(service.provider!== req.user._id){
            return res.status(403).json({
                message: "Access denied!"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Service info Updated Successfully!",
            data: update
        })

    }


    catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            })}
          return   res.status(500).json({
                success: false,
                message: 'Server error'
            })
        

    }
}
//for deleting service 
const deleteService=async(req,res)=>{
    try{
        const deletedService=await Service.findByIdAndDelete(req.params.id)
      //validation 
      if(!deletedService){
        return res.status(404).json({
            success:false,
            message:"Service doesnot Exist!"
        })
      }
      return res.status(200).json({
        success:true,
        message:"Service Deleted Successfully!",
        data:deletedService
      })



    }
    catch(error){

  if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            })}
           return res.status(500).json({
                success: false,
                message: 'Server error'
            })
        
    }
}

module.exports = { createService, getAllServices, getServicebyId , updateService, deleteService}