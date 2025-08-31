'use client'

import { Section, Input, SelectInput } from "../input"
import Button from "../button"
import { GetBorrowFormData } from "@/utils/server-actions/borrow-page-query"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { SendRequest } from "@/utils/server-actions/borrow-send"
import { useState } from "react"

type Department = "elementary" | "highSchool" | "seniorHighSchool";

export default function BorrowForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const {data, error} = useQuery({
        queryKey: ['borrow-form-data'],
        queryFn: GetBorrowFormData,
    })

    if (error) {
        toast.error("Error fetching data")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)

        const result = await SendRequest(formData)

        if (!result.status) {
            setIsLoading(false)
            toast.error(result.message)
        } else {
            setIsLoading(false)
            toast.success(result.message)
        }
    }

    return (
            <form
                className="flex flex-col gap-y-5"
                onSubmit={handleSubmit}
            >
                {/* filer's name, designation, department, contact number, grade level */}
                <Section header="Requestor Information">
                    <Input id="first_name" name="first_name" label="First Name" type="text"/>
                    <Input id="last_name" name="last_name" label="Last Name" type="text"/>
                    <SelectInput divStyle="order-3" label="Designation" name="designation" options={data?.designation || [] }/>
                    <SelectInput divStyle="order-5" label="Department" name="department" options={data?.department || []}/>
                    <Input divStyle="order-4" id="contact_number" name="contact_number" label="Contact Number" type="tel" placeholder="ex. 09123456789" pattern="0[9][0-9]{2}[0-9]{3}[0-9]{4}"/>
                    <SelectInput divStyle="order-6" label="Grade Level" name="grade_level" options={data?.gradeLevel || []}/>
                </Section>

                {/* purpose, type of request, location of use, place of use */}
                <Section header="Equipment Usage Details">
                    <SelectInput divStyle="md:col-span-2" label="Purpose" name="purpose" options={data?.purpose || []}/>
                    <SelectInput divStyle="order-3" label="Type of Request" name="type_of_request" options={data?.typeOfRequest || []}/>
                    <SelectInput divStyle="order-5" label="Location of Use" name="location_of_use" options={data?.locationOfUse || []}/>
                    <SelectInput divStyle="order-4" label="Place of Use" name="place_of_use" options={data?.placeOfUse || []}/>
                </Section>

                {/* equipment, subject, date of use, time of start, time of end */}
                <Section header="Equipment and Schedule">
                    <SelectInput divStyle="md:col-span-2" label="Equipment" name="equipment" options={data?.equipment || []}/>
                    <SelectInput divStyle="order-3" label="Subject" name="subject" options={data?.subject || []}/>
                    <Input divStyle="order-4" id="date_of_use" name="date_of_use" label="Date of Use" type="date"/>
                    <Input divStyle="order-5" id="time_of_start" name="time_of_start" label="Time of Start" type="time"/>
                    <Input divStyle="order-6" id="time_of_end" name="time_of_end" label="Time of End" type="time"/>
                </Section>

                <div className="lg:flex lg:justify-end">
                    <Button type="submit" label="Submit Form" isLoading={isLoading} className="lg:w-[13%]"/>
                </div>
            </form>
    )
}