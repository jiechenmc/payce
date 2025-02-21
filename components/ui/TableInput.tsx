import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "./DatePicker";
import { Dispatch, SetStateAction } from "react";

const TableInput = ({ forId, text, type = "text", placeholder, setter }: { forId: string, text: string, type?: string, placeholder: string, setter: Dispatch<SetStateAction<any>> }) => {
    return <div>
        <Label htmlFor={forId}>{text}</Label>
        {type === "date" ?
            <DatePicker setter={setter} />
            : <Input id={forId} placeholder={placeholder} type={type} onChange={(v) => setter(type === "number" ? parseInt(v.target.value) : v.target.value)} />}

    </div>;
}

export default TableInput;