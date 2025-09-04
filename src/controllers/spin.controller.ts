import { Request, Response } from "express";
import { spinWheel, getSpinHistory } from "../services/spin.service";


export const handleSpin = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await spinWheel(userId);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const handleGetSpinHistory = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const spins = await getSpinHistory(userId);
        res.json(spins);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};