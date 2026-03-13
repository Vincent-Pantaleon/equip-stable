import { BorrowForm as NewForm } from "@/components/forms/borrow-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        absolute: "equip | Borrow"
    }
}

export default async function BorrowPage() {
    // await new Promise((resolve) => setTimeout(resolve, 1500))
    
    return (
        <NewForm/>
    )
}