'use client'

import { tLeasing } from "@/models/leasing"
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

export default function HomeComponent() {
    const [leasings, setLeasings] = useState<tLeasing[]>([]);
    const [viewLimit, setViewLimit] = useState<number | undefined>(undefined);

    const getLeasings = async () => {
        try {
            let url = '/api/leasings'
            if (viewLimit) {
                url += `?limit=${viewLimit}`;
            }
            const res = await axios.get(url);
            setLeasings(res.data.leasings);
        } catch (error) {
            console.error('Error fetching leasings:', error);
        }
    };

    useEffect(() => {
        getLeasings();
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
                            <TableHead className="">Leasing Owner</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Rate %</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leasings.map((leasing) => (
                            <TableRow key={leasing._id}>
                                <TableCell className="font-medium">{leasing.owner.surname} {leasing.owner.name}</TableCell>
                                <TableCell>{formatDateString(leasing.date)}</TableCell>
                                <TableCell>{leasing.rate}</TableCell>
                                <TableCell className="text-right">€ {leasing.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
