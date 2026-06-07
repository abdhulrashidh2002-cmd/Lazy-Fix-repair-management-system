"use client"
import axios from "axios"
import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";

interface AiProp{
    _id:string;
    userId:string;
    imageUrl:string;
    problemDescription:string;
    suggestedFix:string;
}


export default function HistoryPage() {
    const [airesults, setAiresults] = useState<AiProp[]>([]);
    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    const [selectedAi,setSelectedAi] = useState<AiProp | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/ai/${user?.uid}`);
                setAiresults(res.data);
            } catch (err) {
                console.log(err)
            }
        }

        if (user?.uid) {
            fetchData();
        }
    }, [user]);

    if (loading) return (
        <h1>Loading...........</h1>
    )
    return (
        <div>
            {airesults.length === 0 ? (
                <div className="

                    text-gray-400
                    mt-20
                    items-start
                    justify-start
                    h-96
                ">
                    <h2 className="text-2xl font-semibold text-white">
                        📦 No Ai Analysis was found
                    </h2>

                    <p className="mt-2">
                        You don’t have any Ai Analysing right now.
                    </p>

                </div>
            ) : (
                airesults.map((ai:AiProp) => (
                   <div
                       key={ai._id}
                       onClick={()=>setSelectedAi(ai)}
                       className="
                       cursor-pointer
                       bg-[#2f2f2f]
                       border border-[#3d3d3d]
                       rounded-2xl
                       p-4
                       hover:bg-[#353535]
                       transition
                       flex gap-4
                       ">

                       {/* Small Image */}
                       <img
                           src={ai.imageUrl}
                           className="w-20 h-20 object-cover rounded-lg"
                       />

                       {/* Preview text */}
                       <div className="flex-1">
                           <p className="text-white font-semibold">
                               {ai.problemDescription.slice(0, 60)}...
                           </p>

                           <p className="text-gray-400 text-sm mt-1">
                               Click to view full analysis
                           </p>
                       </div>
                   </div>
                ))


            )}
            {selectedAi && (
                <div className="inset-0 bg-black/70 flex items-center justify-center p-6">

                    <div className="bg-[#1f1f1f] max-w-2xl w-full rounded-2xl p-6 relative">


                        <button
                            onClick={() => setSelectedAi(null)}
                            className="absolute top-3 right-3 text-red-600 text-2xl font-bold
                            hover:cursor-pointer focus:outline-none"
                        >
                            ✕
                        </button>

                        <img
                            src={selectedAi.imageUrl}
                            className="w-60 h-60 object-cover rounded-2xl mb-3"
                        />

                        <h2 className="text-gray-400 text-sm">Problem Description</h2>
                        <p className="text-white mb-4">
                            {selectedAi.problemDescription}
                        </p>

                        <h2 className="text-gray-400 text-sm">Suggested Fix</h2>
                        <p className="text-green-400">
                            {selectedAi.suggestedFix}
                        </p>

                        <button
                            onClick={()=>setSelectedAi(null)}
                            className="
                            bg-red-600
                            text-white
                            px-4
                            py-2
                            mt-3
                            rounded-3xl
                            font-bold
                            hover:bg-blue-950 hover:text-white focus:outline-none
                            hover:cursor-pointer
                          ">
                            Close The Preview
                        </button>

                    </div>

                </div>
            )}
        </div>
    );


}

