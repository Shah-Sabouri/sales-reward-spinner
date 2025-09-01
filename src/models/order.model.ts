import { Schema, model, Types } from "mongoose";

export interface IOrder {
    order_id: string;
    userId: Types.ObjectId;
    createdAt: Date;
}

export const OrderSchema = new Schema<IOrder>({
    order_id: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, required: true },
});

export const Order = model<IOrder>("Order", OrderSchema, "orders");
