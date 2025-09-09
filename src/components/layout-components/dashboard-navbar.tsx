'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    LayoutDashboard,
    Layers,
    FolderOpen,
    MapPinned,
    Users,
    House,
    Layers2,
    Building
} from "lucide-react"
import { useInfo } from "@/utils/hooks/user-context"

const NavbarItems = [
    { label: "Dashboard", href: '/admin/dashboard', icon: LayoutDashboard },
    { label: "Borrow Form", href: '/admin/borrow-form', icon: Layers},
    { label: "Inventory", href: '/admin/inventory', icon: FolderOpen },
    { label: "Venues", href: '/admin/venues', icon: MapPinned },
    { label: "Profiles", href: '/admin/profile-list', icon: Users },
    { label: "Requests", href: '/admin/requests-list', icon: Layers2 },
    { label: "Offices", href: '/admin/offices', icon: Building },
    { label: "Return to Home", href: '/recents', icon: House }
]

const DashboardNavbar = () => {
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(true)
    const currentRoute = usePathname()
    
    return (
        <div>
            <button
                type="button"
                className="hover:cursor-pointer p-2 mb-2"
                onClick={() => setIsMenuVisible(prev => !prev)}
            >
                {isMenuVisible ? "Hide" : "Show"}
            </button>

            <AnimatePresence>
                <motion.div
                    key="navbar"
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col p-4 w-full"
                >
                    <motion.div
                        key="navbar"
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -200 }}
                        transition={{ duration: 0.3 }}
                        className="h-40"
                    >
                        <div className={isMenuVisible ? "flex flex-col items-center" : "hidden"}>
                            <Image src={'/urios_logo.png'} alt="FSUU logo" width={150} height={150}/>
                            <p className="text-center text-lg font-bold">Admin Dashboard</p>
                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-y-1 mt-10">
                        {NavbarItems.map((item, index) => {
                            const isActive = currentRoute.startsWith(item.href)

                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`button-animation hover:bg-form-input-color p-3 rounded-2xl flex items-center gap-2 ${
                                        isActive ? 'bg-hover-color' : ''
                                    }`}
                                >
                                    <item.icon />
                                    {isMenuVisible ? item.label : ''}
                                </Link>
                            )
                        })}
                    </div>
                    
                </motion.div>
            </AnimatePresence>

            <div className={isMenuVisible ? "block": "hidden"}>
                {useInfo()?.role}
            </div>
        </div>
    )
}

export { DashboardNavbar }
