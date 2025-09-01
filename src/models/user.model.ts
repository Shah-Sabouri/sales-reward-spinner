import { Schema, model, Types } from "mongoose";

export interface IUser {
    name: string;
    spinsAvailable: number;
    spinHistory: Types.ObjectId[];
}

export const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    spinsAvailable: { type: Number, default: 0 },
    spinHistory: [{ type: Schema.Types.ObjectId, ref: "Spin" }],
});

export const User = model<IUser>("User", UserSchema, "users");
