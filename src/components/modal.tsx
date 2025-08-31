import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface ModalProps {
  children: React.ReactNode;
  header: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal ({ children, header, isOpen, onClose }: ModalProps) {
    if (!isOpen) return null
    
    return (
        <Dialog 
            open={isOpen} 
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogContent
                className="
                    w-[80%]
                    md:w-[60%]
                    lg:w-[40%]
                    mx-auto
                    rounded-lg
                "
            >
                <DialogHeader>
                    <DialogTitle>{header}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}