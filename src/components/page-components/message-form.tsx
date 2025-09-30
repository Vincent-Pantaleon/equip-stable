'use client'

import React from "react"
import Button from "../button"
import { Input } from "../input"
import { SendMessage } from "@/utils/server-actions/message-send"
import { toast } from "sonner"
import Link from "next/link"

import { useRouter } from "next/navigation"
import { ArrowLeft } from 'lucide-react'

export default function MessageForm() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget)
        const result = await SendMessage(formData)

        if (result.status === false) {
            toast.error(result.message)
        }

        toast.success(result.message)
    }

    const router = useRouter()
    
    return (
        <form
            className="flex flex-col gap-y-4 h-full"
            onSubmit={handleSubmit}
        >
            <Button
                Icon={ArrowLeft}
                label="Go Back"
                onClick={() => router.back()}
            />
            
            <Input 
                label="Send to (email)"
                id="recipient"
                name="recipient"
                type="email"
            />
            
            <div className="flex flex-col gap-y-3 py-4 h-full">
                <Input
                    label="Subject"
                    id="subject"
                    name="subject"
                    type="text"

                />

                <div className="grow">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className="w-full border h-full rounded p-2 resize-none"
                    />
                </div>
            </div>

            <Button
                type="submit"
                label="Send"
            />
            
        </form>
    )
}