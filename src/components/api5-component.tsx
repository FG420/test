'use client'


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
import { tLeasing } from "@/models/leasing";
import { revalidatePath } from "next/cache";


const deleteForm = z.object({
    ownerId: z.string(),
});

export function Api5Component() {
    const router = useRouter()

    const form = useForm<z.infer<typeof deleteForm>>({
        resolver: zodResolver(deleteForm),
    });

    async function onSubmit(values: z.infer<typeof deleteForm>) {
        try {
            await axios.get(`api/leasings/delete?id=${values.ownerId}`);
            router.push('/')
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex justify-around">
                        <FormField
                            control={form.control}
                            name="ownerId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Owner ID</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Insert Owner ID" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex justify-center">
                        <Button type="submit">Delete Onwer</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
