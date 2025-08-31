'use client'

import Link from "next/link"
import { Capitalize } from "@/utils/handlers/capitalize"
import { useMemo } from "react"
import { useInfo } from "@/utils/hooks/user-context"
import { CircleUserRound } from "lucide-react"

export default function Profile() {
    const userInfo = useInfo()

    // Memoize derived value (formatted name)
    const displayName = useMemo(() => {
        if (!userInfo) return "User not Found"
        return `${Capitalize(userInfo.first_name ?? "")} ${Capitalize(userInfo.last_name ?? "")}`
    }, [userInfo])

    return (
        <Link 
        className="bg-white p-5 rounded-2xl max-md:justify-center button-animation hover:bg-form-input-color"
        href={'/profile'}
        >
            <div className="flex justify-center gap-2">
                <CircleUserRound />
                <p>{displayName}</p>
            </div>
        </Link>
    )
}
