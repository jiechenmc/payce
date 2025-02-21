import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TableCell from "./TableCell";
import { DebtRecord } from "@/app/types";


const TableRow = ({ record }: { record?: DebtRecord }) => {
    return <div className="grid grid-cols-6 gap-5 items-center">
        <TableCell forId="totalPayment" text="Total Payment" type="number" placeholder="$" value={record?.totalPayment}></TableCell>
        <TableCell forId="downPayment" text="Down Payment" type="number" placeholder="$" value={record?.downPayment}></TableCell>
        <TableCell forId="monthlyPayment" text="Month Payment" type="number" placeholder="$" value={record?.monthlyPayment}></TableCell>
        <TableCell forId="APR" text="Interest Rate" type="number" placeholder="%" value={record?.APR}></TableCell>
        <TableCell forId="dueDate" text="Due Date" type="date" placeholder="" value={record?.dueDate}></TableCell>
    </div>;
}

export default TableRow;