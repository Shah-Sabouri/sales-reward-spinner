import { Schema, model, Types, Document } from "mongoose";

export interface IOrder extends Document {
    order_id: string;
    userId: Types.ObjectId;
    createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
    order_id: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, required: true },
});

export const Order = model<IOrder>("Order", orderSchema);