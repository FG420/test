import { connect } from "@/dbconfig/file";
import LeasingModel from "@/models/leasing";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');

        const deleteLeasing = await LeasingModel.findByIdAndDelete(id)

        return NextResponse.json({ message: "Leasing deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating leasing:", error);
        return NextResponse.json({ message: "Error updating leasing" }, { status: 400 });
    }
}
