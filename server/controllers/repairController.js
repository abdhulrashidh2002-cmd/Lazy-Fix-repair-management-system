const RepairRequest = require("../models/RepairRequest");
const Technician = require("../models/Technician");


const createRepairRequest = async (req, res) => {
    try {
       const {
           userId,technicianId,phone,address,notes,paymentStatus
       } = req.body;

       const repairRequest = await RepairRequest.create(
           {
               userId,technicianId,phone,address,notes,paymentStatus
           }
       );

        return res.status(201).json(
            repairRequest
        );


    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            message: "Failed to create repair request",
        });
    }
};

const getUserRepairRequest = async (req, res) => {

        try {

            const { userId } =
                req.params;

            const requests =
                await RepairRequest.find({

                    userId,
                });

            // enrich technician data
            const enrichedRequests =
                await Promise.all(

                    requests.map(
                        async (request) => {

                            const technician =
                                await Technician.findOne({
                                    firebaseUid:
                                    request.technicianId
                                });

                            return {

                                ...request._doc,
                                technician,
                            };
                        }
                    )
                );

            return res.status(200).json(
                enrichedRequests
            );

        } catch (error) {

            return res.status(500).json({

                message: error.message,
            });
        }
    };

const getTechnicianBookings= async (req,res)=>{
    try{
        const {technicianId} = req.params;
        const bookings= await RepairRequest.find({
            technicianId
        });
        return res.status(200).json(bookings);
    }catch(err){
        return res.status(500).json({message:"Failed to get TechnicianBookings",});
    }
}

const updateBookingStatus = async (req,res)=>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        const updateBooking = await RepairRequest.findByIdAndUpdate(
            id,
            {
                status
            },
        {
            new: true
        }
        );

        return res.status(200).json(
            updateBooking
        );

    }catch(err){
        return res.status(500).json({message:"Failed to update TechnicianBooking",});
    }
};

const completeBooking= async (req,res)=>{
    try{
        const {bookingId} = req.params;

        const result = await RepairRequest.findByIdAndUpdate(
            bookingId,
            {
                status: "completed"
            },

            {
                new:true
            }
        );
        return res.status(200).json(result);
    }
    catch(err){
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    createRepairRequest,
    getUserRepairRequest,
    getTechnicianBookings,
    updateBookingStatus,
    completeBooking,
};