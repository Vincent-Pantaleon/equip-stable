'use clent'

import { useForm } from '@tanstack/react-form';
import { useQuery } from '@tanstack/react-query';
import { GetBorrowFormData } from '@/utils/server-actions/borrow-page-query';
import { useStore } from '@tanstack/react-form';

import { Section, Input, SelectInput } from "../input"
import { toast } from 'sonner';

const BorrowForm = () => {
    const form = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            designation: '',
            department: '',
            contact_number: '',
            grade_level: '',
            purpose: '',
            type_of_request: 'equipment',
            location_of_use: '',
            place_of_use: '',
            office: '',
            item: '',
            subject: '',
            date_of_use: '',
            time_of_start: '',
            time_of_end: '',
        },
        // onSubmit: async (value) => {

        // }
    });

    const { data, error } = useQuery({
        queryKey: ['form-data'],
        queryFn: GetBorrowFormData
    })

    if (error) {
        toast.error(error.message)
    }

    const department = useStore(form.baseStore, (state) => state.values.department);
    const departmentOps = data?.department || []

    return (
        <form>
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
                        />
                    ) }

                />
                <form.Field
                    name='grade_level'
                    children={(field) => (
                        <SelectInput
                            label='Grade Level'
                            name='grade_level'
                            options={data?.gradeLevel || []}
                            onChange={(e) => field.handleChange(e.target.value)}
                            required={false}
                        />
                    )}
                />
            </Section>
        </form>
    );
}

export { BorrowForm }