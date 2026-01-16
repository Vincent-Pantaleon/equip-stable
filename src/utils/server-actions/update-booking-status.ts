'use server'

import { createClient } from "../supabase/server"
import { GetUserInfo } from "../data/decode"

const UpdateStatus = async (id: string, status: string) => {
    const supabase = await createClient()

    const user = await GetUserInfo()

    if(user?.role === 'user') {
        return {status: false, message: "User role is not authorized"}
    }

    console.log(id)
    console.log(status)

    const { error } = await supabase
    .from('bookings')
    .update({ status: status })
    .eq('id', id)

    if (error) {
        return { status: false, message: "Error updating status" }
    }

    return { status: true, message: "Successfully updated status"}
}

export { UpdateStatus }