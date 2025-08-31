'use server'

import { createClient } from "../supabase/server"

const GetUserProfile = async () => {
    const supabase = await createClient()

    const userId = (await supabase.auth.getUser()).data.user?.id

    const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

    if (error) {
        return { status: false, message: "Error user not found" }
    }

    return { status: true, data: data }
}

const GetUsersList = async () => {
    const supabase = await createClient()

    const { data, error} = await supabase
    .from('profiles')
    .select('*')

    if (error) {
        return { status: false, message: "Error fetching profiles list"}
    }

    return { status: true, message: "Profiles fetched successfully", data: data}
}

export { GetUserProfile, GetUsersList }