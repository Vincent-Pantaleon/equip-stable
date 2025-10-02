'use server'

import { createClient } from "../supabase/server"
import { formatSpaceToUnderscore } from "../handlers/capitalize"

const AddNewVenueType = async (formData: FormData) => {
    const supabase = await createClient()
    
    const data = {
        name: formData.get('name'),
        total_count: Number(formData.get('total_count')) ,
        total_capacity: Number(formData.get('total_capacity')),
    }

    const { error } = await supabase
    .from('venue_type')
    .insert({
        'name': formatSpaceToUnderscore(data.name as string),
        'total_capacity': data.total_capacity,
        'total_count': data.total_count,
        'available_count': data.total_count
    })

    if (error) {
        return { status: false, message: "Error inserting new venue type" }
    }

    return { status: true, message: "Venue type added successfully" }
} 



export { AddNewVenueType }