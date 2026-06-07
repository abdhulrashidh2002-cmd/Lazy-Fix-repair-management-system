const mongoose= require('mongoose');


const ReviewSchema= new mongoose.Schema({
    bookingId:{
        type:String,
        required:true,
    },
    technicianId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    }

},
    {timestamps:true});

module.exports= mongoose.model('Review',ReviewSchema);