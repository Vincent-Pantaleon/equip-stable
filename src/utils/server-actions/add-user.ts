'use server'

import { supabaseAdmin } from "../supabase/service";
import { createClient } from "../supabase/server";

export const AddNewUser = async (formData: FormData) => {
    const supabase = await createClient()
  
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirm_password: formData.get("confirm_password") as string,
        fname: formData.get("fname") as string,
        lname: formData.get("lname") as string,
        gender: formData.get("gender") as string,
        school_id: formData.get("school_id") as string,
        role: formData.get("role") as string,
        office_assigned: formData.get("office_assigned") as string,
    };

    // ✅ Validation first
    if (!data.email || !data.password) {
        return { status: false, message: "Email and password are required" };
    }

    if (data.password !== data.confirm_password) {
        return { status: false, message: "Your passwords do not match, please try again" };
    }

    const { data: officeData, error: officeError } = await supabase
    .from('office')
    .select('id')
    .eq('office', data.office_assigned)
    .single()

    if (officeError) {
        return { status: false, message: "Error office does not exist" }
    }

    try {
        // ✅ Use supabaseAdmin with service role key
        const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
            email: data.email,
            password: data.password,
            email_confirm: true,
            user_metadata: {
                first_name: data.fname ?? null,
                last_name: data.lname ?? null,
                gender: data.gender ?? null,
                school_id: data.school_id ?? null,
                role: data.role ?? "user", // fallback role
                office_assigned: officeData.id ?? null,
            }
        });

        if (error) {
            console.error("Supabase error:", error);
            return { status: false, message: error.message || "Error adding new user" };
        }

        return { status: true, message: "User added successfully", user };
    } catch (err: any) {
        console.error("Unexpected failure:", err);
        return { status: false, message: "Unexpected server error" };
    }
};
