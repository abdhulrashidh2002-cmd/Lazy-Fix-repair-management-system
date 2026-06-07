const express= require("express");
const router=express.Router();

const {createTechnicianApplication,
getTechnicianApplication,
approveTechnicianApplication,
deleteApplication} =require("../controllers/technicianApplicationController")

router.post("/createTechnicianApplication",createTechnicianApplication);
router.get("/all", getTechnicianApplication);
router.patch("/:id",approveTechnicianApplication);
router.patch("/reject/:id", deleteApplication);

module.exports = router;