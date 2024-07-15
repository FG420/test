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

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { tJobs } from "@/models/jobs";
import { Label } from "./ui/label";


const deleteForm = z.object({
    jobId: z.string(),
});

export function Api4Component() {
    const router = useRouter()

    const [jobs, setJobs] = useState<tJobs[]>([])

    const getAllJobs = async () => {
        try {
            const res = await axios.get('api/jobs')

            setJobs(res.data.jobs)
        } catch (error) {
            console.log(error)
        }
    }

    const form = useForm<z.infer<typeof deleteForm>>({
        resolver: zodResolver(deleteForm),
    });

    async function onSubmit(values: z.infer<typeof deleteForm>) {
        try {
            await axios.delete(`api/jobs?id=${values.jobId}`);
            router.push('/')
        } catch (error: any) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllJobs()
    }, [])

    const formatDateString = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return date.toLocaleDateString();
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-6">
                    <Label className="px-4">Job ID</Label>
                    <div className="flex justify-around items-center">

                        <div className="p-2">

                            <FormField
                                control={form.control}
                                name="jobId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="text" placeholder="Insert Job ID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="p-2">
                            <Button type="submit">Delete Job</Button>
                        </div>
                    </div>
                </form>
            </Form>


            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Job ID</TableHead>
                            <TableHead className="">Title</TableHead>
                            <TableHead className="">Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right font-medium">Salary Pre Taxes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((jobs) => (
                            <TableRow key={jobs._id}>
                                <TableCell className="font-medium">{jobs._id}</TableCell>
                                <TableCell>{jobs.title} </TableCell>
                                <TableCell>{jobs.description} </TableCell>
                                <TableCell>{formatDateString(jobs.date)}</TableCell>
                                <TableCell className="font-medium text-right">{jobs.salaryPreTax.toFixed(2)} €</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
