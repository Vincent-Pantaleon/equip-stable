'use server'

import { createClient } from "../supabase/server"

type EditUserInformationProps = {
  updates: {
    first_name?: string
    last_name?: string
    school_id?: string
  }
}

const EditUserInformation = async ({ updates }: EditUserInformationProps) => {
    const supabase = await createClient()

    const userId = (await supabase.auth.getUser()).data.user?.id

    if (!userId) {
        return { status: false, message: "No user found" }
    }

    const { error } = await supabase
        .from("profile")
        .update(updates)   // <-- only the provided keys get updated
        .eq("id", userId)

    if (error) {
        return { status: false, message: "Error updating field" }
    }

    return { status: true, message: "Successfully updated profile information" }
}

export { EditUserInformation }
