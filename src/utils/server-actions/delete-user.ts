'use server'

import { supabaseAdmin } from "../supabase/service"

const DeleteUser = async (id: string) => {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id)

    if (error) {
        return { status: false, message: "Failed to delete user"}
    }

    return { status: true, message: "Successfully deleted user"}
}

export { DeleteUser }