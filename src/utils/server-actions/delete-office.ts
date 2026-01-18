'use server'

import { createClient } from "../supabase/server"

const DeleteOffice = async (office_id: string) => {    
    const supabase = await createClient()

     const { error: officeError } = await supabase
    .from('offices')
    .delete()
    .eq('id', office_id)

    if (officeError) {
        return { status: false, message: "Error deleting office"}
    }

    return { status: true, message: "Successfully deleted office"}
}

export { DeleteOffice } 