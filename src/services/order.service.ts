import { Order } from "../models/order.model";
import { User } from "../models/user.model";
import { Spin } from "../models/spin.model";
import { Types } from "mongoose";

interface OrderInput {
    order_id: string;
    user_id: string;
    created_at: string;
}

export const createOrder = async (orderData: OrderInput) => {
    const user = await User.findById(orderData.user_id);
    if (!user) throw new Error("User not found");

    const order = await Order.create({
        order_id: orderData.order_id,
        userId: new Types.ObjectId(orderData.user_id),
        createdAt: new Date(orderData.created_at),
    });

    // Uppdatera spinsAvailable
    user.spinsAvailable = (user.spinsAvailable || 0) + 1;
    await user.save();

    // Skapa Spin
    const spin = await Spin.create({
        userId: user._id,
        reward: 0,
        createdAt: new Date(),
    });

    user.spinHistory.push(spin._id);
    await user.save();

    return {
        message: "Order received and spin assigned",
        order,
        spinsAvailable: user.spinsAvailable,
    };
};
