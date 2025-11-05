'use server'

import { createClient } from "../supabase/server"

const DeleteFormValue = async (item: any, table: string) => {
    const supabase = await createClient()

    const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', item.id)

    if (error) {
        console.log(error)
        return { status: false, message: "Error deleting item" }
    }

    return { status: true, message: "Item deleted successfully"}
}

export { DeleteFormValue }