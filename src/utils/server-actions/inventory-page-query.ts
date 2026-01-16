'use server'

import { formatLabel } from "../handlers/capitalize"
import { createClient } from "../supabase/server"

export type EquipmentTypeNormalized = Omit<EquipmentTypeType, 'office'> & {
  office: { id: string; office_name: string } | null
}

export type VenuesTypeNormalized = Omit<VenuesType, 'office'> & {
  office: { id: string; office_name: string } | null
}


export default async function GetInventoryData() {
    const supabase = await createClient()

    const { data: venueData, error: venueError } = await supabase
    .from('venue_type')
    .select('id, venue_name, total_capacity, office: office_id(id, office_name), is_public')
    .eq('is_public', true)

    const { data: equipmentData, error: equipmentError } = await supabase
    .from('equipment_type')
    .select('id, type_name, office: office_id(id, office_name), is_public')
    .eq('is_public', true)

    const { data: officeData, error: officeError } = await supabase
    .from('offices')
    .select('office_name, id')

    if (equipmentError || venueError || officeError) {
        return null
    }

    const normalizeData = [
        { label: "All Offices", value: "" }, // 👈 blank = no filter
            ...officeData.map((item) => ({
                label: formatLabel(item.office_name),
                value: item.id,
        })),
    ]

    const normalizedEquipments: EquipmentTypeNormalized[] = equipmentData.map((item) => ({
        ...item,
        office: Array.isArray(item.office) ? item.office[0] : item.office ?? null
    }))

    const normalizedVenues: VenuesTypeNormalized[] = venueData.map((item) => ({
        ...item,
        office: Array.isArray(item.office) ? item.office[0] : item.office ?? null
    }))

    return { equipments: normalizedEquipments, venues: normalizedVenues, offices: normalizeData }
} 