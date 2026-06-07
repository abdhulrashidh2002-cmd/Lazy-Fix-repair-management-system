"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import {useRouter} from "next/navigation"

interface TechniciansProps {
    firebaseUid: string;
    name: string;
    email: string;
    specialization: string;
    experience: number;
    rating: number;
    profileImage: string;
    serviceArea: string;
    available: boolean;
}

export default function TechnicianPage() {
    const router = useRouter();

    const [technicians, setTechnicians] =
        useState<TechniciansProps[]>([]);

    const [specialization, setSpecialization] =
        useState("");

    // Fetch technicians
    useEffect(() => {

        const fetchTechnicians = async () => {

            try {

                const result = await axios.get(
                    "http://localhost:5000/api/technicians/all"
                );
                setTechnicians(result.data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchTechnicians();

    }, []);

    // Filtering technicians
    const filteredTechnicians =
        technicians.filter((tech) => {

            // show all if no filter selected
            if (!specialization) {

                return true;
            }

            // return matching specialization
            return (
                tech.specialization === specialization
            );
        });

    return (

        <div className="min-h-screen bg-[#212121] p-10">

            <h1
                className="
                text-4xl
                text-white
                font-bold
                mb-6
                "
            >
                Find Repair Experts
            </h1>

            {/* Filter Dropdown */}
            <div className="mb-10">

                <select

                    value={specialization}

                    onChange={(e) =>
                        setSpecialization(
                            e.target.value
                        )
                    }

                    className="
                    p-3
                    rounded-xl
                    bg-white
                    text-black
                    "
                >

                    <option value="">
                        All Specializations
                    </option>

                    <option value="Laptop Repair">
                        Laptop Repair
                    </option>

                    <option value="Phone Repair">
                        Phone Repair
                    </option>

                    <option value="TV Repair">
                        TV Repair
                    </option>

                </select>

            </div>

            {/* Technician Cards */}
            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                "
            >

                {filteredTechnicians.map((tech) => (

                    <div

                        key={`${tech.firebaseUid}`}

                        className="
                        bg-[#2f2f2f]
                        p-6
                        rounded-3xl
                        shadow-lg
                        border
                        border-[#3d3d3d]
                        "

                    >
                        {/* Profile Image */}
                        <img
                            alt="Profile Image"
                            src={tech.profileImage}
                            className="
                            w-24
                            h-24
                            rounded-full
                            object-cover
                            mb-4
                            "
                        />

                        {/* Name */}
                        <h2
                            className="
                            text-2xl
                            text-white
                            font-semibold
                            "
                        >
                            {tech.name}
                        </h2>

                        {/* Specialization */}
                        <p className="text-blue-400 mt-2">
                            {tech.specialization}
                        </p>

                        {/* Rating */}
                        <p className="text-yellow-400 mt-2">
                            ⭐ {tech.rating}
                        </p>

                        {/* Experience */}
                        <p className="text-gray-300 mt-2">
                            {tech.experience} Years Experience
                        </p>

                        {/* Service Area */}
                        <p className="text-gray-400 mt-2">
                            Area: {tech.serviceArea}
                        </p>

                        {/* Availability */}
                        <p
                            className={`
                            mt-3
                            font-medium
                            ${
                                tech.available
                                    ? "text-green-400"
                                    : "text-red-400"
                            }
                            `}
                        >
                            {tech.available
                                ? "Available"
                                : "Unavailable"}
                        </p>

                        {/* Book Button */}
                        <button
                            onClick={() => {
                                router.push(`/dashboard/book-technician/${tech.firebaseUid}`);
                            }}
                            className="
                            mt-5
                            w-full
                            bg-white
                            text-black
                            py-3
                            rounded-xl
                            hover:bg-gray-300
                            transition
                            "
                        >
                            Book Technician
                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
}