import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({
                                       children,
                                   }:{
    children:React.ReactNode;
}){
    return (
        <ProtectedRoute allowedRole="admin">
            <DashboardLayout title={"Admin Dashboard"} items={
                [
                    {
                        label:"Overview",
                        href:"/admin-dashboard/overview",
                    },
                    {
                        label:"Technicians Applications",
                        href:"/admin-dashboard/approve-technician",
                    },
                    {
                        label:"View Technicians",
                        href:"/admin-dashboard/technicians",
                    },



                ]
            }>
                {children}

            </DashboardLayout>

        </ProtectedRoute>
    )
}