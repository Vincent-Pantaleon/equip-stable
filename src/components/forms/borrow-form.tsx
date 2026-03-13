'use client'

import { useForm } from '@tanstack/react-form';
import { useQuery } from '@tanstack/react-query';
import { GetBorrowFormData } from '@/utils/server-actions/borrow-page-query';
import { useStore } from '@tanstack/react-form';
import { useState } from 'react';
import { CancelConfirmButtons } from '../cancel-confirm';
import { Section, Input, SelectInput } from "../input"
import { toast } from 'sonner';
import Button from '../button';
import { RotateCw, Send } from 'lucide-react';
import Modal from '../modal';
import { ArrayItem } from '../array-item';

import { SendRequest } from '@/utils/server-actions/borrow-send';

type ItemType = {
    id: string;
    name: string;
}

const BorrowForm = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const [equipmentsArray, setEquipmentsArray] = useState<ItemType[]>([]);
    const [venuesArray, setVenuesArray] = useState<ItemType[]>([]);

    // Inside your component
    const handleEquipmentArrayDelete = (id: string) => {
        const next = equipmentsArray.filter(item => item.id !== id)

        setEquipmentsArray(next)

        form.setFieldValue('equipment', next.map(i => i.id))
    }

    const handleVenuesArrayDelete = (idToDelete: string | number) => {
        const next = venuesArray.filter(item => item.id !== idToDelete)

        setVenuesArray(next)

        form.setFieldValue('venue', next.map(i => i.id))
    }

    const form = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            designation: '',
            department: '',
            contact_number: '',
            grade_level: null,
            purpose: '',
            type_of_request: '',
            location_of_use: '',
            place_of_use: null,
            office: '',
            venue: [],
            equipment: [],
            subject: null,
            date_of_use: '',
            time_of_start: '',
            time_of_end: '',
        } as RequestData,
        onSubmit: async ({ value }) => {
            setIsSubmitting(true);
            setOpenModal(false); // Close modal once we start sending

            try {
                const result = await SendRequest(value);

                if (result.status) {
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                }
            } catch (err) {
                toast.error("An unexpected error occurred");
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    const department = useStore(form.baseStore, (state) => state.values.department);
    const office = useStore(form.baseStore, (state) => state.values.office)
    const purpose = useStore(form.baseStore, (state) => state.values.purpose)


    const { data, error } = useQuery({
        queryKey: ['form-data'],
        queryFn: GetBorrowFormData
    })

    if (error) {
        toast.error(error.message)
    }

    const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpenModal(true)
    }

    // Inside your component before the return
    const typeOfRequestValue = useStore(form.baseStore, (state) => state.values.type_of_request);
    const selectedTypeObj = data?.typeOfRequest.find((item) => item.value === typeOfRequestValue);
    const type = selectedTypeObj?.label.toLowerCase() as 'venue' | 'equipment' | undefined;

    // Repeat logic for purpose (purp)
    const selectedPurpObj = data?.purpose.find((item) => item.value === purpose);
    const purp = selectedPurpObj?.label.toLowerCase();

    const dept = data?.department
    .find((item) => item.value === department)
    ?.label.toLowerCase() as 'pre-school' | 'senior high school' | 'grade school' | 'junior high school' | undefined;


    return (
        <form
            className='flex-1 flex flex-col gap-y-2'
            onSubmit={HandleSubmit}
        >
            <Section header='Requestor Information'>
                <form.Field
                    name='first_name'
                    children={(field) => (
                        <Input
                            label='First Name'
                            id='first_name'
                            name='first_name'
                            type='text'
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                        />
                    )}
                />
                <form.Field
                    name='last_name'
                    children={(field) => (
                        <Input
                            label='Last Name'
                            id='last_name'
                            name='last_name'
                            type='text'
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                        />
                    )}
                />
                <form.Field
                    name='designation'
                    children={(field) => (
                        <SelectInput
                            label='Designation'
                            name='designation'
                            options={data?.designation || []}
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                        />
                    )}
                />
                <form.Field
                    name='contact_number'
                    children={(field) => (
                        <Input
                            label='Contact Number'
                            id='contact_number'
                            name='contact_number'
                            type='text'
                            placeholder='ex. 09123456789'
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                        />
                    )}
                />    
                <form.Field
                    name='department'
                    children={(field) => (
                        <SelectInput
                            label='Department'
                            name='department'
                            options={data?.department || []}
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                        />
                    ) }

                />
                {(dept === 'grade school' || dept === 'junior high school' || dept === 'pre-school' || dept === 'senior high school') && (
                    <form.Field
                        name='grade_level'
                        children={(field) => (
                            <SelectInput
                                label='Grade Level'
                                name='grade_level'
                                options={data?.gradeLevel || []}
                                onChange={(e) => field.handleChange(e.target.value)}
                                required={false}
                                group={department}
                                value={field.state.value ?? ''}
                            />
                        )}
                    />
                )}        
            </Section>

            <Section header='Equipment Usage Details'>
                <form.Field
                    name='purpose'
                    children={(field) => (
                        <SelectInput
                            label='Purpose'
                            name='purpose'
                            options={data?.purpose || []}
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                        />
                    )}
                />
                {/* <form.Field
                    name='type_of_request'
                    children={(field) => (
                        <SelectInput
                            label='Type of Request'
                            name='type_of_request'
                            options={data?.typeOfRequest || []}
                            onChange={(e) => {
                                // Store the actual ID/Value in the form state
                                field.handleChange(e.target.value);
                                
                                // Clear the 'item' field whenever the request type changes 
                                // to prevent submitting a Venue ID as an Equipment
                                // form.setFieldValue('item', ''); 
                            }}
                            value={field.state.value}
                        />
                    )}
                /> */}
                <form.Field
                    name='location_of_use'
                    children={(field) => (
                        <SelectInput
                            label='Location of Use'
                            name='loation_of_use'
                            options={data?.locationOfUse || []}
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                        />
                    )}
                />
                
                <form.Field
                    name='office'
                    children={(field) => (
                        <SelectInput
                            label='Office'
                            name='office'
                            options={data?.office || []}
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                        />
                    )}
                />

                {(dept === 'grade school' || dept === 'junior high school' || dept === 'pre-school' || dept === 'senior high school') && (
                    <form.Field
                        name='place_of_use'
                        children={(field) => (
                            <SelectInput
                                label='Room'
                                name='room'
                                options={data?.placeOfUse || []}
                                onChange={(e) => field.handleChange(e.target.value)}
                                group={department}
                                value={field.state.value ?? ''}
                            />
                        )}
                    />
                )}
                {purp === 'class instruction' && (
                    <form.Field
                        name='subject'
                        children={(field) => (
                            <SelectInput
                                label='Subject'
                                name='subject'
                                options={data?.subject || []}
                                onChange={(e) => field.handleChange(e.target.value)}
                                group={department}
                                value={field.state.value ?? ''}
                            />
                        )}
                    />
                )}
            </Section>

            <Section header='Equipment and Schedule'>
                <div className='space-y-1'>
                    <form.Field
                        name="equipment"
                        children={(field) => (
                            <SelectInput
                                label="Equipment"
                                name="equipment"
                                options={data?.equipment || []}
                                onChange={(e) => {
                                    const selectedId = e.target.value;
                                    const selectedOption = data?.equipment.find(opt => opt.value === selectedId);

                                    if (!selectedOption) return;

                                    const newItem = {
                                        id: selectedOption.value,
                                        name: selectedOption.label.toLowerCase()
                                    };

                                    const exists = equipmentsArray.find(item => item.id === newItem.id);
                                    const next = exists ? equipmentsArray : [...equipmentsArray, newItem];

                                    setEquipmentsArray(next);

                                    field.handleChange(next.map(item => item.id));
                                }}
                                group={office}
                                value=""
                                required={false}
                            />
                        )}
                    />

                    <div className='flex flex-wrap gap-1'>
                        {equipmentsArray.map((item, index) => (
                            <ArrayItem key={index} name={item.name} onDelete={() => handleEquipmentArrayDelete(item.id)}/>
                        ))}
                    </div>
                </div>
                <div className='space-y-1'>
                    <form.Field
                        name="venue"
                        children={(field) => (
                            <SelectInput
                                label="Venue"
                                name="venue"
                                options={data?.venue || []}
                                onChange={(e) => {
                                    const selectedId = e.target.value;
                                    const selectedOption = data?.venue.find(opt => opt.value === selectedId);

                                    if (!selectedOption) return;

                                    const newItem = {
                                        id: selectedOption.value,
                                        name: selectedOption.label.toLowerCase()
                                    };

                                    const exists = venuesArray.find(item => item.id === newItem.id);
                                    const next = exists ? venuesArray : [...venuesArray, newItem];

                                    setVenuesArray(next);

                                    field.handleChange(next.map(item => item.id));
                                }}
                                group={office}
                                // Ensure value doesn't cause a 'null' crash
                                value=""
                                required={false}
                            />
                        )}
                    />
                    <div className='flex flex-wrap gap-1'>
                        {venuesArray.map((item, index) => (
                            <ArrayItem key={index} name={item.name} onDelete={() => handleVenuesArrayDelete(item.id)}/>
                        ))}
                    </div>
                </div>
                <form.Field
                    name='date_of_use'
                    children={(field) => (
                        <Input
                            id='date_of_use'
                            label='Date of Use'
                            name='date_of_use'
                            type='date'
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                        />
                    )}
                />
                <form.Field
                    name='time_of_start'
                    children={(field) => (
                        <Input
                            id='time_of_start'
                            label='Time of Start'
                            name='time_of_start'
                            type='time'
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                        />
                    )}
                />
                <form.Field
                    name='time_of_end'
                    children={(field) => (
                        <Input
                            id='time_of_end'
                            label='Time of End'
                            name='time_of_end'
                            type='time'
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                        />
                    )}
                />
            </Section>

            <Modal
                header="Confirm Submission"
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            > 

                <span>Are you sure you want to submit this borrow request?</span>
                
                <CancelConfirmButtons
                    onCancel={() => setOpenModal(false)}
                    onConfirm={() => form.handleSubmit()}
                />
            </Modal>
            
            <div className='w-full lg:flex lg:justify-end gap-2'>
                <Button
                    Icon={RotateCw}
                    label='Reset'
                    buttonColor='bg-red-500' 
                    onClick={() => {
                        form.reset()
                        setEquipmentsArray([])
                        setVenuesArray([])
                    }}
                />
                
                <Button
                    Icon={Send}
                    label='Submit Request'
                    type='submit'
                    isLoading={isSubmitting}
                />
            </div>
            
        </form>
    );
}

export { BorrowForm }