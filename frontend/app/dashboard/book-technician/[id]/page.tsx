"use client"
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {useAuth} from "@/context/AuthContext"

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

export default function BookingPage(){
    const {user} = useAuth();
    const param=useParams();
    const id = param.id as string;
    const [technician, setTechnician] = useState<TechniciansProps | null>(null);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

useEffect(() => {
    const fetchTechnican = async ()=>{
        try {
            const result = await axios.get(`http://localhost:5000/api/technicians/${id}`);
            setTechnician(result.data);
        }catch (err) {
            console.log(err)
        }
    }

    fetchTechnican();
},[id]);

    const handlePayment=async ()=>{
        try{
            if(!phone || !address || !notes){
                alert(
                    "Please fill all details"
                );

                return;
            }
            // fake payment success
            const paymentSuccess = true;

            if (paymentSuccess) {

                createBooking();
            }
        }catch (e) {
            console.log(e)
        }
    };
    const createBooking =
        async () => {

            try {
                if (!user) {
                    alert("Please login first");
                    return;
                }

                setLoading(true);
                const result = await axios.post(
                    `http://localhost:5000/api/repair/create`,
                    {
                        userId:user?.uid,
                        technicianId:id,
                        phone:phone,
                        address:address,
                        notes:notes,
                        paymentStatus: "paid",
                    }
                );

                alert(
                    "Booking created successfully!"
                );


            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

    if (!technician) {

        return (
            <h1 className="text-white">
                Loading...
            </h1>
        );
    }
    return (
        <div className="
        min-h-screen
        bg-gradient-to-br
        from-[#0f172a]
        via-[#111827]
        to-[#1e293b]
        p-10
        flex
        items-center
        justify-center
        ">

            <div className="
            max-w-2xl
            w-full
            mx-auto
            bg-[#1f2937]/90
            backdrop-blur-lg
            border
            border-white/10
            p-8
            rounded-3xl
            shadow-2xl
            ">

                <div className="flex items-center gap-5">

                    <img
                        src={technician.profileImage}
                        alt="Profile"
                        className="
                        w-28
                        h-28
                        rounded-full
                        object-cover
                        border-4
                        border-cyan-400
                        shadow-lg
                        "
                    />

                    <div>

                        <h1 className="
                        text-3xl
                        text-white
                        font-bold
                        ">
                            {technician.name}
                        </h1>

                        <p className="
                        text-cyan-400
                        mt-2
                        font-medium
                        ">
                            {technician.specialization}
                        </p>

                        <p className="
                        text-yellow-400
                        mt-2
                        ">
                            ⭐ {technician.rating}
                        </p>

                    </div>

                </div>

                <div className="mt-10">

                    <h2 className="
            text-2xl
            text-white
            font-semibold
            mb-5
            ">
                        Booking Details
                    </h2>

                    {/* Phone */}
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                                className="
                        w-full
                        p-4
                        rounded-2xl
                        mb-4
                        bg-[#111827]
                        border
                        border-gray-700
                        text-white
                        placeholder-gray-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-cyan-500
                        "

                    />

                    {/* Address */}
                    <textarea
                        placeholder="Address"
                        value={address}
                        onChange={(e) =>
                            setAddress(e.target.value)
                        }
                        className="
                        w-full
                        p-4
                        rounded-2xl
                        mb-4
                        bg-[#111827]
                        border
                        border-gray-700
                        text-white
                        placeholder-gray-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-cyan-500
                        "
                    />

                    {/* Notes */}
                    <textarea
                        placeholder="Additional Notes"
                        value={notes}
                        onChange={(e) =>
                            setNotes(e.target.value)
                        }
                        className="
                        w-full
                        p-4
                        rounded-2xl
                        mb-4
                        bg-[#111827]
                        border
                        border-gray-700
                        text-white
                        placeholder-gray-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-cyan-500
                        "
                    />

                    {/* Payment Button */}
                    <button
                        onClick={handlePayment}
                        className="
                        w-full
                        bg-cyan-500
                        py-4
                        rounded-2xl
                        text-white
                        font-semibold
                        hover:bg-cyan-400
                        transition-all
                        duration-300
                        shadow-lg
                        shadow-cyan-500/20
                        "
                            >

                        {
                            loading
                                ? "Processing..."
                                : "Proceed to Payment"
                        }

                    </button>

                </div>

            </div>

        </div>

    )
}