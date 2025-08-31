import LoginForm from "@/components/page-components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        absolute: "equip | Login"
    }
}

export default async function Page() {
    return (
        <LoginForm/>
    );
}