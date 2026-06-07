"use client"

import {
    ReactNode,
    useEffect} from "react";
import {
    useRouter} from "next/navigation";
import {
    useAuth
} from "@/context/AuthContext";

interface Props{
    children: ReactNode;
    allowedRole:string;
}
export default function ProtectedRoute({
    children,
    allowedRole,}:Props)
{
const {user,dbuser,loading} = useAuth();
const router = useRouter();
    useEffect(() => {

        if (loading) return;

        // not logged in
        if (!user) {
            router.push("/login");
            return;
        }

        // wait for dbuser
        if (!dbuser) return;

        // wrong role
        if (dbuser.role !== allowedRole) {

            router.push("/");
        }

    }, [
        user,
        dbuser,
        loading,
        router,
        allowedRole
    ]);

    if ( loading || !user || dbuser?.role !== allowedRole)
    {
        return (

            <h1 className="
            text-white
            p-10
            ">
                Loading...
            </h1>
        );
    }

    return children;
}