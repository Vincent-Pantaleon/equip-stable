'use server'

import { createClient } from "../supabase/server"
import { formatSpaceToUnderscore } from "../handlers/capitalize"

const EditEquipmentInformation = async (formData: FormData, equipment: Equipments) => {
    const supabase = await createClient()

    const updates = {
        item_name: formatSpaceToUnderscore(formData.get("item_name") as string),
        reference: formData.get("reference"),
        code: formData.get("code"),
        serial_number: formData.get("serial_number"),
        status: formData.get("status"),
    }
    
    const hasChanges = Object.entries(updates).some(([key, value]) => {
        // @ts-ignore because key is dynamic
        return equipment[key] !== value
    })

    if (!hasChanges) {
        return { status: false, message: "No changes detected" }
    }

    const { error } = await supabase
        .from("equipment")
        .update(updates)
        .eq("id", equipment.id)

    if (error) {
        return { status: false, message: "Error updating equipment"}
    }

    return { status: true, message: "Equipment update successful" }
}

export { EditEquipmentInformation }
