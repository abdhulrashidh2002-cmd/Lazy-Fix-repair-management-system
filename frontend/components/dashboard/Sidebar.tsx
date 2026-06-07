"use client";

import Link from "next/link";
import { logOut } from "@/services/authService";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarItem {
    label: string;
    href: string;
}

interface SidebarProps {
    title: string;
    items: SidebarItem[];
}

export default function Sidebar({
                                    title,
                                    items,
                                }: SidebarProps) {

    const router = useRouter();
    const pathname = usePathname();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* MOBILE HAMBURGER BUTTON */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="
                    md:hidden
                    fixed
                    top-4
                    right-4
                    z-[60]

                    h-12
                    w-12

                    rounded-full
                    bg-[#090526]

                    text-white
                    text-xl

                    shadow-lg
                "
            >
                ☰
            </button>

            {/* OVERLAY */}
            {sidebarOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/60
                        z-40
                        md:hidden
                    "
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed md:static
                    top-0 left-0

                    h-auto
                    w-64

                    bg-[#090526]
                    border-r
                    border-white/10

                    shadow-2xl

                    z-50

                    transform
                    transition-transform
                    duration-300

                    ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }

                    md:translate-x-0
                `}
            >

                <div className="flex flex-col h-full p-6">

                    {/* MOBILE HEADER */}
                    <div className="flex justify-between items-center md:hidden mb-8">

                        <h2 className="text-white text-lg font-bold">
                            Menu
                        </h2>

                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="
                                text-white
                                text-2xl
                                hover:text-red-400
                                transition
                            "
                        >
                            ✕
                        </button>

                    </div>

                    {/* LOGO / TITLE */}
                    <h1 className="text-white text-2xl font-bold mb-8">
                        {title}
                    </h1>

                    {/* NAVIGATION */}
                    <nav className="flex flex-col gap-2">

                        {items.map((item) => (

                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={
                                    pathname === item.href
                                        ? `
                                            bg-indigo-600
                                            text-white
                                            font-semibold

                                            px-4
                                            py-3

                                            rounded-xl
                                        `
                                        : `
                                            text-gray-400

                                            px-4
                                            py-3

                                            rounded-xl

                                            hover:bg-white/5
                                            hover:text-white

                                            transition
                                        `
                                }
                            >
                                {item.label}
                            </Link>

                        ))}

                    </nav>



                    {/* LOGOUT BUTTON AT BOTTOM */}
                    <div className="mt-auto pt-6">

                        <button
                            onClick={async () => {
                                await logOut();
                                router.push("/login");
                            }}
                            className="
                                w-full

                                bg-red-600
                                text-white

                                py-3

                                rounded-xl
                                font-semibold

                                hover:bg-red-700

                                transition
                                cursor-pointer
                            "
                        >
                            Logout
                        </button>

                    </div>
                    <footer className="border-t border-gray-800 py-4 px-6">
                        <div className="flex flex-col justify-between text-sm text-gray-400">
                            <p>© 2026 Lazy Repair</p>
                            <div className="flex flex-row gap-4">
                                <span>Privacy</span>
                                <span>Terms</span>
                                <span>Support</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </aside>
        </>
    );
}