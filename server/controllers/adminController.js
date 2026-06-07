"use client"

const User= require('../models/User');
const technicianApplications= require('../models/TechnicianApplication');
const repairRequest= require('../models/RepairRequest');
const Technician= require('../models/Technician');
const axios = require("axios");

const getAdminStats = async(req,res)=>{
    try{
        const totalUsers = await User.countDocuments(
            {
                role:"user"
            }
        );

        const approvedTechnicians = await technicianApplications.countDocuments({
            status:"approved",
        });
        const rejectedTechnicians = await technicianApplications.countDocuments({
            status:"rejected",
        });

        const totalBookings= await repairRequest.countDocuments();

        return res.status(200).json({
            totalUsers,
            approvedTechnicians,
            rejectedTechnicians,
            totalBookings,
        })
    }catch(err){

        return res.status(500).json({

            message: err.message,

        });
    }
};

const getTechnicians = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const search = req.query.search?.trim(); // 🔥 important fix

        const skip = (page - 1) * limit;

        let query = {};

        if (search && search.length > 0) {
            query = {
                $or: [
                    { email: { $regex: search, $options: "i" } },
                    { name: { $regex: search, $options: "i" } },
                    { serviceArea: { $regex: search, $options: "i" } }
                ]
            };
        }

        const technicians = await Technician.find(query)
            .skip(skip)
            .limit(limit);

        const total = await Technician.countDocuments(query);

        return res.status(200).json({
            technicians,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const updateTechnicianAvailable = async (req, res) => {
    try {

        const { id } = req.params;

        const technician = await Technician.findById(id);

        if (!technician) {
            return res.status(404).json({
                message: "Technician not found",
            });
        }

        technician.available = !technician.available;

        await technician.save();

        return res.status(200).json({
            message: "Status updated successfully",
            technician
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
    getAdminStats,
    getTechnicians,
    updateTechnicianAvailable,
}