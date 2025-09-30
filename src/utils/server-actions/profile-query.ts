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

const  GetUsersList = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('profiles')
    .select('*, office: office_assigned(office)')

    if (error) {
        return { status: false, message: "Error fetching profiles list"}
    }

    return { status: true, message: "Profiles fetched successfully", data: data}
}

const GetAdministratorsList = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'administrator')


    if (error) {
        return { status: false, message: "Error fetching administrator list"}
    }

    const admins: OptionType[] = data.map((admin) => ({
        kind: "admin",
        id: admin.id,
        name: `${admin.first_name} ${admin.last_name}`,
        label: `${admin.first_name} ${admin.last_name}`, // shown to user
        value: admin.id, // used in the select
    }));


    return { status: true, data: admins}
}

export { GetUserProfile, GetUsersList, GetAdministratorsList }