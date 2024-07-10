import { connect } from "@/dbconfig/file";
import TradingAccontModel, { tTradingAccount } from "@/models/trading-account";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(req: NextRequest) {
    try {
        const { owner, credit }: tTradingAccount = await req.json()

        const existAcc = await TradingAccontModel.findOne({ owner })
        if (existAcc) {
            return NextResponse.json({ "message": "Account Already Existing!" }, { status: 400 });
        }

        const createAccount = await TradingAccontModel.create({
            owner,
            credit
        })

        return NextResponse.json({ createAccount }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
