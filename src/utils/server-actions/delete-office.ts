'use server'

import { createClient } from "../supabase/server"

const DeleteOffice = async (item: Office) => {    
    const supabase = await createClient()

    const { error } = await supabase
    .from('office')
    .delete()
    .eq('id', item.id)

    if (error) {
        return { status: false, message: "Error deleting office"}
    }

    return { status: true, message: "Successfully deleted office"}
}

export { DeleteOffice } 