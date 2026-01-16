'use server'

import { createClient } from "../supabase/server"

const SendRequest = async (formData: FormData) => {
    const supabase = await createClient()

    const userId = (await supabase.auth.getUser()).data.user?.id

    const data = {
        fname: formData.get('first_name') as string,
        lname: formData.get('last_name') as string,
        designation: formData.get('designation') as string,
        department: formData.get('department') as string,
        contactNumber: formData.get('contact_number') as string,
        gradeLevel: formData.get('grade_level') as string,
        purpose: formData.get('purpose') as string,
        typeOfRequest: formData.get('type_of_request') as string,
        locationOfUse: formData.get('location_of_use') as string,
        placeOfUse: formData.get('place_of_use') as string,
        equipment: formData.get('equipment') as string,
        venue: formData.get('venue') as string,
        subject: formData.get('subject') as string,
        dateOfUse: formData.get('date_of_use') as string,
        timeOfStart: formData.get('time_of_start') as string,
        timeOfEnd: formData.get('time_of_end') as string,
        office: formData.get('office') as string
    }

    const {error: requestError} = await supabase
    .from('bookings')
    .insert([{
        user_id: userId,
        first_name: data.fname,
        last_name: data.lname,
        designation_id: data.designation,
        department_id: data.department,
        contact_number: data.contactNumber,
        grade_level_id: data.gradeLevel,
        purpose_id: data.purpose,
        location_of_use_id: data.locationOfUse,
        type_of_request_id: data.typeOfRequest,
        place_of_use_id: data.placeOfUse,
        equipment_id: data.equipment ? data.equipment : null,
        subject_id: data.subject,
        date_of_use: data.dateOfUse,
        time_of_start: data.timeOfStart,
        time_of_end: data.timeOfEnd,
        venue_id: data.venue ? data.venue : null,
        office_id: data.office
    }])

    if (requestError) {
        console.log(requestError)
        return { status: false, message: "Error filing your request"}
    }

    return { status: true, message: "Request sent successfully"}
}

export { SendRequest }