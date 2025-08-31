'use server'

import { createClient } from "../supabase/server";
import { Capitalize } from "./capitalize";

export default async function Logout() {
    const supabase = await createClient();

    const { data, error: userError } = await supabase.auth.getUser();

    if (userError || !data?.user) {
        return { status: false, message: "No active session found" };
    }

    const userId = data.user.id;

    const { error: updateError } = await supabase
        .from("profiles")
        .update({ is_online: false })
        .eq("id", userId);

    if (updateError) {
        return { status: false, message: Capitalize(updateError.message) };
    }

    const { error: signOutError } = await supabase.auth.signOut({ scope: 'global' });

    if (signOutError) {
        return { status: false, message: Capitalize(signOutError.message) };
    }

    return { status: true, message: "Logout Successful" };
}
