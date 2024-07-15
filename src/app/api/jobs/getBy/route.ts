import { connect } from "@/dbconfig/file";
import JobsModel from "@/models/jobs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const limit = req.nextUrl.searchParams.get("limit");
        const numLimit = limit ? Number(limit) : 0;

        const title = req.nextUrl.searchParams.get("title");
        const description = req.nextUrl.searchParams.get("desc");

        const query: Record<string, any> = {};
        if (title) {
            query.title = { $regex: title, $options: "i" };
        }
        if (description) {
            query.description = { $regex: description, $options: "i" };
        }

        let jobsQuery = JobsModel.find(query).sort({ date: -1 });

        if (numLimit > 0) {
            jobsQuery = jobsQuery.limit(numLimit);
        }

        const jobs = await jobsQuery;

        return NextResponse.json({ jobs }, { status: 200, statusText: "OK" });
    } catch (error) {
        console.error("Error fetching Jobs:", error);
        return NextResponse.json({ message: "Error fetching Jobs" }, { status: 400, statusText: "KO" });
    }
}
