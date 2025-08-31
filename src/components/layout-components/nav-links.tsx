'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SquareActivity, Layers, Archive, CalendarDays, Mails, CircleUserRound, Menu, Users, LayoutDashboard, List } from "lucide-react"
import { useInfo } from "@/utils/hooks/user-context"

const list = [
  { href: "/recents", icon: SquareActivity, text: "Recents" },
  { href: "/borrow", icon: Layers, text: "Borrow" },
  { href: "/inventory", icon: Archive, text: "Inventory" },
  { href: "/schedule", icon: CalendarDays, text: "Schedule" },
  { href: "/messages", icon: Mails, text: "Messages" },
]

const adminList = [
    { href: "/profile-list", icon: Users, text: "Profile List" },
    { href: "/requests-list", icon: List, text: "Requests List" },
    { href: "/admin-dashboard/borrow-form", icon: LayoutDashboard, text: "Admin Dashboard" },
]

export default function NavLinks() {
    const currentRoute = usePathname()
    const userRole = useInfo()?.role || 'user'

    return (
        <div className="bg-white md:grow rounded-2xl flex p-4 md:p-5 md:justify-between md:flex-col text-xl overflow-auto">
            <div className="hidden md:flex items-center">
                <Menu className="mr-4"/>
                <p className="hidden md:inline mr-2">Menu</p>
            </div>

            <div className="grow flex max-md:justify-center sm:gap-x-3 sm:flex-col md:gap-y-4 md:mt-5 flex-wrap">
                {list.map((link, index) => {
                    const isActive = currentRoute === link.href

                    if (link.href === '/profile') {
                        return;
                    }

                    return (
                        <Link
                            key={index}
                            href={link.href}
                            className={`button-animation flex items-center gap-x-4 hover:bg-form-input-color p-3 rounded-2xl ${
                                isActive ? 'bg-hover-color' : ''
                            }`}
                        >
                            <link.icon />
                            <p className="hidden sm:block">{link.text}</p>
                        </Link>
                    )
                })}

                {(userRole === 'administrator' || userRole === 'moderator') && (
                    adminList.map((item, index) => {
                        const isActive = currentRoute.startsWith(item.href)
                       
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`button-animation flex items-center gap-x-4 hover:bg-form-input-color p-3 rounded-2xl ${
                                    isActive ? 'bg-hover-color' : ''
                                }`}
                            >
                                <item.icon />
                                <p className="hidden sm:block">{item.text}</p>
                            </Link>
                        )
                    })
                )}
            </div>
        </div>
    )
}