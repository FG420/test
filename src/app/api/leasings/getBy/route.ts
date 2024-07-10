import { connect } from "@/dbconfig/file";
import LeasingModel from "@/models/leasing";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const surname = req.nextUrl.searchParams.get("surname");
        const name = req.nextUrl.searchParams.get("name");

        const query = {};
        if (surname && name) {
            query['$and'] = [
                { 'owner.surname': { $regex: surname, $options: 'i' } },
                { 'owner.name': { $regex: name, $options: 'i' } }
            ];
        } else if (surname) {
            query['owner.surname'] = { $regex: surname, $options: 'i' };
        } else if (name) {
            query['owner.name'] = { $regex: name, $options: 'i' };
        }

        const leasings = await LeasingModel.find(query).sort({ date: -1 });

        return NextResponse.json({ leasings }, { status: 200 });
    } catch (error) {
        console.error("Error fetching leasings:", error);
        return NextResponse.json({ message: "Error fetching leasings" }, { status: 400 });
    }
}
