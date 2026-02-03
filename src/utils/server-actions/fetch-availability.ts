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
    // We use .select('*', { count: 'exact' }) to get how many of this item exist in total
    const { count: totalCount, error: totalError } = await supabase
        .from(type === 'equipment' ? 'equipment' : 'venue')
        .select('*', { count: 'exact', head: true })
        .eq(type === 'equipment' ? 'equipment_type_id' : 'venue_type', formData.item_id)

    // 2. Get Booked Count
    // We check the bookings table for this item on this specific date
    const bookingColumn = type === 'equipment' ? 'equipment_id' : 'venue_id';

    const { count: bookedCount, error: availabilityError } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq(bookingColumn, formData.item_id)
        .eq('date_of_use', formData.date)
        .eq('status', 'approved') // Optional: only count confirmed bookings

    if (totalError || availabilityError) {
        console.log("Total Error:", totalError)
        console.log("Availability Error:", availabilityError)

        return { status: false, message: "Error fetching item availability" }
    }

    // 3. Calculate Availability
    const total = totalCount || 0
    const booked = bookedCount || 0
    const availableAmount = total - booked
    const isAvailable = availableAmount > 0

    console.log(`Item ID: ${formData.item_id} | Date: ${formData.date} | Total: ${total} | Booked: ${booked} | Available: ${availableAmount}`)

    return { 
        status: true, 
        message: "Successfully fetched item availability", 
        data: {
            is_available: isAvailable,
            available_amount: Math.max(0, availableAmount), // Ensure we don't return negative
            total_capacity: total,
            booked_today: booked
        } 
    }
}

export { GetAvailabilityOptions, GetItemAvailability }