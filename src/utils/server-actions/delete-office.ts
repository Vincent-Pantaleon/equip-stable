'use server'

import { createClient } from "../supabase/server"

const DeleteOffice = async (item: Office) => {    
    const supabase = await createClient()

     const { error: officeError } = await supabase
    .from('offices')
    .delete()
    .eq('id', item.id)

    if (officeError) {
        return { status: false, message: "Error deleting office"}
    }

    return { status: true, message: "Successfully deleted office"}
}

export { DeleteOffice } 