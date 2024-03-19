import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'


export default function Modal({ children, isOpen, title, description, onClose }) {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    { title ? <DialogTitle>{title}</DialogTitle> : null }
                    { description ? <DialogDescription>{description}</DialogDescription> : null }
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}