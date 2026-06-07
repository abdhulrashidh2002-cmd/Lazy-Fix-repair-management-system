import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function TechnicianLayout({
                                       children,
                                   }:{
    children:React.ReactNode;
}){
    return (
        <ProtectedRoute allowedRole="technician">
            <DashboardLayout title={"Technician Dashboard"} items={
                [
                    {
                        label:"🏠 Overview",
                        href:"/technician-dashboard/home",
                    },
                    {
                        label:"📋 Assigned Jobs",
                        href:"/technician-dashboard/assigned-jobs",
                    },
                    {
                        label:"⭐ Customer Reviews",
                        href:"/technician-dashboard/reviews",
                    },


                ]
            }>
                {children}

            </DashboardLayout>

        </ProtectedRoute>
    )
}