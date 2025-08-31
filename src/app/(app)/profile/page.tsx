import ProfileSettings from "@/components/page-components/profile-settings"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Profile"
    }
}

export default async function ProfilePage() {
    // await new Promise((resolve) => setTimeout(resolve, 4000))

    return (
        <ProfileSettings />
    )
}