"use client"
import axios from 'axios';
import {useState,useEffect} from "react";

import {useAuth} from "@/context/AuthContext";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "@firebase/storage";

import {storage} from "@/firebase/firebase";

export default function TechBookingPage(){
    const {user,dbuser} = useAuth();

    const [formData, setFormData] = useState({
        specialization: "",
        experience: "",
        serviceArea: "",

    });
    const [image, setImage] =
        useState<File | null>(null);

    const handleSubmit =
        async () => {

            try {

                let profileImageUrl = "";

                if (image) {

                    const imageRef = ref(

                        storage,

                        `technician-profiles/${crypto.randomUUID()}-${image.name}`
                    );

                    await uploadBytes(
                        imageRef,
                        image
                    );

                    profileImageUrl =
                        await getDownloadURL(
                            imageRef
                        );
                }

                const res =
                    await axios.post(

                        "http://localhost:5000/api/technicianApplication/createTechnicianApplication",

                        {

                            userId: user?.uid,

                            name: dbuser?.name,

                            email: dbuser?.email,

                            specialization:
                            formData.specialization,

                            experience:
                            formData.experience,

                            serviceArea:
                            formData.serviceArea,

                            profileImage:
                            profileImageUrl,
                        }
                    );

                console.log(res.data);

                resetForm();

                alert(
                    "Application submitted!"
                );

            } catch (error) {

                console.log(error);
            }
        };

    const resetForm=()=>{
        setFormData({
            specialization: "",
            experience: "",
            serviceArea: "",
        });

        setImage(null);
    }

    return (

        <div className="
        min-h-screen
        bg-[#212121]
        flex
        justify-center
        items-center
        p-10
        ">

            <div className="
            bg-[#2f2f2f]
            p-10
            rounded-3xl
            w-full
            max-w-2xl
            ">

                <h1 className="
                text-4xl
                text-white
                font-bold
                mb-8
                ">
                    Become a Technician
                </h1>

                {/* Specialization */}
                <input

                    type="text"

                    placeholder="Specialization"

                    value={
                        formData.specialization
                    }

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            specialization:
                            e.target.value,
                        })
                    }

                    className="
                    w-full
                    p-4
                    rounded-3xl
                    mb-4
                    text-white
                    border border-[#010173]
                    "
                />

                {/* Experience */}
                <input

                    type="number"

                    placeholder="Years of Experience"

                    value={
                        formData.experience
                    }

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            experience:
                            e.target.value,
                        })
                    }

                    className="
                    w-full
                    p-4
                    border border-[#010173]
                    rounded-3xl
                    mb-4
                    text-white
                    "
                />

                {/* Service Area */}
                <input

                    type="text"

                    placeholder="Service Area"

                    value={
                        formData.serviceArea
                    }

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            serviceArea:
                            e.target.value,
                        })
                    }

                    className="
                    w-full
                    p-4
                    rounded-3xl
                    mb-4
                    text-white
                    border border-[#010173]
                    "
                />

                <div className="mb-6">

                    <label className="
                        text-white
                        block
                        mb-2
                        ">
                        Upload Profile Image
                    </label>

                    <input

                        type="file"

                        accept="image/*"

                        onChange={(e) => {

                            if (

                                e.target.files &&

                                e.target.files[0]

                            ) {

                                setImage(
                                    e.target.files[0]
                                );
                            }
                        }}

                        className="
                        w-full
                        p-4
                        rounded-3xl
                        bg-gray-500
                        border border-[#010173]
                        "
                    />

                </div>

                <button

                    onClick={handleSubmit}

                    className="
                    w-full
                    bg-[#020121]
                    text-white
                    border border-white
                    py-4
                    font-bold
                    rounded-3xl
                   hover:bg-[#0A0A2E] cursor-pointer
                    "
                >

                    Submit Application

                </button>

            </div>

        </div>
    );

}
