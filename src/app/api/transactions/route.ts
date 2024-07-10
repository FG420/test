import { connect } from "@/dbconfig/file";
import TransactionModel from "@/models/leasing";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        const dateMin = req.nextUrl.searchParams.get('dateMin');
        const dateMax = req.nextUrl.searchParams.get('dateMax');

        if (!id) {
            const transactions = await TransactionModel.find()
            return NextResponse.json(transactions, { status: 400 });
        }

        let query = { tradingAccountId: id };

        if (dateMin || dateMax) {
            query.date = {};
            if (dateMin) {
                query.date.$gte = new Date(dateMin);
            }
            if (dateMax) {
                query.date.$lte = new Date(dateMax);
            }
        }

        const transactions = await TransactionModel.find(query);

        return NextResponse.json(transactions, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
