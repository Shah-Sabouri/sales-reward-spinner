import express from "express";
import { User } from "../models/user.model";

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const user = await User.create({ name: req.body.name });
        res.status(201).json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
