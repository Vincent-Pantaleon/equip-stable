'use server'

import { formatLabel } from "../handlers/capitalize"
import { createClient } from "../supabase/server"

const GetAvailabilityOptions = async () => {
    const supabase = await createClient()

    const { data: equipmentOptions, error: equipmentErrors } = await supabase
    .from('equipment_type')
    .select('id, type_name')

    const { data: venueOptions, error: venueErrors } = await supabase
    .from('venue_type')
    .select('id, venue_name')

    if (equipmentErrors || venueErrors) {
        return { status: false, message: "Error fetching item options" }
    }

    const normalizeEquipmentOptions = equipmentOptions.map((item) => (
        {
            label: formatLabel(item.type_name),
            value: item.id
        }
    ))

    const normalizeVenueOptions = venueOptions.map((item) => (
        {
            label: formatLabel(item.venue_name),
            value: item.id
        }
    ))

    return { status: true, message: "Successfully fetched item options", data: { normalizeEquipmentOptions, normalizeVenueOptions }}
}

const GetItemAvailability = async (type: 'equipment' | 'venue', form: FormData) => {
    const supabase = await createClient()

    const formData = {
        item_id: form.get('item') as string,
        date: form.get('date') as string,
    }

    // 1. Get Total Capacity 
    const { count: totalCount, error: totalError } = await supabase
        .from(type === 'equipment' ? 'equipment' : 'venue')
        .select('*', { count: 'exact', head: true })
        .eq(type === 'equipment' ? 'equipment_type_id' : 'id', formData.item_id)

    // 2. Get All Bookings for that day
    const bookingColumn = type === 'equipment' ? 'equipment_id' : 'venue_id';

    const { data: bookings, error: availabilityError } = await supabase
        .from('bookings')
        .select('user_id') 
        .eq(bookingColumn, formData.item_id)
        .eq('date_of_use', formData.date)
        .eq('status', 'approved')

    if (totalError || availabilityError) {
        return { status: false, message: "Error fetching item availability" }
    }

    // 3. Perform Calculations
    const totalCapacity = totalCount || 0
    const rawBookingCount = bookings?.length || 0
    const uniqueUserCount = bookings ? new Set(bookings.map(b => b.user_id)).size : 0

    // Availability is based on unique people
    const availableAmount = totalCapacity - uniqueUserCount
    const isAvailable = availableAmount > 0

    return { 
        status: true, 
        message: "Successfully fetched item availability", 
        data: {
            is_available: isAvailable,
            available_amount: Math.max(0, availableAmount),
            total_capacity: totalCapacity,
            unique_users: uniqueUserCount, // Used for availability logic
            total_bookings_count: rawBookingCount // The raw number you wanted to keep
        } 
    }
}

export { GetAvailabilityOptions, GetItemAvailability }