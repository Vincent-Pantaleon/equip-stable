'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const NavbarItems = [
    { label: "Borrow", href: '/admin/admin-dashboard/borrow-form'},
    { label: "Inventory", href: '/admin/admin-dashboard/inventory' }
]

const DashboardNavbar = () => {
    const currentRoute = usePathname()
    
    return (
        <div className="flex justify-evenly border-b-2">
            {NavbarItems.map((item, index) => {
                const isActive = currentRoute.startsWith(item.href)

                return (
                    <Link
                        key={index}
                        href={item.href}
                        className={`hover:border-b-4 hover:border-b-form-input-color p-3 ${isActive ? 'border-b-4 border-b-hover-color' : ''}`}
                    >
                        {item.label}
                    </Link>
                )
            })}
        </div>
    )
}

export { DashboardNavbar }