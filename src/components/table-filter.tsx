interface ComponentProps {
    name: string
    label: string
    value?:  string
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    inputWidth?: string
    options: {
        label: string,
        value: string,
    }[]
}

const TableFilter = ({ name, label, value, onChange, options, inputWidth }: ComponentProps) => {
    return (
        <>
            <label htmlFor={name} className="block font-medium">
                {label}
            </label>
            <div className="border-1 rounded-lg p-2 w-fit">
                <select 
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    style={{ width: inputWidth }}
                >
                    {options.map((item, index) => (
                        <option value={item.value} key={index}>{item.label}</option>
                    ))}
                </select>
            </div>
        </>
        
    )
}

export { TableFilter }