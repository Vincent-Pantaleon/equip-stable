'use server'

import { createClient } from "../supabase/server";
import { Capitalize } from "./capitalize";

export default async function Logout() {
    const supabase = await createClient();

    const { data, error: userError } = await supabase.auth.getUser();

    if (userError || !data?.user) {
        return { status: false, message: "No active session found" };
    }

    const { error: signOutError } = await supabase.auth.signOut({ scope: 'global' });

    if (signOutError) {
        return { status: false, message: Capitalize(signOutError.message) };
    }

    return { status: true, message: "Logout Successful" };
}
