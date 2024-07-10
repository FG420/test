



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

export function Api7Component() {
    const [sum, setSum] = useState<Number>();
    const [dateMin, setDateMin] = useState<string | undefined>(undefined);
    const [dateMax, setDateMax] = useState<string | undefined>(undefined);

    const getLeasings = async () => {
        try {
            let url = 'api/leasings/sum'
            if (dateMin) url += `?dateMin=${dateMin}`;
            if (dateMax) url += `?dateMax=${dateMax}`;

            const res = await axios.get(url);
            setSum(res.data.sum);
        } catch (error) {
            console.error('Error fetching leasings:', error);
        }
    };

    useEffect(() => {
        getLeasings();
    }, [dateMin, dateMax]);

    const handleDateMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateMin(e.target.value);
    };

    const handleDateMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateMax(e.target.value);
    };

    return (
        <>
            <div className="flex justify-around items-center">
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
                <Label>The Sum is: € {Number(sum)}</Label>
            </div>
        </>
    );
}
