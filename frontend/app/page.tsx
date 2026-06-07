"use client"
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Dashboard() {

  const { dbuser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (loading || !dbuser) return;

    if (dbuser.role === "admin") {
      router.replace("/admin-dashboard");
    }

    else if (dbuser.role === "technician") {
      router.replace("/technician-dashboard");
    }

    else {
      router.replace("/dashboard/home");
    }

  }, [dbuser, loading, router]);


}