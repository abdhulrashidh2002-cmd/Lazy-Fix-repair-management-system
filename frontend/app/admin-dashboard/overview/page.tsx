"use client"
import axios from "axios";
import {useEffect, useState} from "react";
import Link from "next/link";


export default function Overview(){
    const [state, setState] = useState({
        totalUsers:0,
        approvedTechnicians:0,
        rejectedTechnicians:0,
        totalBookings:0,
    });

    useEffect(()=>{
     const fetchData = async () => {
         try{
             const res= await axios.get("http://localhost:5000/api/admin/stats");
             setState(res.data);
         }catch(err){
             console.log(err)
         }
     }
     fetchData();

    },[])

    return (
        <>
            <div className="mb-10">

                <h1
                    className="
                    text-4xl
                    font-bold
                    text-white
                    "
                >
                    Admin Dashboard
                </h1>

                <p
                    className="
                        text-gray-400
                        mt-2
                        "
                >
                    Monitor platform activity and
                    technician approvals.
                </p>

            </div>

            <hr/>
            <div className="
            mt-6
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5">
                <div
                    className="
                    bg-gradient-to-br from-blue-500 to-indigo-700
                    p-6
                    rounded-3xl
                    shadow-xl
                    border border-white/10
                    hover:scale-105
                    transition-all duration-300
                    "
                >
                    <p className="text-gray-200 font-semibold">
                        Total Users
                    </p>

                    <h2
                        className="
                        text-white
                        text-4xl
                        font-bold
                        mt-2
                        "
                    >
                        {state.totalUsers}
                    </h2>
                </div>

                <div
                    className="
                    bg-gradient-to-br from-violet-500 to-purple-700
                    p-6
                    rounded-3xl
                     border border-white/10
                    hover:scale-105
                    transition-all duration-300
                    "
                                >
                    <p className="text-gray-200 font-semibold">
                        Technicians
                    </p>

                    <h2
                        className="
                        text-white
                        text-4xl
                        font-bold
                        mt-2
                        "
                    >
                        {state.approvedTechnicians}
                    </h2>
                </div>

                <div
                    className="
                    bg-gradient-to-br from-yellow-500 to-orange-700
                    p-6
                    rounded-3xl
                     border border-white/10
                    hover:scale-105
                    transition-all duration-300
                    "
                >
                    <p className="text-gray-200 font-semibold">
                        Pending Applications
                    </p>

                    <h2
                        className="
                            text-white
                            text-4xl
                            font-bold
                            mt-2
                            "
                    >
                        {state.rejectedTechnicians}
                    </h2>
                </div>

                <div
                    className="
                    bg-gradient-to-br from-green-500 to-emerald-700
                    p-6
                    rounded-3xl
                     border border-white/10
                    hover:scale-105
                    transition-all duration-300
                    "
                    >
                    <p className="text-gray-200 font-semibold">
                        Total Bookings
                    </p>

                    <h2
                        className="
                        text-white
                        text-4xl
                        font-bold
                        mt-2
                        "
                    >
                        {state.totalBookings}
                    </h2>
                </div>

            </div>

            <div
                className="
                    mt-10
                    bg-[#2f2f2f]
                    p-6
                    rounded-3xl
                    "
            >

                <h2
                                className="
                    text-white
                    text-2xl
                    font-semibold
                    mb-4
                    "
                >
                    Quick Actions
                </h2>

                <div className="flex gap-4">

                    <Link
                        href="/admin-dashboard/approve-technician"
                    >
                        <button
                            className="
                            bg-gradient-to-br from-blue-900 to-indigo-800
                            hover:brightness-125
                            hover:cursor-pointer
                            px-5
                            py-2
                            rounded-full
                            text-white
                            hover:scale-105

                            "
                        >
                            Review Applications
                        </button>
                    </Link>

                </div>

            </div>

        </>
    )
}
