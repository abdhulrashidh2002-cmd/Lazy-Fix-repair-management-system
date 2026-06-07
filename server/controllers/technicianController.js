const Technician = require("../models/Technician");


const createTechnician = async (req,res)=>{
    try{
       const {firebaseUid,name,serviceArea} = req.body;

       const technician = await Technician.create({
           firebaseUid,
           name,
           serviceArea,
       });

       return res.status(201).json(technician);


    }catch (error){
        console.log("error is here")
        return res.status(400).json({message:error.message});

    }
}

const getTechnicians =
    async (req, res) => {

        try {

            const technicians =
                await Technician.find();

            return res.status(200).json(
                technicians
            );

        } catch (error) {

            return res.status(500).json({
                message: error.message,
            });
        }
    };

const getTechnicianById = async (req, res) => {
    try{
        const technician = await Technician.findOne({
            firebaseUid: req.params.id

        });
        return res.status(200).json(
            technician
        )

    }catch(error){
        return res.status(500).json({
            message: "Failed to fetch a technician by id"
        });
    }
}

module.exports = {
    createTechnician,
    getTechnicians,
    getTechnicianById,
}