'use server'

import { createClient } from "../supabase/server"

type ReleaseProps = {
    is_returned: boolean
    id: string
}

const UpdateRelease = async ({ is_returned, id }: ReleaseProps) => {
    const supabase = await createClient()

    const { data: userData, error: userError } = await supabase.auth.getUser()
    const now = new Date()
    const time = now.toLocaleTimeString('en-GB', { hour12: false }) 

    if (userError || !userData.user) { 
        return { status: false, message: "Error user not found" }
    }

    const { error } = await supabase
    .from('releases')
    .update({
        accepted_by: userData.user.id,
        is_returned: is_returned,
        time_returned: time,
    })
    .eq('id', id)

    if (error) {
        console.log(error)
        return { status: false, message: "Error updating item" }
    }

    return { status : true, message: "Item returned successfully" }
}

export { UpdateRelease }