"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DebtRecord } from "@/app/types"
import { getRandomColor } from "@/hooks/helper"


const chartConfig = {} satisfies ChartConfig


interface PieDataPoints {
    name: string
    percentage: number
    fill: string
}

export function PieChartComponent({ debtData }: { debtData: DebtRecord[] }) {

    const [debtSum, setDebtSum] = React.useState(0)
    const [debtRemainPercent, setDebtRemainPercent] = React.useState(0)
    const [chartData, setChartData] = React.useState<PieDataPoints[]>([])
    const [activeDebt, setActiveDebt] = React.useState("")

    React.useEffect(() => {
        let sum = 0
        let credit = 0

        for (const debt of debtData) {
            sum += debt.totalPayment
            credit += debt.downPayment
        }

        setDebtSum(sum)
        setDebtRemainPercent(Math.floor(((sum - credit) / sum) * 100))

        let buffer = []

        for (const [i, debt] of debtData.entries()) {
            buffer.push({ "name": debt.debtName, percentage: Math.floor((debt.totalPayment / sum) * 100), fill: getRandomColor(i) })
        }

        buffer.sort((a, b) => {
            return b.percentage - a.percentage
        })

        setChartData(buffer)
        setActiveDebt(buffer[0]?.name)

    }, [debtData])

    const id = "pie-interactive"

    const activeIndex = React.useMemo(
        () => chartData.findIndex((item) => item.name === activeDebt),
        [activeDebt, chartData]
    )

    const months = React.useMemo(() => chartData.map((item) => item.name), [chartData])

    return (
        <Card data-chart={id} className="flex flex-col">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Debt - Breakdown</CardTitle>
                    <CardDescription>${debtSum} - {debtRemainPercent}% Remaining</CardDescription>
                </div>
                <Select value={activeDebt} onValueChange={setActiveDebt}>
                    <SelectTrigger
                        className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Select name" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {months.map((key) => {
                            return (
                                <SelectItem
                                    key={key}
                                    value={key}
                                    className="rounded-lg [&_span]:flex"
                                >
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className="flex h-3 w-3 shrink-0 rounded-sm"
                                            style={{
                                                backgroundColor: chartData.filter(d => d.name === key)[0].fill,
                                            }}
                                        />
                                        {key}
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="percentage"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={({
                                outerRadius = 0,
                                ...props
                            }: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 25}
                                        innerRadius={outerRadius + 12}
                                    />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {chartData[activeIndex].percentage.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    % of Debt
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
