import React from "react";

// Added this to fix the missing type error
export type OptionType = {
  label: string;
  value: string | number;
  group?: string | null;
};

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
  defaultValue?: string | number;
  value?: string | number; // Added number support
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

interface SelectInputProps {
  name: string;
  label: string;
  divStyle?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: OptionType[];
  group?: string | null;
  defaultValue?: string | number;
  required?: boolean;
}

interface SectionProps {
  children: React.ReactNode;
  header?: string;
}

// 🔡 Input Component
export const Input = React.memo(function Input({
  label,
  type,
  id,
  name,
  required = true,
  placeholder,
  divStyle = "",
  pattern,
  isDisabled = false,
  defaultValue,
  value,
  onChange,
}: InputProps) {
  const isControlled = value !== undefined;

  return (
    <div className={`w-full flex flex-col gap-1 ${divStyle}`}>
      <label htmlFor={id} className="font-medium text-gray-700">
        {label}
      </label>
      <input
        className="border-2 border-black/50 w-full px-3 h-9 rounded-md text-md focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
        type={type}
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        disabled={isDisabled}
        autoComplete="off"
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        onChange={onChange}
      />
    </div>
  );
});

// 📦 Section Component
export const Section = React.memo(function Section({ children, header }: SectionProps) {
  return (
    <div className="mb-6">
      {header && <h1 className="text-lg font-semibold mb-2">{header}</h1>}
      <div className="border-2 rounded-md lg:px-5 p-4 grid grid-cols-1 gap-4 md:grid-cols-3 text-sm">
        {children}
      </div>
    </div>
  );
});

// 🔽 Select Input Component
export const SelectInput = React.memo(function SelectInput({
  name,
  label,
  divStyle = "",
  onChange,
  options,
  group,
  defaultValue,
  value,
  required = true,
}: SelectInputProps) {
  const isControlled = value !== undefined;

  return (
    <div className={`w-full flex flex-col gap-1 ${divStyle}`}>
      <label htmlFor={name} className="font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        id={name}
        required={required}
        className="border-2 border-black/50 w-full px-3 h-9 rounded-md bg-white focus:outline-none focus:border-blue-500"
        onChange={onChange}
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
      >
        <option value="" disabled>
          Select an option
        </option>

        {options
          ?.filter((item) => {
            if (!group) return true;
            return item.group === group;
          })
          .map((item, index) => (
            <option key={`${item.value}-${index}`} value={item.value}>
              {item.label ?? "Unknown Item"}
            </option>
          ))}
      </select>
    </div>
  );
});