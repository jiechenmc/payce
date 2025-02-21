"use client"
import { AvatarComponent } from "@/components/ui/Avatar";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { PieChartComponent } from "@/components/ui/PieChart";
import TableInput from "@/components/ui/TableInput";
import TableRow from "@/components/ui/TableRow";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import type { DebtRecord } from "./types";
import { Calculator } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [records, setRecords] = useState<DebtRecord[]>([])

  return (
    <div className="items-center justify-items-center min-h-screen min-w-screen font-[family-name:var(--font-geist-sans)] px-[20vw]">
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
          {[...records].map(record => <TableRow key={record.id} record={record} setRecords={setRecords} />)}
          <TableRow setRecords={setRecords} />
        </CardContent>
        <CardFooter>
          <Button variant="outline">
            <Calculator></Calculator>
            Calculate
          </Button>
        </CardFooter>
      </Card>
      <PieChartComponent />
    </div>
  );
}
