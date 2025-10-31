'use server'

import { createClient } from "../supabase/server"

export default async function GetInventoryData() {
    const supabase = await createClient()

    const { data: venueData, error: venueError } = await supabase
    .from('venue_type')
    .select('*')
    .eq('is_public', true)

    if (venueError) {
        return null
    }

    const { data: equipmentData, error: equipmentError } = await supabase
    .from('equipment_type')
    .select('*')
    .eq('is_public', true)

    if (equipmentError) {
        return null
    }

    return { equipments: equipmentData, venues: venueData}
} 