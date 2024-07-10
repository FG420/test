import mongoose, { ObjectId, Types } from "mongoose";

const leasingSchema = new mongoose.Schema({

    owner: {
        type: Object,
        name: {
            type: String,
            required: [true, "Provide Name"]
        },
        surname: {
            type: String,
            required: [true, "Provide Name"]
        }
    },
    date: {
        type: Date,
        required: [true, "Provide Date"]
    },
    amount: {
        type: Number,
        required: [true, "Provide Amount"]
    },
    rate: {
        type: Number,
        required: [true, "Provide Rate"]
    }

});

export type tLeasing = {
    _id?: string,
    owner: {
        name: string,
        surname: string
    },
    date: Date
    amount: number
    rate: 6 | 12 | 18 | 24 | 48 | 60
};

const LeasingModel = mongoose.models['leasings'] || mongoose.model('leasings', leasingSchema);
export default LeasingModel;
