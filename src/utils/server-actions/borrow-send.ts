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
        subject: formData.get('subject') as string,
        dateOfUse: formData.get('date_of_use') as string,
        timeOfStart: formData.get('time_of_start') as string,
        timeOfEnd: formData.get('time_of_end') as string
    }

    const {error: requestError} = await supabase
    .from('requests')
    .insert([{
        user_id: userId,
        first_name: data.fname,
        last_name: data.lname,
        designation: data.designation,
        department: data.department,
        contact_number: data.contactNumber,
        grade_level: data.gradeLevel,
        purpose: data.purpose,
        location_of_use: data.locationOfUse,
        type_of_request: data.typeOfRequest,
        place_of_use: data.placeOfUse,
        equipment: data.equipment,
        subject: data.subject,
        date_of_use: data.dateOfUse,
        time_of_start: data.timeOfStart,
        time_of_end: data.timeOfEnd
    }])

    if (requestError) {
        return { status: false, message: "Error filing your request"}
    }

    return { status: true, message: "Request sent successfully"}
}

export { SendRequest }