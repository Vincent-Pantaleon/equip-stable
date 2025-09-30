'use client'

import { Section, Input, SelectInput } from "../input"
import Button from "../button"
import { GetBorrowFormData } from "@/utils/server-actions/borrow-page-query"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { SendRequest } from "@/utils/server-actions/borrow-send"
import { useState } from "react"
import Modal from "../modal" // adjust path if needed

export default function BorrowForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingForm, setPendingForm] = useState<FormData | null>(null);
    const [department, setDepartment] = useState<string>('')

    const { data, error } = useQuery({
        queryKey: ['borrow-form-data'],
        queryFn: async () => {
            console.log("🔄 GetBorrowFormData query fired");
            return await GetBorrowFormData();
        },
        staleTime: Infinity,
        gcTime: Infinity
    })

    if (error) {
        toast.error("Error fetching data")
    }

    console.log(data)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setPendingForm(formData);
        setShowConfirmModal(true);
    };

    const handleConfirm = async () => {
        if (!pendingForm) return;
        setIsLoading(true);
        setShowConfirmModal(false);

        const result = await SendRequest(pendingForm);

        if (!result.status) {
            setIsLoading(false);
            toast.error(result.message);
        } else {
            setIsLoading(false);
            toast.success(result.message);
        }
        setPendingForm(null);
    };

    return (
        <>
            <form
                className="flex flex-col gap-y-5"
                onSubmit={handleSubmit}
            >
                {/* filer's name, designation, department, contact number, grade level */}
                <Section header="Requestor Information">
                    <Input id="first_name" name="first_name" label="First Name" type="text"/>
                    <Input id="last_name" name="last_name" label="Last Name" type="text"/>
                    <SelectInput divStyle="order-3" label="Designation" name="designation" options={data?.designation || [] }/>
                    <SelectInput divStyle="order-5" label="Department" name="department" options={data?.department || []} onChange={(e) => setDepartment(e.target.value)}/>
                    <Input divStyle="order-4" id="contact_number" name="contact_number" label="Contact Number" type="tel" placeholder="ex. 09123456789" pattern="0[9][0-9]{2}[0-9]{3}[0-9]{4}"/>
                    <SelectInput divStyle="order-6" label="Grade Level" name="grade_level" options={data?.gradeLevel || []} department={department}/>
                </Section>

                {/* purpose, type of request, location of use, place of use */}
                <Section header="Equipment Usage Details">
                    <SelectInput divStyle="md:col-span-2" label="Purpose" name="purpose" options={data?.purpose || []}/>
                    <SelectInput divStyle="order-3" label="Type of Request" name="type_of_request" options={data?.typeOfRequest || []}/>
                    <SelectInput divStyle="order-5" label="Location of Use" name="location_of_use" options={data?.locationOfUse || []}/>
                    <SelectInput divStyle="order-4" label="Room" name="place_of_use" options={data?.placeOfUse || []} department={department}/>
                    <SelectInput divStyle="order-6" label="Office" name="office" options={[]}/>
                </Section>

                {/* equipment, subject, date of use, time of start, time of end */}
                <Section header="Equipment and Schedule">
                    <SelectInput divStyle="md:col-span-2" label="Equipment" name="equipment" options={data?.equipment || []}/>
                    <SelectInput divStyle="order-3" label="Subject" name="subject" options={data?.subject || []} department={department}/>
                    <Input divStyle="order-4" id="date_of_use" name="date_of_use" label="Date of Use" type="date"/>
                    <Input divStyle="order-5" id="time_of_start" name="time_of_start" label="Time of Start" type="time"/>
                    <Input divStyle="order-6" id="time_of_end" name="time_of_end" label="Time of End" type="time"/>
                </Section>

                <div className="w-full lg:flex lg:justify-end">
                    <Button type="submit" label="Submit Form" isLoading={isLoading} className="lg:w-[13%] w-full"/>
                </div>
            </form>
            {showConfirmModal && (
              <Modal
                header="Confirm Submission"
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
              >
                <div className="flex flex-col gap-4">
                  <span>Are you sure you want to submit this borrow request?</span>
                  <div className="flex gap-2 justify-end">
                    <Button
                      label="Cancel"
                      onClick={() => setShowConfirmModal(false)}
                      className="bg-gred-400 px-3"
                    />
                    <Button
                      label="Submit"
                      onClick={handleConfirm}
                      className="bg-blue-600 px-3"
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </Modal>
            )}
        </>
    )
}