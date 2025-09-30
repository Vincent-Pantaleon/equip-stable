'use server'

import { createClient } from "../supabase/server"

const GetAdminVenues = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('venue')
    .select('*, type: venue_type(name)')

    if (error) {
        return { status: false, message: "Error fetching venues" }
    }

    return { status: true, message: "Venues fetched successfully", data: data }
}

const GetAdminTypeVenues = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('venue_type')
    .select('*')

    if (error) {
        return { status: false, message: "Error fetching venue types" }
    }

    return { status: true, message: "Venue Types fetched successfully", data: data }
}

export { GetAdminVenues, GetAdminTypeVenues }