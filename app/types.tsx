
export interface DebtRecord {
    debtName: string
    totalPayment: number
    downPayment: number
    remain: number
    monthlyPayment: number
    APR: number
    dueDate: number
}

export interface PaymentPlanDataPoint {
    month: string,
    plan1: number
    plan2: number
}

export interface LinePlotChartData {
    month: number
    amountPaid: number
}