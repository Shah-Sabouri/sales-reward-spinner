import mongoose, { Schema, Document } from "mongoose";

export interface ISpinBalance extends Document {
    userId: mongoose.Types.ObjectId;
    balance: number; // saldo efter ändringen
    change: number;  // hur mycket saldot ändrades (+1 vid order, -1 vid spin)
    reason: "order" | "spin" | "bonus" | "adjustment"; // varför ändrades saldot?
    relatedId?: string; // t.ex. orderId eller spinId
    createdAt: Date;
}

const SpinBalanceSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    balance: { type: Number, required: true },
    change: { type: Number, required: true },
    reason: { type: String, enum: ["order", "spin", "bonus", "adjustment"], required: true },
    relatedId: { type: String }, // kan länka till order_id eller spin._id
    createdAt: { type: Date, default: Date.now },
});

export const SpinBalance = mongoose.model<ISpinBalance>("SpinBalance", SpinBalanceSchema, "spinBalances");
