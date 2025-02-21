"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DebtRecord } from "@/app/types"
import { Dispatch, SetStateAction, useEffect } from "react"
import { Calculator } from "lucide-react"

const formSchema = z.object({
    debtName: z.string().min(1, "Name cannot be empty."),
    totalPayment: z.union([z.coerce.number(), z.string()]),
    downPayment: z.union([z.coerce.number(), z.string()]),
    monthlyPayment: z.union([z.coerce.number(), z.string()]),
    APR: z.union([z.coerce.number(), z.string()]),
    dueDate: z.union([z.coerce.number(), z.string()]),
})

export function DebtForm({ setRecords }: { setRecords: Dispatch<SetStateAction<DebtRecord[]>> }) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            debtName: "",
            totalPayment: "",
            downPayment: "",
            monthlyPayment: "",
            APR: "",
            dueDate: 0
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setRecords((prev: DebtRecord[]) => [...prev, values])

        console.log(values)

        form.reset()
        form.setFocus("debtName")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid grid-cols-5 gap-4">
            <FormField
                    control={form.control}
                    name="debtName"
                    render={({ field }) => (
                        < FormItem className="mt-8">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input  {...field} />
                            </FormControl>
                            <FormDescription>
                                Label for the Pie Chart.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="totalPayment"
                    render={({ field }) => (
                        < FormItem >
                            <FormLabel>Total Payment</FormLabel>
                            <FormControl>
                                <Input placeholder="$"  {...field} type="number" />
                            </FormControl>
                            <FormDescription>
                                Principal in $USD.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="downPayment"
                    render={({ field }) => (
                        < FormItem >
                            <FormLabel>Down Payment</FormLabel>
                            <FormControl>
                                <Input placeholder="$"  {...field} type="number" />
                            </FormControl>
                            <FormDescription>
                                Paid in $USD.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="monthlyPayment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monthly Payment</FormLabel>
                            <FormControl>
                                <Input placeholder="$"  {...field} type="number" />
                            </FormControl>
                            <FormDescription>
                                $USD.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="APR"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Interest Rate</FormLabel>
                            <FormControl>
                                <Input placeholder="%" {...field} type="number" />
                            </FormControl>
                            <FormDescription>
                                APR 
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            <Button variant="outline" type="submit">
                    <Calculator></Calculator>
                    Calculate
                </Button>
            </form>
        </Form >
    )
}
