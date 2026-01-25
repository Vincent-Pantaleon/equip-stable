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
    .select(`
        id,
        first_name,
        last_name,
        email,
        school_id,
        role,
        office: office_id(
            office_name
        )
    `)

    if (error) {
        console.log(error)
        return { status: false, message: "Error fetching profiles list"}
    }

    const normalizedData = (data ?? []).map((user) => {
        const office = Array.isArray(user.office)
            ? user.office[0]
            : user.office

        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            school_id: user.school_id,
            office: {
                office_name: office?.office_name ?? null,
            }
        }
    })

    return { status: true, message: "Profiles fetched successfully", data: normalizedData}
}

const GetAdministratorsList = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .in('role', ['administrator', 'superadmin'])


    if (error) {
        return { status: false, message: "Error fetching administrator list"}
    }

    const admins: OptionType[] = data.map((admin) => ({
        label: `${admin.first_name} ${admin.last_name}`, // shown to user
        value: admin.id, // used in the select
    }));


    return { status: true, data: admins}
}

export { GetUserProfile, GetUsersList, GetAdministratorsList }