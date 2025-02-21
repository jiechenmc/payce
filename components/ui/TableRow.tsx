import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TableInput from "./TableInput";
import { DebtRecord } from "@/app/types";


const TableRow = ({ record, setRecords }: { record?: DebtRecord, setRecords: Dispatch<SetStateAction<DebtRecord[]>> }) => {
    const [totalPayment, setTotalPayment] = useState<number>(record?.totalPayment ?? 0)
    const [downPayment, setDownPayment] = useState<number>(record?.downPayment ?? 0)
    const [monthlyPayment, setMonthlyPayment] = useState<number>(record?.monthlyPayment ?? 0)
    const [APR, setAPR] = useState<number>(record?.APR ?? 0)
    const [dueDate, setDueDate] = useState<Date>()

    useEffect(() => {

        if (dueDate) {
            const record = {
                id: crypto.randomUUID(),
                totalPayment,
                downPayment,
                monthlyPayment,
                APR,
                dueDate
            }
            console.log(record)
            setRecords(prev => [...prev, record])
        }

    }, [dueDate])


    return <div className="grid grid-cols-6 gap-5 items-center">
        <TableInput forId="totalPayment" text="Total Payment" type="number" placeholder="$" setter={setTotalPayment}></TableInput>
        <TableInput forId="downPayment" text="Down Payment" type="number" placeholder="$" setter={setDownPayment}></TableInput>
        <TableInput forId="monthlyPayment" text="Month Payment" type="number" placeholder="$" setter={setMonthlyPayment}></TableInput>
        <TableInput forId="APR" text="Interest Rate" type="number" placeholder="%" setter={setAPR}></TableInput>
        <TableInput forId="dueDate" text="Due Date" type="date" placeholder="" setter={setDueDate}></TableInput>
    </div>;
}

export default TableRow;