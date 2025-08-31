'use server'

import { createClient } from "../supabase/server";

export default async function GetApprovedRequests() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (user.error) return null;

    const { data, error } = await supabase
        .from("requests")
        .select("*")
        .eq("status", "approved")
        .eq("user_id", user.data.user?.id)

    if (error || !data || data.length === 0) return null;

    return data;

}
