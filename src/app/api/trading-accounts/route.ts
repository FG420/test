import { connect } from "@/dbconfig/file";
import TradingAccountModel from "@/models/trading-account";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(req: NextRequest) {
    try {
        const limit = req.nextUrl.searchParams.get("limit")
        const numLim = Number(limit)

        if (limit) {
            const tradingAccounts = await TradingAccountModel.find().limit(numLim)
            return NextResponse.json({ tradingAccounts }, { status: 200 })

        } else {
            const tradingAccounts = await TradingAccountModel.find()
            return NextResponse.json({ tradingAccounts }, { status: 200 })
        }


    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 })
    }
}
