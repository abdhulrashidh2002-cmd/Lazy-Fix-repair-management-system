"use client"
import {useState} from "react";
import axios from "axios";
import {useAuth} from "@/context/AuthContext"
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "@firebase/storage";

import {storage} from "@/firebase/firebase";
import {Upload} from "lucide-react";
import {useRouter} from "next/navigation";



interface RepairResult {
    problemDescription: string;
    suggestedFix: string;
    status?: string;
    imageUrl?: string;
}

export default function UploadPage(){
    const router=useRouter();
    const {user}= useAuth();
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<RepairResult | null>(null);

    const handleSubmit=async ()=>{
        if(!image || !user){
            return;
        }

        try{
            setLoading(true);
            //create unique file name
            const imageRef=ref(
                storage,
                `repair-images/${Date.now()}-${image.name}`
            );
            //upload image...........
            await uploadBytes(imageRef, image);

            //get public url
            const downloadURL= await getDownloadURL(imageRef);

            console.log(downloadURL);
            // through axios we send this url to backend
            const res= await axios.post("http://localhost:5000/api/ai/analyze",
                {
                    userId:user?.uid,
                    imageUrl:downloadURL,

                }
            );
            setResult(res.data);

            console.log(res.data);

            alert("Image uploaded successfully.");
        }catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div className="min-h-screen bg-[#212121] flex items-center flex-col justify-center px-4">

            <div className="w-full max-w-3xl">
                <h1 className={`text-4xl font-semibold text-shadow-white text-center mb-6`}>Lazy-AI-Repairing</h1>
                {/* Heading */}
                <h2 className="text-3xl font-semibold text-white text-center mb-8">
                    Upload Repair Request
                </h2>


                <div className="bg-[#2f2f2f] border border-[#444] rounded-3xl p-4 shadow-xl">
                    {/* Upload Box */}
                    <label
                        htmlFor="fileUpload"
                        className="
                    flex flex-col items-center justify-center
                    w-full h-25
                    border-2 border-dashed border-gray-300
                    rounded-2xl
                    cursor-pointer
                    hover:border-blue-500
                    hover:bg-gray-200
                    transition
                "
                    >
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />

                        <p className="text-lg font-medium text-gray-700">
                            Upload Repair Image
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                            Click to browse files
                        </p>
                    </label>

                    {/* Hidden Input */}
                    <input
                        id="fileUpload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setImage(e.target.files[0]);
                            }
                        }}
                        className="hidden"
                    />

                    {/* File Name */}
                    {image && (
                        <p className="text-sm text-green-600 mt-3 mb-2">
                            Selected: {image.name}
                        </p>
                    )}

                    {/* Image Preview */}
                    {image && (
                        <div className="mt-2 flex justify-start">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className="w-20 h-20 object-cover rounded-xl shadow-md"
                            />
                        </div>
                    )}

                    {/* Bottom Section */}
                    <div className="flex items-center justify-end mt-4">

                        <button
                            onClick={handleSubmit}
                            className="
                        bg-[#020121]
                        text-white
                        px-6
                        py-2.5
                        rounded-3xl
                        font-bold
                        hover:bg-gray-200
                        transition-all
                        duration-200
                    "
                        >
                            {loading? "Uploading..." : "Submit"}
                        </button>

                    </div>
                </div>
            </div>

            {loading && (
                <p className="text-white mt-4">
                    AI is analyzing your device...
                </p>
            )}

            {
                result && (

                    <div className="mt-6 bg-[#2f2f2f] border border-[#444] rounded-3xl p-6 text-white">


                        <h2 className="text-2xl font-semibold mb-4">
                            AI Repair Analysis
                        </h2>

                        <p className="mb-3">
                        <span className="font-semibold">
                            Problem :
                        </span>

                            {" "}
                            {result.problemDescription}
                        </p>

                        <p className={`mt-4 `}>
                        <span className="font-semibold">
                            Suggested Fix:
                        </span>

                            {" "}
                            {result.suggestedFix}
                        </p>

                        <button
                            className="
                                    bg-[#020121]
                                    px-6
                                    py-2
                                    rounded-xl
                                    mt-4
                                    "
                            onClick={()=>router.push("/technicians")}

                        >
                            FInd Repair Experts
                        </button>
                    </div>
                )


            }



        </div>



        </>




    )
}