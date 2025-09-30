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
    Building,
    ChevronsRight,
    ChevronsLeft,
    SquareUser
} from "lucide-react"
import { useInfo } from "@/utils/hooks/user-context"

const NavbarItems = [
    { label: "Dashboard", href: '/admin/dashboard', icon: LayoutDashboard },
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
        <div className="h-full w-full flex flex-col bg-blue-900 text-white">          
            <div className={`flex  p-2 ${isMenuVisible ? "justify-end" : "justify-center"}`}>
                <button
                    onClick={() => setIsMenuVisible(prev => !prev)}
                    className="w-fit hover:cursor-pointer p-1"
                >
                    <div>
                        {isMenuVisible ? <ChevronsLeft/> : <ChevronsRight/>}
                    </div>
                </button>
            </div>

            <AnimatePresence>
                <motion.div
                    key="navbar"
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col p-4 w-full"
                >

                    <div className="h-40">
                        <div className={isMenuVisible ? "flex flex-col items-center" : "hidden"}>
                            <div>
                                <Image src={'/urios_logo.png'} alt="FSUU logo" height={100} width={100} style={{ width: 'auto', height: 'auto' }}/>
                            </div>
                            
                            <p className="text-center text-lg font-medium">Admin Dashboard</p>
                        </div>
                    </div>
                    


                    <div className="flex flex-col gap-y-1 mt-3">
                        {NavbarItems.map((item, index) => {
                            const isActive = currentRoute.startsWith(item.href)

                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`
                                        button-animation p-3 rounded-lg flex items-center gap-2 
                                        ${isActive ? 'text-blue-400 border-r-2 border-blue-400' : ''}
                                    `}
                                >
                                    <item.icon />
                                    {isMenuVisible ? item.label : ''}
                                </Link>
                            )
                        })}
                    </div>
                    
                </motion.div>
            </AnimatePresence>

            <div className={isMenuVisible ? "block p-2 grow": "hidden"}>
                <div className="h-full flex flex-col gap-y-2 items-center justify-center text-center border-1 border-gray-400 rounded-md p-2">
                    <SquareUser height={35} width={35}/>
                    
                    <div>
                        {`${userInfo?.first_name} ${userInfo?.last_name}`}
                    </div>

                    <div className="text-gray-400">
                        <p>{userInfo?.email}</p>
                        <p>{userInfo?.role}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export { DashboardNavbar }
