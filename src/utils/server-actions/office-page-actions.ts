'use server'

import { formatLabel, formatSpaceToUnderscore } from "../handlers/capitalize"
import { createClient } from "../supabase/server"


const GetOfficeList = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('offices')
    .select(`
        id,
        office_name, 
        created_at, 
        office_assignment (
            profile:profile_id (
                id,
                first_name, 
                last_name
            )
        )
    `)
    .order('created_at', { ascending: false })


    if (error) {
        return { status: false, message: "Failed fetching office list" }
    }

    const normalizedOffices = data?.map(office => {
        // 1. Grab the first assignment record
        const assignment = office.office_assignment?.[0];
        
        // 2. Extract the profile (Supabase usually returns this as a single object 
        // if it's a direct foreign key link, but sometimes it's an array)
        const profile = Array.isArray(assignment?.profile) 
            ? assignment?.profile[0] 
            : assignment?.profile;

        return {
            id: office.id,
            name: office.office_name,
            created_at: office.created_at,
            assigned_to: profile 
                ? `${profile.first_name} ${profile.last_name}` 
                : 'Unassigned',
            assigned_to_id: profile ? profile.id : null,
        };
    });

    return { status: true, message: "Fetched office list successfully", data: normalizedOffices }
}

const GetOfficeNames = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase.
    from('offices')
    .select('office_name, id')

    if (error) {
        return { status: false, message: "Failed fetching office list" }
    }

    const normalized =
        data?.map((item) => ({
        label: formatLabel(item.office_name),
        value: item.id,
    })) ?? []

    return {
        status: true,
        message: "Fetched office list successfully",
        data: normalized,
    }
}

const AddNewOffice = async (formData: FormData) => {
    const supabase = await createClient()

    const officeName = formData.get('office') as string
    const profileId = formData.get('in_charge') as string | null

    if (!officeName || !profileId) {
        return { status: false, message: "Missing required fields" }
    }

    // 2️⃣ Insert office AND get ID immediately
    const { data: office, error: officeError } = await supabase
        .from('offices')
        .insert({
            office_name: formatSpaceToUnderscore(officeName),
        })
        .select('id')
        .single()

    if (officeError) {
        console.error(officeError)
        return { status: false, message: "Failed to create office" }
    }

    return { status: true, message: "Successfully added new office" }
}


export { GetOfficeList, GetOfficeNames, AddNewOffice }