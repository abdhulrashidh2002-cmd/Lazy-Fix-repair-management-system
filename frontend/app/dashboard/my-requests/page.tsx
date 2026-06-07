"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

interface RepairRequest {
    _id: string;
    imageUrl: string;
    status: string;
    problemDescription: string;
    suggestedFix: string;
}

export default function MyRequestPage() {

    const { user } = useAuth();

    const [request, setRequest] = useState<RepairRequest[]>([]);

    useEffect(() => {

        if (!user) return;

        const fetchRequests = async () => {

            try {

                const res = await axios.get(
                    `http://localhost:5000/api/repair/${user.uid}`
                );

                setRequest(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchRequests();

    }, [user]);

    return (

        <div>

            <h1>My Repair Requests</h1>

            {
                request.map((request) => (

                    <div
                        key={request._id}
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            marginBottom: "20px",
                        }}
                    >

                        <img
                            src={request.imageUrl}
                            width="200"
                            alt="Repair"
                        />

                        <p>
                            Status: {request.status}
                        </p>

                        <p>
                            Problem: {request.problemDescription}
                        </p>

                        <p>
                            Suggested Fix: {request.suggestedFix}
                        </p>

                    </div>
                ))
            }

        </div>
    );
}