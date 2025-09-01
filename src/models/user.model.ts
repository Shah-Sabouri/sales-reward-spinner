import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    spinsAvailable: { type: Number, default: 0 },
    spinHistory: [{ type: Types.ObjectId, ref: "Spin"}],
});

export const User = model("users", userSchema);