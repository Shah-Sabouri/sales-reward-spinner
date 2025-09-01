import express from "express";
import { createOrder } from "../services/order.service";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const result = await createOrder(req.body);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
