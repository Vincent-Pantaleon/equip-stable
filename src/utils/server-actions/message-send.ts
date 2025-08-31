'use server'

import { createClient } from "../supabase/server"

const SendMessage = async (formData: FormData) => {
    const supabase = await createClient()

    const data = {
        recipient: formData.get('recipient') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
    }

    // GET SENDER USER
    const sender = (await supabase.auth.getUser()).data.user?.id

    // GET RECIPIENT
    const {data: recipientData, error: recipientError} = await supabase
    .from('profiles')
    .select('id')
    .eq('email', data.recipient)
    .single()

    if  (recipientError) {
        return { status: false, message: "Email not found!"}
    }
    
    if (recipientData.id === sender) {
        return { status: false, message: "Oops! You cannot message yourself."}
    }

    const { error: messageError } = await supabase
    .from('messages')
    .insert([
        {
            sender_id: sender,
            recipient_id: recipientData.id,
            subject: data.subject,
            message: data.message
        }
    ])

    if (messageError) {
        return { status: false, message: "Error sending message"}
    } 

    return { status: true, message: "Message sent successfully"}
}

const ReadMessage = async (message: Messages) => {
    const supabase = await createClient()

    const { error } = await supabase
    .from('messages')
    .update({ is_viewed: true })
    .eq('id', message.id)

    if (error) {
        return { status: false, message: "Error updating column"}
    }

    return { status: true }
}

export { SendMessage, ReadMessage }