import BorrowForm from "@/components/page-components/borrow-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        absolute: "equip | Borrow"
    }
}

export default async function BorrowPage() {
    // await new Promise((resolve) => setTimeout(resolve, 1500))
    
    return (
        <BorrowForm/>
    )
}