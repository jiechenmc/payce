import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "./DatePicker";

const TableInput = ({ forId, text, type = "text" }: { forId: string, text: string, type?: string }) => {
    return <div>
        <Label htmlFor={forId}>{text}</Label>
        {type === "date" ? <>
            <DatePicker />
        </> : <Input id={forId} placeholder={text} type={type} />}

    </div>;
}

export default TableInput;