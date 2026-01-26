'use client'

import { SelectInput, Input } from "../input"
import { useState } from "react"
import { CancelConfirmButtons } from "../cancel-confirm"

const typeOptions = [
    { label: "Equipment", value: "equipment" },
    { label: "Venue", value: "venue" }
]

const AvailabilityModalForm = () => {
    const [type, setType] = useState<'equipment' | 'venue' | null>(null)

    

    return (
        <form
            className="space-y-2"
        >
            <SelectInput
                label="Select Type"
                name="type"
                options={typeOptions}
                onChange={(e) => setType(e.target.value as ('equipment' | 'venue'))}
            />

            {type && (
                <>
                    <SelectInput
                        label={type === 'equipment' ? 'Equipment' : 'Venue'}
                        name="item"
                        options={[]}
                    />

                    <Input
                        id="date"
                        label="Enter Date"
                        name="date"
                        type="date"
                    />
                </>
            )}

            <CancelConfirmButtons
                onCancel={() => setOpenModal(false)}
                onConfirm={() => {}}
            />
            
        </form>
    )
}

export { AvailabilityModalForm }