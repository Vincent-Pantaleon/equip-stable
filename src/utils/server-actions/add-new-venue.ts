'use server'

import { createClient } from "../supabase/server"

const AddNewVenue = async (formData: FormData) => {
    const supabase = await createClient()

    const data = {
        type: formData.get('type'),
        reference: formData.get('reference')
    }

    const { error } = await supabase
    .from('venue')
    .insert({
        'type': data.type,
        'reference': data.reference
    })

    if (error) {
        console.log(error)
        return { status: false, message: "Error creating new venue" }
    }

    return { status: true, message: "Successfully added new venue" }
}

export { AddNewVenue }