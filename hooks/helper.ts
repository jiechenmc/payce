import { DebtRecord, LinePlotChartData } from "@/app/types";

export const getRandomColor = (i: number) => {
    const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]
    return colors[i % 5];
};

export const payHighestAPRFirst = (debtData: DebtRecord[]): LinePlotChartData[] => {

    // if (debtData.length == 0) {
    //     return []
    // }


    // let sum = 0

    // for (const debt of debtData) {
    //     sum += debt.remain
    // }

    // let interestAccured = 0

    // const payments: LinePlotChartData[] = []
    // let start = 1

    // while (sum > 0) {
    //     let thisMonth = 0

    //     for (const debt of debtData) {
    //         if (debt.remain > 0) {
    //             debt.remain -= debt.monthlyPayment
    //             let interest = debt.remain * (debt.APR / 100)
    //             sum += interest
    //             interestAccured += interest
    //             sum -= debt.monthlyPayment
    //             thisMonth += debt.monthlyPayment
    //         }
    //     }

    //     console.log(thisMonth)

    //     payments.push({ month: start++, amountPaid: thisMonth })

    // }

    return payments
}

