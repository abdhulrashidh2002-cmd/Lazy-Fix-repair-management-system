const mongoose= require('mongoose');

const userSchema=
    new mongoose.Schema(
        {
            firebaseUID:{
                type:String,
                required:true,
                unique:true,
            },
            email:{
                type:String,
                required:true,
                unique:true,
            },
            role:{
                type:String,
                enum:['user','technician','admin']
            },
            name:{
                type:String,
                required:true,
            }

        },
        {
            timestamps:true
        }
    );

module.exports =
    mongoose.models.User ||
    mongoose.model("User", userSchema);