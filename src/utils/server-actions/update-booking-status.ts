'use server'

import { createClient } from "../supabase/server"

const UpdateStatus = async (id: string, status: string) => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('requests')
    .update({ status: status })
    .eq('id', id)

    if (error) {
        return { status: false, message: "Error updating status" }
    }

    return { status: true, message: "Successfully updated status"}
}

export { UpdateStatus }