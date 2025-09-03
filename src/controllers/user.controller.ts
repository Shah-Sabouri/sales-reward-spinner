import express from "express";
import { createOrLoginUser } from "../services/user.service";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const user = await createOrLoginUser({ name: req.body.name });
        res.status(201).json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
