import express from "express";
import { handleSpin } from "../controllers/spin.controller";

const router = express.Router();

router.post("/spin/:userId", handleSpin);

export default router;
