'use server'

import { createClient } from "../supabase/server"

type DeleteProps = {
    id: string
}

const DeleteRelease = async ({ id }: DeleteProps) => {
    const supabase = await createClient()

    const { error } = await supabase
    .from('releases')
    .delete()
    .eq('id', id)

    if (error) {
        return { status: false, message: "Error deleting release" }
    }

    return { status: true, message: "Release deleted successfully" }
}

export { DeleteRelease }