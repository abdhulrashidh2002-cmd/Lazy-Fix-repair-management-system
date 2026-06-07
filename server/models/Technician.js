const mongoose= require('mongoose');

const TechnicianSchema = new mongoose.Schema({
    firebaseUid:{
        type:String,
        required:true,

    },
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
    },

    specialization: {
        type: String,
    },

    experience: {
        type: Number,
        default: 0,
    },

    rating: {
        type: Number,
        default: null,
    },

    profileImage: {
        type: String,

    },

    serviceArea: {
        type: String,
        required: true,
    },

    available: {
        type: Boolean,
        default: true,
    }
},
    {timestamps:true}
);

module.exports = mongoose.model("Technician", TechnicianSchema);