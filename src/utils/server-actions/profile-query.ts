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
            offices: offices (
                office_name
            )
        ),
        role_data: role_assignment (role)
    `)

    if (error) {
        console.error("Supabase Error:", error);
        return { status: false, message: "Error fetching profiles list" }
    }

    const normalizedData = (data ?? []).map((user) => {
        const role = user.role_data?.[0]?.role ?? 'user';

        const officeName =
            user.office?.offices?.office_name ?? 'No Office Assignment';

        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            school_id: user.school_id,
            role,
            office: {
            office_name: officeName,
            },
        };
    });

    return { status: true, message: "Profiles fetched successfully", data: normalizedData }
}

const GetAdministratorsList = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('profiles')
    .select(`
        id,
        first_name,
        last_name,
        role_assignment!inner (
            role
        )
    `)
    // Filter the inner join to only include specific roles
    .in('role_assignment.role', ['administrator', 'superadmin'])

    if (error) {
        console.error("Supabase Error:", error);
        return { status: false, message: "Error fetching administrator list"}
    }

    const admins: OptionType[] = [
        { label: "None", value: null },
        ...(data ?? []).map((profile: any) => ({
            label: `${profile.first_name} ${profile.last_name}`.trim() || "Unknown User",
            value: profile.id,
        })),
    ];

    return { status: true, data: admins }
}

export { GetUserProfile, GetUsersList, GetAdministratorsList }