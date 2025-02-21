
export interface DebtRecord {
    id: string
    totalPayment: number
    downPayment: number
    monthlyPayment: number
    APR: number
    dueDate: Date
}