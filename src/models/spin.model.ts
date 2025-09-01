import { Schema, Types, model } from "mongoose";

const spinSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User", required: true },
    reward: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const User = model("spins", spinSchema);