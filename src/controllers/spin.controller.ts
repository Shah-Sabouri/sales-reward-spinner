import { Request, Response } from "express";
import { assignSpinToUser, performSpin } from "../services/spin.service";

export const handleOrder = async (req: Request, res: Response) => {
    const { user_id } = req.body;
    try {
        const user = await assignSpinToUser(user_id);
        res.json({ message: "Spin assigned", spinsAvailable: user.spinsAvailable });
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