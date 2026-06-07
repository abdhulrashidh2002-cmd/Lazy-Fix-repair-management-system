"use client"

import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

interface BookingProp{
    _id:string;
    status:string;
}
export default function UserHomePage() {

    const [bookings, setBookings] = useState<BookingProp[]>([]);

    const {user,dbuser}= useAuth();
    const router=useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try{

                const res= await axios.get(`http://localhost:5000/api/repair/${user?.uid}`);

                setBookings(res.data);

            }catch(err){
                console.error(err)
            }
        };

         fetchData();
    }, [user]);

    const totalBookings= bookings.length;

    const pendingBookings = bookings.filter((b)=>b.status==="pending").length;

    const completedBookings = bookings.filter((b)=>b.status==="completed").length;

    return (
        <>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Welcome back, {dbuser?.name || "User"} 👋
                </h1>

                <p className="text-blue-100 mt-2">
                    Need a repair? Find trusted technicians and get your devices fixed quickly.
                </p>

                <button
                    onClick={() => router.replace("/dashboard/technicians")}
                    className="mt-5 bg-white text-blue-700 px-5 py-2 rounded-xl font-semibold hover:bg-gray-100 transition">
                    Find  Technician
                </button>
            </div>
        <div className="grid md:grid-cols-3 gap-6 ">


            <div className="
                  bg-gradient-to-br
                from-yellow-500
                to-orange-600
                p-6
                rounded-3xl
                ">

                <h3 className="text-gray-200 font-semibold">
                    Total Bookings
                </h3>

                <p className="
                    text-4xl
                    text-white
                    font-bold
                    ">
                    {totalBookings}
                </p>

            </div>

            <div className="
                bg-gradient-to-br
                from-blue-400
                to-blue-900
                p-6
                rounded-3xl
                ">

                <h3 className="text-gray-200 font-semibold">
                    Pending
                </h3>

                <p className="
                    text-4xl
                    text-yellow-400
                    font-bold
                    ">
                    {pendingBookings}
                </p>

            </div>

            <div className="
            bg-gradient-to-br
                from-green-400
                to-green-800
            p-6
            rounded-3xl

            ">

                <h3 className="text-white font-semibold">
                    Completed
                </h3>

                <p className="
                        text-4xl
                        text-gray-200
                        font-bold
                        ">
                    {completedBookings}
                </p>

            </div>

        </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Quick Actions
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                    <button
                        onClick={() => router.replace("/dashboard/my-booking")}
                        className="bg-[#2f2f2f] p-5 rounded-2xl text-left hover:bg-[#3a3a3a] transition">
                        📋 Explore Bookings
                    </button>

                    <button
                        onClick={() => router.replace("/dashboard/history")}
                        className="bg-[#2f2f2f] p-5 rounded-2xl text-left hover:bg-[#3a3a3a] transition">
                         View Ai Chats
                    </button>
                </div>
            </div>

            <div className="mt-8 bg-[#2f2f2f] rounded-3xl p-6">
                <h2 className="text-white text-xl font-semibold mb-4">
                    Recent Activity
                </h2>

                <div className="space-y-4">
                    <div className="border-l-2 border-green-500 pl-4">
                        <p className="text-white">
                            Laptop repair completed
                        </p>
                        <p className="text-gray-400 text-sm">
                            2 days ago
                        </p>
                    </div>

                    <div className="border-l-2 border-yellow-500 pl-4">
                        <p className="text-white">
                            Mobile screen replacement pending
                        </p>
                        <p className="text-gray-400 text-sm">
                            5 hours ago
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl p-6">
                <h2 className="text-white text-2xl font-bold">
                    Trusted by 500+ Customers
                </h2>

                <p className="text-purple-100 mt-2">
                    Connect with verified technicians for electronics, appliances, and home repairs.
                </p>
            </div>
        </>
    );
}