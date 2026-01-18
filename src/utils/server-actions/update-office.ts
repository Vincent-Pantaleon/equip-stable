'use server'

import { createClient } from "../supabase/server"

const UpdateOffice = async (data: FormData, office_id: string) => {
    const supabase = await createClient()

    const { error: officeError } = await supabase
    .from('offices')
    .update({
        office_name: data.get('office_name') as string,
        in_charge: data.get('in_charge') as string
    })
    .eq('id', office_id)


    if (officeError) {
        console.log(officeError)
        return { status: false, message: "Error updating office" }
    }

    return { status: true, message: "Office Update Successful"}
}

export { UpdateOffice }