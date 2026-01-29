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

interface SelectInputProps {
  name: string;
  label: string;
  divStyle?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: OptionType[];
  group?: string;
  defaultValue?: string | number;
}

interface SectionProps {
  children: React.ReactNode;
  header?: string;
}

// 🔡 Input
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
        defaultValue={defaultValue ?? ""}
      />
    </div>
  );
});

// 📦 Section
export const Section = React.memo(function Section({ children, header }: SectionProps) {
  return (
    <div>
      <h1 className="text-lg font-semibold">{header}</h1>
      <div className="border-2 rounded-md lg:px-5 p-2 grid grid-cols-1 gap-[10px] md:grid-cols-2 text-sm">
        {children}
      </div>
    </div>
  );
});

// 🔽 Select Input
export const SelectInput = React.memo(function SelectInput({
  name,
  label,
  divStyle,
  onChange,
  options,
  group,
  defaultValue,
}: SelectInputProps) {
  return (
    <div className={divStyle}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        required
        className="border-2 border-black/50 w-full px-3 h-9 rounded-md"
        onChange={onChange}
        defaultValue={defaultValue ?? ""}
      >
        <option value="" disabled>
          Select an option
        </option>

        {options
          ?.filter((item) => {
            // If no group is selected → show all
            if (!group) return true;

            // If item has no group assigned → hide it
            if (item.group == null) return false;

            // Normal filtering
            return item.group === group;
          })
          .map((item, index) => (
            <option key={index} value={item.value}>
              {item.label ?? "Unknown Item"}
            </option>
          ))}
      </select>
    </div>
  );
});
