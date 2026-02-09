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
    .select('venue_name, total_capacity, office: office_id(id, office_name), is_public, count: venue(count)')
    .eq('is_public', true)
    .eq('venue.status', 'available')

    const { data: equipmentData, error: equipmentError } = await supabase
    .from('equipment_type')
    .select('type_name, office: office_id(id, office_name), is_public, count: equipment(count)')
    .eq('is_public', true)
    .in('equipment.status',[ 'stored', 'returned' ])

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
        office: Array.isArray(item.office) ? item.office[0] : item.office ?? null,
        count: item.count?.[0]?.count ?? 0
    }))

    const normalizedVenues: VenuesTypeNormalized[] = venueData.map((item) => ({
        ...item,
        office: Array.isArray(item.office) ? item.office[0] : item.office ?? null,
        count: item.count?.[0]?.count ?? 0
    }))

    return { equipments: normalizedEquipments, venues: normalizedVenues, offices: normalizeData }
} 