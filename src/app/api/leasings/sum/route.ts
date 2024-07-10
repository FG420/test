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

        const totalAmount = await LeasingModel.aggregate([
            { $match: query },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const sum = totalAmount.length > 0 ? totalAmount[0].total : 0;

        return NextResponse.json({ sum }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
