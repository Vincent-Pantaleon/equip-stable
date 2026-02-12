'use server'

import { createClient } from "../supabase/server"
import { formatSpaceToUnderscore } from "../handlers/capitalize"
import { GetUserInfo } from "../data/decode"

const AddNewVenueType = async (formData: FormData) => {
    const supabase = await createClient()
    
    const user = await GetUserInfo()

    const data = {
        venue_name: formData.get('name'),
        total_capacity: Number(formData.get('total_capacity')),
        office_id: user?.role === 'superadmin' ? formData.get('office_id') : user?.office_id
    }

    const { error } = await supabase
    .from('venue_type')
    .insert({
        venue_name: formatSpaceToUnderscore(data.venue_name as string),
        total_capacity: data.total_capacity,
        office_id: data.office_id,
    })

    if (error) {
        return { status: false, message: "Error inserting new venue type" }
    }

    return { status: true, message: "Venue type added successfully" }
} 



export { AddNewVenueType }