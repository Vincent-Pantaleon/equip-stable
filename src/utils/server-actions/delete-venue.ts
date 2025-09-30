'use server'

import { createClient } from "../supabase/server"

const DeleteVenue = async (item: Venues) => {
    const supabase = await createClient()

    const { error } = await supabase
    .from('venue')
    .delete()
    .eq('id', item.id)

    if (error) {
        return { status: false, message: "Error deleting venue" }
    }

    return { status: true, message: "Venue deletion successful" }
}

const DeleteVenueType = async (item: VenuesType) => {
    const supabase = await createClient()

    const { error } = await supabase
    .from('venue_type')
    .delete()
    .eq('id', item.id)

    if (error) {
        return { status: false, message: "Error deleting venue type" }
    }

    return { status: true, message: "Venue type deletion successful" }
}

export { DeleteVenue, DeleteVenueType }