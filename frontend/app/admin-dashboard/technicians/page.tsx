"use client"
import axios from 'axios';
import {useEffect,useState} from "react";

interface TechProp{
    _id:string;
    name:string;
    email:string;
    specialization:string;
    rating:number;
    profileImage:string;
    serviceArea:string;
    available:boolean;
}

export default function TechnicianPage() {
    const [totalPages, setTotalPages] = useState(1);
    const [technicians, setTechnicians] = useState<TechProp[]>([]);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/admin/technicians",
                    {
                        params: {
                            page,
                            limit: 8,
                            search
                        }
                    }
                );

                setTechnicians(res.data.technicians);
                setTotalPages(res.data.totalPages);

            } catch (err) {
                console.log(err);
            }
        };

        fetchTechnicians();

    }, [page,search]);

    const toggleStatus = async (id: string) => {
        try {

            // 1. Update UI instantly (OPTIMISTIC UPDATE)
            setTechnicians((prev) =>
                prev.map((tech) =>
                    tech._id === id
                        ? {
                            ...tech,
                            available: !tech.available
                        }
                        : tech
                )
            );

            // 2. Call backend
            await axios.patch(
                `http://localhost:5000/api/admin/status/${id}`
            );

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="
        min-h-screen
        bg-[#212121]
        p-8
    ">


            <h1 className="
            text-4xl
            font-bold
            text-white
            mb-8
            ">
                Technicians
            </h1>

            {/* SEARCH BAR */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by email, name, or location..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1); // reset pagination
                    }}
                    className="
                        w-full md:w-1/3
                        p-3
                        rounded-xl
                        bg-[#2f2f2f]
                        text-white
                        border border-gray-700
                        focus:outline-none
                        focus:border-blue-500
                    "
                />
            </div>

            {/* Technician Grid */}
            {technicians.length > 0 ? (


                <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-4
                gap-6
            ">


                    {technicians.map((tech) => (

                        <div
                            key={tech._id}
                            className="
                            bg-[#2f2f2f]
                            rounded-3xl
                            p-6
                            border
                            border-gray-700
                            hover:border-blue-500
                            transition-all
                            duration-300
                        "
                        >


                            <div className="
                            flex
                            flex-col
                            items-center
                        ">

                                <img
                                    src={tech.profileImage}
                                    alt={tech.name}
                                    className="
                                    w-24
                                    h-24
                                    rounded-full
                                    object-cover
                                    border-2
                                    border-blue-500
                                "
                                />

                                <h2 className="
                                text-white
                                text-xl
                                font-semibold
                                mt-4
                            ">
                                    {tech.name}
                                </h2>

                                <p className="
                                text-blue-400
                                mt-1
                            ">
                                    {tech.specialization}
                                </p>

                                <p className="
                                text-gray-400
                                text-sm
                                mt-2
                            ">
                                    {tech.email}
                                </p>

                                <p className="
                                text-gray-300
                                mt-3
                            ">
                                    📍 {tech.serviceArea}
                                </p>

                                <p className="
                                text-yellow-400
                                mt-2
                                font-semibold
                            ">
                                    ⭐ {tech.rating || 0}
                                </p>

                                <span
                                    className={`
                                    mt-3
                                    px-4
                                    py-1
                                    rounded-full
                                    text-sm
                                    font-semibold
                                    ${
                                        tech.available
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                    }
                                `}
                                >
                                {tech.available
                                    ? "Available"
                                    : "Unavailable"}
                            </span>

                                <button
                                    onClick={() => toggleStatus(tech._id)}
                                    className={`
                                        px-4 py-2 rounded-3xl text-white mt-4
                                        ${tech.available ? "bg-red-500" : "bg-green-500"}
                                    `}
                                >
                                    {tech.available ? "Deactivate" : "Activate"}
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <div className="
                flex
                justify-center
                items-center
                h-64
            ">
                    <p className="
                    text-gray-400
                    text-xl
                ">
                        No technicians found
                    </p>
                </div>

            )}

            {/* Pagination */}
            <div className="
            flex
            justify-center
            items-center
            gap-4
            mt-10
        ">

                <button
                    disabled={page === 1}
                    onClick={() =>
                        setPage((prev) => prev - 1)
                    }
                    className="
                    bg-gray-700
                    text-white
                    px-5
                    py-2
                    rounded-xl
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                "
                >
                    Previous
                </button>

                <span className="
                text-white
                font-semibold
            ">
                Page {page} of {totalPages}
            </span>

                <button
                    disabled={page === totalPages}
                    onClick={() =>
                        setPage((prev) => prev + 1)
                    }
                    className="
                    bg-gray-700
                    text-white
                    px-5
                    py-2
                    rounded-xl
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                "
                >
                    Next
                </button>

            </div>

        </div>
    );
}


