import TableInput from "./TableInput";

const TableRow = () => {
    return <div className="grid grid-cols-6 gap-5 items-center">
        <TableInput forId="totalPayment" text="Total Payment"></TableInput>
        <TableInput forId="downPayment" text="Down Payment"></TableInput>
        <TableInput forId="monthlyPayment" text="Month Payment"></TableInput>
        <TableInput forId="apr" text="Interest Rate"></TableInput>
        <TableInput forId="dueDate" text="Due Date" type="date"></TableInput>
    </div>;
}

export default TableRow;