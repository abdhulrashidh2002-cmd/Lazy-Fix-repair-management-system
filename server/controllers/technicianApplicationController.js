const TechnicianApplication = require("../models/TechnicianApplication");
const Technician = require("../models/Technician");
const User = require("../models/User");

const createTechnicianApplication = async (req,res)=>{
    try{
        const application= await TechnicianApplication.create(
            req.body
        );
        return res.status(201).json(application);


    }catch (error){
        console.log("error is here")
        return res.status(400).json({message:error.message});

    }
}

const getTechnicianApplication= async(req,res)=>{
    try{
        const applications= await TechnicianApplication.find({

            status: "pending",
        });
        return res.status(200).json(
            applications
        );

    }catch (error){
        console.log("error is here on get TechnicianApplication");
    }
}

const approveTechnicianApplication = async (req,res)=>{
    try{
        const {id} = req.params;

        const application = await TechnicianApplication.findById(
            id
        );

        if (!application) {

            return res.status(404).json({
                message: "Application not found"
            });
        }

        //create technician on technician table
        const technician = await Technician.create(
            {
                firebaseUid:
                application.userId,

                name:application.name,

                email:
                application.email,

                specialization:
                application.specialization,

                experience:
                application.experience,

                rating: 5,

                profileImage:
                application.profileImage,

                serviceArea:
                application.serviceArea,

                available: true,
            }
        );
        application.status="approved";

        const updatedUser = await User.findOneAndUpdate(
            {
                firebaseUID: application.userId,
            },
            {
                role: "technician",
            },
            {
                returnDocument: "after",
            }
        );

        await application.save();
        console.log("Updated user:", updatedUser);

        return res.status(200).json({

            message:
                "Application approved",

            technician,
        });



    }catch (error){
        console.log(error);

        return res.status(500).json({
            message: "Approval failed"
        });

    }
}

const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;

        await TechnicianApplication.findByIdAndUpdate(id, {
            status: "REJECTED",
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        return res.status(200).json({
            message: "Application rejected successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};
module.exports = {
    createTechnicianApplication,
    getTechnicianApplication,
    approveTechnicianApplication,
    deleteApplication,
}