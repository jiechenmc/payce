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

const formSchema = z.object({
    totalPayment: z.coerce.number(),
    downPayment: z.coerce.number(),
    monthlyPayment: z.coerce.number(),
    APR: z.coerce.number(),
    dueDate: z.coerce.number()
})

export function ProfileForm({ setRecords }: { setRecords: Dispatch<SetStateAction<DebtRecord[]>> }) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            totalPayment: NaN,
            downPayment: NaN,
            monthlyPayment: NaN,
            APR: NaN,
            dueDate: 0
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setRecords((prev: DebtRecord[]) => [...prev, values])

    }

    useEffect(() => {
        form.reset()
        console.log(form)
    }, [form.formState.isSubmitSuccessful])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                This is your public display name.
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
                                <Input {...field} type="number" />
                            </FormControl>
                            <FormDescription>
                                This is how much you already paid.
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
                                <Input {...field} type="number" />
                            </FormControl>
                            <FormDescription>
                                This is your minimum payment.
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
                                <Input {...field} type="number" />
                            </FormControl>
                            <FormDescription>
                                This is your APR expressed as a percentage. If your APR is 3.49%, please input 3.49.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
                <Button type="reset">Reset</Button>
            </form>
        </Form >
    )
}
