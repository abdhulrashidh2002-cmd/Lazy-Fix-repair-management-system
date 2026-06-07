const mongoose = require('mongoose');

const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected successfully");
    }catch (e) {
        console.log("MongoDB connection error" + e.message);
        process.exit(1)
    }
}

module.exports = connectDb;