'use server'

import { Capitalize,formatLabel,LowercaseAll } from "../handlers/capitalize"
import { createClient } from "../supabase/server"

const GetTypes = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('venue_type')
    .select('id, venue_name')

    if (error) {
        return { status: false, message: "Error fetching types" }
    }

    const normalizedData = data.map((item) => (
        { value: item.id, label: formatLabel(item.venue_name) }
    ))

    return { status: true, message: "Types fetched successfully", data: normalizedData }
}

const UpdateVenue = async (formData: FormData, id: string) => {
    const supabase = await createClient()

    const data = {
        venue_name: formData.get("reference") as string,
        status: formData.get('status') as string,
    }
    
    const { error } = await supabase
    .from('venue')
    .update({
        venue_name: data.venue_name,
        status: data.status
    })
    .eq('id', id)

    if (error) {
        return { status: false, message: "Error updating venue" }
    }

    return { status: true, message: "Venue Update Successful"}
}

const UpdateVenueType = async (formData: FormData, id: string) => {
    const supabase = await createClient()

    const data = {
        venue_name: formData.get('name'),
        total_capacity: formData.get('total_capacity'),
        is_public: formData.get('is_public')
    }
    
    const { error } = await supabase
    .from('venue_type')
    .update({
        'venue_name': data.venue_name,
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