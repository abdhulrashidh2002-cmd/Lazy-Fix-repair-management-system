"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Signup} from "@/services/authService";
import axios from "axios";

const SignupPage: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role,setRole]=useState("user");

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // this will create email and password in firebase
            const userCred = await Signup(email, password);

            //but I need to get some values on backend to store in mongodb too right so here we use axios

            await axios.post("http://localhost:5000/api/users/register",{
                firebaseUserId: userCred.user.uid,
                name: name,
                email:userCred.user.email,
                role,
            });

            alert("User registered successfully!");
        }catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-center text-black mb-6">
                    Signup
                </h1>

                <form onSubmit={handleSignup} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-blue-950">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-blue-950">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-blue-950">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>



                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                        Signup
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm mt-6 text-green-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;