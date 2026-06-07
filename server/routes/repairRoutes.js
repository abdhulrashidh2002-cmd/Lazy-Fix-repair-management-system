const express= require('express');
const router = express.Router();

const { createRepairRequest,
    getUserRepairRequest,
    getTechnicianBookings,
updateBookingStatus,
    completeBooking,} = require("../controllers/repairController");

router.post("/create", createRepairRequest);
router.get("/:userId", getUserRepairRequest);
router.get("/technician/:technicianId", getTechnicianBookings);
router.patch("/status/:id", updateBookingStatus);
router.patch("/complete/:bookingId", completeBooking);
module.exports = router;
