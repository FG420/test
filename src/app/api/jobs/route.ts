import { connect } from "@/dbconfig/file";
import JobsModel, { tJobs } from "@/models/jobs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const limit = req.nextUrl.searchParams.get("limit");
        const numLim = Number(limit);

        if (limit && !isNaN(numLim) && numLim > 0) {
            const jobs = await JobsModel.find().limit(numLim).sort({ date: -1 });
            return NextResponse.json({ jobs }, { status: 200, statusText: "OK" });
        } else {
            const jobs = await JobsModel.find().sort({ date: -1 });
            return NextResponse.json({ jobs }, { status: 200, statusText: "OK" });
        }

    } catch (error) {
        return NextResponse.json({ message: "Error fetching Jobs" }, { status: 400, statusText: "KO" });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, description, salary, date } = await req.json()

        const jobObj: tJobs = {
            title,
            date,
            description,
            salaryPreTax: salary
        }

        const createJob = await JobsModel.create(jobObj)

        return NextResponse.json({ createJob }, { status: 200, statusText: "OK" });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400, statusText: "KO" });
    }
}

export async function DELETE(req: NextRequest) {
    try {

        const id = req.nextUrl.searchParams.get('id');

        const deleteJob = await JobsModel.findByIdAndDelete(id)
        if (!deleteJob) {
            return NextResponse.json({ message: "Job Not Found" }, { status: 404, statusText: "KO" });
        }
        else {
            return NextResponse.json({ message: "Job deleted successfully" }, { status: 200, statusText: "OK" });
        }


    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400, statusText: "KO" });
    }


}