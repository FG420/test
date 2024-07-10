import { connect } from "@/dbconfig/file";
import TransactionModel from "@/models/leasing";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: "Trading account ID is required" }, { status: 400 });
        }

        const transactions = await TransactionModel.find({ tradingAccountId: id });

        const buys = transactions.filter(transaction => transaction.transactionType === 2);
        const totalBuys = buys.reduce((acc, transaction) => acc + (transaction.price * transaction.quantity), 0);

        const sells = transactions.filter(transaction => transaction.transactionType === 1);
        const totalSells = sells.reduce((acc, transaction) => acc + (transaction.price * transaction.quantity), 0);

        return NextResponse.json({ totalBuys, totalSells }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
