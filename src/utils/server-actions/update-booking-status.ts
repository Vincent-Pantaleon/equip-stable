'use server'

import { createClient } from "../supabase/server"

const UpdateStatus = async (request: AdminRequests, formData: FormData) => {
    const supabase = await createClient()

    const data = {
        id: request.id,
        first_name: formData.get("fname") ?? request.first_name,        
        last_name: formData.get("lname") ?? request.last_name,           
        contact_number: formData.get("contact_number") ?? request.contact_number,
        date_of_use: formData.get("date_of_use") ?? request.date_of_use,
        time_of_start: formData.get("time_of_start") ?? request.time_of_start,
        time_of_end: formData.get("time_of_end") ?? request.time_of_end,
        status: formData.get("status") ?? request.status,
        designation: formData.get("designation") ?? request.designation?.id,  
        department: formData.get("department") ?? request.department?.id,     
        grade_level: formData.get("level") ?? request.grade_level?.id,        
        purpose: formData.get("purpose") ?? request.purpose?.id,
        location_of_use: formData.get("location_of_use") ?? request.location_of_use?.id,
        place_of_use: formData.get("room") ?? request.place_of_use?.id,       
        subject: formData.get("subject") ?? request.subject?.id,
        office: formData.get("office") ?? request.office?.id,
    }   

    const venueIds = formData.has("venue_ids") || formData.getAll("venue_ids").length > 0
        ? formData.getAll("venue_ids") as string[]
        : request.venue?.map(v => v.id) ?? []

    const equipmentIds = formData.has("equipment_ids") || formData.getAll("equipment_ids").length > 0
        ? formData.getAll("equipment_ids") as string[]
        : request.equipment?.map(e => e.id) ?? []

    const { error } = await supabase
        .from('bookings')
        .update({
            status: data.status,
            first_name: data.first_name,
            last_name: data.last_name,
            contact_number: data.contact_number,
            date_of_use: data.date_of_use,
            time_of_start: data.time_of_start,
            time_of_end: data.time_of_end,
            designation_id: data.designation,
            department_id: data.department,
            grade_level_id: data.grade_level,
            purpose_id: data.purpose,
            location_of_use_id: data.location_of_use,
            place_of_use_id: data.place_of_use,
            subject_id: data.subject,
            office_id: data.office,
            equipment_id: equipmentIds,
            venue_id: venueIds,
        })
        .eq('id', data.id)

    if (error) {
        console.error(error)
        return { status: false, message: "Error updating booking" }
    }

    return { status: true, message: "Successfully updated booking" }
}

export { UpdateStatus }