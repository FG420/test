import mongoose, { ObjectId, Types } from "mongoose";

const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Provide Title for Job Offer"]
    },
    date: {
        type: Date,
        required: [true, "Provide Date"]
    },
    description: {
        type: String,
        required: [true, "Provide Description"]
    },
    salaryPreTax: {
        type: Number,
        required: [true, "Provide Salary pre Taxes"]
    }

});

export type tJobs = {
    _id?: string,
    title: string,
    date: Date,
    description: string,
    salaryPreTax: number,
};

const JobsModel = mongoose.models['jobs'] || mongoose.model('jobs', jobSchema);
export default JobsModel;
