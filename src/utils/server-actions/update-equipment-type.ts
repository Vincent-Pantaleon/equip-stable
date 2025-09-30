'use server'

import { LowercaseAll } from "../handlers/capitalize"
import { createClient } from "../supabase/server"


const UpdateEquipmentTypeItem = async (formData: FormData, equipmentType: EquipmentTypeType) => {
    const supabase = await createClient()

    console.log(formData)
    console.log(equipmentType)

    const data = {
        type: (LowercaseAll(formData.get('type') as string)),
        total_count: Number(formData.get('total_count')),
        is_public: formData.get('is_public') === 'true',
    }

    const hasChanges = Object.entries(data).some(([key, value]) => {
        // @ts-ignore because key is dynamic
        return equipmentType[key] !== value
    })

    if (!hasChanges) {
        return { status: false, message: "No changes detected" }
    }

    const { error } = await supabase
    .from('equipment_type')
    .update(data)
    .eq('id', equipmentType.id)

    if (error) {
        return { status: false, message: "Error updating equipment type" }
    }

    return { status: true, message: "Equipment type update successful" }
}

export { UpdateEquipmentTypeItem }