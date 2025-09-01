import { Order } from "../models/order.model";
import { User } from "../models/user.model";
import { SpinBalance } from "../models/spinBalance.model";

interface OrderData {
    order_id: string;
    userId: string;
    createdAt?: Date;
}

export const createOrder = async (data: OrderData) => {
    // 1. Skapa order
    const order = await Order.create({
        order_id: data.order_id,
        userId: data.userId,
        createdAt: data.createdAt || new Date(),
    });

    // 2. Uppdatera spins på användaren
    const user = await User.findById(data.userId);
    if (!user) throw new Error("User not found");

    user.spinsAvailable += 1;
    await user.save();

      // 3. Logga SpinBalance
    await SpinBalance.create({
        userId: user._id,
        balance: user.spinsAvailable,
        change: +1,
        reason: "order",
        relatedId: order.order_id,
    });

    return { order, spinsAvailable: user.spinsAvailable };
};
