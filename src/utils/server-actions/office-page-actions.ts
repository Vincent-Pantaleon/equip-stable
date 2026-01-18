'use server'

import { formatLabel, formatSpaceToUnderscore } from "../handlers/capitalize"
import { createClient } from "../supabase/server"


const GetOfficeList = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('offices')
    .select('id, office_name, created_at, profile: in_charge(first_name, last_name, id)')

    if (error) {
        console.log(error)
        return { status: false, message: "Failed fetching office list" }
    }

    const normalizedData = data.map(office => ({
        ...office,
        // Since profile comes back as an array, take the first element
        profile: Array.isArray(office.profile) ? office.profile[0] : office.profile
    }))

    console.log("Normalized Data: ", normalizedData)

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

    // 2️⃣ Insert office AND get ID immediately
    const { data: office, error: officeError } = await supabase
        .from('offices')
        .insert({
            office_name: formatSpaceToUnderscore(officeName),
            in_charge: profileId,
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