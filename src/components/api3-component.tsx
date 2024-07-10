"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const newLesingForm = z.object({
    name: z.string(),
    surname: z.string(),
    amount: z.coerce.number(),
    rate: z.coerce.number(),
});

export function Api3Component() {
    const router = useRouter()
    // const [tradingAccs, setTradingAccs] = useState<tTradingAccount[]>([]);

    // const getAllTradingAccs = async () => {
    //     try {
    //         const res = await axios.get('api/trading-accounts');
    //         setTradingAccs(res.data.tradingAccounts);
    //     } catch (error: any) {
    //         console.log(error);
    //     }
    // };

    const form = useForm<z.infer<typeof newLesingForm>>({
        resolver: zodResolver(newLesingForm),
        defaultValues: {
            name: '',
            surname: '',
            amount: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof newLesingForm>) {
        console.log(values);
        try {
            await axios.post('api/leasings/new', values);
            router.push('/')
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex justify-around">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Owner Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Insert Owner Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Owner Surname</FormLabel>
                                <FormControl>
                                    <Input placeholder="Insert Owner Surname" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-around">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rate</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-56">
                                            <SelectValue placeholder="Select Rate" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="6">6</SelectItem>
                                            <SelectItem value="12">12</SelectItem>
                                            <SelectItem value="18">18</SelectItem>
                                            <SelectItem value="24">24</SelectItem>
                                            <SelectItem value="48">48</SelectItem>
                                            <SelectItem value="60">60</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-center">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
}
