'use server'

import { createClient } from "../supabase/server"
import { formatSpaceToUnderscore } from "../handlers/capitalize"

// Complete this shit
const UpdateOffice = async (data: FormData, office_id: string) => {
    const supabase = await createClient()

    const office_name = formatSpaceToUnderscore(data.get('office_name') as string)
    const in_charge = data.get('in_charge') as string

    // 1. Update the Office Name
    const { error: officeError } = await supabase
        .from('offices')
        .update({ office_name: office_name })
        .eq('id', office_id)

    if (officeError) {
        console.log("Update Office Error: ", officeError)
        return { status: false, message: "Error updating office name" }
    }

    // 2. Upsert the Assignment
    // This will update the profile_id if office_id exists, 
    // otherwise it will create a new row.
    const { error: assignmentError } = await supabase
        .from('office_assignment')
        .upsert({ 
            office_id: office_id, 
            profile_id: in_charge 
        }, { onConflict: 'profile_id' }
    ) // Tells Supabase to check for existing office_id

    if (assignmentError) {
        console.log("Upsert Assignment Error: ", assignmentError)
        return { status: false, message: "Error saving office assignment" }
    }

    return { status: true, message: "Office updated and assignment synced" }
}

export { UpdateOffice }