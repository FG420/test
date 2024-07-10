import { connect } from "@/dbconfig/file";
import LeasingModel from "@/models/leasing";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const limit = req.nextUrl.searchParams.get('limit');
        const limitNum = limit ? Number(limit) : undefined;
        const dateMin = req.nextUrl.searchParams.get('dateMin');
        const dateMax = req.nextUrl.searchParams.get('dateMax');

        let query: Record<string, any> = {};

        if (dateMin || dateMax) {
            query.date = {};
            if (dateMin) {
                query.date.$gte = new Date(dateMin);
            }
            if (dateMax) {
                query.date.$lte = new Date(dateMax);
            }
        }

        const leasings = await LeasingModel.find(query)
            .sort({ date: -1 })
            .limit(limitNum!);

        return NextResponse.json(leasings, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
