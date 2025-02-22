"use client"
import { AvatarComponent } from "@/components/ui/AvatarComponent";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { PieChartComponent } from "@/components/PieChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import type { DebtRecord } from "./types";
import {  useState } from "react";
import { DebtForm } from "@/components/DebtForm";
import TableRow from "@/components/ui/TableRow";
import { AreaChartComponent } from "@/components/AreaChart";

export default function Home() {
  const [records, setRecords] = useState<DebtRecord[]>([])

  return (
    <div className="min-h-screen min-w-screen font-[family-name:var(--font-geist-sans)] px-[20vw]">
      <div className="flex justify-between w-full p-4">
        <ModeToggle />
        <AvatarComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Debt Payoff Calculator</CardTitle>
          <CardDescription>The calculator below estimates the amount of time required to pay back one or more debts. Additionally, it gives users the most cost-efficient payoff sequence, with the option of adding extra payments. This calculator utilizes the debt avalanche method, considered the most cost-efficient payoff strategy from a financial perspective.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DebtForm setRecords={setRecords} />
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
      {[...records].map(record => <TableRow key={crypto.randomUUID()} record={record} />)}
      <PieChartComponent />
      <AreaChartComponent />
    </div>
  );
}
