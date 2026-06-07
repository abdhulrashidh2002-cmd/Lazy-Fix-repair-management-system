require("dotenv").config();
const express = require('express');
const cors= require('cors');
const dotenv= require('dotenv');
const connectDB= require('./config/db');
const userRoutes = require('./routes/userRoutes');
const repairRoutes = require('./routes/repairRoutes');
const aiRoutes = require('./routes/aiRoutes');
const technicianRoutes = require('./routes/technicianRoutes');
const technicianApplicationRoutes = require('./routes/technicianApplicationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app= express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/repair', repairRoutes);
app.use('/api/ai' , aiRoutes);
app.use('/api/technicians' , technicianRoutes);
app.use('/api/technicianApplication' , technicianApplicationRoutes);
app.use('/api/reviews' , reviewRoutes);
app.use ('/api/admin', adminRoutes);


app.get('/',(req,res)=>{
    console.log("Root route hit");
    res.send('FixIt AI Backend Running 🚀');
});

const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

startServer();