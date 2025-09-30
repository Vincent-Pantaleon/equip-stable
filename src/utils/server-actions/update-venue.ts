'use server'

import { Capitalize,LowercaseAll } from "../handlers/capitalize"
import { createClient } from "../supabase/server"

const GetTypes = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('venue_type')
    .select('id, name')

    if (error) {
        return { status: false, message: "Error fetching types" }
    }

    const normalizedData = data.map((item) => (
        { value: item.id, label: Capitalize(item.name) }
    ))

    return { status: true, message: "Types fetched successfully", data: normalizedData }
}

const UpdateVenue = async (formData: FormData, id: number) => {
    const supabase = await createClient()

    const data = {
        reference: formData.get("reference") as string,
        status: formData.get('status') as string,
    }
    
    const { error } = await supabase
    .from('venue')
    .update({
        reference: data.reference,
        status: data.status
    })
    .eq('id', id)

    if (error) {
        console.log(error)
        return { status: false, message: "Error updating venue" }
    }

    return { status: true, message: "Venue Update Successful"}
}

const UpdateVenueType = async (formData: FormData, id: number) => {
    const supabase = await createClient()

    const data = {
        name: formData.get('name'),
        total_count: formData.get('total_count'),
        total_capacity: formData.get('total_capacity'),
        is_public: formData.get('is_public')
    }
    
    const { error } = await supabase
    .from('venue_type')
    .update({
        'name': data.name,
        'total_count': data.total_count,
        'total_capacity': data.total_capacity,
        'is_public': data.is_public
    })
    .eq('id', id)

    if (error) {
        console.log(error)
        return { status: false, message: "Error updating venue" }
    }

    return { status: true, message: "Venue Update Successful"}
}

export { UpdateVenue, GetTypes, UpdateVenueType }