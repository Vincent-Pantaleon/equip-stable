import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"

interface ToolTipProps {
    children: React.ReactNode
    content: string
}

const ToolTip = ({ children, content }: ToolTipProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger type="button" asChild>{children}</TooltipTrigger>
                <TooltipContent>
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
       
    )
}

export { ToolTip }