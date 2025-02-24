"use client"
import { AvatarComponent } from "@/components/AvatarComponent";
import { ModeToggle } from "@/components/ModeToggle";
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
import { useEffect, useState } from "react";
import { DebtForm } from "@/components/DebtForm";
import TableRow from "@/components/TableRow";
import { PaymentChartComponent } from "@/components/PaymentChart";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Home() {
  const [records, setRecords] = useLocalStorage<DebtRecord[]>("debt", [])

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
      <PieChartComponent debtData={records} />
      <PaymentChartComponent debtData={records} />
    </div>
  );
}
