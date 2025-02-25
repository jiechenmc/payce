"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DebtRecord, LinePlotChartData, PaymentPlanDataPoint } from "@/app/types"
import { useEffect, useState } from "react"
import { monthlyPayment, payHighestAPRFirst } from "@/hooks/helper"


const chartConfig = {} satisfies ChartConfig



export function PaymentChartComponent({ debtData }: { debtData: DebtRecord[] }) {

  const [chartData, setChartData] = useState<PaymentPlanDataPoint[]>([])

  useEffect(() => {
    if (debtData) {
      const { payments: hpayments, total: htotal, interest: hinterest } = payHighestAPRFirst(debtData)
      const { payments: lpayments, total: ltotal, interest: linterest } = payHighestAPRFirst(debtData, true)
      const { payments, total, interest } = monthlyPayment(debtData)

      const maxMonths = Math.max(
        hpayments.length,
        lpayments.length,
        payments.length
      );


      const mergedPayments = Array.from({ length: maxMonths }, (_, month) => ({
        month,
        plan1: hpayments[month]?.amountPaid || NaN,
        plan2: lpayments[month]?.amountPaid || NaN,
        plan3: payments[month]?.amountPaid || NaN
      }));

      setChartData(mergedPayments)
    }
  }, [debtData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Gradient</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="plan1"
              type="natural"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-1))"
              stackId="a"
            />
            <Area
              dataKey="plan2"
              type="natural"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-2))"
              stackId="b"
            />
            <Area
              dataKey="plan3"
              type="natural"
              fill="hsl(var(--chart-3))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-3))"
              stackId="c"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
