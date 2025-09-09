import { LucideIcon } from "lucide-react";

type ButtonProps = {
    label: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    Icon?: LucideIcon;
};

export default function Button({ 
    label, 
    type = 'button', 
    onClick, 
    disabled = false,
    isLoading = false,
    className = '',
    Icon,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`button-animation bg-hover-color py-2 rounded-xl transition-colors duration-200 flex items-center gap-2 justify-center hover:bg-form-input-color hover:cursor-pointer 
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {Icon && <Icon className="w-4 h-4" />}
            {isLoading ? 'Loading...' : label}
        </button>
    );
}
