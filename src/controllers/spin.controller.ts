import { Request, Response } from "express";
import { assignSpinToUser, performSpin } from "../services/spin.service";
import { Order } from "../models/order.model";

export const handleOrder = async (req: Request, res: Response) => {
    const { order_id, user_id, created_at } = req.body;
    try {
    // Spara order
        const order = await Order.create({
            order_id,
            userId: user_id,
            createdAt: new Date(created_at),
    });

    // Tilldela spinn
    const user = await assignSpinToUser(user_id);

    res.json({
        message: "Order received and spin assigned",
        order,
        spinsAvailable: user.spinsAvailable,
        });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const handleSpin = async (req: Request, res: Response) => {
    const { user_id } = req.body;
    try {
        const spin = await performSpin(user_id);
        res.json({ reward: spin.reward, createdAt: spin.createdAt });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};