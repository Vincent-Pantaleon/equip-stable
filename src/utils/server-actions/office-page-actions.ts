'use server'

import { formatLabel, formatSpaceToUnderscore } from "../handlers/capitalize"
import { createClient } from "../supabase/server"


const GetOfficeList = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('offices')
    .select('id, office_name, created_at, profile: profile(id, first_name, last_name)')

    if (error) {
        console.log(error)
        return { status: false, message: "Failed fetching office list" }
    }

    const normalizedData = data.map((office) => ({
        id: office.id,
        office_name: office.office_name,
        created_at: office.created_at,
        profile: office.profile.length > 0
        ? office.profile[0]
        : null
    }))

    return { status: true, message: "Fetched office list successfully", data: normalizedData }
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
    const profileId = formData.get('in_charge') as string

    if (!officeName || !profileId) {
        return { status: false, message: "Missing required fields" }
    }

    // 1️⃣ Validate profile exists
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', profileId)
        .single()

    if (profileError) {
        return { status: false, message: "Profile does not exist" }
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

    // 3️⃣ Create junction row
    const { error: inChargeError } = await supabase
        .from('in_charge')
        .insert({
        office_id: office.id,
        profile_id: profileId,
        })

    if (inChargeError) {
        console.error(inChargeError)
        return { status: false, message: "Failed to assign in charge" }
    }

    return { status: true, message: "Successfully added new office" }
}


export { GetOfficeList, GetOfficeNames, AddNewOffice }