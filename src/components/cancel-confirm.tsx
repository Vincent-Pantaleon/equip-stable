
import Button from "./button";

interface CancelConfirmButtonsProps {
    onCancel: () => void;
    onConfirm: () => void;
}

const CancelConfirmButtons = ({ onCancel, onConfirm }: CancelConfirmButtonsProps) => {
    return (
        <div className="flex justify-end gap-3">
            <Button
                label="Cancel"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-sm transition"
                type="button"
                onClick={() => onCancel()}
            />
            <Button
                label="Confirm"
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl shadow-sm transition"
                onClick={() => onConfirm()}
            />
        </div>
    )
}

export { CancelConfirmButtons }