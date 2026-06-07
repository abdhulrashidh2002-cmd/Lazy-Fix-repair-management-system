import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserLayout({
    children,
}:{
    children:React.ReactNode;
}){
return (
    <ProtectedRoute allowedRole="user">
    <DashboardLayout title={"User Dashboard"} items={
        [
            {
                label:"Home",
                href: "/dashboard/home",
            },
            {
                label:"Get Ai Assistance",
                href:"/dashboard/upload"
            },

            {
                label:"Explore Bookings",
                href:"/dashboard/my-booking"
            },
            {
                label:"Find Technicians",
                href:"/dashboard/technicians"
            },
            {
                label:"Register as Technician",
                href:"/dashboard/become-technician"
            },
            {
                label:"AI Suggestions",
                href:"/dashboard/history"
            },

        ]
    }>
        {children}


    </DashboardLayout>

    </ProtectedRoute>
)
}