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
            office_members (
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
        const assigned_to = office.office_members
            ?.flatMap(member => {
                const profile = Array.isArray(member?.profile)
                    ? member.profile
                    : member?.profile ? [member.profile] : []
                return profile
            })
            .filter(Boolean)
            .map(p => ({
                id: p.id,
                name: `${p.first_name} ${p.last_name}`
            })) ?? []

        return {
            id: office.id,
            name: office.office_name,
            created_at: office.created_at,
            assigned_to
        }
    })

    return { status: true, message: "Fetched office list successfully", data: normalizedOffices }
}

// TODO: Change this Soon
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


export { GetOfficeList, AddNewOffice }