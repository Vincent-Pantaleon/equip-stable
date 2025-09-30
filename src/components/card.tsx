interface CardContainerProps {
    children: React.ReactNode;
}

interface CardContentProps {
    children: React.ReactNode;
}

interface CardDescriptionProps {
    children: React.ReactNode;
}

interface CardWrapperProps {
    children: React.ReactNode;
}

const CardContainer = ({ children }: CardContainerProps) => {
    return (
        <div className="border-2 rounded-lg py-3 w-full flex flex-col px-2 odd:bg-blue-50 items-center">
            {children}
        </div>
    )
}

const CardContent = ({ children }: CardContentProps) => {
    return (
        <div className="text-2xl self-center">
            {children}
        </div>
    )
}

const CardDescription = ({ children }: CardDescriptionProps) => {
    return (
        <div>
            {children}
        </div>
    )
}

const CardWrapper = ({ children }: CardWrapperProps) => {
    return (
        <div className="mb-4 flex items-center gap-4 justify-center text-nowrap">
            {children}
        </div>
    )
}

export { CardContainer, CardDescription, CardContent, CardWrapper }