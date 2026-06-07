"use client";

import axios from "axios";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

import {
    useEffect,
    useState,
} from "react";
import ProtectedRoute from "@/components/ProtectedRoute"
interface TechProp {
    _id: string;
    userId: string;
    name: string;
    email: string;
    specialization: string;
    experience: number;
    serviceArea: string;
    profileImage: string;
    status: string;
}

export default function AdminDashboard() {

    const [
        applications,
        setApplications
    ] = useState<TechProp[] | null>(null);

    const fetchApplications =
        async () => {

            try {

                const res =
                    await axios.get(
                        "http://localhost:5000/api/technicianApplication/all"
                    );

                setApplications(
                    res.data
                );

            } catch (error) {

                console.log(error);
            }
        };

    useEffect(() => {
        const getApplications = async () => {
            fetchApplications();
        }

        getApplications();
    }, []);

    const approveApplication =
        async (id: string) => {

            try {

                await axios.patch(
                    `http://localhost:5000/api/technicianApplication/${id}`
                );

                alert(
                    "Application Approved"
                );

                fetchApplications();

            } catch (error) {

                console.log(error);
            }
        };

    const rejectApplication= async (id: string) => {
        try {

            await axios.patch(
                `http://localhost:5000/api/technicianApplication/reject/${id}`
            );

            alert(
                "Application Rejected"
            );

            fetchApplications();

        } catch (error) {

            console.log(error);
        }
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
                Admin Dashboard
            </h1>

            <div className="
            grid
            gap-6
            ">

                {applications?.map((app) => (

                    <div

                        key={app._id}

                        className="
                        bg-[#2f2f2f]
                        p-6
                        rounded-3xl
                        "

                    >

                        <div className="
                        flex
                        items-center
                        gap-4
                        ">

                            <img

                                src={
                                    app.profileImage
                                }

                                alt="Profile"

                                className="
                                w-20
                                h-20
                                rounded-full
                                object-cover
                                "
                            />

                            <div>

                                <h2 className="
                                text-2xl
                                text-white
                                font-semibold
                                ">
                                    {app.name}
                                </h2>

                                <p className="
                                text-blue-400
                                ">
                                    {
                                        app.specialization
                                    }
                                </p>

                            </div>

                        </div>

                        <p className="
                        text-gray-300
                        mt-4
                        ">
                            Experience:
                            {" "}
                            {app.experience}
                            {" "}
                            years
                        </p>

                        <p className="
                        text-gray-300
                        mt-2
                        ">
                            Area:
                            {" "}
                            {app.serviceArea}
                        </p>

                        <p className="
                        text-yellow-400
                        mt-2
                        ">
                            Status:
                            {" "}
                            {app.status}
                        </p>

                        <button

                            onClick={() =>
                                approveApplication(
                                    app._id
                                )
                            }

                            className="
                            mt-5
                            bg-green-500
                            px-6
                            py-3
                            rounded-xl
                            text-white
                            hover:bg-green-600
                            transition
                            "
                        >

                            Approve

                        </button>

                        <button
                            className="
                            mt-5
                            bg-red-700
                            px-6
                            py-3
                            ml-4
                            rounded-xl
                            text-white
                            hover:bg-blue-800
                            transition
                            "

                            onClick={() =>
                                rejectApplication(
                                    app._id
                                )
                            }
                        >

                            Reject
                        </button>

                    </div>
                ))}

            </div>

        </div>

    );
}