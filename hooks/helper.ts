import { DebtRecord, LinePlotChartData } from "@/app/types";

export const getRandomColor = (i: number) => {
    const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]
    return colors[i % 5];
};

export const monthlyPayment = (debtData: DebtRecord[]): {
    payments: LinePlotChartData[];
    interest: number;
    total: number;
} => {
    const internal = structuredClone(debtData.toSorted((a, b) => { return b.APR - a.APR }))

    if (internal.length == 0) {
        return { payments: [], interest: 0, total: 0 }
    }


    let sum = 0;
    let down = 0;

    // Calculate the initial sum of remaining debts
    for (const debt of internal) {
        sum += debt.remain;
        down += debt.downPayment;
    }

    let interestAccrued = 0;

    const payments: LinePlotChartData[] = [];
    let start = 0;
    let origSum = sum
    payments.push({ month: start++, amountPaid: down })

    while (sum > 0 && start <= 48) {
        let thisMonth = 0;

        for (const debt of internal) {
            if (debt.remain > 0) {
                // Accrue interest before making payments
                let interest = debt.remain * (debt.APR / 100);
                interestAccrued += interest;
                debt.remain += interest; // Add interest to principal
                sum += interest; // Update total sum with interest

                // Determine actual payment (handle cases where remain < monthlyPayment)
                let payment = Math.min(debt.remain, debt.monthlyPayment);
                debt.remain -= payment;
                sum -= payment;
                thisMonth += payment;
            }
        }

        // Stop the loop if no payments were made (to prevent infinite loops)
        if (thisMonth === 0) break;

        down += thisMonth

        console.log(thisMonth)

        payments.push({ month: start++, amountPaid: Math.round(down) });
    }



    return { payments, interest: interestAccrued, total: origSum + interestAccrued }
}
export const payHighestAPRFirst = (debtData: DebtRecord[], reverse = false): {
    payments: LinePlotChartData[];
    interest: number;
    total: number;
} => {
    // Sort debts by APR (highest first) and deep clone
    let internal = structuredClone(debtData.toSorted((a, b) => b.APR - a.APR));

    if (reverse) {
        internal.reverse()
    }

    console.log(internal);
    if (internal.length === 0) {
        return { payments: [], interest: 0, total: 0 };
    }

    let sum = 0;
    let down = 0;
    let interestAccrued = 0;
    const payments: LinePlotChartData[] = [];
    let start = 0;

    // Calculate initial debt sum and down payments
    for (const debt of internal) {
        sum += debt.remain;
        down += debt.downPayment;
    }

    // Record initial down payment
    payments.push({ month: start++, amountPaid: down });

    while (sum > 0 && start <= 48) {
        let thisMonth = 0;

        // Accrue interest on remaining debts (excluding the one being paid off)
        for (let i = 1; i < internal.length; i++) {
            if (internal[i].remain > 0) {
                let interest = internal[i].remain * (internal[i].APR / 100 / 12); // Monthly interest
                interestAccrued += interest;
                internal[i].remain += interest;
                sum += interest;
            }
        }

        if (internal.length > 0) {
            const debt = internal[0];

            if (debt.remain > 0) {
                let payment = Math.min(debt.remain, debt.monthlyPayment);
                debt.remain -= payment;
                sum -= payment;
                thisMonth += payment;
            }

            // If the first debt is fully paid, remove it
            if (debt.remain <= 0) {
                internal.shift();
            }
        }

        // Update cumulative payment and record it
        down += thisMonth;
        payments.push({ month: start++, amountPaid: down });

        // Stop if no payments were made (to prevent infinite loops)
        if (thisMonth === 0) break;
    }

    return { payments, interest: interestAccrued, total: sum + interestAccrued };
};
