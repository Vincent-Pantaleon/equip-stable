'use server'

import { createClient } from "../supabase/server"

const DeleteBooking = async (id: string) => {
    const supabase = await createClient()

    const { error } = await supabase
    .from('requests')
    .delete()
    .eq('id', id)

    if (error) {
        console.log(error)
        return {status: false, message: "Error deleting selected booking"}
    }

    return { status: true, message: "Booking deleted Successfully" }
}

export { DeleteBooking }