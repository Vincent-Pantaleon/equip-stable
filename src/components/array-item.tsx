
import { X } from "lucide-react"
import { formatLabel } from "@/utils/handlers/capitalize"

interface ItemProps {
    onDelete: () => void
    name: string
}

const ArrayItem = ({ onDelete, name }: ItemProps) => {
    return (
        <div className='bg-hover-color p-2 rounded-lg flex items-center justify-center gap-1'>
            
            <p className="text-xs">{formatLabel(name)}</p>

            <X onClick={onDelete} className="h-4 w-4 hover:bg-form-input-color hover:cursor-pointer rounded-lg"/>
        </div>
    )
}

export { ArrayItem }