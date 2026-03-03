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
    // Determine if we have both elements to justify a gap
    const hasBoth = Icon && label;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`button-animation text-slate-800 py-2 rounded-xl transition-colors duration-200 
                flex items-center justify-center hover:bg-form-input-color hover:cursor-pointer shadow-sm
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
                ${buttonColor ? buttonColor : 'bg-hover-color'} 
                ${hasBoth ? 'gap-2 px-4' : 'px-3'} 
                ${className}`}
        >
            {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
            
            {/* Only render the span if a label exists or it's loading */}
            {(label || isLoading) && (
                <span className="hidden sm:inline">
                    {isLoading ? 'Loading...' : label}
                </span>
            )}
        </button>
    );
}
