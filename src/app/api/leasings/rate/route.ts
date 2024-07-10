import { connect } from "@/dbconfig/file";
import LeasingModel from "@/models/leasing";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {

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

        const medianRate = await LeasingModel.aggregate([
            { $match: query },
            { $group: { _id: null, median: { $avg: "$rate" } } }
        ]);

        const median = medianRate.length > 0 ? medianRate[0].median : 0;

        return NextResponse.json({ median }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
