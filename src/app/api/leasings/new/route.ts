import { connect } from "@/dbconfig/file";
import LeasingModel, { tLeasing } from "@/models/leasing";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(req: NextRequest) {
    try {
        const { name, surname, amount, rate } = await req.json()

        const leasingObj: tLeasing = {
            owner: {
                name,
                surname
            },
            date: new Date(),
            amount,
            rate
        }

        const createLeasing = await LeasingModel.create(leasingObj)

        return NextResponse.json({ createLeasing }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
