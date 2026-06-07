const mongoose = require("mongoose");

const aiAnalysisSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: String,
        required: true,
    },

    problemDescription: {
        type: String,
    },

    suggestedFix: {
        type: String,
    },

}, { timestamps: true });

module.exports =
    mongoose.model("AIAnalysis", aiAnalysisSchema);