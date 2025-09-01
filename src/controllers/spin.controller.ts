import { Request, Response } from "express";
import { spinWheel } from "../services/spin.service";

export const handleSpin = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await spinWheel(userId);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};