const express=require("express")
const router=express.Router()
const {createService, getAllServices, getServicebyId, updateService, deleteService}=require("../controller/serviceController")
const {protectRoute, authorizeRole, ownershipCheck}=require("../middleware/authMiddleware")

//create service route
router.post("/",protectRoute,authorizeRole("provider"),createService)
// get services route
router.get("/",getAllServices)
//for specific service
router.get("/:id",getServicebyId)
// for updating services
router.put("/:id",protectRoute,authorizeRole("provider"),ownershipCheck,updateService)
// for deleting service
router.delete("/:id",protectRoute,authorizeRole("provider"),ownershipCheck,deleteService)

module.exports=router