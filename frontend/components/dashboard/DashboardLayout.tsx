"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";


interface Props {
    children: ReactNode;
    title: string;
    items: {
        label: string;
        href: string;
    }[];
}

export default function DashboardLayout({
 children,
 title,
 items,
}: Props) {
    return (
        <>
        <div className="flex">
            <Sidebar
                title={title}
                items={items}
            />
            <main className="flex-1 bg-[#212121] min-h-screen p-8">
                {children}

            </main>

        </div>
        </>

    );
}