import { connect } from "@/dbconfig/file";
import JobsModel, { tJobs } from "@/models/jobs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        const { title, description, date, salaryPreTax }: tJobs = await req.json();


        const updateFields: Record<string, any> = {};
        if (title !== undefined && title !== null) {
            updateFields.title = title;
        }
        if (description !== undefined && description !== null) {
            updateFields.description = description;
        }
        if (date !== undefined && date !== null) {
            updateFields.date = date;
        }
        if (salaryPreTax !== undefined && salaryPreTax !== null) {
            updateFields.salaryPreTax = salaryPreTax;
        }

        const updatedJob = await JobsModel.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedJob) {
            return NextResponse.json({ message: "Job Not Found" }, { status: 404, statusText: "KO" });
        } else {
            return NextResponse.json({ message: "Job updated successfully", updatedJob }, { status: 200, statusText: "OK" });
        }

    } catch (error) {
        console.error("Error updating Job:", error);
        return NextResponse.json({ message: "Error updating Job" }, { status: 400, statusText: "KO" });
    }
}
