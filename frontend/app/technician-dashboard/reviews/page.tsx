"use client"
import axios from "axios";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";

interface Props {
    _id: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function ReviewPage(){
    const [reviews,setReviews] = useState<Props[]>([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();

    useEffect(() => {
        const fetchReviews=async () => {
            try{
               const res= await axios.get(`http://localhost:5000/api/reviews/tech/${user?.uid}`);
               setReviews(res.data);
            }catch(e){
                console.log(e)
            }finally{
                setLoading(false);
            }
        }
        fetchReviews();

    },[])

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };


    return (
        <div className="min-h-screen bg-[#121212] p-6">
            <h1 className="text-white text-3xl font-bold mb-6">
                Customer Reviews
            </h1>

            {loading && (
                <p className="text-gray-400">Loading reviews...</p>
            )}

            {!loading && reviews.length === 0 && (
                <p className="text-gray-400">No reviews yet</p>
            )}

            <div className="grid gap-4">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="bg-[#1f1f1f] border border-[#2f2f2f] p-5 rounded-2xl hover:scale-[1.02] transition"
                    >
                        {/* TOP ROW */}
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-yellow-400 font-semibold text-lg">
                                ⭐ {review.rating}/5
                            </div>

                            <div className="text-gray-500 text-sm">
                                {formatDate(review.createdAt)}
                            </div>
                        </div>

                        {/* COMMENT */}
                        <p className="text-gray-300 text-base leading-relaxed">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}