'use server'

import { createClient } from "../supabase/server"

const GetRequestData = async () => {
    const supabase = await createClient()

    const { data: currentUser, error: AuthErr } = await supabase.auth.getUser();
    const user = currentUser.user?.id;

    if ( !user || AuthErr ) {
        return null
    }

    const { data: requestData, error: requestError } = await supabase
        .from('requests')
        .select('*')
        .eq('user_id', user)
        .order('created_at', { ascending: false })

    if (requestError) {
        return null
    }

    return requestData
}

const GetAllRequestData = async () => {
    const supabase = await createClient()

    const { data: requestData, error: requestError } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false })

    if (requestError) {
        return null
    }

    return requestData
}


export { GetRequestData, GetAllRequestData }