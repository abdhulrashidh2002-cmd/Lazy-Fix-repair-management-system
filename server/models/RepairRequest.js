const mongoose = require('mongoose');

const RepairRequestSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },

        status: {
            type: String,
            enum: ["pending","rejected","assigned", "completed"],
            default: "pending",
        },

        technicianId: {
            type: String,
            default: null,
        },
        phone: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        notes: {
            type: String,
            default: "",
        },
        reviewSubmitted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps:true
    }

);

module.exports = mongoose.model('RepairRequest', RepairRequestSchema);