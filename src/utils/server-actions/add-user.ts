'use server'

import { supabaseAdmin } from "../supabase/service";

export const AddNewUser = async (formData: FormData) => {
  
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirm_password: formData.get("confirm_password") as string,
        fname: formData.get("fname") as string,
        lname: formData.get("lname") as string,
        school_id: formData.get("school_id") as string,
        role: formData.get("role") as string,
        office_assigned: formData.get("office_assigned") as string,
    };

    let is_in_charge_flag = false;

    if (data.role === 'administrator') {
        is_in_charge_flag = true
    } else {
        is_in_charge_flag = false
    }

    // ✅ Validation first
    if (!data.email || !data.password) {
        return { status: false, message: "Email and password are required" };
    }

    if (data.password !== data.confirm_password) {
        return { status: false, message: "Your passwords do not match, please try again" };
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
                school_id: data.school_id ?? null,
                role: data.role ?? "user", // fallback role
                office_id: data.office_assigned ?? null,
                is_in_charge: is_in_charge_flag,
            }
        });

        if (error) {
            console.error("Supabase error:", error);
            return { status: false, message: error.message || "Error adding new user" };
        }

        return { status: true, message: "User added successfully" };
    } catch (err: any) {
        console.error("Unexpected failure:", err);
        return { status: false, message: "Unexpected server error" };
    }
};
