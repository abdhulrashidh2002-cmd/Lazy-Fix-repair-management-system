const express= require('express');
const router = express.Router();
const {getAdminStats, getTechnicians, updateTechnicianAvailable}= require('../controllers/adminController');

router.get("/stats", getAdminStats);
router.get("/technicians", getTechnicians);
router.patch("/status/:id", updateTechnicianAvailable);

module.exports=router;