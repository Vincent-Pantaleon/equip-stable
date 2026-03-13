'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Layers, FolderOpen, MapPinned, Users, House, 
    Layers2, Building, ChevronsRight, ChevronsLeft, 
    SquareUser, CheckCircle2 
} from "lucide-react"
import { useInfo } from "@/utils/hooks/user-context"
import { formatLabel } from "@/utils/handlers/capitalize"

const NavbarItems = [
    { label: "Bookings", href: '/admin/bookings', icon: Layers2 },
    { label: "Borrow Form", href: '/admin/borrow-form', icon: Layers},
    { label: "Inventory", href: '/admin/inventory', icon: FolderOpen },
    { label: "Venues", href: '/admin/venues', icon: MapPinned },
    { label: "Profiles", href: '/admin/profile-list', icon: Users },
    { label: "Offices", href: '/admin/offices', icon: Building },
    { label: "Return to Home", href: '/recents', icon: House }
]

const DashboardNavbar = () => {
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(true)
    const currentRoute = usePathname()
    const userInfo = useInfo()

    return (
        <div 
            // 1. Sidebar width animation

            className="h-full flex flex-col bg-blue-900 text-white p-2 items-center overflow-hidden"
        >          
            <div className={`flex w-full p-2 ${isMenuVisible ? "justify-end" : "justify-center"}`}>
                <button
                    onClick={() => setIsMenuVisible(prev => !prev)}
                    className="w-fit hover:cursor-pointer p-1"
                >
                    {/* 2. Spinning Toggle Animation */}
                    <div className={`transition-transform ${isMenuVisible ? "rotate-0" : "rotate-180"}`}>
                        {isMenuVisible ? <ChevronsLeft/> : <ChevronsLeft/>}
                    </div>
                </button>
            </div>

            {/* Logo and Header Fading */}
            {isMenuVisible && (
                <div 
                    className="flex flex-col w-full items-center justify-center mb-4"
                >
                    <Image src={'/urios_logo.png'} alt="FSUU logo" height={80} width={80} style={{ width: 'auto', height: 'auto' }}/>
                    <p className="text-center text-lg font-medium whitespace-nowrap">Admin Dashboard</p>
                </div>
            )}

            
    

            <div className={`flex flex-col space-y-1 justify-center h-full gap-y-1 w-full overflow-y-auto overflow-x-hidden ${isMenuVisible ? "justify-start" : "justify-center"} scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-900/50 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-blue-900 [&::-webkit-scrollbar-thumb]:bg-blue-700 [&::-webkit-scrollbar-thumb]:rounded-full`}>
                <div className="my-auto flex flex-col gap-y-1 w-full">
                    {NavbarItems.map((item, index) => {
                        const isActive = currentRoute.startsWith(item.href)

                        if (item.label === "Releases") {
                            return null;
                        }

                        if (userInfo?.role !== 'superadmin' && (item.label === "Offices" || item.label === "Profiles" || item.label === 'Borrow Form')) {
                            return null;
                        }

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`
                                    p-3 rounded-lg flex items-center gap-4 transition-colors button-animation
                                    ${isActive ? 'text-blue-400 border-r-2 border-blue-400 bg-white/5' : 'hover:bg-white/10'}
                                `}
                            >
                                <item.icon className="shrink-0" />
                                
                                {/* 3. Label Fade Animation */}
                                <div className={`transition-opacity duration-300 ${isMenuVisible ? "opacity-100" : "opacity-0"}`}>
                                    {isMenuVisible && (
                                        <span
                                            className="whitespace-nowrap font-medium"
                                        >
                                            {item.label}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* User Profile Fading Section */}
            <div className="w-full mt-auto p-2">
                <div className="flex flex-col items-center justify-center text-center border-t border-white/20 pt-4 ">
                    <SquareUser height={25} width={25} className="mb-2"/>
                    
                    <div>
                        {isMenuVisible && (
                            <div
                                // initial={{ opacity: 0, height: 0 }}
                                // animate={{ opacity: 1, height: "auto" }}
                                // exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="font-semibold">
                                    {`${userInfo?.first_name} ${userInfo?.last_name}`}
                                </div>
                                <div className="text-gray-400 text-sm space-y-1 mt-1">
                                    <p className="truncate px-2">{userInfo?.email}</p>
                                    <p className="uppercase text-[10px] tracking-wider font-bold text-blue-300">{userInfo?.role}</p>
                                    <p>{formatLabel(userInfo?.office_name as string) ?? "No Office"}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { DashboardNavbar }