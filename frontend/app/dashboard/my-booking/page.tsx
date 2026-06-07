"use client"
import axios from "axios";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";

interface Technician {
    profileImage: string;
    specialization: string;
    rating: number;
    name: string;
}

interface BookingProp {
    _id: string;
    technicianId: string;
    phone: string;
    address: string;
    notes: string;
    status: string;
    paymentStatus: string;
    reviewSubmitted: boolean;
    technician: Technician;
}
export default function MyBookingPage(){
    const {user} = useAuth();
    const [bookings, setBookings] = useState<BookingProp [] | null>(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const [activeTab, setActiveTab] = useState("pending");

    const fetchBookings = async () => {
        try{
            const res= await axios.get(`http://localhost:5000/api/repair/${user?.uid}`);

            setBookings(res.data);
        }catch(error){
            console.log(error);
        }finally {

            setLoading(false);
        }

    };

    const submitReview = async (booking:BookingProp)=>{
        try{
            await axios.post("http://localhost:5000/api/reviews/create",
                {
                    bookingId: booking._id,
                    technicianId: booking.technicianId,
                    userId: user?.uid,
                    rating,
                    comment,
                }
                );

            alert("Review Submitted! Successfully!!!!");

            fetchBookings();

        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {

        if (user){
            const getBookings = async () => {
                fetchBookings();
            }
            getBookings();
        }
    },[user]);

const filteredBookings= bookings?.filter(
    (booking:BookingProp)=>booking.status === activeTab
) || [];

    if (loading) {

        return (
            <h1 className="
            text-white
            p-10
            ">
                Loading...
            </h1>
        );
    }

    return (
        <div className="
        min-h-screen
        bg-[#212121]
        p-10
        ">

            <h1 className="
            text-4xl
            text-white
            font-bold
            mb-10
            ">
                My Bookings
            </h1>

            <div className="flex gap-4 mb-6">

                <button
                    onClick={() => setActiveTab("pending")}
                    className={`px-4 py-2 rounded-3xl text-white ${
                        activeTab === "pending"
                            ? "bg-blue-800"
                            : "bg-gray-700 text-gray-300"
                    }`}
                >
                    Pending
                </button>

                <button
                    onClick={() => setActiveTab("accepted")}
                    className={`px-4 py-2 rounded-3xl text-white ${
                        activeTab === "accepted"
                            ? "bg-blue-800"
                            : "bg-gray-700 text-gray-300"
                    }`}
                >
                    Accepted
                </button>

                <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-4 py-2 rounded-3xl text-white ${
                        activeTab === "completed"
                            ? "bg-blue-800"
                            : "bg-gray-700 text-gray-300"
                    }`}
                >
                    Completed
                </button>

            </div>

            {filteredBookings?.length === 0 ? (
                <div className="

                    text-gray-400
                    mt-20
                    items-start
                    justify-start
                    h-96
                ">
                    <h2 className="text-2xl font-semibold text-white">
                        📦 No {activeTab} bookings found
                    </h2>

                    <p className="mt-2">
                        You don’t have any {activeTab} bookings right now.
                    </p>

                </div>
            ):(
                <div className="
            grid
            gap-6
            ">


                    {filteredBookings?.map((booking) => (

                        <div

                            key={booking._id}

                            className="
                        bg-[#2f2f2f]
                        p-6
                        rounded-3xl
                        "

                        >


                            <h2 className="
                        text-2xl
                        text-white
                        font-semibold
                        ">
                                Repair Booking
                            </h2>

                            {/* Technician */}
                            <div className="
                            flex
                            items-center
                            gap-4
                            mt-4

                            ">

                                {/* Profile Image */}
                                <img

                                    src={
                                        booking.technician?.profileImage
                                    }

                                    alt="Technician"

                                    className="
                                    w-16
                                    h-16
                                    rounded-full
                                    object-cover
                                    "
                                />

                                <div>

                                    {/* Name */}
                                    <h3 className="
                                    text-xl
                                    text-gray-500
                                    font-semibold
                                    ">
                                        Name :
                                        {
                                            booking.technician?.name
                                        }
                                    </h3>

                                    {/* Specialization */}
                                    <p className="
                                    text-blue-400
                                    ">
                                        Specialization in :
                                        {
                                            booking.technician
                                                ?.specialization
                                        }
                                    </p>

                                    {/* Rating */}
                                    <p className="
                                    text-yellow-400
                                    ">
                                        Rating :
                                        {
                                            booking.technician
                                                ?.rating
                                        }⭐
                                    </p>

                                </div>

                            </div>

                            {/* Address */}
                            <p className="
                        text-white
                        mt-3
                        font-semibold
                        ">
                                Address:
                                {booking.address}
                            </p>

                            {/* Notes */}
                            <p className="
                        text-gray-300
                        mt-3
                        ">
                                Notes:
                                {booking.notes}
                            </p>


                            <span className={`
                            inline-block px-3 py-1 rounded-full text-sm font-semibold mt-3
                            ${
                                booking.status === "accepted"
                                    ? "bg-green-500 text-white"
                                    : booking.status === "pending"
                                        ? "bg-yellow-500 text-black"
                                        : booking.status === "rejected"
                                            ? "bg-red-500 text-white"
                                            : "bg-blue-500 text-white"
                            }
                        `}>
                            {booking.status}
                        </span>
                            {
                                booking.status === "completed"
                                &&
                                !booking.reviewSubmitted && (

                                    <div className="mt-6">

                                        <h3 className="text-white font-semibold mb-2">
                                            Leave a Review
                                        </h3>

                                        <select
                                            value={rating}
                                            onChange={(e) =>
                                                setRating(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="
                                        bg-[#444]
                                        text-white
                                          p-2
                                          rounded
                                        "
                                        >
                                            <option value={1}>1 ⭐</option>
                                            <option value={2}>2 ⭐</option>
                                            <option value={3}>3 ⭐</option>
                                            <option value={4}>4 ⭐</option>
                                            <option value={5}>5 ⭐</option>
                                        </select>

                                        <textarea
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Write your review..."
                                            className="
                                            w-full
                                            mt-3
                                            p-3
                                            rounded-xl
                                            bg-[#444]
                                            text-white
                                            "
                                        />

                                        <button
                                            onClick={() =>
                                                submitReview(
                                                    booking
                                                )
                                            }
                                            className="
                                            mt-3
                                            bg-blue-500
                                            px-4
                                            py-2
                                            rounded-xl
                                            text-white
                                            "
                                        >
                                            Submit Review
                                        </button>

                                    </div>
                                )
                            }

                            {
                                booking?.reviewSubmitted && (
                                    <p className="
                                    mt-4
                                    text-green-400
                                    font-semibold
                                    ">
                                        Review Submitted ✅
                                    </p>

                                )
                            }

                        </div>
                    ))}

                </div>
            )}



        </div>

    )


}