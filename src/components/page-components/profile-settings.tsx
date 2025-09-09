'use client'

import Button from "../button"
import Logout from "@/utils/handlers/logout-handler"
import { Input, Section, SelectInput } from "../input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useInfo } from "@/utils/hooks/user-context"
import { useQuery } from "@tanstack/react-query"
import { GetUserProfile } from "@/utils/server-actions/profile-query"
import { EditUserInformation } from "@/utils/server-actions/profile-edit"
import Modal from "../modal" // adjust path if needed

export default function ProfileSettings() {
    const router = useRouter()

    const [isEditUserInfo, setIsEditUserInfo] = useState<boolean>(true)
    const [user, setUser] = useState<Profile | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const userInfo = useInfo()

    const {data, error, isPending} = useQuery({
        queryKey: ['user-profile'],
        queryFn: GetUserProfile
    })

    if(error) {
        toast.error(error.message)
    }

    useEffect(() => {
        if (data?.data) {
            setUser(data.data)
        }
    }, [data])
    
    async function handleLogout() {
        const result = await Logout()

        if (result.status === false) {
            toast.error(result.message)
        }

        toast.success(result.message)
        router.push('/login')
    }

    const HandleUserInformationEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsLoading(true)
        const formData = new FormData(e.currentTarget)

        // Build the updates object dynamically (only include changed values)
        const updates: any = {}
        const fname = formData.get("fname") as string
        const lname = formData.get("lname") as string
        const schoolId = formData.get("school_id") as string

        if (fname) updates.first_name = fname
        if (lname) updates.last_name = lname
        if (schoolId) updates.school_id = schoolId

        if (Object.keys(updates).length === 0) {
            toast.error("No changes detected")
            setIsLoading(false)
            return
        }
        
        const result = await EditUserInformation({ updates })

        if (!result.status) {
            toast.error(result.message)
            setIsLoading(false)
            return
        }

        setIsLoading(false)
        toast.success(result.message)
        router.refresh() // refresh page or query to show latest data
    }

    return (
        <div className="h-full flex flex-col gap-y-4">
            <Accordion type="single" collapsible className=" flex flex-col gap-y-2">
                <Section header="User Information">
                    <AccordionItem value="item-1" className="col-span-2">
                            <AccordionTrigger 
                                className="bg-hover-color text-md px-3"
                            >
                                Edit User Information
                            </AccordionTrigger>
                            <AccordionContent>
                                <form className="flex flex-col gap-y-4 p-2" onSubmit={HandleUserInformationEdit}>
                                    <Button
                                        type="button" 
                                        label={isEditUserInfo ? "Edit Information" : "Cancel" }
                                        onClick={() => setIsEditUserInfo(prev => !prev)}
                                        className={isEditUserInfo ? "bg-form-input-color" : "bg-form-hover-color"}
                                    />
                                    <Input
                                        id="fname"
                                        label="First Name"
                                        name="fname"
                                        type="text"
                                        isDisabled={isEditUserInfo}
                                        placeholder={user?.first_name || 'First Name'}
                                        required={false}
                                        divStyle="col-span-2"
                                    />
                                    <Input
                                        id="lname"
                                        label="Last Name"
                                        name="lname"
                                        type="text"
                                        isDisabled={isEditUserInfo}
                                        placeholder={user?.last_name ||"Last Name"}
                                        required={false}
                                        divStyle="col-span-2"
                                    />
                                    <Input
                                        id="school_id"
                                        label="School ID"
                                        name="school_id"
                                        type="text"
                                        isDisabled={isEditUserInfo}
                                        placeholder={user?.school_id || "School ID"}
                                        required={false}
                                        divStyle="col-span-2"
                                    />

                                    <Button
                                        type="submit"
                                        label="Change Information"
                                        disabled={isEditUserInfo}
                                        isLoading={isLoading}
                                    />
                                </form>
                            </AccordionContent>
                    </AccordionItem>
                </Section>

                <Section header="Change Password">
                    <AccordionItem value="item-2" className="col-span-2">
                        <AccordionTrigger 
                            className="bg-hover-color text-md px-3"
                        >
                            Change your Password
                        </AccordionTrigger>
                        <AccordionContent>
                            <form className="col-span-2 flex flex-col gap-y-4 p-2">
                                <Input
                                    id="new_password"
                                    label="New Password"
                                    name="new_password"
                                    type="password"
                                    isDisabled={true}
                                />
                                <Input
                                    id="confirm_new_password"
                                    label="Confirm New Password"
                                    name="confirm_new_password"
                                    type="password"
                                    isDisabled={true}
                                />

                                <Button
                                    type="submit"
                                    label="Change Password"
                                    disabled={true}
                                />
                            </form>
                        </AccordionContent>
                    </AccordionItem>
                </Section>
                
                <Section header="Account Management">
                    <AccordionItem value="item-3" className="col-span-2">
                        <AccordionTrigger 
                            className="bg-hover-color text-md px-3"
                        >
                            Change your Account Settings
                        </AccordionTrigger>
                        <AccordionContent>
                            
                            <form className="col-span-2 flex flex-col gap-y-4 p-2">
                                <Input
                                    id="email"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    isDisabled={true}
                                    placeholder={user?.email || "User Email"}
                                    divStyle="col-span-2"
                                />
                                <Input
                                    id="role"
                                    label="Role"
                                    name="role"
                                    type="text"
                                    isDisabled={true}
                                    placeholder={userInfo?.role || "User Role"}
                                    divStyle="col-span-2"
                                />
                                
                                
                                <SelectInput
                                    label="Theme"
                                    name="theme"
                                    options={[]}
                                />
                                <SelectInput
                                    label="2-Factor Authentication"
                                    name="2fa"
                                    options={[]}
                                />
                                <SelectInput
                                    label="Notifications"
                                    name="notifications"
                                    options={[]}
                                />
                                

                                <Button
                                    type="submit"
                                    label="Change Settings"
                                    disabled={true}
                                />
                            </form>                   
                        </AccordionContent>
                    </AccordionItem>
                </Section>
            </Accordion>

            <Button 
                label="Logout"
                onClick={() => setShowLogoutModal(true)}
                className="bg-red-600"
            />

            {showLogoutModal && (
              <Modal
                header="Confirm Logout"
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
              >
                <div className="flex flex-col gap-4">
                  <span>Are you sure you want to logout?</span>
                  <div className="flex gap-2 justify-end">
                    <Button
                      label="Cancel"
                      onClick={() => setShowLogoutModal(false)}
                      className="bg-gray-300 px-4"
                    />
                    <Button
                      label="Logout"
                      onClick={async () => {
                        setShowLogoutModal(false);
                        await handleLogout();
                      }}
                      className="bg-red-600 px-4"
                    />
                  </div>
                </div>
              </Modal>
            )}
        </div>
    )
}