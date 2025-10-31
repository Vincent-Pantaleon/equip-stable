import React from "react";

type InputProps = {
    label: string;
    type: string;
    id: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    divStyle?: string;
    pattern?: string;
    isDisabled?: boolean;
    isPassword?: boolean;
    defaultValue?: string | number;
};

export const Input = React.memo(function Input({
    label,
    type,
    id,
    name,
    required = true,
    placeholder,
    divStyle,
    pattern,
    isDisabled = false,
    defaultValue
}: InputProps) {
    return (
        <div className={`w-full ${divStyle}`}>
            <label htmlFor={id}>{label}</label>
            <input
                className="border-2 border-black/50 w-full px-3 h-9 rounded-md text-md"
                type={type}
                id={id}
                name={name}
                required={required}
                placeholder={placeholder}
                pattern={pattern}
                disabled={isDisabled}
                autoComplete="off-"
                defaultValue={defaultValue ?? ""}
            />
        </div>
    );
});