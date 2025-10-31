'use server'

import { createClient } from "../supabase/server"

interface ReleaseInsertProps {
    formData: FormData
}

const AddRelease = async ({ formData }: ReleaseInsertProps) => {
    const supabase = await createClient()

    const booking_id = formData.get('booking_id') as string

    // Get current user who is adding the release
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch the related booking request
    const { data: request, error: requestError } = await supabase
        .from('requests')
        .select('*')
        .eq('id', booking_id)
        .single<Requests>()

    if (requestError || !request) {
        return { status: false, message: "Error finding the booking" }
    }

    // Extract the type from the fetched request
    const type = request.type_of_request

    if (type === 'equipment') {
        const { error } = await supabase
        .from('releases')
        .insert({
            booking_id,
            request_type: request.type_of_request,
            equipment_id: formData.get('item_id') as string,
            released_by: user?.id || null,
        })

        if (error) {
            return { status: false, message: "Error releasing equipment" }
        }

        return { status: true, message: "Equipment Release Successful" }
    }

    if (type === 'venue') {
        const { error } = await supabase
        .from('releases')
        .insert({
            booking_id,
            request_type: request.type_of_request,
            venue_id: formData.get('item_id') as string,
            released_by: user?.id || null,
        })

        if (error) {
            return { status: false, message: "Error releasing venue" }
        }

        return { status: true, message: "Venue Release Successful" }
    }

    return { status: false, message: "Invalid request type" }
}

export { AddRelease }
