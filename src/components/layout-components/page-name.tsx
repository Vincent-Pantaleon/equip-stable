'use client'

import { usePathname } from "next/navigation"
import React from "react"

const list = [
  { href: "/recents", text: "Recents" },
  { href: "/borrow", text: "Borrow" },
  { href: "/inventory", text: "Inventory" },
  { href: "/schedule", text: "Schedule" },
  { href: "/messages", text: "Messages" },
  { href: "/messages/send-message", text: "Send a Message" },
  { href: "/profile", text: "Profile" },
  { href: "/admin/profile-list", text: "Profile List" },
  { href: "/admin/admin-dashboard", text: "Admin Dashboard" },
  { href: "/admin/requests-list", text: "Requests List" },
]


const PageName = () => {
    const pathname = usePathname()

    let pageTitle = "Unknown Page"
    if (pathname.startsWith("/admin/admin-dashboard")) {
        pageTitle = "Admin Dashboard"
    } else {
        const activeLink = list.find(link => link.href === pathname)
        if (activeLink) pageTitle = activeLink.text
    }
    
    return (
        <div className="bg-white w-full hidden sm:block rounded-2xl text-xl p-3">
            <h1>{pageTitle}</h1>
        </div>
    )
}

export default React.memo(PageName)