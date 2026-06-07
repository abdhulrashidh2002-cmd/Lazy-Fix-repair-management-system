"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface BookingProp {
    _id: string;
    userId: string;
    phone: string;
    address: string;
    notes: string;
    status: string;
}

export default function TechnicianDashboardPage() {

    const {user,loading} = useAuth();

    const router = useRouter();

    const [bookings, setBookings] =
        useState<BookingProp[]>([]);

    const [activeTab, setActiveTab] = useState("pending");

    const fetchBookings = async () => {

        try {

            const result = await axios.get(
                `http://localhost:5000/api/repair/technician/${user?.uid}`
            );

            setBookings(result.data);

        } catch (e) {

            console.log(e);
        }
    };

    useEffect(() => {

        if (!loading && !user) {

            router.push("/login");

            return;
        }

        const loaddata=async () => {
            fetchBookings();
        }
        loaddata();

    }, [user, loading, router]);

    const updateStatus= async (bookingId:string, status:string)=>{
        try{
            await axios.patch(`http://localhost:5000/api/repair/status/${bookingId}`, {status,});
            fetchBookings();
        }catch(err){
            console.log(err);
        }

    };

    const completeBooking = async (id:string) => {
        await axios.patch(`http://localhost:5000/api/repair/complete/${id}`);

        alert("Marked As Completed")
    }

    const filteredBookings = bookings.filter(
        (booking) => booking.status === activeTab
    );
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
                Technician Dashboard
            </h1>

            <div className="flex gap-4 mb-6">
                <button
                onClick={()=>setActiveTab("pending")}
                type="button"
                className={`px-4 py-2 rounded-3xl text-white
                ${activeTab === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"}
                `}
                >
                    Pending
                </button>

                <button
                    onClick={()=>setActiveTab("accepted")}
                    type="button"
                    className={`px-4 py-2 rounded-3xl text-white
                ${activeTab === "accepted"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-300"}
                `}
                >
                    Accepted
                </button>


            </div>

            {filteredBookings.length ===0 ? (
                <div className="

                    text-gray-400
                    mt-20
                    items-start
                    justify-start
                    h-96
                ">
                    <h2 className="text-2xl font-semibold text-white">
                        📦 No {activeTab} Jobs found
                    </h2>

                    <p className="mt-2">
                        You don’t have any {activeTab} jobs right now.
                    </p>

                </div>
            ):(
                <div className="
            grid
            gap-6
            ">

                {filteredBookings.map((booking) => (

                    <div
                        className="
                        bg-[#2f2f2f]
                        p-6
                        rounded-3xl
                        "
                        key={booking._id}
                    >

                        <h2 className="
                        text-white
                        text-2xl
                        ">
                            Booking Request
                        </h2>

                        <p className="
                        text-gray-300
                        mt-3
                        ">
                            Phone:
                            {booking.phone}
                        </p>

                        <p className="
                        text-gray-300
                        mt-3
                        ">
                            Address:
                            {booking.address}
                        </p>

                        <p className="
                        text-gray-300
                        mt-3
                        ">
                            Notes:
                            {booking.notes}
                        </p>

                        <p className={`
                            mt-3
                            font-semibold
                        
                            ${
                            booking.status === "accepted"
                                ? "text-green-400"

                                : booking.status === "rejected"
                                    ? "text-red-400"

                                    : "text-yellow-400"
                        }
                    `}

                        >
                            Status:
                            {booking.status}
                        </p>
                        <div className="
                            flex
                            gap-4
                            mt-5
                            ">
                            {/* Accept */}
                            {
                                booking.status === "pending" && (
                                    <button

                                        onClick={() =>
                                            updateStatus(
                                                booking._id,
                                                "accepted"
                                            )
                                        }

                                        className="
                                            bg-green-500
                                            px-5
                                            py-2
                                            rounded-xl
                                            text-white
                                            "
                                            >

                                        Accept

                                    </button>

                                )
                            }
                            {/* Reject */}
                            {
                                booking.status === "pending" && (
                                    <button


                                        onClick={() =>
                                            updateStatus(
                                                booking._id,
                                                "rejected"
                                            )
                                        }

                                        className="
                                            bg-red-500
                                            px-5
                                            py-2
                                            rounded-xl
                                            text-white
                                            "
                                    >

                                        Reject

                                    </button>
                                )
                            }

                            <button
                                onClick={() => completeBooking(booking._id)}
                                className="bg-[#090526]
                                px-4
                                py-2
                                rounded-xl
                                 text-white
                                 font-bold
                                 text-center
                                 ml-5
                                 hover:bg-[#090526] "
                            >
                                Mark Completed
                            </button>

                        </div>

                    </div>
                ))}

            </div>
            )}



        </div>
    );
}