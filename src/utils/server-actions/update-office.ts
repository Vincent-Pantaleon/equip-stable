'use server'

import { createClient } from "../supabase/server"
import { formatSpaceToUnderscore } from "../handlers/capitalize"

type AssignedTo = {
    id: string;
    name: string;
}

const UpdateOffice = async (data: FormData, office_id: string, profileList: AssignedTo[]) => {
    const supabase = await createClient()

    const office_name = formatSpaceToUnderscore(data.get('office_name') as string)

    // Update office name
    const { error: officeError } = await supabase
        .from('offices')
        .update({ office_name })
        .eq('id', office_id)

    if (officeError) {
        console.log("Update Office Error: ", officeError)
        return { status: false, message: "Error updating office name" }
    }

    // Delete existing members
    const { error: deleteError } = await supabase
        .from('office_members')
        .delete()
        .eq('office_id', office_id)

    if (deleteError) {
        console.log("Delete Members Error: ", deleteError)
        return { status: false, message: "Error clearing existing office members" }
    }

    // Re-insert updated members
    if (profileList.length > 0) {
        const { error: insertError } = await supabase
            .from('office_members')
            .insert(profileList.map(p => ({ office_id, profile_id: p.id })))

        if (insertError) {
            console.log("Insert Members Error: ", insertError)
            return { status: false, message: "Error saving office members" }
        }
    }

    return { status: true, message: "Office updated successfully" }
}

export { UpdateOffice }