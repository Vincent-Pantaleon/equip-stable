'use server'

import { createClient } from "../supabase/server"

const UpdateOffice = async (data: FormData, office_id: string, inCharge_id: string) => {
    const supabase = await createClient()

    const { error: officeError } = await supabase
    .from('offices')
    .update({
        office_name: data.get('office_name') as string,
    })
    .eq('id', office_id)

    const { error: InChargeError } = await supabase
    .from('in_charge')
    .update({
        profile_id: data.get('in_charge') as string,
    })
    .eq('id', inCharge_id)

    if (officeError || InChargeError) {
        console.log(officeError)
        console.log(InChargeError)
        return { status: false, message: "Error updating office" }
    }

    return { status: true, message: "Office Update Successful"}
}

export { UpdateOffice }