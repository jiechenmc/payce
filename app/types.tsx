
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
    month: string | number,
    plan1: number
    plan2: number
    plan3: number
}

export interface LinePlotChartData {
    month: number
    amountPaid: number
}