'use server'

import { createClient } from "../supabase/server"

const UpdateOffice = async (data: FormData, id: string) => {
    const supabase = await createClient()

    const { error } = await supabase
    .from('office')
    .update({
        office: data.get('office_name') as string,
        in_charge: data.get('in_charge'),
    })
    .eq('id', id)

    if (error) {
        return { status: false, message: "Error updating office" }
    }

    return { status: true, message: "Office Update Successful"}
}

export { UpdateOffice }