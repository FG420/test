'use client';

import { tLeasing } from "@/models/leasing";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";

export default function Api2Component() {
    const [leasings, setLeasings] = useState<tLeasing[]>([]);
    const [surname, setSurname] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);

    const getLeasings = async () => {
        try {
            let url = '/api/leasings';
            const params = {};

            if (surname) {
                url += `/getBy?surname=${surname}`;
            } else if (name) {
                url += `/getBy?name=${name}`;
            }

            const res = await axios.get(url);
            setLeasings(res.data.leasings);
        } catch (error) {
            console.error('Error fetching leasings:', error);
        }
    };

    useEffect(() => {
        getLeasings();
    }, [surname, name]);

    const formatDateString = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return date.toLocaleDateString();
    };

    const handleSurnameFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
    };

    const handleNameFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <>
            <div className="flex justify-between">
                <div className="p-4">
                    <Input
                        type="text"
                        placeholder="Filter Surname"
                        value={surname || ''}
                        onChange={handleSurnameFilter}
                    />
                </div>
                <div className="p-4">
                    <Input
                        type="text"
                        placeholder="Filter Name"
                        value={name || ''}
                        onChange={handleNameFilter}
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
