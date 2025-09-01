import { Schema, model, Types } from "mongoose";

export interface ISpin {
    userId: Types.ObjectId;
    reward: number;
    createdAt: Date;
}

export const SpinSchema = new Schema<ISpin>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reward: { type: Number, required: true },
    createdAt: { type: Date, required: true },
});

export const Spin = model<ISpin>("Spin", SpinSchema, "spins");
