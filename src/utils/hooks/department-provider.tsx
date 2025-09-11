'use client'

import { useState } from "react";

import { SelectInput } from "@/components/input";

type DepartmentOptions = "kindergarten" | "elementary" | "high_school" | "senior_high_school"

interface ProviderProps {
    options: OptionType[];
}

const DepartmentProvider = ({ options }: ProviderProps) => {
    const [department, setDepartment] = useState<DepartmentOptions | null>(null)

    
}