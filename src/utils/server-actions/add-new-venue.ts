'use server'

import { createClient } from "../supabase/server"
import { GetUserInfo } from "../data/decode"
import { formatSpaceToUnderscore } from "../handlers/capitalize"

const AddNewVenue = async (formData: FormData) => {
    const supabase = await createClient()

    const user = await GetUserInfo()

    const data = {
        venue_type: formData.get('type'),
        venue_name: formData.get('reference'),
        office_id: user?.role === 'superadmin' ? formData.get('office_id') : user?.office_id
    }

    const { error } = await supabase
    .from('venue')
    .insert({
        venue_type: data.venue_type,
        venue_name: formatSpaceToUnderscore(data.venue_name as string),
        office_id: data.office_id
    })

    if (error) {
        return { status: false, message: "Error creating new venue" }
    }

    return { status: true, message: "Successfully added new venue" }
}

export { AddNewVenue }