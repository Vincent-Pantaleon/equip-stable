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
};


interface SelectInputProps {
  name: string;
  label: string;
  divStyle?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: OptionType[];
}

// 🔡 Input
export const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  name,
  required = true,
  placeholder,
  divStyle,
  pattern,
  isDisabled = false,
}) => {
  return (
    <div className={`w-full ${divStyle}`}>
      <label htmlFor={id}>{label}</label>
      <input
        className="border-2 border-black/50 w-full px-3 h-9 rounded-md"
        type={type}
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        disabled={isDisabled}
        autoComplete="on"
      />
    </div>
  );
};

// 📦 Section
export const Section: React.FC<SectionProps> = ({ children, header }) => {
  return (
    <div>
      <h1 className="text-lg font-semibold">{header}</h1>
      <div className="border-2 rounded-md lg:px-5 p-2 grid grid-cols-1 gap-[10px] md:grid-cols-2 text-sm">
        {children}
      </div>
    </div>
  );
};

// 🔽 Select Input
export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  divStyle,
  onChange,
  options
}) => {
  return (
    <div className={divStyle}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        required
        className="border-2 border-black/50 w-full px-3 h-9 rounded-md"
        onChange={onChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label ?? "Unknown Item"} 
          </option>
        ))}
      </select>
    </div>
  );
};
