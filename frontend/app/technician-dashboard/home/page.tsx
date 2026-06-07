"use client"

import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "@/context/AuthContext";

interface BookingProp{
    _id:string;
    status:string;
}
export default function TechnicianHomePage() {

    const [bookings, setBookings] = useState<BookingProp[]>([]);

    const {user,dbuser}= useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try{

                const res= await axios.get(`http://localhost:5000/api/repair/technician/${user?.uid}`);

                setBookings(res.data);

            }catch(err){
                console.error(err)
            }
        };

        fetchData();
    }, [user]);

    const totalBookings= bookings.length;

    const pendingBookings = bookings.filter((b)=>b.status==="pending").length;

    const assignedBookings = bookings.filter((b)=>b.status==="assigned").length;
    const completedBookings = bookings.filter((b)=>b.status==="completed").length;

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Total Bookings */}
            <div className="
        bg-gradient-to-br
        from-blue-900
        to-indigo-800
        p-6
        rounded-3xl
        shadow-lg
    ">
                <h3 className="text-blue-100">
                    Total Bookings
                </h3>

                <p className="
            text-4xl
            text-white
            font-bold
            mt-2
        ">
                    {totalBookings}
                </p>
            </div>

            {/* Pending */}
            <div className="
        bg-gradient-to-br
        from-yellow-700
        to-orange-600
        p-6
        rounded-3xl
        shadow-lg
    ">
                <h3 className="text-yellow-100">
                    Pending
                </h3>

                <p className="
            text-4xl
            text-white
            font-bold
            mt-2
        ">
                    {pendingBookings}
                </p>
            </div>

            {/* Assigned */}
            <div className="
        bg-gradient-to-br
        from-emerald-700
        to-green-600
        p-6
        rounded-3xl
        shadow-lg
    ">
                <h3 className="text-green-100">
                    Assigned
                </h3>

                <p className="
            text-4xl
            text-white
            font-bold
            mt-2
        ">
                    {assignedBookings}
                </p>
            </div>

            {/* Completed */}
            <div className="
        bg-gradient-to-br
        from-purple-800
        to-fuchsia-700
        p-6
        rounded-3xl
        shadow-lg
    ">
                <h3 className="text-purple-100">
                    Completed
                </h3>

                <p className="
            text-4xl
            text-white
            font-bold
            mt-2
        ">
                    {completedBookings}
                </p>
            </div>

        </div>
    );
}