type ButtonProps = {
    label: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
};

export default function Button({ 
    label, 
    type = 'button', 
    onClick, 
    disabled = false,
    isLoading = false,
    className = '',
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`button-animation bg-hover-color py-2 rounded-xl transition-colors duration-200 hover:bg-form-input-color hover:cursor-pointer 
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {isLoading ? 'Loading...' : label}
        </button>
    );
}
