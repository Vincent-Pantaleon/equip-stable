interface ComponentProps {
    name: string
    label: string
    value?:  string
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    options: {
        label: string,
        value: string,
    }[]
}

const TableFilter = ({ name, label, value, onChange, options }: ComponentProps) => {
    return (
        <>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="border-1 rounded-lg p-2 w-fit">
                <select 
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    className="w-[11vw]"
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