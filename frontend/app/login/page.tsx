"use client"
import React, {useState} from "react";
import Link from "next/link";
import {login} from "@/services/authService";
import {useRouter} from "next/navigation";

const Login: React.FC=()=>{
    const router= useRouter();
    const [email,setEmail]=useState<string>('');
    const [password,setPassword] = useState<string>('');

    const handleLogin =async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

            try {
                await login(email,password);
                alert ("login successful");
                router.push("/dashboard");
            }catch (e) {
                console.log("error come from login ui");
            }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl  shadow-lg ">
                <h1 className="text-3xl font-bold text-center mb-6 text-black leading-tight">
                    Login
                </h1>

                <form onSubmit={handleLogin} className="space-y-5 text-blue-950">
                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-bold">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-2 text-sm font-bold">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm mt-6 text-red-600">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Login;