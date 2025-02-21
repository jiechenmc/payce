import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "./DatePicker";
import { Dispatch, SetStateAction } from "react";

interface CellProps { forId: string, text: string, type?: string, placeholder: string, setter?: Dispatch<SetStateAction<any>>, value: number | undefined }

const TableCell = ({ forId, text, type = "text", placeholder, setter, value }: CellProps) => {
    return <div>
        <Label htmlFor={forId}>{text}</Label>
        {type === "date" ?
            <DatePicker />
            : <Input id={forId} placeholder={placeholder} type={type} defaultValue={value} />}

    </div>;
}

export default TableCell;