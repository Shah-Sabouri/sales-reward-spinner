import { Schema, Types, model, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    spinsAvailable: number;
    spinHistory: Types.ObjectId[];
}

const userSchema = new Schema({
    name: { type: String, required: true },
    spinsAvailable: { type: Number, default: 0 },
    spinHistory: [{ type: Types.ObjectId, ref: "Spin"}],
});

export const User = model<IUser>("users", userSchema);