import { Schema, model } from "mongoose";

const rewardSchema = new Schema({
    value: { type: Number, required: true },
    probability: { type: Number, required: true },
})

export const Reward = model("reward", rewardSchema);