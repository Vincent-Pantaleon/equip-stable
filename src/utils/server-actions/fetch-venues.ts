'use server'

import { createClient } from "../supabase/server"
import { GetUserInfo } from "../data/decode"

const GetAdminVenues = async () => {
    const supabase = await createClient()

    const user = await GetUserInfo()

    let fetchError: any | null;
    let fetchData: any | null;

    if (user?.role === 'administrator' || user?.role === 'moderator') {
            const { data, error } = await supabase
        .from('venue')
        .select('*, type: venue_type(venue_name), office: office_id(id, office_name)')
        .eq('office', user.office_id)

        fetchError = error
        fetchData = data
    } else {
            const { data, error } = await supabase
        .from('venue')
        .select('*, venue_type: venue_type(venue_name), office: office_id(id, office_name)')
        
        fetchError = error
        fetchData = data
    }

    if (fetchError) {
        console.log(fetchError)
        return { status: false, message: "Error fetching venues" }
    }

    return { status: true, message: "Venues fetched successfully", data: fetchData }
}

const GetAdminTypeVenues = async () => {
    const supabase = await createClient()

    const user = await GetUserInfo()

    let fetchError: any | null;
    let fetchData: any | null;

    if (user?.role === 'administrator' || user?.role === 'moderator') {
        const { data, error } = await supabase
        .from('venue_type')
        .select('*, office: office_id(id, office_name)')
        .eq('office_id', user.office_id)

        fetchError = error
        fetchData = data
    } else {
        const { data, error } = await supabase
        .from('venue_type')
        .select('*, office: office_id(id, office_name)')
        
        fetchError = error
        fetchData = data
    }

    if (fetchError) {
        return { status: false, message: "Error fetching venue types" }
    }

    return { status: true, message: "Venue Types fetched successfully", data: fetchData }
}

export { GetAdminVenues, GetAdminTypeVenues }