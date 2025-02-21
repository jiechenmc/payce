import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "./DatePicker";

interface CellProps { forId: string, text: string, type?: string, value: number | undefined | string }

const TableCell = ({ forId, text, type = "text", value }: CellProps) => {
    return <div className="min-w-full">
        <Label htmlFor={forId}>{text}</Label>
        {type === "date" ?
            <DatePicker />
            : <Input id={forId} type={type} defaultValue={value} />}
    </div>;
}

export default TableCell;