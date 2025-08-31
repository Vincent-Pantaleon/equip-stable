import { ProfileListTable } from "@/components/page-components/profile-list"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Admin | Profile List"
    }
}

const ProfileList = () => {
    return (
        <ProfileListTable/>
    )
}

export default ProfileList