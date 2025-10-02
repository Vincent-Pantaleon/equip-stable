'use server'

import { createClient } from "../supabase/server"

const GetOfficeList = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('office')
    .select('*, in_charge: in_charge(first_name, last_name, id)')

    if (error) {
        return { status: false, message: "Failed fetching office list" }
    }

    return { status: true, message: "Fetched office list successfully", data: data }
}

const GetOfficeNames = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase.
    from('office')
    .select('office, id')

    if (error) {
        return { status: false, message: "Failed fetching office list" }
    }

    const normalized =
        data?.map((item) => ({
        label: item.office,
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

    const data = {
        office: formData.get('office') as string,
        id: formData.get('in_charge') as string,
    }

    // logic to find if in_charge is valid or not
    const { error: profileError } = await supabase 
    .from('profiles')
    .select('id')
    .eq('id', data.id)

    if (profileError) {
        return { status: false, message: "Profile does not exist" }
    }

    const { error: insertError } = await supabase
    .from('office')
    .insert([
        { 
            office: data.office, 
            in_charge: data.id
        }
    ])

    if (insertError) {
        return { status: false, message: "Failed adding new office" }
    }

    return { status: true, message: "Successfully added new office"}
}

export { GetOfficeList, GetOfficeNames, AddNewOffice }