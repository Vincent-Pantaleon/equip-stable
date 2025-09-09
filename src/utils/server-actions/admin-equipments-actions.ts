'use server'

import { createClient } from "../supabase/server"
import { LowercaseAll } from "../handlers/capitalize"

const InsertNewEquipmentType = async (formData: FormData) => {
    const supabase = await createClient()

    const FormData = {
        type: LowercaseAll(formData.get('type') as string),
        total: Number(formData.get('total_count')),
    }

    const { error } = await supabase
    .from('equipment_type')
    .insert([
        { type: FormData.type, total_count: FormData.total, available_count: FormData.total }
    ])

    if (error) {
        console.log(error)
        return { status: false, message: error.message }
    }

    return { status: true, message: "Successfully added new Type"}
}

const InsertNewEquipment = async (formData: FormData) => {
    const supabase = await createClient()

    const FormData = {
        type: formData.get('type') as string,
        item_name: formData.get('item_name') as string,
        reference: formData.get('reference') as string,
        item_code: formData.get('item_code') as string,
        serial_number: formData.get('serial_number') as string,
        date_acquired: formData.get('date_acquired') as string,
    }

    const { data: typeData, error: typeError } = await supabase
    .from('equipment_type')
    .select('id')
    .eq('type', FormData.type)

    const typeID = typeData?.[0]?.id

    if (typeError) {
        return { status: false, message: "Type does not exist"}
    }

    const { error: insertError } = await supabase
    .from('equipment')
    .insert([
        { 
            type: typeID,
            reference: FormData.reference,
            code: FormData.item_code,
            serial_number: FormData.serial_number,
            date_acquired: FormData.date_acquired,
            item_name: FormData.item_name,
        }
    ])


    if (insertError) {
        console.log(insertError)
        return { status: false, message: "Error adding new equipment"}
    }

    return { status: true, message: "Successfully added new equipment"}

}

const SelectEquipmentType = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('equipment_type')
    .select('*')

    if (error) {
        return { status: false, message: "Failed fetching equipment type"}
    }

    return { status: true, message: "Fetched Successfully", data: data }
}

const SelectEquipment = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('equipment')
    .select('*, type: equipment_type(type)')

    if(error) {
        return { status: false, message: "Failed fetching equipment"}
    }

    return { status: true, message: "Fetched successfully", data: data }
}

export { InsertNewEquipmentType, InsertNewEquipment, SelectEquipmentType, SelectEquipment }