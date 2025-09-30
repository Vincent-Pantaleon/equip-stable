'use server'

import { createClient } from "../supabase/server"

interface DeleteEquipmentProps {
    table: "equipment" | "equipment_type"
    item: EquipmentTypeType | Equipments
}

const DeleteEquipment = async ({ table, item }: DeleteEquipmentProps) => {
    const supabase = await createClient()

    const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', item.id)

    if (error) {
        return { status: false, message: "Error deleting item" }
    }

    return { status: true, message: "Item deleted successfully"}
}

export { DeleteEquipment }