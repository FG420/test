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
import { Label } from "./ui/label"

export function Api6Component() {
    const [leasings, setLeasings] = useState<tLeasing[]>([]);
    const [viewLimit, setViewLimit] = useState<number | undefined>(undefined);
    const [dateMin, setDateMin] = useState<string | undefined>(undefined);
    const [dateMax, setDateMax] = useState<string | undefined>(undefined);

    const getLeasings = async () => {
        try {
            let url = 'api/leasings/getDate'
            if (viewLimit) url += `?limit=${viewLimit}`;
            if (dateMin) url += `?dateMin=${dateMin}`;
            if (dateMax) url += `?dateMax=${dateMax}`;

            const res = await axios.get(url);
            setLeasings(res.data);
        } catch (error) {
            console.error('Error fetching leasings:', error);
        }
    };

    useEffect(() => {
        getLeasings();
    }, [viewLimit, dateMin, dateMax]);

    const formatDateString = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return date.toLocaleDateString();
    };

    const handleViewLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setViewLimit(Number(event.target.value));
    };

    const handleDateMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateMin(e.target.value);
    };

    const handleDateMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateMax(e.target.value);
    };

    return (
        <>
            <div className="flex justify-around items-center">
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
                <div className="p-3">
                    <Label className="p-2">Filter by Date Min: </Label>
                    <Input
                        type="date"
                        placeholder="Filter by Date Min"
                        value={dateMin || ''}
                        onChange={handleDateMinChange}
                    />
                </div>
                <div className="p-3">
                    <Label className="p-2">Filter by Date Max: </Label>
                    <Input
                        type="date"
                        placeholder="Filter by Date Max"
                        value={dateMax || ''}
                        onChange={handleDateMaxChange}
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
