'use server'

import { createClient } from "../supabase/server"

const updateMessageView = async (messageId: string) => {
    // Here you would typically interact with your database to update the message status
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('messages')
        .update({ is_viewed: true })
        .eq('id', messageId)

    if (error) {
        console.error('Error updating message view status:', error)
        return { status: false, message: "Failed to update the message" }
    }

    return { status: true, message: "Message view status updated successfully" }
}

export { updateMessageView }