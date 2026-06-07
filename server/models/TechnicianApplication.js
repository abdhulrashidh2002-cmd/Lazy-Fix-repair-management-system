const mongoose=require('mongoose');

const technicianApplicationSchema =
    new mongoose.Schema({

        userId: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        specialization: {
            type: String,
            required: true,
        },

        experience: {
            type: Number,
            required: true,
        },

        serviceArea: {
            type: String,
            required: true,
        },

        profileImage: {
            type: String,
            required: true,
        },

        status: {
            type: String,

            enum: [
                "pending",
                "approved",
                "rejected",
            ],

            default: "pending",
        }

    }, { timestamps: true });

module.exports=mongoose.model("TechnicianApplication", technicianApplicationSchema);