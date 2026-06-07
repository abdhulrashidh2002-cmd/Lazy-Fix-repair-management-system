const Review= require('../models/Review');
const RepairRequest= require('../models/RepairRequest');
const Technician = require('../models/Technician');

const createReview= async (req, res)=>{
    try{
        //check allready review provided or not
        const existingReview = await Review.findOne(
            {
                bookingId:
                req.body.bookingId
            }
        );

        if(existingReview){
            return res.status(400).json({

                message:
                    "Review already submitted"

            });
        }

        const review = await Review.create(
            req.body
        );

        const reviews= await Review.find({
            technicianId:
            req.body.technicianId
        });

        const averageRating =

            reviews.reduce(

                (sum, review) =>

                    sum + review.rating,

                0

            )

            / reviews.length;

        await Technician.findOneAndUpdate({
            firebaseUid:req.body.technicianId
        },
            {
                rating:averageRating
            }
        );
        await RepairRequest.findByIdAndUpdate(

            req.body.bookingId,

            {
                reviewSubmitted: true
            }
        );

        return res.status(201).json(review);
    }catch(error){
        return res.status(500).json({

            message: error.message,
        });
    }
};

const getReviews = async (req, res) => {
    try {
        const { id } = req.params;

        const reviews = await Review.find({ technicianId: id });

        return res.status(200).json(reviews);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching reviews",
            error: error.message
        });
    }
};




module.exports={
    createReview,
    getReviews
}