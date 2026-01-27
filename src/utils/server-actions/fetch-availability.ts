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

const GetItemAvailability = async (type: 'equipment' | 'venue', date: string, item_id: string) => {
    const supabase = await createClient()

    if (type === 'equipment') {
        const { data, error } = await supabase
        .from('equipment')
        .select('')
        .eq('id', item_id)
    }
}

export { GetAvailabilityOptions, GetItemAvailability }