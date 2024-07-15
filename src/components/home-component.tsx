'use client'

import { tJobs } from "@/models/jobs"
import axios from "axios"
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function HomeComponent() {
    const [jobs, setJobs] = useState<tJobs[]>([]);
    const [viewLimit, setViewLimit] = useState<number | undefined>(undefined);

    const getJobs = async () => {
        try {
            let url = '/api/jobs'
            if (viewLimit) {
                url += `?limit=${viewLimit}`;
            }
            const res = await axios.get(url);
            setJobs(res.data.jobs);
        } catch (error) {
            console.error('Error fetching Jobs:', error);
        }
    };

    useEffect(() => {
        getJobs();
    }, [viewLimit]);

    const formatDateString = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return date.toLocaleDateString();
    };

    const handleViewLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setViewLimit(Number(event.target.value));
    };

    return (
        <>
            <div className="flex justify-between p-8">
                <div className="">
                    <Label className="p-2">Limit: </Label>
                    <Input
                        type="number"
                        placeholder="View Limit"
                        value={viewLimit || ''}
                        min={0}
                        onChange={handleViewLimitChange}
                    />

                </div>
            </div>
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
