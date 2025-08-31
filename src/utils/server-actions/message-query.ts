'use server'

import { createClient } from "../supabase/server"

export default async function GetMessageData() {
    const supabase = await createClient()

    const { data: currentUser, error: AuthErr } = await supabase.auth.getUser();
    const user = currentUser.user?.id;

    if ( !user || AuthErr ) {
        return null
    }
    
    const { data: messageData, error: messageError } = await supabase
        .from('messages')
        .select('id, sender: sender_id(email, first_name,last_name), message, subject, created_at, is_viewed')
        .eq('recipient_id', user)
        .order('created_at', { ascending: false });

    if (messageError) {
        return null
    }

    const formattedMessages = Array.isArray(messageData)
        ? messageData.map((message) => ({
            ...message,
            sender: Array.isArray(message.sender) ? message.sender[0] : message.sender
        }))
        : [];

    return formattedMessages
}       