'use server'

import { createClient } from "../supabase/server"
import { formatSpaceToUnderscore } from "../handlers/capitalize"
import { GetUserInfo } from "../data/decode"

const InsertNewEquipmentType = async (formData: FormData) => {
    const supabase = await createClient()

    const user = await GetUserInfo()

    const FormData = {
        type: formatSpaceToUnderscore(formData.get('type') as string),
    }

    const { error } = await supabase
    .from('equipment_type')
    .insert([
        { type_name: FormData.type, office_id: user?.office_id  }
    ])

    if (error) {
        return { status: false, message: error.message }
    }

    return { status: true, message: "Successfully added new Type"}
}

const InsertNewEquipment = async (formData: FormData) => {
    const supabase = await createClient()

    const user = await GetUserInfo()

    const FormData = {
        equipment_type_id: formData.get('type') as string,
        item_name: formatSpaceToUnderscore(formData.get('item_name') as string),
        reference_number: formData.get('reference') as string,
        property_code: formData.get('item_code') as string,
        serial_number: formData.get('serial_number') as string,
        date_acquired: formData.get('date_acquired') as string,
    }

    const { error: insertError } = await supabase
    .from('equipment')
    .insert([
        { 
            equipment_type_id: FormData.equipment_type_id,
            reference_number: FormData.reference_number,
            property_code: FormData.property_code,
            serial_number: FormData.serial_number,
            date_acquired: FormData.date_acquired,
            item_name: FormData.item_name,
            office_id: user?.office_id
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

    const user = await GetUserInfo()

    let fetchError: any | null = null;
    let fetchData: any | null = null;

    if (user?.role === 'administrator' || user?.role === 'moderator') {
        const { data, error } = await supabase
        .from('equipment_type')
        .select('*, office: office_id(id, office_name)')
        .order('created_at', { ascending: false })
        .eq('office_id', user.office_id)

        fetchError = error
        fetchData = data
    } else {
        const { data, error } = await supabase
        .from('equipment_type')
        .select('*, office: office_id(id, office_name)')
        .order('created_at', { ascending: false })

        fetchError = error
        fetchData = data
    }

    if (fetchError) {
        return { status: false, message: "Failed fetching equipment type"}
    }

    return { status: true, message: "Fetched Successfully", data: fetchData }
}

const SelectEquipment = async () => {
    const supabase = await createClient()

    const user = await GetUserInfo()

    let fetchError: any | null = null;
    let fetchData: any | null = null;

    if (user?.role === 'administrator' || user?.role === 'moderator') {
        const { data, error } = await supabase
        .from('equipment')
        .select('*, type: equipment_type_id(type_name), office: office_id(id, office_name)')
        .order('created_at', { ascending: false })
        .eq('office_id', user.office_id)

        fetchError = error
        fetchData = data
    } else {
        const { data, error } = await supabase
        .from('equipment')
        .select('*, type: equipment_type_id(type_name), office: office_id(id, office_name)')
        .order('created_at', { ascending: false })

        fetchError = error
        fetchData = data
    }

    if(fetchError) {
        return { status: false, message: "Failed fetching equipment"}
    }

    return { status: true, message: "Fetched successfully", data: fetchData }
}

export { InsertNewEquipmentType, InsertNewEquipment, SelectEquipmentType, SelectEquipment }