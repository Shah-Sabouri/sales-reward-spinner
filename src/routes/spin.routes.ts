import express from "express";
import { handleSpin, handleGetSpinHistory } from "../controllers/spin.controller";

const router = express.Router();

router.post("/spin/:userId", handleSpin);
router.get("/spin/history/:userId", handleGetSpinHistory);

export default router;
