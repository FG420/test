'use client'

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
import { tJobs } from "@/models/jobs"
import { Textarea } from "./ui/textarea"

export function Api5Component() {
    const [jobs, setJobs] = useState<tJobs[]>([]);
    const [viewLimit, setViewLimit] = useState<number | undefined>(undefined);
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [desc, setDesc] = useState<string | undefined>(undefined);

    const getJobs = async () => {
        try {
            let url = 'api/jobs/getBy';
            const params = new URLSearchParams();

            if (viewLimit) params.append('limit', viewLimit.toString());
            if (title) params.append('title', title);
            if (desc) params.append('desc', desc);

            if (params.toString()) url += `?${params.toString()}`;

            const res = await axios.get(url);
            setJobs(res.data.jobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        getJobs();
    }, [viewLimit, title, desc]);

    const formatDateString = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return date.toLocaleDateString();
    };

    const handleViewLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setViewLimit(Number(event.target.value));
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    };

    return (
        <div className="flex">
            <div className="w-1/3 p-4">
                <div className="flex flex-col space-y-4">
                    <div>
                        <Label className="p-2">Title: </Label>
                        <Input
                            type="text"
                            placeholder="Filter for Title"
                            value={title || ''}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div>
                        <Label className="p-2">Job Description: </Label>
                        <Textarea
                            placeholder="Filter for Description... (max 400 chars)"
                            value={desc || ''}
                            onChange={handleDescChange}
                        />
                    </div>
                    <div>
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
            </div>
            <div className="w-2/3 p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Job ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right font-medium">Salary Pre Taxes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell className="font-medium">{job._id}</TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.description}</TableCell>
                                <TableCell>{formatDateString(job.date)}</TableCell>
                                <TableCell className="font-medium text-right">{job.salaryPreTax.toFixed(2)} €</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
