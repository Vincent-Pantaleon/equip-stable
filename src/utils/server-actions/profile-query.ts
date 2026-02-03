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

    const { data, error } = await supabase
    .from('profiles')
    .select(`
        id,
        first_name,
        last_name,
        email,
        school_id,
        office: office_assignment (
            role,
            offices: offices!office_assignment_office_id_fkey (
            office_name
            )
        )
    `)


    if (error) {
        console.error("Supabase Error:", error);
        return { status: false, message: "Error fetching profiles list" }
    }

    const normalizedData = (data ?? []).map((user) => {
        // office_assignments will be an array because one user could have multiple roles
        // We grab the first one (index 0) if it exists.
        const assignment = user.office?.[0] || null;

        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            school_id: user.school_id,
            // If they have an assignment, use that role; otherwise, they are a 'user'
            role: assignment?.role ?? 'user',
            office: {
                office_name: assignment?.offices?.office_name ?? 'No Office Assignment',
            }
        }
    })

    return { status: true, message: "Profiles fetched successfully", data: normalizedData }
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