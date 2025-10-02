'use server'

import { createClient } from "../supabase/server"
import { formatLabel, formatSpaceToUnderscore } from "../handlers/capitalize"

const GetEquipmentTypes = async () => {
    const supabase = await createClient()
    
    const { data, error } = await supabase
    .from('equipment_type')
    .select('type')

    if (error) {
        return { status: false, message: "Failed fetching equipment types" }
    }

    const normalizedData = data.map((item) => (
        { label: formatLabel(item.type), value: formatSpaceToUnderscore(item.type) }
    ))

    return { status: true, message: "Equipment types fetched successfully", data: normalizedData}
}

export { GetEquipmentTypes }