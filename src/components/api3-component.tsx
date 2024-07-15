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
import { tJobs } from "@/models/jobs";
import { Textarea } from "./ui/textarea";

const newJobForm = z.object({
    jobId: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    salary: z.coerce.number().optional(),
    date: z.string().optional(),
});

export function Api3Component() {
    const router = useRouter()
    const [jobs, setJobs] = useState<tJobs[]>([]);

    const getAllJobs = async () => {
        try {
            const res = await axios.get('api/jobs');
            setJobs(res.data.jobs);
        } catch (error: any) {
            console.log(error);
        }
    };

    const form = useForm<z.infer<typeof newJobForm>>({
        resolver: zodResolver(newJobForm),
    });

    async function onSubmit(values: z.infer<typeof newJobForm>) {
        console.log(values);
        try {
            const updateData = {
                title: values.title,
                description: values.description,
                salaryPreTax: values.salary,
                date: values.date,
            }
            await axios.post(`api/jobs/modify?id=${values.jobId}`, updateData);
            router.push('/')
        } catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllJobs()
    }, [])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-center">
                    <FormField
                        control={form.control}
                        name="jobId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Job to Modify</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-56">
                                            <SelectValue placeholder="Select Job" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jobs.map((job) => (
                                                <SelectItem key={job._id} value={String(job._id)}>
                                                    {job.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Modify Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Insert Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Modify Job Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Insert Job Description... (max 400 chars)" {...field} maxLength={400} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-around">
                    <div className="p-2">

                        <FormField
                            control={form.control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Modify Salary</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} step={.01} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="p-2">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Modify Date</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            {...field}
                                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button type="submit">Modify</Button>
                </div>
            </form>
        </Form>
    );
}
