import TableCell from "./TableCell";
import { DebtRecord } from "@/app/types";


const TableRow = ({ record }: { record?: DebtRecord }) => {
    return <div className="grid grid-cols-6 gap-4 p-4 items-center">
        <TableCell forId="debtName" text="Name" type="text" value={record?.debtName}></TableCell>
        <TableCell forId="totalPayment" text="Principal" type="number" value={record?.totalPayment}></TableCell>
        <TableCell forId="downPayment" text="Down Payment" type="number" value={record?.downPayment}></TableCell>
        <TableCell forId="monthlyPayment" text="Monthly Payment" type="number" value={record?.monthlyPayment}></TableCell>
        <TableCell forId="APR" text="Interest Rate" type="number" value={record?.APR}></TableCell>
        <TableCell forId="dueDate" text="Due Date" type="date" value={record?.dueDate}></TableCell>
    </div>;
}

export default TableRow;