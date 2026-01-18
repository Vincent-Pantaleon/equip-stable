'use server'

import { createClient } from "../supabase/server"
import { formatLabel, formatSpaceToUnderscore } from "../handlers/capitalize"

const GetEquipmentTypes = async () => {
    const supabase = await createClient()
    
    const { data, error } = await supabase
    .from('equipment_type')
    .select('id, type_name')

    if (error) {
        return { status: false, message: "Failed fetching equipment types" }
    }

    const normalizedData = data.map((item) => (
        { 
            label: formatLabel(item.type_name), 
            value: item.id 
        }
    ))

    return { status: true, message: "Equipment types fetched successfully", data: normalizedData}
}

export { GetEquipmentTypes }