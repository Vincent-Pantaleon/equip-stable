'use server'

// utils/handlers/login-handler.ts
import { createClient } from '@/utils/supabase/server'

export default async function HandleLogin(form: FormData) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: form.get('email') as string,
        password: form.get('password') as string,
    });

    if (error) {
        return { status: false, message: error.message }
    }

    return { status: true, message: "Login Successful" }
}