import { connect } from "@/dbconfig/file";
import LeasingModel from "@/models/leasing";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        const { name, surname, amount, rate } = await req.json();

        const updateFields: Record<string, any> = {};
        if (name !== undefined && name !== null) {
            updateFields['owner.name'] = name;
        }
        if (surname !== undefined && surname !== null) {
            updateFields['owner.surname'] = surname;
        }
        if (amount !== undefined && amount !== null) {
            updateFields.amount = amount;
        }
        if (rate !== undefined && rate !== null) {
            updateFields.rate = rate;
        }

        const updatedLeasing = await LeasingModel.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedLeasing) {
            return NextResponse.json({ message: "Leasing Not Found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Leasing updated successfully", updatedLeasing }, { status: 200 });
    } catch (error) {
        console.error("Error updating leasing:", error);
        return NextResponse.json({ message: "Error updating leasing" }, { status: 400 });
    }
}
