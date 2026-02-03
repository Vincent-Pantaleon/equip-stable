import { LucideIcon } from "lucide-react";

type ButtonProps = {
    label?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    Icon?: LucideIcon;
    iconColor?: string;
    buttonColor?: string;
};

export default function Button({ 
    label, 
    type = 'button', 
    onClick, 
    disabled = false,
    isLoading = false,
    className = '',
    Icon,
    iconColor,
    buttonColor
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`button-animation text-slate-800 py-2 rounded-xl transition-colors duration-200 flex items-center justify-center hover:bg-form-input-color hover:cursor-pointer shadow-sm
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}
                ${buttonColor ? buttonColor : 'bg-hover-color '}
                `}
        >
            {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
            <span className="hidden md:inline">{isLoading ? 'Loading...' : label}</span>
        </button>
    );
}
