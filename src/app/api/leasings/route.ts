import { connect } from "@/dbconfig/file";
import LeasingModel from "@/models/leasing";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const limit = req.nextUrl.searchParams.get("limit");
        const numLim = Number(limit);

        if (limit && !isNaN(numLim) && numLim > 0) {
            const leasings = await LeasingModel.find().limit(numLim).sort({ date: -1 });
            return NextResponse.json({ leasings }, { status: 200 });
        } else {
            const leasings = await LeasingModel.find().sort({ date: -1 });
            return NextResponse.json({ leasings }, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ message: "Error fetching leasings" }, { status: 400 });
    }
}
